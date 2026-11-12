// Ajustes gerais do visualizador. Mexa aqui sem precisar tocar nos componentes.
export const CONFIG = {
  modelo: {
    // O prefixo é definido na publicação (GitHub Pages) e fica vazio no seu computador.
    url: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/models/heart.glb`,
    // Créditos obrigatórios (licença CC BY-NC: uso não comercial, com crédito ao autor).
    credito: "“Open Heart model” por Dr. Alex Cheroske, licença CC BY-NC 4.0 (Sketchfab)",
  },
  realismo: {
    clearcoat: 0.6, // película brilhante por cima, aspecto "úmido"
    clearcoatRoughness: 0.28,
    roughness: 0.62, // aspereza da superfície (0 = espelho, 1 = fosco)
    sheen: 0.2, // leve brilho aveludado avermelhado nas bordas
    sheenColor: "#ff8f80",
  },
  batimento: {
    ativo: true,
    bpm: 68,
    intensidade: 0.012, // 1.2% de escala no pico
  },
  // Direção da câmera na visão geral (frente do coração, levemente de cima).
  visaoGeral: [0, 0.17, 0.985] as [number, number, number],
};
