"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadSession, saveSession, type SessionData } from "@/lib/session-store";
import { BODY_REGIONS, ENERGY_COLORS } from "@/lib/protocol";

const PATTERNS = [
  "Abandonment / Fear of being left",
  "Shame / Not enough",
  "Powerlessness / No control",
  "Betrayal / Can't trust",
  "Rejection / Unwanted",
  "Engulfment / Loss of self",
  "Neglect / Invisible",
  "Perfectionism / Must earn love",
  "Rage / Suppressed anger",
  "Grief / Unprocessed loss",
];

const SHIFTS = [
  "Acknowledgment — it was finally seen",
  "Compassion — the child received love",
  "Release — energy moved or left the body",
  "Clarity — a pattern became conscious",
  "Resolve — a decision was made",
  "Softening — defences dropped",
  "Still processing — not fully landed yet",
  "Stayed present — didn't exit or shut down",
];

export default function SynthesisPage() {
  const router = useRouter();
  const [session, setSession] = useState<SessionData | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const s = loadSession();
    if (!s) { router.replace("/"); return; }
    setSession(s);
  }, [router]);

  if (!session) return null;

  function updateSession(updates: Partial<SessionData>) {
    const updated = { ...session!, ...updates };
    setSession(updated);
    saveSession(updated);
  }

  async function handleGenerate() {
    if (!session) return;
    setGenerating(true);
    setError("");
    try {
      const res = await fetch("/api/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(session),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      updateSession({
        innerChildLetter: data.innerChildLetter,
        sessionSummary: data.sessionSummary,
        nextSeedQuestions: data.nextSeedQuestions,
      });
      router.push("/review");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unable to generate report. Please try again.");
    } finally {
      setGenerating(false);
    }
  }

  const bodyLabels = session.bodyLocation
    .map(id => BODY_REGIONS.find(r => r.id === id)?.label)
    .filter(Boolean)
    .join(", ");

  const colorLabel = ENERGY_COLORS.find(c => c.value === session.energyColor)?.label;

  return (
    <main className="min-h-screen flex flex-col px-6 py-10">
      <div className="max-w-2xl mx-auto w-full">
        <div className="animate-fade-up">
          <p className="text-[#C4975A] text-xs uppercase tracking-[0.2em] mb-2">
            Mode 2 — Post-Session
          </p>
          <h1 className="text-4xl font-normal text-[#FAF8F5] mb-1">
            Session Synthesis
          </h1>
          <div className="gold-line my-4 w-24" />
          <p className="text-[#FAF8F5]/40 text-sm mb-8">
            5 minutes. What happened in the room today?
          </p>
        </div>

        {/* Session snapshot */}
        <div className="animate-fade-up delay-1 glass-card rounded-xl p-5 mb-6 space-y-2">
          <p className="text-[#C4975A]/70 text-xs uppercase tracking-widest mb-3">Session Snapshot</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <div>
              <span className="text-[#FAF8F5]/30 text-xs">Client</span>
              <p className="text-[#FAF8F5]">{session.clientName}</p>
            </div>
            <div>
              <span className="text-[#FAF8F5]/30 text-xs">Session</span>
              <p className="text-[#FAF8F5]">
                {session.sessionNumber ? `#${session.sessionNumber}` : "—"} · {session.sessionDate}
              </p>
            </div>
            <div>
              <span className="text-[#FAF8F5]/30 text-xs">Opening Scale</span>
              <p className="text-[#FAF8F5]">{session.openingScale} / 10</p>
            </div>
            <div>
              <span className="text-[#FAF8F5]/30 text-xs">Closing Scale</span>
              <p className="text-[#FAF8F5]">{session.closingScale} / 10</p>
            </div>
            {bodyLabels && (
              <div className="col-span-2">
                <span className="text-[#FAF8F5]/30 text-xs">Body Location</span>
                <p className="text-[#FAF8F5]">{bodyLabels}</p>
              </div>
            )}
            {session.energyShape && (
              <div>
                <span className="text-[#FAF8F5]/30 text-xs">Energy Shape</span>
                <p className="text-[#FAF8F5]">{session.energyShape}</p>
              </div>
            )}
            {colorLabel && (
              <div>
                <span className="text-[#FAF8F5]/30 text-xs">Energy Colour</span>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: session.energyColor }} />
                  <p className="text-[#FAF8F5]">{colorLabel}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Synthesis prompts */}
        <div className="animate-fade-up delay-2 space-y-5">
          {/* Pattern surfaced */}
          <div className="glass-card rounded-xl p-5">
            <label className="block text-[#FAF8F5]/60 text-xs uppercase tracking-widest mb-3">
              What core pattern surfaced?
            </label>
            <div className="grid grid-cols-1 gap-2">
              {PATTERNS.map(p => (
                <button
                  key={p}
                  onClick={() => updateSession({ patternSurfaced: p })}
                  className="text-left px-3 py-2 rounded-lg text-xs transition-all"
                  style={{
                    background: session.patternSurfaced === p ? "rgba(105,29,51,0.35)" : "rgba(255,255,255,0.03)",
                    border: session.patternSurfaced === p ? "1px solid rgba(196,151,90,0.4)" : "1px solid rgba(196,151,90,0.08)",
                    color: session.patternSurfaced === p ? "#C4975A" : "rgba(250,248,245,0.55)",
                  }}
                >
                  {session.patternSurfaced === p && "● "}{p}
                </button>
              ))}
            </div>
          </div>

          {/* Shift observed */}
          <div className="glass-card rounded-xl p-5">
            <label className="block text-[#FAF8F5]/60 text-xs uppercase tracking-widest mb-3">
              What shift did you observe?
            </label>
            <div className="grid grid-cols-1 gap-2">
              {SHIFTS.map(s => (
                <button
                  key={s}
                  onClick={() => updateSession({ shiftObserved: s })}
                  className="text-left px-3 py-2 rounded-lg text-xs transition-all"
                  style={{
                    background: session.shiftObserved === s ? "rgba(23,126,137,0.2)" : "rgba(255,255,255,0.03)",
                    border: session.shiftObserved === s ? "1px solid rgba(23,126,137,0.4)" : "1px solid rgba(196,151,90,0.08)",
                    color: session.shiftObserved === s ? "#1a9aa7" : "rgba(250,248,245,0.55)",
                  }}
                >
                  {session.shiftObserved === s && "● "}{s}
                </button>
              ))}
            </div>
          </div>

          {/* Inspired actions (if not captured during session) */}
          {!session.inspiredActions && (
            <div className="glass-card rounded-xl p-5">
              <label className="block text-[#FAF8F5]/60 text-xs uppercase tracking-widest mb-3">
                What inspired action did the client name?
              </label>
              <textarea
                value={session.inspiredActions}
                onChange={e => updateSession({ inspiredActions: e.target.value })}
                placeholder="What one action called to them from today's session?"
                rows={2}
                className="w-full px-3 py-2 rounded-lg text-[#FAF8F5] placeholder-[#FAF8F5]/20 text-sm outline-none resize-none"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(196,151,90,0.1)" }}
              />
            </div>
          )}

          {/* Coach notes */}
          <div className="glass-card rounded-xl p-5">
            <label className="block text-[#FAF8F5]/60 text-xs uppercase tracking-widest mb-3">
              Coach observations (private — not in client report)
            </label>
            <textarea
              value={session.coachNotes}
              onChange={e => updateSession({ coachNotes: e.target.value })}
              placeholder="Anything you want to remember about this session..."
              rows={3}
              className="w-full px-3 py-2 rounded-lg text-[#FAF8F5] placeholder-[#FAF8F5]/20 text-sm outline-none resize-none"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(196,151,90,0.1)" }}
            />
          </div>
        </div>

        {error && (
          <div className="mt-4 px-4 py-3 rounded-lg text-sm text-red-300"
            style={{ background: "rgba(192,57,43,0.15)", border: "1px solid rgba(192,57,43,0.3)" }}>
            {error}
          </div>
        )}

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => router.push(`/session/${10}`)}
            className="px-6 py-3 rounded-full text-xs uppercase tracking-widest text-[#FAF8F5]/40 hover:text-[#FAF8F5]/70 transition-all"
            style={{ border: "1px solid rgba(196,151,90,0.15)" }}
          >
            ← Back to Session
          </button>
          <button
            onClick={handleGenerate}
            disabled={generating || !session.patternSurfaced || !session.shiftObserved}
            className="flex-1 py-4 rounded-full text-sm tracking-widest uppercase font-medium transition-all disabled:opacity-30"
            style={{
              background: "linear-gradient(135deg, #691d33, #8a2642)",
              border: "1px solid rgba(196,151,90,0.3)",
            }}
          >
            {generating ? "Generating Report..." : "Generate Client Report →"}
          </button>
        </div>
      </div>
    </main>
  );
}
