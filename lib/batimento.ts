import { CONFIG } from "@/data/config";

/**
 * Relógio único do batimento. A animação e o som usam o mesmo relógio,
 * por isso o "tum-tá" que você ouve cai junto com o pulso que você vê.
 */
export const relogio = () => performance.now() / 1000;

export const periodo = () => 60 / CONFIG.batimento.bpm;

/** Momento (em fração do ciclo) de cada bulha: 1ª = "tum", 2ª = "tá". */
export const BULHA_1 = 0.04;
export const BULHA_2 = 0.21;

/** Intensidade do pulso visual (0 a ~1) num instante. */
export function pulso(t: number) {
  const f = (t % periodo()) / periodo();
  const g = (centro: number, largura: number) => Math.exp(-(((f - centro) / largura) ** 2));
  // Pico logo depois do início do som, como o tranco que se sente no peito.
  return g(BULHA_1 + 0.02, 0.035) + 0.6 * g(BULHA_2 + 0.015, 0.045);
}
