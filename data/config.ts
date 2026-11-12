export const CONFIG = {
  modelo: {
    url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/models/heart.glb`,
    credito: "“Open Heart model” por Dr. Alex Cheroske, licença CC BY-NC 4.0 (Sketchfab)",
  },
  realismo: {
    clearcoat: 0.6,
    clearcoatRoughness: 0.28,
    roughness: 0.62,
    sheen: 0.2,
    sheenColor: "#ff8f80",
  },
  batimento: {
    ativo: true,
    bpm: 68,
    intensidade: 0.012,
  },
  visaoGeral: [0, 0.17, 0.985] as [number, number, number],
};
