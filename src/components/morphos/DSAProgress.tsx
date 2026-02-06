"use client";

export function DSAProgress(props: {
    target?: number;
    solved?: number;
    focusTopics?: string[];
    next?: string[];
}) {
    const target = props.target ?? 150;
    const solved = props.solved ?? 0;
    const pct = Math.max(0, Math.min(100, Math.round((solved / target) * 100)));

    return (
        <div className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 shadow-none">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">DSA Progress</h2>
                <div className="text-xs text-white/50">
                    {solved}/{target} ({pct}%)
                </div>
            </div>

            <div className="h-2.5 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.4)]"
                    style={{ width: `${pct}%` }}
                />
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-bold text-white/60 mb-3 uppercase tracking-wider">
                        Focus topics
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {(props.focusTopics ?? []).length === 0 ? (
                            <span className="text-sm text-white/40 italic">Not set</span>
                        ) : (
                            props.focusTopics!.map((t) => (
                                <span
                                    key={t}
                                    className="rounded-full bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 text-xs text-emerald-300 font-medium"
                                >
                                    {t}
                                </span>
                            ))
                        )}
                    </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-bold text-white/60 mb-3 uppercase tracking-wider">
                        Next actions
                    </div>
                    <ul className="space-y-2 text-sm text-white">
                        {(props.next ?? []).length === 0 ? (
                            <li className="text-white/40 italic">No next steps yet</li>
                        ) : (
                            props.next!.map((n, i) => (
                                <li key={i} className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                                    {n}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
