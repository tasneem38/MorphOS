"use client";

import { withInteractable } from "@tambo-ai/react";
import { DSAProgress } from "./DSAProgress";
import { DSAProgressPropsSchema } from "./schemas";

export const DSAProgressInteractable = withInteractable(DSAProgress, {
    componentName: "DSAProgress",
    propsSchema: DSAProgressPropsSchema,
    description:
        "An interactable interview-prep progress tracker for DSA. Use this to update solved count, target, focus topics, and next steps over time. Modify the existing DSAProgress instead of creating a new one.",
});
