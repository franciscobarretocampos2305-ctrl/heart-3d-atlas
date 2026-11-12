"use client";

import { useState } from "react";
import type { PontoMarcado } from "./HeartModel";

/**
 * Modo marcação: abra o site com /?marcar no fim do endereço.
 * Gire a câmera até ver bem a estrutura, clique nela e copie a linha gerada
 * para o campo "marcador" da parte certa em data/partes.ts.
 */
export function DebugPanel({ marcado }: { marcado: PontoMarcado | null }) {
  const [copiado, setCopiado] = useState(false);
  const linha = marcado
    ? `marcador: { ponto: [${marcado.ponto.join(", ")}], direcao: [${marcado.direcao.join(", ")}], distancia: 1.3 },`
    : "";

  const copiar = async () => {
    await navigator.clipboard.writeText(linha);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1500);
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 w-[22rem] rounded-xl border border-white/10 bg-black/85 p-4 font-mono text-[11px] backdrop-blur">
      <p className="mb-2 font-sans text-sm text-carne">Modo marcação</p>
      {marcado ? (
        <>
          <pre className="whitespace-pre-wrap break-all text-emerald-300">{linha}</pre>
          <button
            onClick={copiar}
            className="mt-3 rounded-full border border-white/20 px-3 py-1 font-sans text-xs hover:border-sangue"
          >
            {copiado ? "Copiado!" : "Copiar"}
          </button>
        </>
      ) : (
        <p className="text-muted">Gire até ver bem a estrutura e clique nela no coração.</p>
      )}
    </div>
  );
}
