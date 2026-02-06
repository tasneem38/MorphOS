"use client";

import {
  MessageInput,
  MessageInputTextarea,
  MessageInputToolbar,
  MessageInputSubmitButton,
  MessageInputError,
} from "@/components/tambo/message-input";
import {
  MessageSuggestions,
  MessageSuggestionsStatus,
  MessageSuggestionsList,
} from "@/components/tambo/message-suggestions";
import type { messageVariants } from "@/components/tambo/message";
import {
  ThreadHistory,
  ThreadHistoryHeader,
  ThreadHistoryNewButton,
  ThreadHistorySearch,
  ThreadHistoryList,
} from "@/components/tambo/thread-history";
import {
  ThreadContent,
  ThreadContentMessages,
} from "@/components/tambo/thread-content";
import {
  ThreadContainer,
  useThreadContainerContext,
} from "@/components/tambo/thread-container";
import { ScrollableMessageContainer } from "@/components/tambo/scrollable-message-container";
import { useMergedRef } from "@/lib/thread-hooks";
import { useTambo, useTamboThreadInput, type Suggestion } from "@tambo-ai/react";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";

/**
 * Props for the MessageThreadFull component
 */
export interface MessageThreadFullProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional context key for the thread */
  contextKey?: string;
  /**
   * Controls the visual styling of messages in the thread.
   * Possible values include: "default", "compact", etc.
   * These values are defined in messageVariants from "@/components/tambo/message".
   * @example variant="compact"
   */
  variant?: VariantProps<typeof messageVariants>["variant"];
}

/**
 * A full-screen chat thread component with message history, input, and suggestions
 */
export const MessageThreadFull = React.forwardRef<
  HTMLDivElement,
  MessageThreadFullProps
>(({ className, contextKey, variant, ...props }, ref) => {
  const { containerRef, historyPosition } = useThreadContainerContext();
  const { thread } = useTambo();
  const { setValue, submit } = useTamboThreadInput(contextKey);
  const isEmpty = (thread?.messages ?? []).length === 0;
  const mergedRef = useMergedRef<HTMLDivElement | null>(ref, containerRef);

  const handleModeSwitch = async (prompt: string) => {
    setValue(prompt);
    try {
      await submit({
        contextKey: contextKey,
        streamResponse: true,
      });
      setValue("");
    } catch (error) {
      console.error("Failed to switch mode:", error);
    }
  };

  const threadHistorySidebar = (
    <ThreadHistory contextKey={contextKey} position={historyPosition}>
      <ThreadHistoryHeader />
      <ThreadHistoryNewButton />
      <ThreadHistorySearch />
      <ThreadHistoryList />
    </ThreadHistory>
  );

  const defaultSuggestions: Suggestion[] = [
    {
      id: "morphos-1",
      title: "Plan my week (Productivity mode)",
      detailedSuggestion:
        'Create a TaskBoard titled "MorphOS Weekly Plan" with 7 tasks, priorities, and due days. Mark 2 as in_progress and 2 as done. Then summarize the top 3 priorities.',
      messageId: "morphos-week-plan",
    },
    {
      id: "morphos-2",
      title: "Microsoft SDE Prep(Learning mode)",
      detailedSuggestion:
        "I’m preparing for Microsoft SDE. Render a DSAProgress with target 180, solved 42. Focus topics: arrays, strings, DP. Next: solve 10 sliding window, 5 DP, revise binary search.",
      messageId: "morphos-sde-prep",
    },
    {
      id: "morphos-3",
      title: "Analyze startup metrics(Analytics mode)",
      detailedSuggestion:
        "Switch to analytics mode: show KPIGrid with 6 KPIs (users, revenue, churn, retention, CAC, NPS) including deltas. Then show InsightCards with 5 insights including one critical risk and one recommendation.",
      messageId: "morphos-analytics",
    },
  ];

  return (
    <>
      {/* Thread History Sidebar - rendered first if history is on the left */}
      {historyPosition === "left" && threadHistorySidebar}

      <ThreadContainer
        ref={mergedRef}
        className={`rounded-3xl bg-transparent text-white ${className ?? ""}`}
        {...props}
      >

        <ScrollableMessageContainer className="p-4 bg-white/0 flex flex-col relative">
          {isEmpty && (
            <div className="flex flex-col items-center justify-center py-12 px-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <div className="h-16 w-16 rounded-3xl bg-emerald-400/10 flex items-center justify-center mb-6 shadow-[0_0_50px_-12px_rgba(16,185,129,0.3)] border border-emerald-400/20">
                <div className="h-4 w-4 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_20px_rgba(16,185,129,0.8)]" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white mb-3">
                Welcome to MorphOS
              </h1>
              <p className="max-w-[440px] text-lg text-white/60 leading-relaxed mb-8">
                Your intent-driven interface engine. Select a mode to start the demo or type a custom instruction below.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-2xl">
                {[
                  { label: "Productivity", prompt: "Plan my week", color: "emerald" },
                  { label: "Learning", prompt: "Microsoft SDE Prep", color: "cyan" },
                  { label: "Analytics", prompt: "Analyze startup metrics", color: "fuchsia" }
                ].map((mode) => (
                  <button
                    key={mode.label}
                    onClick={() => handleModeSwitch(mode.prompt)}
                    className="flex flex-col items-start p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-left pointer-events-auto group cursor-pointer"
                  >
                    <span className="text-xs font-medium text-white/40 group-hover:text-white/60 transition-colors mb-1">Mode</span>
                    <span className="text-sm font-semibold text-white">{mode.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          <ThreadContent variant={variant}>
            <ThreadContentMessages />
          </ThreadContent>
        </ScrollableMessageContainer>

        {/* Message suggestions status */}
        <MessageSuggestions>
          <MessageSuggestionsStatus />
        </MessageSuggestions>

        {/* Message input */}
        <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur rounded-b-3xl">
          <MessageInput contextKey={contextKey}>
            <MessageInputTextarea />
            <MessageInputToolbar>
              <MessageInputSubmitButton />
            </MessageInputToolbar>
            <MessageInputError />
          </MessageInput>
        </div>

        {/* Message suggestions */}
        <MessageSuggestions initialSuggestions={defaultSuggestions}>
          <MessageSuggestionsList />
        </MessageSuggestions>
      </ThreadContainer>

      {/* Thread History Sidebar - rendered last if history is on the right */}
      {historyPosition === "right" && threadHistorySidebar}
    </>
  );
});
MessageThreadFull.displayName = "MessageThreadFull";
