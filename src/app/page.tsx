import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070A12] text-white">
      {/* Background: gradient + glow blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-emerald-400/25 blur-3xl" />
        <div className="absolute -bottom-56 -left-40 h-[520px] w-[520px] rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute -bottom-56 -right-40 h-[520px] w-[520px] rounded-full bg-fuchsia-400/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.12),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.10),transparent_55%)]" />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:60px_60px]" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-16">
        <div className="w-full">
          {/* Top badge */}
          <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Generative UI • Interactable Components • MCP
          </div>

          {/* Hero */}
          <div className="mx-auto mt-10 max-w-3xl text-center">
            <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-6xl">
              <span className="bg-gradient-to-r from-emerald-300 via-cyan-200 to-fuchsia-200 bg-clip-text text-transparent">
                MorphOS
              </span>
            </h1>

            <p className="mt-5 text-balance text-lg text-white/75 sm:text-xl">
              You don’t click through screens.
              <br className="hidden sm:block" />
              You express intent — and the interface <span className="text-white">materializes</span>.
            </p>

            <p className="mt-4 text-sm text-white/55">
              It’s not a chatbot. It’s an interface engine that <span className="text-white/80">generates</span> and{" "}
              <span className="text-white/80">updates</span> UI in place.
            </p>

            {/* CTA row */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/chat"
                className="group inline-flex items-center justify-center rounded-2xl bg-white px-7 py-4 text-base font-semibold text-black shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_20px_80px_-30px_rgba(16,185,129,0.65)] transition hover:translate-y-[-1px] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.45),0_25px_90px_-35px_rgba(16,185,129,0.75)]"
              >
                Enter MorphOS
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Link>

              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-left text-sm text-white/70 backdrop-blur">
                <div className="text-white/85">Try this inside:</div>
                <div className="mt-1 font-mono text-xs text-white/60">
                  “Plan my week” • “SDE prep” • “Analyze metrics”
                </div>
              </div>
            </div>
          </div>

          {/* Mode cards */}
          <div className="mx-auto mt-14 grid max-w-5xl gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="text-sm text-white/60">Mode 01</div>
                <div className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs text-emerald-200">
                  Productivity
                </div>
              </div>
              <div className="mt-4 text-lg font-semibold">TaskBoard</div>
              <p className="mt-2 text-sm text-white/65">
                Generate a plan instantly, then update it in place:
                move tasks, change priorities, add new work — without rebuilding UI.
              </p>
              <div className="mt-4 text-xs text-white/45">
                Interactable UI • Stateful updates
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="text-sm text-white/60">Mode 02</div>
                <div className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs text-cyan-200">
                  Learning
                </div>
              </div>
              <div className="mt-4 text-lg font-semibold">DSAProgress</div>
              <p className="mt-2 text-sm text-white/65">
                Turn interview prep into a live dashboard. Update solved count, focus topics,
                and next actions as you progress.
              </p>
              <div className="mt-4 text-xs text-white/45">
                Interactable UI • Guided workflows
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <div className="text-sm text-white/60">Mode 03</div>
                <div className="rounded-full bg-fuchsia-400/15 px-3 py-1 text-xs text-fuchsia-200">
                  Analytics
                </div>
              </div>
              <div className="mt-4 text-lg font-semibold">KPIGrid + Insights</div>
              <p className="mt-2 text-sm text-white/65">
                Get KPIs and risk insights tailored to context.
                The UI chooses what to render — charts, cards, warnings — automatically.
              </p>
              <div className="mt-4 text-xs text-white/45">
                Generative UI • Context-aware rendering
              </div>
            </div>
          </div>

          {/* Footer line */}
          <div className="mx-auto mt-12 max-w-3xl text-center text-xs text-white/40">
            Built with Tambo Generative UI + MCP. Designed for demos. Ready for judges.
          </div>
        </div>
      </div>
    </div>
  );
}
