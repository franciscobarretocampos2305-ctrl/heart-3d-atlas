"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { CONFIG } from "@/data/config";
import { Marcadores } from "./Marcadores";
import { pulso, relogio } from "@/lib/batimento";

export type InfoModelo = {
  grupo: THREE.Group;
};

export type PontoMarcado = {
  ponto: [number, number, number];
  direcao: [number, number, number];
};

type Props = {
  ativo: string;
  mostrarNomes: boolean;
  modoMarcar: boolean;
  onSelecionar: (id: string) => void;
  onPronto: (info: InfoModelo) => void;
  onMarcar: (p: PontoMarcado) => void;
};

function paraFisico(src: THREE.Material): THREE.MeshPhysicalMaterial {
  const r = CONFIG.realismo;
  const m = new THREE.MeshPhysicalMaterial({ roughness: r.roughness, metalness: 0 });
  const s = src as THREE.MeshStandardMaterial;
  if (s.color) m.color.copy(s.color);
  m.map = s.map ?? null;
  m.normalMap = s.normalMap ?? null;
  m.side = s.side;
  m.clearcoat = r.clearcoat;
  m.clearcoatRoughness = r.clearcoatRoughness;
  m.sheen = r.sheen;
  m.sheenColor = new THREE.Color(r.sheenColor);
  m.sheenRoughness = 0.6;
  return m;
}

const arred = (v: THREE.Vector3) => v.toArray().map((n) => Math.round(n * 1000) / 1000) as [number, number, number];

export function HeartModel({ ativo, mostrarNomes, modoMarcar, onSelecionar, onPronto, onMarcar }: Props) {
  const { scene } = useGLTF(CONFIG.modelo.url);
  const batida = useRef<THREE.Group>(null);
  const grupo = useRef<THREE.Group>(null);
  const prontoRef = useRef(onPronto);
  prontoRef.current = onPronto;

  useMemo(() => {
    scene.traverse((o) => {
      const malha = o as THREE.Mesh;
      if (!malha.isMesh || malha.userData.convertido) return;
      malha.material = Array.isArray(malha.material) ? malha.material.map(paraFisico) : paraFisico(malha.material);
      malha.userData.convertido = true;
    });
  }, [scene]);

  useEffect(() => {
    if (grupo.current) prontoRef.current({ grupo: grupo.current });
  }, [scene]);

  useFrame(() => {
    if (!batida.current) return;
    const p = CONFIG.batimento.ativo ? pulso(relogio()) : 0;
    batida.current.scale.setScalar(1 + CONFIG.batimento.intensidade * p);
  });

  // ?marcar
  const aoClicar = (e: ThreeEvent<MouseEvent>) => {
    if (!modoMarcar || e.delta > 4 || !grupo.current) return;
    e.stopPropagation();
    const g = grupo.current;
    const ponto = g.worldToLocal(e.point.clone());
    const cam = g.worldToLocal(e.camera.position.clone());
    onMarcar({ ponto: arred(ponto), direcao: arred(cam.sub(ponto).normalize()) });
  };

  return (
    <group ref={batida}>
      <group ref={grupo}>
        <primitive object={scene} onClick={modoMarcar ? aoClicar : undefined} />
        <Marcadores ativo={ativo} mostrarNomes={mostrarNomes} onSelecionar={onSelecionar} />
      </group>
    </group>
  );
}

useGLTF.preload(CONFIG.modelo.url);
