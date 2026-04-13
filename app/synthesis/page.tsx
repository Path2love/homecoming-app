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
    <main className="min-h-screen flex flex-col px-6 py-10" style={{ background: "#FAF8F5" }}>
      <div className="max-w-2xl mx-auto w-full">
        <div className="animate-fade-up mb-8">
          <p className="label-gold mb-2">Mode 2 — Post-Session</p>
          <h1 className="text-4xl font-normal mb-1">Session Synthesis</h1>
          <div className="gold-line my-4 w-24" />
          <p className="text-sm" style={{ color: "#7a7470" }}>
            5 minutes. What happened in the room today?
          </p>
        </div>

        {/* Session snapshot */}
        <div className="animate-fade-up delay-1 card-brand p-5 mb-6">
          <p className="label-teal mb-4">Session Snapshot</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            <div>
              <p className="label-muted mb-0.5">Client</p>
              <p className="font-medium">{session.clientName}</p>
            </div>
            <div>
              <p className="label-muted mb-0.5">Session</p>
              <p className="font-medium">
                {session.sessionNumber ? `#${session.sessionNumber}` : "—"} · {session.sessionDate}
              </p>
            </div>
            <div>
              <p className="label-muted mb-0.5">Opening Scale</p>
              <p className="font-medium">{session.openingScale} / 10</p>
            </div>
            <div>
              <p className="label-muted mb-0.5">Closing Scale</p>
              <p className="font-semibold" style={{ color: session.closingScale < session.openingScale ? "#177E89" : "#2D2D2D" }}>
                {session.closingScale} / 10
                {session.closingScale < session.openingScale && (
                  <span className="ml-2 text-xs font-normal" style={{ color: "#177E89" }}>↓ shift</span>
                )}
              </p>
            </div>
            {bodyLabels && (
              <div className="col-span-2">
                <p className="label-muted mb-0.5">Body Location</p>
                <p>{bodyLabels}</p>
              </div>
            )}
            {colorLabel && (
              <div>
                <p className="label-muted mb-0.5">Energy Colour</p>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: session.energyColor }} />
                  <p>{colorLabel}</p>
                </div>
              </div>
            )}
            {session.energyShape && (
              <div>
                <p className="label-muted mb-0.5">Energy Shape</p>
                <p>{session.energyShape}</p>
              </div>
            )}
          </div>
        </div>

        <div className="animate-fade-up delay-2 space-y-5">
          {/* Pattern */}
          <div className="card-brand p-5">
            <p className="label-wine mb-3">What core pattern surfaced?</p>
            <div className="grid grid-cols-1 gap-2">
              {PATTERNS.map(p => (
                <button
                  key={p}
                  onClick={() => updateSession({ patternSurfaced: p })}
                  className={`chip chip-wine text-left ${session.patternSurfaced === p ? "selected-wine" : ""}`}
                >
                  {session.patternSurfaced === p && <span className="mr-1.5 text-[10px]">●</span>}
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Shift */}
          <div className="card-brand p-5">
            <p className="label-teal mb-3">What shift did you observe?</p>
            <div className="grid grid-cols-1 gap-2">
              {SHIFTS.map(s => (
                <button
                  key={s}
                  onClick={() => updateSession({ shiftObserved: s })}
                  className={`chip text-left ${session.shiftObserved === s ? "selected" : ""}`}
                >
                  {session.shiftObserved === s && <span className="mr-1.5 text-[10px]">●</span>}
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Inspired actions */}
          {!session.inspiredActions && (
            <div className="card-brand p-5">
              <p className="label-gold mb-3">What inspired action did the client name?</p>
              <textarea
                value={session.inspiredActions}
                onChange={e => updateSession({ inspiredActions: e.target.value })}
                placeholder="What one action called to them from today's session?"
                rows={2}
                className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none"
                style={{
                  background: "#f5f2ee",
                  border: "1px solid rgba(23,126,137,0.15)",
                  color: "#2D2D2D",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              />
            </div>
          )}

          {/* Coach notes */}
          <div className="card-brand p-5">
            <p className="label-muted mb-3">Coach observations (private — not in client report)</p>
            <textarea
              value={session.coachNotes}
              onChange={e => updateSession({ coachNotes: e.target.value })}
              placeholder="Anything you want to remember about this session..."
              rows={3}
              className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none"
              style={{
                background: "#f5f2ee",
                border: "1px solid rgba(23,126,137,0.15)",
                color: "#2D2D2D",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            />
          </div>
        </div>

        {error && (
          <div
            className="mt-4 px-4 py-3 rounded-xl text-sm"
            style={{ background: "rgba(192,57,43,0.08)", border: "1px solid rgba(192,57,43,0.25)", color: "#c0392b" }}
          >
            {error}
          </div>
        )}

        <div className="mt-8 flex gap-4">
          <button onClick={() => router.push("/session/10")} className="btn-secondary">
            ← Back
          </button>
          <button
            onClick={handleGenerate}
            disabled={generating || !session.patternSurfaced || !session.shiftObserved}
            className="btn-primary flex-1"
            style={{ borderRadius: "9999px" }}
          >
            {generating ? "Generating Report..." : "Generate Client Report →"}
          </button>
        </div>
      </div>
    </main>
  );
}
