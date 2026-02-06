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
import type { Suggestion } from "@tambo-ai/react";
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
  const mergedRef = useMergedRef<HTMLDivElement | null>(ref, containerRef);

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

        <ScrollableMessageContainer className="p-4 bg-white/0">
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
