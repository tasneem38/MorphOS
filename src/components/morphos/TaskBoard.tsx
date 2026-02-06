"use client";

type Task = {
    id: string;
    title: string;
    status: "todo" | "in_progress" | "done";
    due?: string;
    priority?: "low" | "medium" | "high";
};

function priorityClasses(p?: Task["priority"]) {
    if (p === "high") return "border-red-400/30 text-red-200 bg-red-400/10";
    if (p === "medium")
        return "border-yellow-400/30 text-yellow-200 bg-yellow-400/10";
    if (p === "low") return "border-emerald-400/30 text-emerald-200 bg-emerald-400/10";
    return "border-white/10 text-white/80 bg-white/10";
}

export function TaskBoard(props: { title?: string; tasks: Task[] }) {
    const title = props.title ?? "Task Board";
    const tasks = props.tasks ?? [];

    const cols: Array<{ key: Task["status"]; label: string }> = [
        { key: "todo", label: "To do" },
        { key: "in_progress", label: "In progress" },
        { key: "done", label: "Done" },
    ];

    return (
        <div className="w-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 shadow-none">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">{title}</h2>
                <div className="text-xs text-white/50">
                    {tasks.length} task{tasks.length === 1 ? "" : "s"}
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {cols.map((c) => {
                    const items = tasks.filter((t) => t.status === c.key);

                    return (
                        <div
                            key={c.key}
                            className="rounded-xl border border-white/10 bg-white/5 p-4"
                        >
                            <div className="mb-3 text-sm font-medium text-white/80">
                                {c.label}
                            </div>

                            <div className="space-y-3">
                                {items.length === 0 ? (
                                    <div className="rounded-xl border border-dashed border-white/15 bg-white/5 p-4 text-sm text-white/55">
                                        Nothing here yet
                                    </div>
                                ) : (
                                    items.map((t) => (
                                        <div
                                            key={t.id}
                                            className="rounded-xl border border-white/10 bg-[#0B1220]/80 p-4"
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="text-sm font-medium text-white/90">
                                                    {t.title}
                                                </div>

                                                {t.priority ? (
                                                    <span
                                                        className={`rounded-full border px-2 py-0.5 text-[11px] capitalize ${priorityClasses(
                                                            t.priority,
                                                        )}`}
                                                    >
                                                        {t.priority}
                                                    </span>
                                                ) : null}
                                            </div>

                                            <div className="mt-3 flex items-center justify-between text-xs text-white/55">
                                                <span>ID: {t.id}</span>
                                                {t.due ? <span>Due: {t.due}</span> : <span />}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
