"use client";

type Task = {
    id: string;
    title: string;
    status: "todo" | "in_progress" | "done";
    due?: string;
    priority?: "low" | "medium" | "high";
};

export function TaskBoard(props: { title?: string; tasks: Task[] }) {
    const title = props.title ?? "Task Board";
    const tasks = props.tasks ?? [];

    const cols: Array<{ key: Task["status"]; label: string }> = [
        { key: "todo", label: "To do" },
        { key: "in_progress", label: "In progress" },
        { key: "done", label: "Done" },
    ];

    return (
        <div className="w-full rounded-2xl border bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold">{title}</h2>
                <div className="text-xs text-slate-500">
                    {tasks.length} task{tasks.length === 1 ? "" : "s"}
                </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
                {cols.map((c) => {
                    const items = tasks.filter((t) => t.status === c.key);
                    return (
                        <div key={c.key} className="rounded-xl bg-slate-50 p-3">
                            <div className="mb-2 text-sm font-medium text-slate-700">
                                {c.label}
                            </div>

                            <div className="space-y-2">
                                {items.length === 0 ? (
                                    <div className="rounded-lg border border-dashed bg-white p-3 text-sm text-slate-500">
                                        Nothing here yet
                                    </div>
                                ) : (
                                    items.map((t) => (
                                        <div key={t.id} className="rounded-lg border bg-white p-3">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="text-sm font-medium">{t.title}</div>
                                                {t.priority ? (
                                                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-700">
                                                        {t.priority}
                                                    </span>
                                                ) : null}
                                            </div>

                                            <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
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
