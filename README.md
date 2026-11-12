# Coração humano: atlas 3D interativo

Atlas 3D do coração humano que segue o caminho do sangue. Ao rolar a página, a câmera passa por 18 estruturas, e cada uma tem explicação de função, anatomia, problemas de saúde e uma curiosidade.

**▶ Ver demo:** `https://franciscobarretocampos2305-ctrl.github.io/heart-3d-atlas/` *(troque pelo seu link depois de publicar)*

<!-- Coloque aqui um print ou GIF do site: arraste a imagem para este arquivo no GitHub. -->

## Recursos

- Modelo 3D de alta resolução (~1 milhão de triângulos) cortado para mostrar o interior
- Tour guiado pelo scroll: veias cavas → átrios → valvas → ventrículos → aorta → coronárias
- Marcadores numerados com nomes em português; clique para dar zoom
- Batimento animado com som sincronizado (gerado por código, sem arquivo de áudio)
- Funciona no computador e no celular

## Tecnologias

Next.js · React Three Fiber · three.js · Tailwind CSS · Web Audio API · GitHub Pages

## Rodar no computador

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie esta pasta usando o **GitHub Desktop**. O upload pelo navegador não aceita o modelo 3D, que passa de 25 MB.
2. No repositório, vá em **Settings → Pages** e, em **Source**, escolha **GitHub Actions**.
3. Pronto: a cada envio, o GitHub publica sozinho (aba **Actions**). O link fica em `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.

## Ajustes

| O que | Onde |
|---|---|
| Textos de cada estrutura | `data/partes.ts` |
| Brilho, batimento (bpm) | `data/config.ts` |
| Som do batimento | `lib/som.ts` |
| Posição dos marcadores | abra o site com `?marcar` no fim do endereço, clique na estrutura e copie a linha gerada |

## Créditos

Modelo 3D: “Open Heart model”, de Dr. Alex Cheroske, licença [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) (Sketchfab). Uso não comercial.

Projeto educacional. Os textos têm caráter didático e não substituem orientação médica.
