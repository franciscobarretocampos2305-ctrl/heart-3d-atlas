"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CameraControls, Environment, Lightformer, Loader } from "@react-three/drei";
import { Bloom, EffectComposer, N8AO, ToneMapping, Vignette } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import * as THREE from "three";
import { HeartModel, type InfoModelo, type PontoMarcado } from "./HeartModel";
import { PARTES } from "@/data/partes";
import { CONFIG } from "@/data/config";
import { volumePorDistancia } from "@/lib/som";

type Props = {
  ativo: string;
  mostrarNomes: boolean;
  modoMarcar: boolean;
  onSelecionar: (id: string) => void;
  onMarcar: (p: PontoMarcado) => void;
};

/** Leva a câmera até o marcador da parte ativa. Zoom e rotação continuam livres. */
function Camera({ ativo, info }: { ativo: string; info: InfoModelo | null }) {
  const ref = useRef<CameraControls>(null);
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;

  useEffect(() => {
    const c = ref.current;
    if (!c || !info) return;
    const g = info.grupo;
    g.updateWorldMatrix(true, true);
    const m = PARTES.find((p) => p.id === ativo)?.marcador;

    let alvo: THREE.Vector3;
    let dir: THREE.Vector3;
    let dist: number;

    if (m) {
      const escala = g.getWorldScale(new THREE.Vector3()).x;
      alvo = g.localToWorld(new THREE.Vector3(...m.ponto));
      dir = new THREE.Vector3(...m.direcao).transformDirection(g.matrixWorld);
      dist = m.distancia * escala;
    } else {
      // Enquadra pela altura e largura reais do coração, deixando uma margem pequena.
      const caixa = new THREE.Box3().setFromObject(g);
      const tam = caixa.getSize(new THREE.Vector3());
      alvo = caixa.getCenter(new THREE.Vector3());
      dir = new THREE.Vector3(...CONFIG.visaoGeral).normalize();
      const meioV = THREE.MathUtils.degToRad(camera.fov) / 2;
      const meioH = Math.atan(Math.tan(meioV) * camera.aspect);
      const margem = 1.12;
      dist =
        Math.max(tam.y / 2 / Math.tan(meioV), tam.x / 2 / Math.tan(meioH)) * margem + tam.z / 2;
    }

    const pos = alvo.clone().addScaledVector(dir, dist);
    c.setLookAt(pos.x, pos.y, pos.z, alvo.x, alvo.y, alvo.z, true);
  }, [ativo, info, camera]);

  return <CameraControls ref={ref} makeDefault smoothTime={0.6} minDistance={0.3} maxDistance={9} dollyToCursor />;
}

/** Quanto mais zoom, mais alto o som do batimento. */
function VolumePorDistancia() {
  useFrame(({ camera }) => volumePorDistancia(camera.position.length()));
  return null;
}

/** Estúdio de luz feito com painéis virtuais: realista e sem baixar HDRI. */
function Iluminacao() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} color="#fff1ea" />
      <directionalLight position={[-4, 2, -3]} intensity={0.5} color="#ffd0c4" />
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3.2} position={[2.5, 3, 4]} scale={[5, 2.5, 1]} color="#fff4ee" />
        <Lightformer form="rect" intensity={1.4} position={[-5, 1, 2]} scale={[3, 4, 1]} color="#ffd8cf" />
        <Lightformer form="ring" intensity={2.4} position={[0, 1, -6]} scale={4} color="#ff5a45" />
        <Lightformer form="rect" intensity={0.5} position={[0, -5, 1]} scale={[8, 8, 1]} color="#ffffff" />
      </Environment>
    </>
  );
}

export default function HeartViewer({ ativo, mostrarNomes, modoMarcar, onSelecionar, onMarcar }: Props) {
  const [info, setInfo] = useState<InfoModelo | null>(null);

  return (
    <>
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 32, position: [0, 0.6, 7], near: 0.01, far: 100 }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#0b0708"]} />
        <Iluminacao />
        <Suspense fallback={null}>
          <HeartModel
            ativo={ativo}
            mostrarNomes={mostrarNomes}
            modoMarcar={modoMarcar}
            onSelecionar={onSelecionar}
            onPronto={setInfo}
            onMarcar={onMarcar}
          />
        </Suspense>
        <Camera ativo={ativo} info={info} />
        <VolumePorDistancia />
        <EffectComposer multisampling={4}>
          <N8AO aoRadius={0.15} intensity={2.4} distanceFalloff={0.6} halfRes />
          <Bloom mipmapBlur luminanceThreshold={0.85} intensity={0.3} />
          <Vignette offset={0.25} darkness={0.7} />
          <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        </EffectComposer>
      </Canvas>
      <Loader
        containerStyles={{ background: "#0b0708" }}
        barStyles={{ background: "#e5483b" }}
        dataInterpolation={(p) => `Carregando coração ${p.toFixed(0)}%`}
      />
    </>
  );
}
