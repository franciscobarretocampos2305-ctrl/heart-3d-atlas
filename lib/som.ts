import { CONFIG } from "@/data/config";
import { BULHA_1, BULHA_2, periodo, relogio } from "./batimento";


type Bulha = { freqInicio: number; freqFim: number; duracao: number; ganho: number; corteRuido: number };

const TUM: Bulha = { freqInicio: 78, freqFim: 42, duracao: 0.16, ganho: 1, corteRuido: 260 };
const TA: Bulha = { freqInicio: 105, freqFim: 58, duracao: 0.11, ganho: 0.75, corteRuido: 420 };

let ctx: AudioContext | null = null;
let mestre: GainNode | null = null;
let sons: { tum: AudioBuffer; ta: AudioBuffer } | null = null;
let timer: ReturnType<typeof setInterval> | null = null;
let agendadoAte = 0;
let volume = 0.6;

function ruidoBranco(c: BaseAudioContext, segundos: number) {
  const b = c.createBuffer(1, Math.ceil(c.sampleRate * segundos), c.sampleRate);
  const d = b.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  return b;
}

function ecoToracico(c: BaseAudioContext) {
  const seg = 0.35;
  const b = c.createBuffer(2, Math.ceil(c.sampleRate * seg), c.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const d = b.getChannelData(ch);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (c.sampleRate * 0.05));
  }
  return b;
}

async function renderizar(bulha: Bulha): Promise<AudioBuffer> {
  const taxa = 44100;
  const off = new OfflineAudioContext(2, Math.ceil(taxa * 0.5), taxa);
  const t0 = 0.005;
  const fim = t0 + bulha.duracao;

  const saida = off.createBiquadFilter();
  saida.type = "lowpass";
  saida.frequency.value = 900;

  const seco = off.createGain();
  seco.gain.value = 1;
  const eco = off.createConvolver();
  eco.buffer = ecoToracico(off);
  const ecoFiltro = off.createBiquadFilter();
  ecoFiltro.type = "lowpass";
  ecoFiltro.frequency.value = 350;
  const ecoGanho = off.createGain();
  ecoGanho.gain.value = 0.18;

  seco.connect(saida);
  seco.connect(eco).connect(ecoFiltro).connect(ecoGanho).connect(saida);
  saida.connect(off.destination);

  const envelope = (g: GainNode, pico: number, ataque: number, queda: number) => {
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(pico, t0 + ataque);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + queda);
  };

  // grave
  const grave = off.createOscillator();
  grave.type = "sine";
  grave.frequency.setValueAtTime(bulha.freqInicio, t0);
  grave.frequency.exponentialRampToValueAtTime(bulha.freqFim, fim);
  const gGrave = off.createGain();
  envelope(gGrave, bulha.ganho, 0.012, bulha.duracao);
  grave.connect(gGrave).connect(seco);

  // harmônico
  const harm = off.createOscillator();
  harm.type = "triangle";
  harm.frequency.setValueAtTime(bulha.freqInicio * 2, t0);
  harm.frequency.exponentialRampToValueAtTime(bulha.freqFim * 2, fim);
  const gHarm = off.createGain();
  envelope(gHarm, bulha.ganho * 0.22, 0.008, bulha.duracao * 0.7);
  harm.connect(gHarm).connect(seco);

  // ruído
  const ruido = off.createBufferSource();
  ruido.buffer = ruidoBranco(off, 0.3);
  const fRuido = off.createBiquadFilter();
  fRuido.type = "lowpass";
  fRuido.frequency.value = bulha.corteRuido;
  fRuido.Q.value = 0.8;
  const gRuido = off.createGain();
  envelope(gRuido, bulha.ganho * 0.45, 0.004, bulha.duracao * 0.5);
  ruido.connect(fRuido).connect(gRuido).connect(seco);

  for (const n of [grave, harm, ruido]) {
    n.start(t0);
    n.stop(fim + 0.05);
  }
  return off.startRendering();
}

function paraTempoDeAudio(c: AudioContext, tRelogio: number) {
  const ts = c.getOutputTimestamp?.();
  if (ts && ts.contextTime !== undefined && ts.performanceTime) {
    return ts.contextTime + (tRelogio - ts.performanceTime / 1000);
  }
  const atraso = (c as AudioContext & { outputLatency?: number }).outputLatency ?? c.baseLatency ?? 0;
  return c.currentTime + (tRelogio - relogio()) - atraso;
}

function agendar() {
  if (!ctx || !mestre || !sons) return;
  const agora = relogio();
  const p = periodo();
  const horizonte = agora + 0.3;

  for (let ciclo = Math.floor(agora / p) * p - p; ciclo < horizonte; ciclo += p) {
    for (const [fase, buf] of [
      [BULHA_1, sons.tum],
      [BULHA_2, sons.ta],
    ] as const) {
      const t = ciclo + fase * p;
      if (t <= agendadoAte || t < agora - 0.02 || t > horizonte) continue;
      const quando = paraTempoDeAudio(ctx, t);
      if (quando < ctx.currentTime - 0.03) continue;
      const fonte = ctx.createBufferSource();
      fonte.buffer = buf;
      fonte.connect(mestre);
      fonte.start(Math.max(quando, ctx.currentTime));
      agendadoAte = t;
    }
  }
}

export async function ligarSom() {
  if (!CONFIG.batimento.ativo) return;
  if (!ctx) {
    ctx = new AudioContext({ latencyHint: "interactive" });
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14;
    comp.ratio.value = 4;
    mestre = ctx.createGain();
    mestre.gain.value = 0;
    mestre.connect(comp).connect(ctx.destination);
    const [tum, ta] = await Promise.all([renderizar(TUM), renderizar(TA)]);
    sons = { tum, ta };
  }
  await ctx.resume();
  mestre!.gain.setTargetAtTime(volume, ctx.currentTime, 0.08);
  agendadoAte = relogio();
  if (!timer) timer = setInterval(agendar, 50);
  agendar();
}

export function desligarSom() {
  if (timer) clearInterval(timer);
  timer = null;
  if (!ctx || !mestre) return;
  mestre.gain.setTargetAtTime(0, ctx.currentTime, 0.05);
  const c = ctx;
  setTimeout(() => {
    if (!timer) c.suspend();
  }, 300);
}

export function volumePorDistancia(distancia: number) {
  const perto = 0.6;
  const longe = 6;
  const k = Math.min(1, Math.max(0, (longe - distancia) / (longe - perto)));
  const novo = 0.35 + 0.65 * k;
  if (Math.abs(novo - volume) < 0.02) return;
  volume = novo;
  if (ctx && mestre && timer) mestre.gain.setTargetAtTime(volume, ctx.currentTime, 0.15);
}
