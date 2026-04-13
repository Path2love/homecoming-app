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
    <main className="min-h-screen flex flex-col px-6 py-10" style={{ background: "#FAF8F5" }}>
      <div className="max-w-2xl mx-auto w-full">
        <div className="animate-fade-up mb-8">
          <p className="label-gold mb-2">Review Before Download</p>
          <h1 className="text-4xl font-normal mb-1">{session.clientName}&apos;s Report</h1>
          <div className="gold-line my-4 w-24" />
          <p className="text-sm" style={{ color: "#7a7470" }}>
            Review and edit before your client receives this.
          </p>
        </div>

        {/* Session Summary */}
        <div className="animate-fade-up delay-1 card-brand p-6 mb-5">
          <div className="flex items-center justify-between mb-4">
            <p className="label-teal">Session Summary</p>
            <button
              onClick={() => setEditing(editing === "summary" ? null : "summary")}
              className="text-xs font-medium transition-colors"
              style={{ color: editing === "summary" ? "#177E89" : "#b0ada8" }}
            >
              {editing === "summary" ? "Done" : "Edit"}
            </button>
          </div>
          {editing === "summary" ? (
            <textarea
              value={session.sessionSummary || ""}
              onChange={e => updateSession({ sessionSummary: e.target.value })}
              rows={8}
              className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none leading-relaxed"
              style={{
                background: "#f5f2ee",
                border: "1px solid rgba(23,126,137,0.2)",
                color: "#2D2D2D",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            />
          ) : (
            <div className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "#3a3a3a" }}>
              {session.sessionSummary}
            </div>
          )}
        </div>

        {/* Inner Child Letter */}
        <div className="animate-fade-up delay-2 card-wine p-6 mb-5">
          <div className="flex items-center justify-between mb-4">
            <p className="label-wine">A Letter to Your Inner Child</p>
            <button
              onClick={() => setEditing(editing === "letter" ? null : "letter")}
              className="text-xs font-medium transition-colors"
              style={{ color: editing === "letter" ? "#691d33" : "#b0ada8" }}
            >
              {editing === "letter" ? "Done" : "Edit"}
            </button>
          </div>
          {editing === "letter" ? (
            <textarea
              value={session.innerChildLetter || ""}
              onChange={e => updateSession({ innerChildLetter: e.target.value })}
              rows={12}
              className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none leading-relaxed"
              style={{
                background: "#fdf8f5",
                border: "1px solid rgba(105,29,51,0.2)",
                color: "#2D2D2D",
                fontFamily: "'Lora', serif",
                fontStyle: "italic",
              }}
            />
          ) : (
            <div className="quote text-sm leading-loose whitespace-pre-line" style={{ color: "#3a3030" }}>
              {session.innerChildLetter}
            </div>
          )}
        </div>

        {/* Next Session Seeds (coach only) */}
        {session.nextSeedQuestions && (
          <div className="animate-fade-up delay-3 rounded-xl p-5 mb-5"
            style={{ background: "#f5f2ee", border: "1px solid rgba(196,151,90,0.2)" }}>
            <p className="label-gold mb-3">Seeds for Next Session</p>
            <div className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "#5a5550" }}>
              {session.nextSeedQuestions}
            </div>
            <p className="text-xs mt-3 italic" style={{ color: "#b0ada8" }}>
              Coach only — not included in client report
            </p>
          </div>
        )}

        {/* Inspired Action */}
        {session.inspiredActions && (
          <div className="animate-fade-up delay-3 card-brand p-5 mb-8"
            style={{ borderLeft: "3px solid #C4975A" }}>
            <p className="label-gold mb-2">Inspired Action</p>
            <p className="text-sm leading-relaxed" style={{ color: "#3a3a3a" }}>
              {session.inspiredActions}
            </p>
          </div>
        )}

        <div className="flex gap-4">
          <button onClick={() => router.push("/synthesis")} className="btn-secondary">
            ← Revise
          </button>
          <button
            onClick={() => router.push("/complete")}
            className="btn-primary flex-1"
            style={{ background: "#177E89", borderRadius: "9999px" }}
          >
            Looks Good — Complete →
          </button>
        </div>
      </div>
    </main>
  );
}
