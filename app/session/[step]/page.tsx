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
    // Save reflection if applicable
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
    <main className="min-h-screen flex flex-col">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-[2px] bg-[rgba(196,151,90,0.1)]">
          <div
            className="h-full transition-all duration-700 ease-in-out"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #691d33, #C4975A)",
            }}
          />
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-8 pb-4">
        <div>
          <p className="text-[#C4975A]/60 text-xs uppercase tracking-widest">
            Step {stepNum} of {PROTOCOL_STEPS.length}
          </p>
          <h2 className="text-[#FAF8F5]/30 text-sm mt-0.5">
            with {session.clientName}
          </h2>
        </div>
        <button
          onClick={() => { setHolding(h => !h); }}
          className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest transition-all ${holding ? "holding" : ""}`}
          style={{
            background: holding ? "rgba(196,151,90,0.2)" : "rgba(255,255,255,0.04)",
            border: holding ? "1px solid rgba(196,151,90,0.5)" : "1px solid rgba(196,151,90,0.15)",
            color: holding ? "#C4975A" : "rgba(250,248,245,0.4)",
          }}
        >
          {holding ? "● Holding" : "Hold Here"}
        </button>
      </div>

      <div className="gold-line mx-6" />

      {/* Main content */}
      <div className="flex-1 flex flex-col px-6 py-6 max-w-2xl mx-auto w-full">
        <div className="animate-fade-up">
          {/* Step identity */}
          <div className="mb-8">
            <p className="text-[#C4975A] text-xs uppercase tracking-[0.2em] mb-2">
              {protocolStep.subtitle}
            </p>
            <h1 className="text-4xl font-normal text-[#FAF8F5] mb-1">
              {protocolStep.title}
            </h1>
            {protocolStep.duration && (
              <p className="text-[#FAF8F5]/25 text-xs">{protocolStep.duration}</p>
            )}
          </div>

          {/* Dual view: coach prompt + client focus */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Coach */}
            <div
              className="glass-card rounded-xl p-5"
              style={{ borderColor: "rgba(105,29,51,0.3)" }}
            >
              <p className="text-[#8a2642] text-[10px] uppercase tracking-widest mb-3 font-medium">
                Coach Guidance
              </p>
              <p className="text-[#FAF8F5]/80 text-sm leading-relaxed">
                {protocolStep.coachPrompt}
              </p>
            </div>

            {/* Client */}
            <div
              className="glass-card rounded-xl p-5"
              style={{ borderColor: "rgba(23,126,137,0.2)" }}
            >
              <p className="text-[#177E89] text-[10px] uppercase tracking-widest mb-3 font-medium">
                Client Experience
              </p>
              <p className="quote text-[#FAF8F5]/70 text-sm leading-relaxed">
                &ldquo;{protocolStep.clientFocus}&rdquo;
              </p>
            </div>
          </div>

          {/* Opening / Closing scale */}
          {protocolStep.hasScale && (
            <div className="glass-card rounded-xl p-5 mb-6">
              <p className="text-[#FAF8F5]/60 text-xs uppercase tracking-widest mb-1">
                {protocolStep.scaleLabel}
              </p>
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
                <div className="flex justify-between text-[10px] text-[#FAF8F5]/30">
                  <span>1 — Barely there</span>
                  <span className="text-[#C4975A] font-medium text-sm">
                    {stepNum === 1 ? session.openingScale : session.closingScale}
                  </span>
                  <span>10 — Overwhelming</span>
                </div>
              </div>
            </div>
          )}

          {/* Body map */}
          {protocolStep.hasBodyMap && (
            <div className="glass-card rounded-xl p-5 mb-6">
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
                <p className="mt-3 text-[#C4975A]/60 text-xs">
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
            <div className="glass-card rounded-xl p-5 mb-6">
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

          {/* Reflection capture for dialogue steps */}
          {protocolStep.reflection && (
            <div className="glass-card rounded-xl p-5 mb-6">
              <p className="text-[#FAF8F5]/50 text-xs uppercase tracking-widest mb-3">
                Coach — what&apos;s surfacing? (optional notes)
              </p>
              <textarea
                value={reflection}
                onChange={e => setReflection(e.target.value)}
                placeholder={protocolStep.reflection}
                rows={3}
                className="w-full px-3 py-2 rounded-lg text-[#FAF8F5] placeholder-[#FAF8F5]/20 text-sm outline-none resize-none"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(196,151,90,0.1)" }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky bottom-0 px-6 py-5" style={{ background: "rgba(26,22,22,0.9)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(196,151,90,0.1)" }}>
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            className="px-6 py-3 rounded-full text-xs uppercase tracking-widest transition-all text-[#FAF8F5]/40 hover:text-[#FAF8F5]/70"
            style={{ border: "1px solid rgba(196,151,90,0.15)" }}
          >
            ← Back
          </button>

          <div className="flex gap-1">
            {PROTOCOL_STEPS.map((_, i) => (
              <div
                key={i}
                className="h-1 rounded-full transition-all"
                style={{
                  width: i + 1 === stepNum ? "20px" : "6px",
                  background: i + 1 <= stepNum ? "#C4975A" : "rgba(196,151,90,0.2)",
                }}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="px-8 py-3 rounded-full text-xs uppercase tracking-widest transition-all font-medium"
            style={{
              background: "linear-gradient(135deg, #691d33, #8a2642)",
              border: "1px solid rgba(196,151,90,0.3)",
            }}
          >
            {stepNum === PROTOCOL_STEPS.length ? "Complete →" : "Next →"}
          </button>
        </div>
      </div>
    </main>
  );
}
