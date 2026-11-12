import type { Parte } from "@/data/partes";

type Props = { parte: Parte; indice: number; ativa: boolean; total: number };

const BLOCOS = [
  { chave: "funcao", titulo: "Função", borda: "border-sangue/70", texto: "" },
  { chave: "estrutura", titulo: "Como é", borda: "border-white/25", texto: "" },
  { chave: "saude", titulo: "Quando algo dá errado", borda: "border-amber-400/50", texto: "text-carne/85" },
  { chave: "curiosidade", titulo: "Curiosidade", borda: "border-white/15", texto: "text-carne/80" },
] as const;

export function Secao({ parte, indice, ativa, total }: Props) {
  const primeira = indice === 0;
  const Titulo = primeira ? "h1" : "h2";

  return (
    <section
      id={`parte-${parte.id}`}
      className="flex min-h-[75svh] items-center px-6 py-14 lg:min-h-screen lg:px-14"
    >
      <article className={`max-w-md transition-opacity duration-500 ${ativa ? "opacity-100" : "opacity-30"}`}>
        <div className="mb-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted">
          <span className="tabular-nums text-sangue">
            {String(indice + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <span className="h-px w-8 bg-white/20" />
          <span>{parte.categoria}</span>
        </div>

        <Titulo
          className={`font-display leading-[1.02] tracking-tight ${
            primeira ? "text-5xl lg:text-7xl" : "text-4xl lg:text-5xl"
          }`}
        >
          {parte.nome}
        </Titulo>

        <p className="mt-6 text-base leading-relaxed text-carne/85 lg:text-lg">{parte.resumo}</p>

        <dl className="mt-8 space-y-5 text-[15px]">
          {BLOCOS.map((b) => (
            <div key={b.chave} className={`border-l-2 pl-4 ${b.borda}`}>
              <dt className="text-[11px] uppercase tracking-[0.2em] text-muted">{b.titulo}</dt>
              <dd className={`mt-1.5 leading-relaxed ${b.texto}`}>{parte[b.chave]}</dd>
            </div>
          ))}
        </dl>

        {primeira && (
          <p className="mt-12 animate-pulse text-sm text-muted">Role para seguir o caminho do sangue ↓</p>
        )}
      </article>
    </section>
  );
}
