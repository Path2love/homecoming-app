"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadSession, saveSession, type SessionData } from "@/lib/session-store";

export default function ReviewPage() {
  const router = useRouter();
  const [session, setSession] = useState<SessionData | null>(null);
  const [editing, setEditing] = useState<"letter" | "summary" | null>(null);

  useEffect(() => {
    const s = loadSession();
    if (!s || !s.innerChildLetter) { router.replace("/"); return; }
    setSession(s);
  }, [router]);

  if (!session) return null;

  function updateSession(updates: Partial<SessionData>) {
    const updated = { ...session!, ...updates };
    setSession(updated);
    saveSession(updated);
  }

  return (
    <main className="min-h-screen flex flex-col px-6 py-10">
      <div className="max-w-2xl mx-auto w-full">
        <div className="animate-fade-up">
          <p className="text-[#C4975A] text-xs uppercase tracking-[0.2em] mb-2">
            Review — Before Download
          </p>
          <h1 className="text-4xl font-normal text-[#FAF8F5] mb-1">
            {session.clientName}&apos;s Report
          </h1>
          <div className="gold-line my-4 w-24" />
          <p className="text-[#FAF8F5]/40 text-sm mb-8">
            Review and edit before your client receives this.
          </p>
        </div>

        {/* Session Summary */}
        <div className="animate-fade-up delay-1 glass-card rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[#177E89] text-xs uppercase tracking-widest font-medium">Session Summary</p>
            <button
              onClick={() => setEditing(editing === "summary" ? null : "summary")}
              className="text-[#FAF8F5]/30 text-xs hover:text-[#C4975A] transition-colors"
            >
              {editing === "summary" ? "Done" : "Edit"}
            </button>
          </div>
          {editing === "summary" ? (
            <textarea
              value={session.sessionSummary || ""}
              onChange={e => updateSession({ sessionSummary: e.target.value })}
              rows={8}
              className="w-full px-3 py-2 rounded-lg text-[#FAF8F5] text-sm outline-none resize-none leading-relaxed"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(196,151,90,0.15)" }}
            />
          ) : (
            <div className="text-[#FAF8F5]/80 text-sm leading-relaxed whitespace-pre-line">
              {session.sessionSummary}
            </div>
          )}
        </div>

        {/* Inner Child Letter */}
        <div className="animate-fade-up delay-2 glass-card rounded-xl p-6 mb-6"
          style={{ borderColor: "rgba(105,29,51,0.3)" }}>
          <div className="flex items-center justify-between mb-4">
            <p className="text-[#8a2642] text-xs uppercase tracking-widest font-medium">
              A Letter to Your Inner Child
            </p>
            <button
              onClick={() => setEditing(editing === "letter" ? null : "letter")}
              className="text-[#FAF8F5]/30 text-xs hover:text-[#C4975A] transition-colors"
            >
              {editing === "letter" ? "Done" : "Edit"}
            </button>
          </div>
          {editing === "letter" ? (
            <textarea
              value={session.innerChildLetter || ""}
              onChange={e => updateSession({ innerChildLetter: e.target.value })}
              rows={12}
              className="w-full px-3 py-2 rounded-lg text-[#FAF8F5] text-sm outline-none resize-none leading-relaxed"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(196,151,90,0.15)" }}
            />
          ) : (
            <div className="quote text-[#FAF8F5]/80 text-sm leading-relaxed whitespace-pre-line">
              {session.innerChildLetter}
            </div>
          )}
        </div>

        {/* Next Session Seeds */}
        {session.nextSeedQuestions && (
          <div className="animate-fade-up delay-3 glass-card rounded-xl p-6 mb-8">
            <p className="text-[#C4975A]/70 text-xs uppercase tracking-widest mb-4">
              Seeds for Next Session
            </p>
            <div className="text-[#FAF8F5]/60 text-sm leading-relaxed whitespace-pre-line">
              {session.nextSeedQuestions}
            </div>
            <p className="text-[#FAF8F5]/25 text-xs mt-3 italic">
              Coach only — not included in client report
            </p>
          </div>
        )}

        {/* Inspired Actions */}
        {session.inspiredActions && (
          <div className="animate-fade-up delay-3 glass-card rounded-xl p-5 mb-8">
            <p className="text-[#C4975A]/70 text-xs uppercase tracking-widest mb-2">
              Your Inspired Action
            </p>
            <p className="text-[#FAF8F5]/80 text-sm leading-relaxed">
              {session.inspiredActions}
            </p>
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={() => router.push("/synthesis")}
            className="px-6 py-3 rounded-full text-xs uppercase tracking-widest text-[#FAF8F5]/40 hover:text-[#FAF8F5]/70 transition-all"
            style={{ border: "1px solid rgba(196,151,90,0.15)" }}
          >
            ← Revise
          </button>
          <button
            onClick={() => router.push("/complete")}
            className="flex-1 py-4 rounded-full text-sm tracking-widest uppercase font-medium transition-all"
            style={{
              background: "linear-gradient(135deg, #177E89, #1a9aa7)",
              border: "1px solid rgba(196,151,90,0.2)",
            }}
          >
            Looks Good — Complete →
          </button>
        </div>
      </div>
    </main>
  );
}
