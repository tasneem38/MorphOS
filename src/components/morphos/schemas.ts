import { z } from "zod";

export const TaskSchema = z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    status: z.enum(["todo", "in_progress", "done"]),
    due: z.string().optional(), // "Fri" or "2026-02-08"
    priority: z.enum(["low", "medium", "high"]).default("medium"),
});

export const TaskBoardPropsSchema = z.object({
    title: z.string().default("Task Board"),
    tasks: z.array(TaskSchema).default([]),
});

export const WeekPlannerPropsSchema = z.object({
    goal: z.string().default("Plan the week"),
    topPriorities: z.array(z.string()).default([]),
    schedule: z.array(
        z.object({
            day: z.string(),
            focus: z.string(),
            tasks: z.array(z.string()).default([]),
        })
    ).default([]),
});

export const InterviewRoadmapPropsSchema = z.object({
    targetRole: z.string().default("Microsoft SDE"),
    days: z.number().int().min(1).max(60).default(14),
    topics: z.array(
        z.object({
            name: z.string(),
            why: z.string().optional(),
            resources: z.array(z.string()).default([]),
        })
    ).default([]),
});

export const DSAProgressPropsSchema = z.object({
    target: z.number().int().min(10).max(500).default(150),
    solved: z.number().int().min(0).default(0),
    focusTopics: z.array(z.string()).default([]),
    next: z.array(z.string()).default([]),
});

export const KPIGridPropsSchema = z.object({
    title: z.string().default("KPI Overview"),
    kpis: z.array(
        z.object({
            label: z.string(),
            value: z.string(),
            delta: z.string().optional(), // "+12%" or "-3%"
        })
    ).default([]),
});

export const InsightCardsPropsSchema = z.object({
    title: z.string().default("Insights"),
    insights: z.array(
        z.object({
            headline: z.string(),
            detail: z.string(),
            severity: z.enum(["info", "warning", "critical"]).default("info"),
        })
    ).default([]),
});
