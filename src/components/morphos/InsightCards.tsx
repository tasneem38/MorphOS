"use client";

export function InsightCards(props: {
    title?: string;
    insights: { headline: string; detail: string; severity?: "info" | "warning" | "critical" }[];
}) {
    const title = props.title ?? "Insights";
    const insights = props.insights ?? [];

    return (
        <div className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 shadow-none">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">{title}</h2>
                <div className="text-xs text-white/50">{insights.length} items</div>
            </div>

            <div className="space-y-3">
                {insights.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-white/15 bg-white/5 p-4 text-sm text-white/55">
                        No insights yet
                    </div>
                ) : (
                    insights.map((i, idx) => (
                        <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-4">
                            <div className="flex items-start justify-between gap-3">
                                <div className="text-sm font-semibold text-white/95">{i.headline}</div>
                                <span className={`rounded-full border px-2 py-0.5 text-[11px] capitalize ${i.severity === 'critical' ? 'border-red-400/30 text-red-200 bg-red-400/10' :
                                    i.severity === 'warning' ? 'border-yellow-400/30 text-yellow-200 bg-yellow-400/10' :
                                        'border-blue-400/30 text-blue-200 bg-blue-400/10'
                                    }`}>
                                    {i.severity ?? "info"}
                                </span>
                            </div>
                            <p className="mt-2 text-sm text-white leading-relaxed">{i.detail}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
