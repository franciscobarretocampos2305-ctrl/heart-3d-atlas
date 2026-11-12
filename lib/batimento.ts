import { CONFIG } from "@/data/config";

// mesmo relógio para animação e som
export const relogio = () => performance.now() / 1000;

export const periodo = () => 60 / CONFIG.batimento.bpm;

export const BULHA_1 = 0.04;
export const BULHA_2 = 0.21;

export function pulso(t: number) {
  const f = (t % periodo()) / periodo();
  const g = (centro: number, largura: number) => Math.exp(-(((f - centro) / largura) ** 2));
  return g(BULHA_1 + 0.02, 0.035) + 0.6 * g(BULHA_2 + 0.015, 0.045);
}
