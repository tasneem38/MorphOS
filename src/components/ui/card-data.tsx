"use client";

import { cn } from "@/lib/utils";
import { useTamboComponentState } from "@tambo-ai/react";
import * as React from "react";
import { z } from "zod";

// Define option type for individual options in the multi-select
export type DataCardItem = {
  id: string;
  label: string;
  value: string;
  description?: string;
  url?: string;
};

// Define the component state type
export type DataCardState = {
  selectedValues: string[];
};

// Define the component props schema with Zod
export const dataCardSchema = z.object({
  title: z.string().describe("Title displayed above the data cards"),
  options: z
    .array(
      z.object({
        id: z.string().describe("Unique identifier for this card"),
        label: z.string().describe("Display text for the card title"),
        value: z.string().describe("Value associated with this card"),
        description: z
          .string()
          .optional()
          .describe("Optional summary for the card"),
        url: z
          .string()
          .optional()
          .describe("Optional URL for the card to navigate to"),
      })
    )
    .describe("Array of selectable cards to display"),
});

// Define the props type based on the Zod schema
export type DataCardProps = z.infer<typeof dataCardSchema> &
  React.HTMLAttributes<HTMLDivElement>;

/**
 * DataCard Component
 *
 * A component that displays options as clickable cards with links and summaries
 * with the ability to select multiple items.
 */
export const DataCard = React.forwardRef<HTMLDivElement, DataCardProps>(
  ({ title, options, className, ...props }, ref) => {
    // Initialize Tambo component state
    const [state, setState] = useTamboComponentState<DataCardState>(
      `data-card`,
      { selectedValues: [] }
    );

    // Handle option selection
    const handleToggleCard = (value: string) => {
      if (!state) return;

      const selectedValues = [...state.selectedValues];
      const index = selectedValues.indexOf(value);

      // Toggle selection
      if (index > -1) {
        // Remove if already selected
        selectedValues.splice(index, 1);
      } else {
        selectedValues.push(value);
      }

      // Update component state
      setState({ selectedValues });
    };

    // Handle navigation to URL
    const handleNavigate = (url?: string) => {
      if (url) {
        window.open(url, "_blank");
      }
    };

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        {title && (
          <h2 className="text-lg font-medium text-white/90 mb-3 tracking-tight">{title}</h2>
        )}

        <div className="space-y-2">
          {options?.map((card) => (
            <div
              key={card.id}
              className="border-b border-white/5 pb-2 last:border-0"
            >
              <div
                className={cn(
                  "group flex items-start p-2 rounded-xl transition-all duration-200 hover:bg-white/5",
                  state &&
                  state.selectedValues.includes(card.value) &&
                  "bg-white/10"
                )}
              >
                <div
                  className="flex-shrink-0 mr-4 mt-1 cursor-pointer"
                  onClick={() => handleToggleCard(card.value)}
                >
                  <div
                    className={cn(
                      "w-4 h-4 border rounded shadow-sm flex items-center justify-center transition-all",
                      state && state.selectedValues.includes(card.value)
                        ? "bg-emerald-500 border-emerald-500 text-black"
                        : "border-white/20 group-hover:border-white/40"
                    )}
                  >
                    {state && state.selectedValues.includes(card.value) && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() =>
                    card.url
                      ? handleNavigate(card.url)
                      : handleToggleCard(card.value)
                  }
                >
                  <h3
                    className={cn(
                      "text-emerald-400 font-semibold text-sm transition-colors",
                      "group-hover:text-emerald-300",
                      state &&
                      state.selectedValues.includes(card.value) &&
                      "text-emerald-200"
                    )}
                  >
                    {card.label}
                  </h3>
                  {card.description && (
                    <p className="text-xs text-white mt-1 leading-relaxed">
                      {card.description}
                    </p>
                  )}
                  {card.url && (
                    <span className="text-xs text-cyan-400 mt-1.5 block truncate opacity-70 group-hover:opacity-100">
                      {card.url}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

DataCard.displayName = "DataCard";

export default DataCard;
