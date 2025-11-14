import { useEffect, useMemo, useRef, useState } from "react";
import { Github, Languages, RefreshCw, Sparkles, ArrowRight } from "lucide-react";

function TerminalDemo() {
  const lines = useMemo(
    () => [
      "$ npx lingo-i18n translate",
      "🔗 Connecting to GitHub...",
      "📦 Scanning repo for i18n keys...",
      "🌐 Target languages: es, fr, de, ja",
      "⚙️ Building translation memory...",
      "🤖 Translating 124 keys...",
      "🧩 Context-aware suggestions applied",
      "🔁 Auto-sync enabled with GitHub App",
      "✅ Done in 58.3s — changes pushed"
    ],
    []
  );

  const [typedText, setTypedText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const typeSpeed = 18; // ms per char
    const pauseBetweenLines = 500; // ms

    const tick = () => {
      const currentLine = lines[lineIndex] || "";
      if (charIndex < currentLine.length) {
        setTypedText((prev) => prev + currentLine[charIndex]);
        setCharIndex((c) => c + 1);
      } else {
        // line done
        setTimeout(() => {
          setTypedText((prev) => prev + "\n");
          setLineIndex((i) => (i + 1) % lines.length);
          setCharIndex(0);
        }, pauseBetweenLines);
      }
    };

    const id = setInterval(tick, typeSpeed);
    return () => clearInterval(id);
  }, [charIndex, lineIndex, lines]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [typedText]);

  return (
    <div className="w-full max-w-3xl rounded-xl border border-white/10 bg-neutral-900/60 shadow-2xl backdrop-blur-sm">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <div className="ml-3 text-xs text-neutral-400">bash • lingo-i18n</div>
      </div>
      <pre
        ref={containerRef}
        className="h-56 overflow-hidden whitespace-pre-wrap px-4 py-3 font-mono text-sm leading-relaxed text-neutral-200"
      >
        {typedText}
        <span className="ml-0.5 inline-block h-4 w-2 animate-pulse rounded-sm bg-purple-400/80 align-middle" />
      </pre>
    </div>
  );
}

function Step({ icon: Icon, title, desc }) {
  return (
    <div className="group rounded-xl border border-white/10 bg-neutral-900/50 p-5 transition-all duration-200 hover:border-white/20">
      <div className="mb-3 inline-flex rounded-lg bg-purple-500/10 p-2 text-purple-400 ring-1 ring-inset ring-purple-500/20">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mb-1 text-base font-semibold text-white">{title}</h3>
      <p className="text-sm text-neutral-400">{desc}</p>
    </div>
  );
}

function Feature({ title, desc }) {
  return (
    <div className="rounded-xl border border-white/10 bg-neutral-900/40 p-5 transition-colors hover:border-white/20">
      <h4 className="mb-1.5 text-sm font-semibold text-white">{title}</h4>
      <p className="text-sm text-neutral-400">{desc}</p>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200">
      {/* Hero */}
      <section className="relative isolate px-6 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(600px_200px_at_50%_-20%,rgba(168,85,247,0.25),transparent)]" />
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-neutral-900/60 px-3 py-1 text-xs text-neutral-300">
              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
              Lingo i18n Translator
            </div>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Translate Your GitHub Repo in 60 Seconds
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-neutral-400">
              AI-powered i18n translation that syncs automatically
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <a
                href="#"
                className="group inline-flex items-center gap-2 rounded-lg bg-purple-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-purple-500/25 transition hover:bg-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/60"
              >
                <Github className="h-4 w-4" /> Install GitHub App
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <TerminalDemo />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-10">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3">
          <Step
            icon={Github}
            title="Connect GitHub"
            desc="Install the app and grant access to your repo."
          />
          <Step
            icon={Languages}
            title="Select Languages"
            desc="Pick targets like es, fr, de, ja — we handle the rest."
          />
          <Step
            icon={RefreshCw}
            title="Auto-Syncs"
            desc="Changes are translated and committed automatically."
          />
        </div>
      </section>

      {/* Key features */}
      <section className="px-6 py-6">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Feature title="Translation Memory" desc="Learns from your repo and improves over time." />
          <Feature title="Context-Aware" desc="Understands keys and usage for accurate strings." />
          <Feature title="Auto-Sync" desc="Keeps locales up to date with every commit." />
          <Feature title="Free & Open Source" desc="Transparent, extensible, and community-driven." />
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-gradient-to-br from-neutral-900/70 to-neutral-900/30 p-8 text-center">
          <h3 className="text-2xl font-semibold text-white">Ready to go global?</h3>
          <p className="mt-2 text-neutral-400">Install the app and start translating in under a minute.</p>
          <div className="mt-5">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-lg bg-purple-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-purple-500/25 transition hover:bg-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/60"
            >
              <Github className="h-4 w-4" /> Install GitHub App
            </a>
          </div>
        </div>
      </section>

      <footer className="px-6 pb-12 text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} Lingo i18n Translator • MIT Licensed
      </footer>
    </div>
  );
}
