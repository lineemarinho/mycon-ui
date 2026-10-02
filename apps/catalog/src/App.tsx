import { useEffect, useMemo, useRef, useState } from "react";
import { Logo } from "mycon-ui";
import { navGroups, sections, type SectionContent } from "./content";
import { demos } from "./demos";

function CopyButton({ getText }: { getText: () => string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className="copy-btn"
      onClick={() => {
        navigator.clipboard?.writeText(getText()).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 1400);
      }}
    >
      {copied ? "Copiado!" : "Copiar"}
    </button>
  );
}

function CodeBlock({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className="code-block">
      <CopyButton getText={() => ref.current?.innerText.trim() ?? ""} />
      {/* O HTML vem do conteúdo versionado do catálogo (src/content.ts), não de entrada do usuário. */}
      <div ref={ref} className="code-content" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

function Section({ content }: { content: SectionContent }) {
  const Demo = demos[content.id];
  return (
    <section className="component" id={content.id} data-name={content.id}>
      <div className="component-head">
        <h2>{content.title}</h2>
        <span className="category-tag">{content.category}</span>
      </div>

      <div className="preview">{Demo ? <Demo /> : null}</div>

      {content.props.length > 0 && (
        <div className="table-scroll">
          <table className="props">
            <thead>
              <tr>
                <th>Prop</th>
                <th>Tipo</th>
                <th>Default</th>
              </tr>
            </thead>
            <tbody>
              {content.props.map((prop) => (
                <tr key={prop.name}>
                  <td className="prop-name">
                    {prop.name}
                    {prop.required && <span className="required-mark">*</span>}
                  </td>
                  <td className="prop-type">{prop.type}</td>
                  <td className="prop-default">{prop.default}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {content.codeHtml && <CodeBlock html={content.codeHtml} />}
    </section>
  );
}

const INSTALL = "npm install mycon-ui @mui/material@^6 @mui/icons-material@^6 @emotion/react @emotion/styled";
const SETUP = `<span class="tag">import</span> { ThemeProvider } <span class="tag">from</span> <span class="str">"@mui/material/styles"</span>;
<span class="tag">import</span> CssBaseline <span class="tag">from</span> <span class="str">"@mui/material/CssBaseline"</span>;
<span class="tag">import</span> { myconTheme } <span class="tag">from</span> <span class="str">"mycon-ui"</span>;

<span class="tag">&lt;ThemeProvider</span> <span class="attr">theme</span>={myconTheme}&gt;
  <span class="tag">&lt;CssBaseline /&gt;</span>
  <span class="tag">&lt;App /&gt;</span>
<span class="tag">&lt;/ThemeProvider&gt;</span>`;
const USAGE = `<span class="tag">import</span> { Button, Input } <span class="tag">from</span> <span class="str">"mycon-ui"</span>;

<span class="tag">&lt;Button</span> <span class="attr">variant</span>=<span class="str">"secondary"</span> <span class="attr">tone</span>=<span class="str">"success"</span>&gt;
  Confirmar
<span class="tag">&lt;/Button&gt;</span>`;

export default function App() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const order = useMemo(() => navGroups.flatMap((group) => group.items.map((item) => item.id)), []);

  // "/" foca a busca, como no catálogo original.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "/" && document.activeElement !== searchRef.current) {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Destaca no menu a seção visível.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    order.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [order]);

  const q = query.trim().toLowerCase();

  return (
    <div className="shell">
      <div className="topbar">
        <div className="wordmark-logo">
          <Logo height={26} />
        </div>
        <div className="search-wrap">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            id="search"
            ref={searchRef}
            type="text"
            placeholder="Buscar componente..."
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <span className="kbd-hint">/</span>
        </div>
        <img className="wordmark-logo-right" src={`${import.meta.env.BASE_URL}flow-logo.png`} alt="Flow Time" />
      </div>

      <div className="layout">
        <nav className="sidebar" id="sidebar" aria-label="Componentes">
          {navGroups.map((group) => {
            const items = group.items.filter((item) => !q || item.id.includes(q) || item.name.toLowerCase().includes(q));
            if (items.length === 0) return null;
            return (
              <div className="nav-group" data-group={group.id} key={group.id}>
                <div className="nav-group-title">{group.title}</div>
                {items.map((item) => (
                  <a
                    key={item.id}
                    className={`nav-link${active === item.id ? " active" : ""}`}
                    data-name={item.id}
                    href={`#${item.id}`}
                  >
                    <span className="nav-dot" style={{ background: `var(--${item.dot})` }} />
                    {item.name}
                  </a>
                ))}
              </div>
            );
          })}
        </nav>

        <main id="main">
          <div className="intro">
            <div className="eyebrow">Dicionário de componentes</div>
            <h1>mycon-ui</h1>
            <p>
              Design system compartilhado do backoffice Mycon, publicado no npm. Tudo o que aparece aqui são os
              componentes reais do pacote.
            </p>
          </div>

          <div className="intro-install">
            <h3>Instalação</h3>
            <p>1. Instale o pacote e suas peer dependencies:</p>
            <CodeBlock html={INSTALL} />
            <p>2. Envolva o app com o tema (as fontes já vêm no pacote):</p>
            <CodeBlock html={SETUP} />
            <p>3. Importe os componentes direto do pacote:</p>
            <CodeBlock html={USAGE} />
          </div>

          {order.map((id) => (
            <Section key={id} content={sections[id]} />
          ))}
        </main>
      </div>
    </div>
  );
}
