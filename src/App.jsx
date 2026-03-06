import { Suspense, lazy, useState, useEffect } from "react";
import "./App.css";

const Spline = lazy(() => import("@splinetool/react-spline"));

/* ── PRELOADER ── */
function Preloader({ onFinish }) {
  const [percent, setPercent] = useState(0);
  const [phase, setPhase] = useState("loading");

  useEffect(() => {
    let raf, start = null;
    const dur = 2400;
    function tick(ts) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const v = Math.round((1 - Math.pow(1 - p, 4)) * 99);
      setPercent(v);
      if (v < 99) { raf = requestAnimationFrame(tick); }
      else {
        setPhase("paused");
        setTimeout(() => { setPercent(100); setPhase("done"); setTimeout(onFinish, 600); }, 1000);
      }
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onFinish]);

  return (
    <div className={`pre ${phase === "done" ? "pre--exit" : ""}`}>
      <div className="pre-inner">
        <span className="pre-num mono">{percent}</span>
        <div className="pre-track">
          <div
            className={`pre-bar${phase === "paused" ? " pre-bar--p" : ""}`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── APP ── */
export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onFinish={() => setLoading(false)} />}

      <div className={`page ${loading ? "page--h" : "page--v"}`}>

        {/* NAV */}
        <nav className="nav">
          <a href="/" className="nav-logo"><span className="nav-dot" /> Nova<span className="dim">AI</span></a>
          <div className="nav-mid">
            <a href="#features">Features</a>
            <a href="#process">Process</a>
            <a href="#numbers">Numbers</a>
          </div>
          <button className="nav-btn">Get Started <span className="arrow">&rarr;</span></button>
        </nav>

        {/* HERO */}
        <section className="hero">
          <div className="hero-glow" />
          <div className="hero-glow2" />
          <div className="spline-wrap">
            <Suspense fallback={<div className="sp-load"><div className="sp-ring" /></div>}>
              <Spline scene="https://prod.spline.design/HBvaQ6FtX2s5oXN0/scene.splinecode" />
            </Suspense>
          </div>

          <aside className="side">
            <div className="side-line" />
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 5.89C21.26 6.21 20.46 6.42 19.64 6.53C20.49 6.03 21.14 5.24 21.44 4.3C20.65 4.77 19.77 5.09 18.84 5.28C18.09 4.49 17.02 4 15.85 4C13.58 4 11.75 5.81 11.75 8.04C11.75 8.36 11.78 8.67 11.84 8.96C8.44 8.79 5.42 7.19 3.39 4.74C3.04 5.34 2.83 6.03 2.83 6.78C2.83 8.18 3.56 9.42 4.65 10.13C3.99 10.12 3.34 9.93 2.8 9.63V9.67C2.8 11.63 4.22 13.26 6.08 13.64C5.75 13.73 5.38 13.77 5 13.77C4.74 13.77 4.47 13.76 4.22 13.7C4.75 15.3 6.26 16.48 8.05 16.51C6.66 17.59 4.88 18.23 2.97 18.23C2.63 18.23 2.31 18.21 1.99 18.17C3.82 19.34 5.97 20 8.29 20C15.84 20 19.96 13.85 19.96 8.51C19.96 8.33 19.95 8.16 19.94 7.99C20.76 7.42 21.44 6.71 22 5.89Z" /></svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
            </a>
          </aside>

          <div className="hero-c">
            <div className="pill"><span className="pill-dot" /> Next-Gen AI Platform</div>
            <h1>Build the <span className="glow-text">future</span> with artificial intelligence</h1>
            <p className="hero-sub">Harness advanced AI to automate workflows, generate insights, and ship products faster than ever.</p>
            <div className="hero-btns">
              <button className="btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                Start Building
              </button>
              <button className="btn btn--ghost">Watch Demo <span className="arrow">&rsaquo;</span></button>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="marquee">
          <div className="marquee-track">
            {[..."Google · OpenAI · Stripe · Vercel · Linear · Figma · Notion · Supabase · "].map((ch, i) => (
              <span key={i}>{ch}</span>
            ))}
            {[..."Google · OpenAI · Stripe · Vercel · Linear · Figma · Notion · Supabase · "].map((ch, i) => (
              <span key={`d-${i}`}>{ch}</span>
            ))}
          </div>
        </div>

        {/* BENTO FEATURES */}
        <section className="bento" id="features">
          <div className="bento-head">
            <span className="tag">Features</span>
            <h2>Built different.</h2>
          </div>
          <div className="bento-grid">
            <div className="b-card b-card--big">
              <div className="b-card-num">01</div>
              <h3>Neural Engine</h3>
              <p>State-of-the-art language models with context-aware reasoning. Millions of tokens per second.</p>
              <div className="b-card-glow" />
            </div>
            <div className="b-card">
              <div className="b-card-num">02</div>
              <h3>50ms Latency</h3>
              <p>Globally distributed inference for real-time applications.</p>
            </div>
            <div className="b-card">
              <div className="b-card-num">03</div>
              <h3>Dev-First APIs</h3>
              <p>SDKs for every language. Ship AI features in minutes, not months.</p>
            </div>
            <div className="b-card b-card--wide">
              <div className="b-card-num">04</div>
              <h3>Enterprise-grade security</h3>
              <p>SOC 2 compliant, E2E encryption, full data isolation. Your data never trains our models.</p>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="process" id="process">
          <div className="process-head">
            <span className="tag">Process</span>
            <h2>Idea to prod in&nbsp;3&nbsp;steps</h2>
          </div>
          <div className="process-row">
            <div className="p-step">
              <span className="p-num">01</span>
              <div className="p-line" />
              <h3>Connect</h3>
              <p>One API key. One line of code. Any stack.</p>
            </div>
            <div className="p-step">
              <span className="p-num">02</span>
              <div className="p-line" />
              <h3>Build</h3>
              <p>Text, vision, code — pick a model, fine-tune it.</p>
            </div>
            <div className="p-step">
              <span className="p-num">03</span>
              <div className="p-line" />
              <h3>Scale</h3>
              <p>Auto-scaling infra. Pay per token. Global edge.</p>
            </div>
          </div>
        </section>

        {/* NUMBERS */}
        <section className="numbers" id="numbers">
          <div className="num-row">
            <div className="num"><span className="num-val">2M+</span><span className="dim">Developers</span></div>
            <div className="num-sep" />
            <div className="num"><span className="num-val">10B</span><span className="dim">API calls / day</span></div>
            <div className="num-sep" />
            <div className="num"><span className="num-val">&lt;50ms</span><span className="dim">Avg latency</span></div>
            <div className="num-sep" />
            <div className="num"><span className="num-val">99.99%</span><span className="dim">Uptime SLA</span></div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta">
          <div className="cta-glow" />
          <h2>Ready to build<br />something <span className="glow-text">extraordinary</span>?</h2>
          <p className="dim">Join 2M+ developers. No credit card required.</p>
          <button className="btn btn--lg">Start Building Free <span className="arrow">&rarr;</span></button>
        </section>

        {/* FOOTER */}
        <footer className="foot">
          <div className="foot-top">
            <div className="foot-brand"><span className="nav-dot" /> Nova AI</div>
            <div className="foot-links">
              <a href="/">Docs</a><a href="/">Pricing</a><a href="/">Blog</a><a href="/">Status</a>
            </div>
          </div>
          <div className="foot-bot"><span className="dim">&copy; 2025 Nova AI</span></div>
        </footer>

      </div>
    </>
  );
}
