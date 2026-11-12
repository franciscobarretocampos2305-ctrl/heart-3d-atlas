"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { PARTES, type Parte } from "@/data/partes";

type Props = {
  ativo: string;
  mostrarNomes: boolean;
  onSelecionar: (id: string) => void;
};

type Caixa = { x0: number; y0: number; x1: number; y1: number };

const _p = new THREE.Vector3();
const _d = new THREE.Vector3();
const _v = new THREE.Vector3();
const _s = new THREE.Vector3();

const ITENS = PARTES.map((parte, i) => ({ parte, numero: i + 1 })).filter((x) => x.parte.marcador);
const sobrepoe = (a: Caixa, b: Caixa) => a.x0 < b.x1 && a.x1 > b.x0 && a.y0 < b.y1 && a.y1 > b.y0;

/**
 * Pontos numerados com nome em português e seta apontando para cada estrutura.
 * A cada quadro: esconde os que estão do outro lado do coração e, quando dois
 * ficam amontoados na tela, mostra só um (o ativo sempre tem prioridade).
 * Ao dar zoom eles se afastam e voltam a aparecer.
 */
export function Marcadores({ ativo, mostrarNomes, onSelecionar }: Props) {
  const grupos = useRef<(THREE.Group | null)[]>([]);
  const els = useRef<(HTMLDivElement | null)[]>([]);

  useFrame(({ camera, size }) => {
    const ocupadas: Caixa[] = [];
    const ordem = ITENS.map((_, k) => k).sort(
      (a, b) => Number(ITENS[b].parte.id === ativo) - Number(ITENS[a].parte.id === ativo)
    );

    for (const k of ordem) {
      const g = grupos.current[k];
      const el = els.current[k];
      if (!g || !el) continue;
      const { parte } = ITENS[k];
      const eAtivo = parte.id === ativo;

      g.getWorldPosition(_p);
      _d.set(...parte.marcador!.direcao).transformDirection(g.matrixWorld);
      const virado = _d.dot(_v.subVectors(camera.position, _p).normalize());
      let opac = eAtivo ? 1 : THREE.MathUtils.smoothstep(virado, 0.15, 0.5);

      if (opac > 0.05) {
        _s.copy(_p).project(camera);
        const x = ((_s.x + 1) / 2) * size.width;
        const y = ((1 - _s.y) / 2) * size.height;
        const comNome = mostrarNomes || eAtivo;
        const caixa: Caixa = comNome
          ? { x0: x - 14, y0: y - 58, x1: x + 62 + parte.nome.length * 7, y1: y + 14 }
          : { x0: x - 16, y0: y - 16, x1: x + 16, y1: y + 16 };
        if (!eAtivo && ocupadas.some((o) => sobrepoe(o, caixa))) opac = 0;
        else ocupadas.push(caixa);
      }

      el.style.opacity = opac.toFixed(2);
      el.style.pointerEvents = opac > 0.3 ? "auto" : "none";
    }
  });

  return (
    <>
      {ITENS.map(({ parte, numero }, k) => (
        <group key={parte.id} ref={(g) => void (grupos.current[k] = g)} position={parte.marcador!.ponto}>
          <Html zIndexRange={[parte.id === ativo ? 40 : 30, 0]} style={{ pointerEvents: "none" }}>
            <div ref={(el) => void (els.current[k] = el)} className="group relative h-0 w-0 transition-opacity duration-300">
              <Ponto
                parte={parte}
                numero={numero}
                ativo={parte.id === ativo}
                mostrarNome={mostrarNomes || parte.id === ativo}
                onSelecionar={onSelecionar}
              />
            </div>
          </Html>
        </group>
      ))}
    </>
  );
}

type PontoProps = {
  parte: Parte;
  numero: number;
  ativo: boolean;
  mostrarNome: boolean;
  onSelecionar: (id: string) => void;
};

function Ponto({ parte, numero, ativo, mostrarNome, onSelecionar }: PontoProps) {
  return (
    <>
      <button
        onClick={() => onSelecionar(parte.id)}
        aria-label={parte.nome}
        className={`absolute -left-3 -top-3 flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-semibold tabular-nums backdrop-blur transition ${
          ativo
            ? "scale-110 border-white bg-sangue text-white shadow-[0_0_0_6px_rgba(229,72,59,0.25)]"
            : "border-white/60 bg-black/55 text-white hover:border-white hover:bg-sangue"
        }`}
      >
        {numero}
        {ativo && <span className="absolute inset-0 animate-ping rounded-full bg-sangue/40" />}
      </button>

      {/* Seta: linha diagonal do ponto até o nome */}
      <div
        className={`pointer-events-none absolute left-0 top-0 transition-opacity duration-200 ${
          mostrarNome ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        <svg className="absolute left-0 top-[-34px] overflow-visible" width="40" height="34">
          <line x1="3" y1="31" x2="34" y2="2" stroke="rgba(255,255,255,0.75)" strokeWidth="1" />
          <line x1="34" y1="2" x2="46" y2="2" stroke="rgba(255,255,255,0.75)" strokeWidth="1" />
        </svg>
        <span
          className={`absolute left-[48px] top-[-44px] whitespace-nowrap rounded-full border px-3 py-1 text-xs backdrop-blur ${
            ativo ? "border-sangue/70 bg-black/75 text-white" : "border-white/15 bg-black/65 text-carne"
          }`}
        >
          {parte.nome}
        </span>
      </div>
    </>
  );
}
