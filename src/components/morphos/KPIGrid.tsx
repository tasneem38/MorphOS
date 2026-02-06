"use client";

export function KPIGrid(props: {
    title?: string;
    kpis: { label: string; value: string; delta?: string }[];
}) {
    const title = props.title ?? "KPI Overview";
    const kpis = props.kpis ?? [];

    return (
        <div className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 shadow-none">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">{title}</h2>
                <div className="text-xs text-white/50">{kpis.length} KPIs</div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                {kpis.map((k, idx) => (
                    <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="text-xs text-white/80">{k.label}</div>
                        <div className="mt-2 flex items-end justify-between gap-2">
                            <div className="text-xl font-semibold text-white">{k.value}</div>
                            {k.delta ? (
                                <div className="text-xs font-bold text-emerald-400">{k.delta}</div>
                            ) : null}
                        </div>
                    </div>
                ))}
                {kpis.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-white/15 bg-white/5 p-4 text-sm text-white/55 sm:col-span-2">
                        No KPI data yet
                    </div>
                ) : null}
            </div>
        </div>
    );
}
