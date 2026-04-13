"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { loadSession, saveSession, type SessionData } from "@/lib/session-store";
import { PROTOCOL_STEPS, BODY_REGIONS } from "@/lib/protocol";
import BodyMap from "@/components/BodyMap";
import EnergySelector from "@/components/EnergySelector";

export default function SessionPage({ params }: { params: Promise<{ step: string }> }) {
  const { step } = use(params);
  const stepNum = parseInt(step);
  const router = useRouter();
  const [session, setSession] = useState<SessionData | null>(null);
  const [holding, setHolding] = useState(false);
  const [reflection, setReflection] = useState("");

  const protocolStep = PROTOCOL_STEPS[stepNum - 1];

  useEffect(() => {
    const s = loadSession();
    if (!s) { router.replace("/"); return; }
    setSession(s);
  }, [router]);

  if (!session || !protocolStep) return null;

  function updateSession(updates: Partial<SessionData>) {
    const updated = { ...session!, ...updates };
    setSession(updated);
    saveSession(updated);
  }

  function handleNext() {
    if (reflection.trim()) {
      const key = stepNum === 7 ? "energyDialogue"
        : stepNum === 8 ? "transformation"
        : stepNum === 9 ? "futureVision"
        : stepNum === 10 ? "inspiredActions"
        : null;
      if (key) updateSession({ [key]: reflection });
    }

    if (stepNum < PROTOCOL_STEPS.length) {
      setReflection("");
      setHolding(false);
      router.push(`/session/${stepNum + 1}`);
    } else {
      router.push("/synthesis");
    }
  }

  function handlePrev() {
    if (stepNum > 1) {
      setHolding(false);
      router.push(`/session/${stepNum - 1}`);
    } else {
      router.replace("/");
    }
  }

  const progress = (stepNum / PROTOCOL_STEPS.length) * 100;

  return (
    <main className="min-h-screen flex flex-col" style={{ background: "#FAF8F5" }}>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div style={{ height: "3px", background: "#e5e0db" }}>
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Header */}
      <div
        className="flex items-center justify-between px-6 pt-8 pb-5"
        style={{ borderBottom: "1px solid rgba(23,126,137,0.1)" }}
      >
        <div>
          <p className="label-gold mb-0.5">Step {stepNum} of {PROTOCOL_STEPS.length}</p>
          <h3 className="text-base font-normal" style={{ fontFamily: "'Playfair Display', serif", color: "#2D2D2D" }}>
            Session with {session.clientName}
          </h3>
        </div>
        <button
          onClick={() => setHolding(h => !h)}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${holding ? "holding" : ""}`}
          style={{
            background: holding ? "rgba(196,151,90,0.12)" : "rgba(23,126,137,0.06)",
            border: holding ? "1px solid rgba(196,151,90,0.5)" : "1px solid rgba(23,126,137,0.2)",
            color: holding ? "#C4975A" : "#177E89",
            letterSpacing: "0.08em",
          }}
        >
          {holding ? "● Holding" : "Hold Here"}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 max-w-2xl mx-auto w-full">
        <div className="animate-fade-up">
          {/* Step header */}
          <div className="mb-7">
            <p className="label-teal mb-2">{protocolStep.subtitle}</p>
            <h1 className="text-4xl font-normal mb-1">{protocolStep.title}</h1>
            {protocolStep.duration && (
              <p className="text-xs" style={{ color: "#b0ada8" }}>{protocolStep.duration}</p>
            )}
          </div>

          {/* Coach Script */}
          <div className="card-wine p-5 mb-4">
            <p className="label-wine mb-3">Coach Script</p>
            <div className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "#3a3030" }}>
              {protocolStep.coachScript}
            </div>
          </div>

          {/* Client focus + Coach notes side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="card-brand p-5">
              <p className="label-teal mb-3">Client Screen</p>
              <p className="quote text-sm leading-relaxed" style={{ color: "#4a4a4a" }}>
                &ldquo;{protocolStep.clientFocus}&rdquo;
              </p>
            </div>
            <div className="rounded-xl p-5" style={{ background: "#f5f2ee", border: "1px solid rgba(196,151,90,0.2)" }}>
              <p className="label-gold mb-3">Coach Notes</p>
              <p className="text-xs leading-relaxed" style={{ color: "#6a6460" }}>
                {protocolStep.coachNotes}
              </p>
            </div>
          </div>

          {/* Follow-up questions */}
          <div className="card-brand p-5 mb-4">
            <p className="label-teal mb-3">Suggested Follow-Up Questions</p>
            <div className="space-y-2">
              {protocolStep.followUpQuestions.map((q, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="text-xs font-semibold mt-0.5 flex-shrink-0" style={{ color: "#177E89" }}>{i + 1}</span>
                  <p className="text-sm" style={{ color: "#4a4a4a" }}>{q}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Scale */}
          {protocolStep.hasScale && (
            <div className="card-brand p-5 mb-5">
              <p className="label-muted mb-1">{protocolStep.scaleLabel}</p>
              <div className="mt-4 space-y-2">
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={stepNum === 1 ? session.openingScale : session.closingScale}
                  onChange={e => {
                    const val = parseInt(e.target.value);
                    if (stepNum === 1) updateSession({ openingScale: val });
                    else updateSession({ closingScale: val });
                  }}
                  className="w-full"
                />
                <div className="flex justify-between">
                  <span className="text-xs" style={{ color: "#b0ada8" }}>1 — Barely there</span>
                  <span className="text-lg font-semibold" style={{ color: "#177E89" }}>
                    {stepNum === 1 ? session.openingScale : session.closingScale}
                  </span>
                  <span className="text-xs" style={{ color: "#b0ada8" }}>10 — Overwhelming</span>
                </div>
              </div>
            </div>
          )}

          {/* Body map */}
          {protocolStep.hasBodyMap && (
            <div className="card-brand p-5 mb-5">
              <BodyMap
                selected={session.bodyLocation}
                onToggle={id => {
                  const current = session.bodyLocation;
                  const updated = current.includes(id)
                    ? current.filter(x => x !== id)
                    : [...current, id];
                  updateSession({ bodyLocation: updated });
                }}
              />
              {session.bodyLocation.length > 0 && (
                <p className="mt-3 text-xs" style={{ color: "#177E89" }}>
                  {session.bodyLocation
                    .map(id => BODY_REGIONS.find(r => r.id === id)?.label)
                    .filter(Boolean)
                    .join(", ")}
                </p>
              )}
            </div>
          )}

          {/* Energy selector */}
          {protocolStep.hasEnergySelector && (
            <div className="card-brand p-5 mb-5">
              <EnergySelector
                selectedColor={session.energyColor}
                selectedShape={session.energyShape}
                onColorChange={(value, label) =>
                  updateSession({ energyColor: value, energyColorLabel: label })
                }
                onShapeChange={shape => updateSession({ energyShape: shape })}
              />
            </div>
          )}

          {/* Reflection capture */}
          {protocolStep.reflection && (
            <div className="card-brand p-5 mb-5">
              <p className="label-muted mb-3">Coach — what&apos;s surfacing? (optional notes)</p>
              <textarea
                value={reflection}
                onChange={e => setReflection(e.target.value)}
                placeholder={protocolStep.reflection}
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
          )}
        </div>
      </div>

      {/* Bottom nav */}
      <div
        className="sticky bottom-0 px-6 py-4"
        style={{ background: "rgba(250,248,245,0.95)", backdropFilter: "blur(10px)", borderTop: "1px solid rgba(23,126,137,0.1)" }}
      >
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <button onClick={handlePrev} className="btn-secondary">
            ← Back
          </button>

          {/* Step dots */}
          <div className="flex gap-1 items-center">
            {PROTOCOL_STEPS.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i + 1 === stepNum ? "18px" : "6px",
                  height: "6px",
                  background: i + 1 <= stepNum ? "#177E89" : "rgba(23,126,137,0.2)",
                }}
              />
            ))}
          </div>

          <button onClick={handleNext} className="btn-primary">
            {stepNum === PROTOCOL_STEPS.length ? "Complete →" : "Next →"}
          </button>
        </div>
      </div>
    </main>
  );
}
