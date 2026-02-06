"use client";

import { McpConfigButton } from "@/components/ui/mcp-config-button";
import { MessageThreadFull } from "@/components/tambo/message-thread-full";
import { loadMcpServers } from "@/lib/mcp-utils";
import { components } from "@/lib/tambo";
import { TamboProvider, useTamboThreadInput } from "@tambo-ai/react";
import { TamboMcpProvider } from "@tambo-ai/react/mcp";
import Link from "next/link";

function ChatHeader() {
  const { setValue, submit } = useTamboThreadInput("morphos");

  const handleModeSwitch = async (prompt: string) => {
    setValue(prompt);
    try {
      await submit({
        contextKey: "morphos",
        streamResponse: true,
      });
      setValue(""); // Clear after submit
    } catch (error) {
      console.error("Failed to switch mode:", error);
    }
  };

  return (
    <div className="sticky top-0 z-20 border-b border-white/10 bg-[#070A12]/75 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.9)]" />
          <Link href="/" className="group flex flex-col items-start translate-y-[-1px]">
            <div className="text-sm font-semibold tracking-wide group-hover:text-emerald-400 transition-colors">MorphOS</div>
            <div className="text-[10px] text-white/55 leading-none">
              Intent-driven UI • Generative + Interactable
            </div>
          </Link>
        </div>

        {/* Mode chips (functional) */}
        <div className="hidden sm:flex items-center gap-2 text-xs">
          <button
            onClick={() => handleModeSwitch('Plan my week')}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          >
            Productivity
          </button>
          <button
            onClick={() => handleModeSwitch('Microsoft SDE Prep')}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          >
            Learning
          </button>
          <button
            onClick={() => handleModeSwitch('Analyze startup metrics')}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          >
            Analytics
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const mcpServers = loadMcpServers();

  return (
    <TamboProvider
      apiKey={process.env.NEXT_PUBLIC_TAMBO_API_KEY!}
      components={components}
      tamboUrl={process.env.NEXT_PUBLIC_TAMBO_URL}
    >
      <TamboMcpProvider mcpServers={mcpServers}>
        <div className="min-h-screen bg-[#070A12] text-white font-sans antialiased">
          {/* Floating MCP button */}
          <McpConfigButton />

          {/* Top Command Bar (Functional Header) */}
          <ChatHeader />

          {/* Main Chat Surface */}
          <div className="mx-auto w-full max-w-6xl px-4 py-8">
            <div className="morphos-chat rounded-3xl border border-white/10 bg-[#0B1220]/80 shadow-[0_25px_100px_-60px_rgba(16,185,129,0.55)] backdrop-blur">
              <MessageThreadFull contextKey="morphos" className="min-h-[78vh]" variant="default" />
            </div>
            <div className="mt-4 text-center text-xs text-white/40 tracking-wide">
              Tip: try “Plan my week”, “SDE prep”, or “Analyze metrics”.
            </div>
          </div>
        </div>
      </TamboMcpProvider>
    </TamboProvider>
  );
}
