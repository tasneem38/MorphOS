/**
 * @file tambo.ts
 * @description Central configuration file for Tambo components and tools
 *
 * This file serves as the central place to register your Tambo components and tools.
 * It exports arrays that will be used by the TamboProvider.
 *
 * Read more about Tambo at https://tambo.co/docs
 */

import { DataCard, dataCardSchema } from "@/components/ui/card-data";
import { Graph, graphSchema } from "@/components/tambo/graph";
import type { TamboComponent } from "@tambo-ai/react";
import { TamboTool } from "@tambo-ai/react";
import { TaskBoard } from "@/components/morphos/TaskBoard";
import { KPIGrid } from "@/components/morphos/KPIGrid";
import { InsightCards } from "@/components/morphos/InsightCards";
import { DSAProgress } from "@/components/morphos/DSAProgress";
import { DSAProgressInteractable } from "@/components/morphos/DSAProgress.interactable";
import {
  TaskBoardPropsSchema,
  KPIGridPropsSchema,
  InsightCardsPropsSchema,
  DSAProgressPropsSchema,
} from "@/components/morphos/schemas";
import { TaskBoardInteractable } from "@/components/morphos/TaskBoard.interactable";

/**
 * tools
 *
 * This array contains all the Tambo tools that are registered for use within the application.
 * Each tool is defined with its name, description, and expected props. The tools
 * can be controlled by AI to dynamically fetch data based on user interactions.
 */

export const tools: TamboTool[] = [
  // Set the MCP tools https://localhost:3000/mcp-config
  // Add non MCP tools here
];

/**
 * components
 *
 * This array contains all the Tambo components that are registered for use within the application.
 * Each component is defined with its name, description, and expected props. The components
 * can be controlled by AI to dynamically render UI elements based on user interactions.
 */
export const components: TamboComponent[] = [
  {
    name: "Graph",
    description:
      "Use this when you want to display a chart. It supports bar, line, and pie charts. When you see data generally use this component.",
    component: Graph,
    propsSchema: graphSchema,
  },
  {
    name: "DataCards",
    description:
      "Use this when you want to display a list of information (>2 elements) that user might want to select from. Not anything that is a list or has links. ",
    component: DataCard,
    propsSchema: dataCardSchema,
  },
  // Add more components here
  {
    name: "DSAProgress",
    description:
      "An interactable progress tracker for interview preparation (DSA). Supports updating progress and next steps over time.",
    component: DSAProgressInteractable,
    propsSchema: DSAProgressPropsSchema,
  },
  {
    name: "TaskBoard",
    description:
      "An interactable kanban-style task board. Supports adding, moving, and updating tasks over time.",
    component: TaskBoardInteractable,
    propsSchema: TaskBoardPropsSchema,
  },
  {
    name: "KPIGrid",
    description:
      "A grid of KPI cards for analytics. Use when summarizing metrics like revenue, churn, users, growth, etc.",
    component: KPIGrid,
    propsSchema: KPIGridPropsSchema,
  },
  {
    name: "InsightCards",
    description:
      "A list of insight cards with severity levels. Use when you want to present conclusions, risks, anomalies, and recommendations.",
    component: InsightCards,
    propsSchema: InsightCardsPropsSchema,
  },
  {
    name: "DSAProgress",
    description:
      "A progress tracker for Data Structures and Algorithms. Use this to show solved problems, target goals, and focus topics for technical interviews.",
    component: DSAProgress,
    propsSchema: DSAProgressPropsSchema,
  },
];
