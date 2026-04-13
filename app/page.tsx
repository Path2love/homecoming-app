"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveSession, EMPTY_SESSION, type SessionData, type ImagoSummary } from "@/lib/session-store";

export default function HomePage() {
  const router = useRouter();
  const [view, setView] = useState<"welcome" | "setup">("welcome");
  const [form, setForm] = useState({
    clientName: "",
    coachName: "Alison Verge",
    sessionNumber: "",
    sessionIntention: "",
  });
  const [imagoText, setImagoText] = useState("");
  const [imagoFile, setImagoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (file && file.size > 5 * 1024 * 1024) {
      alert("File must be under 5MB.");
      return;
    }
    setImagoFile(file);
  }

  async function handleBegin() {
    if (!form.clientName.trim()) return;
    setLoading(true);

    let imago: ImagoSummary | undefined;
    if (imagoFile) {
      const text = await imagoFile.text();
      imago = { analysis: text.slice(0, 3000) };
    } else if (imagoText.trim()) {
      imago = { analysis: imagoText.trim() };
    }

    const session: SessionData = {
      ...EMPTY_SESSION,
      clientName: form.clientName.trim(),
      coachName: form.coachName.trim(),
      sessionDate: new Date().toISOString().split("T")[0],
      sessionNumber: form.sessionNumber ? parseInt(form.sessionNumber) : undefined,
      sessionIntention: form.sessionIntention.trim(),
      imago,
    };

    saveSession(session);
    router.push("/session/1");
  }

  if (view === "welcome") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center">
        {/* Warm header glow */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 35% at 50% 0%, rgba(105,29,51,0.07) 0%, transparent 60%)" }}
        />

        <div className="relative animate-fade-up max-w-md">
          {/* Breathing orb */}
          <div className="mb-10 flex justify-center">
            <div
              className="animate-breathe w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: "radial-gradient(circle, rgba(196,151,90,0.15) 0%, rgba(105,29,51,0.08) 60%, transparent 100%)",
                border: "1px solid rgba(196,151,90,0.3)",
              }}
            >
              <div
                className="w-10 h-10 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(105,29,51,0.2) 0%, rgba(196,151,90,0.1) 100%)",
                  border: "1px solid rgba(196,151,90,0.4)",
                }}
              />
            </div>
          </div>

          <p className="animate-fade-up delay-1 label-gold mb-4">Path2Love Mastery</p>

          <h1 className="animate-fade-up delay-2 text-5xl md:text-6xl font-normal mb-3" style={{ color: "#2D2D2D", lineHeight: 1.1 }}>
            Homecoming
          </h1>

          <div className="animate-fade-up delay-3 gold-line mx-auto w-28 my-6" />

          <p className="animate-fade-up delay-4 quote text-lg mb-2" style={{ color: "#5a5550" }}>
            A guided somatic energy release session.
          </p>
          <p className="animate-fade-up delay-5 text-sm mb-12" style={{ color: "#9a9490" }}>
            For coach and client, together.
          </p>

          <button
            onClick={() => setView("setup")}
            className="animate-fade-up delay-6 btn-wine"
          >
            Begin Session
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col px-6 py-12">
      <div className="w-full max-w-lg mx-auto">
        <button
          onClick={() => setView("welcome")}
          className="text-sm mb-8 transition-colors"
          style={{ color: "#9a9490" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#177E89")}
          onMouseLeave={e => (e.currentTarget.style.color = "#9a9490")}
        >
          ← Back
        </button>

        <h2 className="text-3xl font-normal mb-1">Session Setup</h2>
        <div className="gold-line my-5 w-20" />
        <p className="text-sm mb-8" style={{ color: "#7a7470" }}>Who is in the room today?</p>

        <div className="space-y-5">
          <div>
            <label className="block label-muted mb-2">Client Name *</label>
            <input
              type="text"
              value={form.clientName}
              onChange={e => setForm(f => ({ ...f, clientName: e.target.value }))}
              placeholder="First name"
              className="input-brand"
            />
          </div>

          <div>
            <label className="block label-muted mb-2">Coach Name</label>
            <input
              type="text"
              value={form.coachName}
              onChange={e => setForm(f => ({ ...f, coachName: e.target.value }))}
              className="input-brand"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block label-muted mb-2">Session Number</label>
              <input
                type="number"
                value={form.sessionNumber}
                onChange={e => setForm(f => ({ ...f, sessionNumber: e.target.value }))}
                placeholder="e.g. 6"
                className="input-brand"
              />
            </div>
            <div>
              <label className="block label-muted mb-2">Date</label>
              <input
                type="text"
                value={new Date().toLocaleDateString("en-CA")}
                readOnly
                className="input-brand"
                style={{ opacity: 0.6 }}
              />
            </div>
          </div>

          <div>
            <label className="block label-muted mb-2">Session Intention</label>
            <input
              type="text"
              value={form.sessionIntention}
              onChange={e => setForm(f => ({ ...f, sessionIntention: e.target.value }))}
              placeholder="What does the client want to release today?"
              className="input-brand"
            />
          </div>

          {/* Imago Summary */}
          <div>
            <label className="block label-muted mb-2">Imago Summary (optional)</label>
            <div
              className="rounded-xl p-4 space-y-3"
              style={{ background: "#f5f2ee", border: "1px solid rgba(23,126,137,0.12)" }}
            >
              <p className="text-xs leading-relaxed" style={{ color: "#9a9490" }}>
                An Imago Summary maps childhood wounds, caregiver patterns, and relationship blueprints.
                Upload or paste to personalise the generated report.
              </p>
              <div className="flex items-center gap-3">
                <label
                  className="cursor-pointer px-4 py-2 rounded-lg text-xs font-medium transition-colors"
                  style={{
                    color: "#177E89",
                    border: "1px solid rgba(23,126,137,0.3)",
                    background: "rgba(23,126,137,0.04)",
                  }}
                >
                  {imagoFile ? `✓ ${imagoFile.name}` : "Upload PDF or text file"}
                  <input type="file" accept=".pdf,.txt,.md" onChange={handleFileChange} className="sr-only" />
                </label>
                {imagoFile && (
                  <button onClick={() => setImagoFile(null)} className="text-xs" style={{ color: "#9a9490" }}>
                    Remove
                  </button>
                )}
              </div>
              {!imagoFile && (
                <textarea
                  value={imagoText}
                  onChange={e => setImagoText(e.target.value)}
                  placeholder="Or paste key wounds, patterns, caregiver details..."
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none"
                  style={{
                    background: "#ffffff",
                    border: "1px solid rgba(23,126,137,0.15)",
                    color: "#2D2D2D",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={handleBegin}
            disabled={!form.clientName.trim() || loading}
            className="btn-wine w-full"
            style={{ width: "100%", borderRadius: "9999px" }}
          >
            {loading ? "Preparing..." : "Enter the Session"}
          </button>
        </div>
      </div>
    </main>
  );
}
