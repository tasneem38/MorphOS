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
        <div className="w-full rounded-2xl border bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold">DSA Progress</h2>
                <div className="text-xs text-slate-500">
                    {solved}/{target} ({pct}%)
                </div>
            </div>

            <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-slate-800" style={{ width: `${pct}%` }} />
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-3">
                    <div className="text-xs font-medium text-slate-600 mb-2">
                        Focus topics
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {(props.focusTopics ?? []).length === 0 ? (
                            <span className="text-sm text-slate-500">Not set</span>
                        ) : (
                            props.focusTopics!.map((t) => (
                                <span
                                    key={t}
                                    className="rounded-full bg-white border px-2 py-1 text-xs text-slate-700"
                                >
                                    {t}
                                </span>
                            ))
                        )}
                    </div>
                </div>

                <div className="rounded-xl bg-slate-50 p-3">
                    <div className="text-xs font-medium text-slate-600 mb-2">
                        Next actions
                    </div>
                    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                        {(props.next ?? []).length === 0 ? (
                            <li className="text-slate-500">No next steps yet</li>
                        ) : (
                            props.next!.map((n, i) => <li key={i}>{n}</li>)
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
