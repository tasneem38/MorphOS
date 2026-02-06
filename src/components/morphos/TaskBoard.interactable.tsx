"use client";

import { withInteractable } from "@tambo-ai/react";
import { TaskBoard } from "./TaskBoard";
import { TaskBoardPropsSchema } from "./schemas";

export const TaskBoardInteractable = withInteractable(TaskBoard, {
    componentName: "TaskBoard",
    propsSchema: TaskBoardPropsSchema,
    description:
        "An interactable task board. Use this to update tasks, change status, priority, due dates, or add new tasks. When updating, modify the existing TaskBoard instead of creating a new one.",
});
