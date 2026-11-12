"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { PARTES } from "@/data/partes";
import { Secao } from "@/components/Secao";
import { DebugPanel } from "@/components/DebugPanel";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import type { PontoMarcado } from "@/components/HeartModel";
import { CONFIG } from "@/data/config";
import { desligarSom, ligarSom } from "@/lib/som";

const HeartViewer = dynamic(() => import("@/components/HeartViewer"), { ssr: false });

const linhaLeitura = () =>
  window.innerHeight * (window.matchMedia("(min-width: 1024px)").matches ? 0.5 : 0.78);

export default function Page() {
  const [ativo, setAtivo] = useState("geral");
  const [mostrarNomes, setMostrarNomes] = useState(false);
  const [modoMarcar, setModoMarcar] = useState(false);
  const [som, setSom] = useState(false);
  const [marcado, setMarcado] = useState<PontoMarcado | null>(null);
  const travaAte = useRef(0);

  const atualizarPeloScroll = useCallback(() => {
    if (Date.now() < travaAte.current) return;
    const linha = linhaLeitura();
    let melhor = PARTES[0].id;
    let menor = Infinity;
    for (const p of PARTES) {
      const el = document.getElementById(`parte-${p.id}`);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      const d = Math.abs(r.top + r.height / 2 - linha);
      if (d < menor) {
        menor = d;
        melhor = p.id;
      }
    }
    setAtivo(melhor);
  }, []);

  useEffect(() => {
    setModoMarcar(new URLSearchParams(window.location.search).has("marcar"));
    let raf = 0;
    const aoRolar = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(atualizarPeloScroll);
    };
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar);
    aoRolar();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRolar);
    };
  }, [atualizarPeloScroll]);

  const selecionar = useCallback(
    (id: string) => {
      setAtivo(id);
      const el = document.getElementById(`parte-${id}`);
      if (!el) return;
      travaAte.current = Date.now() + 1100;
      const r = el.getBoundingClientRect();
      window.scrollTo({ top: window.scrollY + r.top + r.height / 2 - linhaLeitura(), behavior: "smooth" });
      setTimeout(atualizarPeloScroll, 1150);
    },
    [atualizarPeloScroll]
  );

  useEffect(() => () => desligarSom(), []);

  const alternarSom = () => {
    if (som) desligarSom();
    else ligarSom().catch((e) => console.error("[Som]", e));
    setSom(!som);
  };

  const parteAtiva = PARTES.find((p) => p.id === ativo)!;

  return (
    <main className="relative min-h-screen bg-ink text-carne">
      <header className="pointer-events-none fixed left-0 top-0 z-30 px-6 py-5 lg:px-14 lg:py-8">
        <p className="font-display text-xl tracking-tight">
          Cor<span className="text-sangue">.</span>
          <span className="ml-2 font-sans text-xs uppercase tracking-[0.25em] text-muted">atlas 3D</span>
        </p>
      </header>

      <div className="fixed inset-x-0 top-0 z-20 h-[55svh] border-b border-white/5 bg-ink lg:inset-y-0 lg:left-[40%] lg:h-auto lg:border-b-0">
        <ErrorBoundary fallback={<SemModelo />}>
          <HeartViewer
            ativo={ativo}
            mostrarNomes={mostrarNomes}
            modoMarcar={modoMarcar}
            onSelecionar={selecionar}
            onMarcar={setMarcado}
          />
        </ErrorBoundary>

        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-ink to-transparent lg:block" />

        <p className="pointer-events-none absolute right-8 top-8 z-50 hidden text-xs text-muted lg:block">
          Arraste para girar · Role sobre o coração para zoom · Clique num número
        </p>

        <nav className="absolute right-6 z-50 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-2.5 lg:flex">
          {PARTES.map((p) => (
            <button
              key={p.id}
              onClick={() => selecionar(p.id)}
              title={p.nome}
              aria-label={p.nome}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                p.id === ativo ? "w-8 bg-sangue" : "w-3 bg-white/25 hover:w-5 hover:bg-white/60"
              }`}
            />
          ))}
        </nav>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-50 flex items-end justify-between gap-3 p-4 lg:p-8">
          <div className="rounded-full border border-white/10 bg-black/50 px-4 py-2 text-xs backdrop-blur">
            <span className="text-carne">{parteAtiva.nome}</span>
          </div>
          <div className="pointer-events-auto flex flex-wrap justify-end gap-2">
            <button
              onClick={alternarSom}
              aria-pressed={som}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs backdrop-blur transition ${
                som ? "border-sangue bg-sangue/20 text-white" : "border-white/15 bg-black/50 hover:border-sangue"
              }`}
            >
              <IconeSom ligado={som} />
              {som ? "Som ligado" : "Ouvir batimento"}
            </button>
            <button
              onClick={() => setMostrarNomes((v) => !v)}
              className={`rounded-full border px-4 py-2 text-xs backdrop-blur transition ${
                mostrarNomes ? "border-sangue bg-sangue/20 text-white" : "border-white/15 bg-black/50 hover:border-sangue"
              }`}
            >
              {mostrarNomes ? "Esconder nomes" : "Mostrar nomes"}
            </button>
            {ativo !== "geral" && (
              <button
                onClick={() => selecionar("geral")}
                className="rounded-full border border-white/15 bg-black/50 px-4 py-2 text-xs backdrop-blur transition hover:border-sangue hover:text-white"
              >
                Visão geral
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="relative z-10 pt-[55svh] lg:w-[40%] lg:pt-0">
        {PARTES.map((p, i) => (
          <Secao key={p.id} parte={p} indice={i} total={PARTES.length} ativa={p.id === ativo} />
        ))}
        <footer className="px-6 pb-16 pt-4 text-xs text-muted lg:px-14 lg:pb-[40vh]">
          Modelo 3D: <span className="text-carne/70">{CONFIG.modelo.credito}</span>
        </footer>
      </div>

      {modoMarcar && <DebugPanel marcado={marcado} />}
    </main>
  );
}

function IconeSom({ ligado }: { ligado: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M11 5 6 9H2v6h4l5 4V5z" fill="currentColor" stroke="none" />
      {ligado ? (
        <>
          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          <path d="M18.5 5.5a9 9 0 0 1 0 13" />
        </>
      ) : (
        <path d="m16 9 6 6m0-6-6 6" />
      )}
    </svg>
  );
}

function SemModelo() {
  return (
    <div className="flex h-full items-center justify-center p-8 text-center">
      <div className="max-w-sm">
        <p className="font-display text-2xl">Modelo não encontrado</p>
        <p className="mt-3 text-sm text-muted">
          Coloque o arquivo em <code className="text-carne">public/models/heart.glb</code> e recarregue a página.
          Veja o passo a passo no LEIA-ME.md.
        </p>
      </div>
    </div>
  );
}
