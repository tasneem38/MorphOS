"use client";

export function InsightCards(props: {
    title?: string;
    insights: { headline: string; detail: string; severity?: "info" | "warning" | "critical" }[];
}) {
    const title = props.title ?? "Insights";
    const insights = props.insights ?? [];

    return (
        <div className="w-full rounded-2xl border bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold">{title}</h2>
                <div className="text-xs text-slate-500">{insights.length} items</div>
            </div>

            <div className="space-y-2">
                {insights.length === 0 ? (
                    <div className="rounded-xl border border-dashed bg-white p-4 text-sm text-slate-500">
                        No insights yet
                    </div>
                ) : (
                    insights.map((i, idx) => (
                        <div key={idx} className="rounded-xl bg-slate-50 p-3">
                            <div className="flex items-start justify-between gap-2">
                                <div className="text-sm font-semibold">{i.headline}</div>
                                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-700">
                                    {i.severity ?? "info"}
                                </span>
                            </div>
                            <p className="mt-1 text-sm text-slate-700">{i.detail}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
