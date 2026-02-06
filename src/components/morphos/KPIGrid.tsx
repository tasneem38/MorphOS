"use client";

export function KPIGrid(props: {
    title?: string;
    kpis: { label: string; value: string; delta?: string }[];
}) {
    const title = props.title ?? "KPI Overview";
    const kpis = props.kpis ?? [];

    return (
        <div className="w-full rounded-2xl border bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold">{title}</h2>
                <div className="text-xs text-slate-500">{kpis.length} KPIs</div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
                {kpis.map((k, idx) => (
                    <div key={idx} className="rounded-xl bg-slate-50 p-3">
                        <div className="text-xs text-slate-600">{k.label}</div>
                        <div className="mt-1 flex items-end justify-between gap-2">
                            <div className="text-xl font-semibold">{k.value}</div>
                            {k.delta ? (
                                <div className="text-xs text-slate-600">{k.delta}</div>
                            ) : null}
                        </div>
                    </div>
                ))}
                {kpis.length === 0 ? (
                    <div className="rounded-xl border border-dashed bg-white p-4 text-sm text-slate-500 sm:col-span-2">
                        No KPI data yet
                    </div>
                ) : null}
            </div>
        </div>
    );
}
