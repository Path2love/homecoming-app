"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveSession, EMPTY_SESSION, type SessionData, type ImagoSummary } from "@/lib/session-store";

export default function HomePage() {
  const router = useRouter();
  const [step, setStep] = useState<"welcome" | "setup">("welcome");
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

  if (step === "welcome") {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="animate-fade-up max-w-lg">
          <div className="mb-10 flex justify-center">
            <div
              className="animate-breathe w-20 h-20 rounded-full border border-[#C4975A]/30 flex items-center justify-center"
              style={{ background: "radial-gradient(circle, rgba(105,29,51,0.3) 0%, transparent 70%)" }}
            >
              <div
                className="w-10 h-10 rounded-full border border-[#C4975A]/50"
                style={{ background: "radial-gradient(circle, rgba(196,151,90,0.4) 0%, transparent 70%)" }}
              />
            </div>
          </div>

          <p className="animate-fade-up delay-1 text-[#C4975A] tracking-[0.25em] text-xs uppercase mb-4 font-medium">
            Path2Love Mastery
          </p>
          <h1 className="animate-fade-up delay-2 text-5xl md:text-6xl font-normal text-[#FAF8F5] mb-4 leading-tight">
            Homecoming
          </h1>
          <div className="animate-fade-up delay-3 gold-line my-6 mx-auto w-32" />
          <p className="animate-fade-up delay-4 quote text-[#FAF8F5]/70 text-xl mb-2">
            A guided somatic energy release session.
          </p>
          <p className="animate-fade-up delay-5 text-[#FAF8F5]/40 text-sm mb-12">
            For coach and client, together.
          </p>

          <button
            onClick={() => setStep("setup")}
            className="animate-fade-up delay-6 px-10 py-4 rounded-full text-sm tracking-widest uppercase font-medium transition-all hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg, #691d33, #8a2642)",
              border: "1px solid rgba(196,151,90,0.3)",
            }}
          >
            Begin Session
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-lg animate-fade-up">
        <button
          onClick={() => setStep("welcome")}
          className="text-[#C4975A]/60 text-xs uppercase tracking-widest mb-8 hover:text-[#C4975A] transition-colors"
        >
          ← Back
        </button>

        <h2 className="text-3xl font-normal text-[#FAF8F5] mb-2">Session Setup</h2>
        <div className="gold-line my-4 w-24" />
        <p className="text-[#FAF8F5]/50 text-sm mb-8">Who is in the room today?</p>

        <div className="space-y-5">
          <div>
            <label className="block text-[#FAF8F5]/60 text-xs uppercase tracking-widest mb-2">
              Client Name *
            </label>
            <input
              type="text"
              value={form.clientName}
              onChange={e => setForm(f => ({ ...f, clientName: e.target.value }))}
              placeholder="First name"
              className="w-full px-4 py-3 rounded-lg text-[#FAF8F5] placeholder-[#FAF8F5]/25 text-sm outline-none"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(196,151,90,0.2)" }}
            />
          </div>

          <div>
            <label className="block text-[#FAF8F5]/60 text-xs uppercase tracking-widest mb-2">
              Coach Name
            </label>
            <input
              type="text"
              value={form.coachName}
              onChange={e => setForm(f => ({ ...f, coachName: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg text-[#FAF8F5] text-sm outline-none"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(196,151,90,0.2)" }}
            />
          </div>

          <div>
            <label className="block text-[#FAF8F5]/60 text-xs uppercase tracking-widest mb-2">
              Session Number (optional)
            </label>
            <input
              type="number"
              value={form.sessionNumber}
              onChange={e => setForm(f => ({ ...f, sessionNumber: e.target.value }))}
              placeholder="e.g. 6"
              className="w-full px-4 py-3 rounded-lg text-[#FAF8F5] placeholder-[#FAF8F5]/25 text-sm outline-none"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(196,151,90,0.2)" }}
            />
          </div>

          <div>
            <label className="block text-[#FAF8F5]/60 text-xs uppercase tracking-widest mb-2">
              Session Intention (optional)
            </label>
            <input
              type="text"
              value={form.sessionIntention}
              onChange={e => setForm(f => ({ ...f, sessionIntention: e.target.value }))}
              placeholder="What does the client want to release today?"
              className="w-full px-4 py-3 rounded-lg text-[#FAF8F5] placeholder-[#FAF8F5]/25 text-sm outline-none"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(196,151,90,0.2)" }}
            />
          </div>

          <div>
            <label className="block text-[#FAF8F5]/60 text-xs uppercase tracking-widest mb-2">
              Imago Summary (optional — personalises the report)
            </label>
            <div
              className="rounded-lg p-4 space-y-3"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(196,151,90,0.12)" }}
            >
              <p className="text-[#FAF8F5]/40 text-xs leading-relaxed">
                An Imago Summary maps childhood wounds, caregiver patterns, and relationship blueprints. Upload the client&apos;s PDF or paste key details to generate a deeply personalised session report.
              </p>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer px-4 py-2 rounded-lg text-xs text-[#C4975A] border border-[#C4975A]/30 hover:border-[#C4975A]/60 transition-colors">
                  {imagoFile ? `✓ ${imagoFile.name}` : "Upload PDF or text file"}
                  <input
                    type="file"
                    accept=".pdf,.txt,.md"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </label>
                {imagoFile && (
                  <button
                    onClick={() => setImagoFile(null)}
                    className="text-[#FAF8F5]/30 text-xs hover:text-[#FAF8F5]/60"
                  >
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
                  className="w-full px-3 py-2 rounded-lg text-[#FAF8F5] placeholder-[#FAF8F5]/20 text-xs outline-none resize-none"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(196,151,90,0.1)" }}
                />
              )}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={handleBegin}
            disabled={!form.clientName.trim() || loading}
            className="w-full py-4 rounded-full text-sm tracking-widest uppercase font-medium transition-all disabled:opacity-30"
            style={{
              background: form.clientName.trim()
                ? "linear-gradient(135deg, #691d33, #8a2642)"
                : "rgba(105,29,51,0.3)",
              border: "1px solid rgba(196,151,90,0.3)",
            }}
          >
            {loading ? "Preparing..." : "Enter the Session"}
          </button>
        </div>
      </div>
    </main>
  );
}
