"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadSession, clearSession, type SessionData } from "@/lib/session-store";
import { BODY_REGIONS, ENERGY_COLORS } from "@/lib/protocol";

export default function CompletePage() {
  const router = useRouter();
  const [session, setSession] = useState<SessionData | null>(null);
  const [ritualDone, setRitualDone] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const s = loadSession();
    if (!s || !s.innerChildLetter) { router.replace("/"); return; }
    setSession(s);
  }, [router]);

  if (!session) return null;

  async function handleDownload() {
    if (!session) return;
    setDownloading(true);

    const bodyLabels = session.bodyLocation
      .map(id => BODY_REGIONS.find(r => r.id === id)?.label)
      .filter(Boolean)
      .join(", ");

    const colorLabel = ENERGY_COLORS.find(c => c.value === session.energyColor)?.label;

    // Build HTML for print/PDF
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Homecoming Session — ${session.clientName}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500&family=Lora:ital,wght@1,400&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 300;
      color: #2D2D2D;
      background: #FAF8F5;
      padding: 60px 72px;
      max-width: 800px;
      margin: 0 auto;
    }
    .brand { font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: #691d33; margin-bottom: 4px; }
    .title { font-family: 'Playfair Display', serif; font-size: 38px; font-weight: 400; color: #2D2D2D; line-height: 1.2; }
    .subtitle { font-size: 12px; color: #9a9490; margin-top: 6px; }
    .gold-line { height: 1px; background: linear-gradient(90deg, transparent, #C4975A, transparent); margin: 28px 0; opacity: 0.6; }
    .section-label { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: #177E89; margin-bottom: 12px; font-weight: 500; }
    .section-label-wine { color: #691d33; }
    .section-label-gold { color: #C4975A; }
    .body-text { font-size: 13px; line-height: 1.8; color: #444; }
    .letter { font-family: 'Lora', serif; font-style: italic; font-size: 14px; line-height: 1.9; color: #3a3030; }
    .card { background: white; border: 1px solid rgba(196,151,90,0.2); border-radius: 12px; padding: 28px; margin-bottom: 24px; }
    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 0; }
    .meta-item label { font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; color: #9a9490; display: block; margin-bottom: 3px; }
    .meta-item span { font-size: 13px; color: #2D2D2D; }
    .shift-badge { display: inline-block; padding: 4px 12px; border-radius: 20px; background: rgba(23,126,137,0.1); border: 1px solid rgba(23,126,137,0.2); font-size: 11px; color: #177E89; margin-top: 8px; }
    .action-box { background: rgba(196,151,90,0.08); border: 1px solid rgba(196,151,90,0.25); border-radius: 10px; padding: 20px 24px; margin-top: 8px; }
    .action-text { font-size: 13px; color: #2D2D2D; line-height: 1.7; }
    .footer { margin-top: 48px; padding-top: 20px; border-top: 1px solid rgba(196,151,90,0.2); display: flex; justify-content: space-between; align-items: center; }
    .footer-brand { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: #C4975A; }
    .footer-coach { font-size: 11px; color: #9a9490; }
    .scale-row { display: flex; align-items: center; gap: 12px; margin-top: 8px; }
    .scale-bar-bg { flex: 1; height: 4px; background: #eee; border-radius: 2px; }
    .scale-bar { height: 4px; border-radius: 2px; background: linear-gradient(90deg, #691d33, #C4975A); }
    .scale-num { font-size: 12px; font-weight: 500; color: #C4975A; min-width: 32px; }
  </style>
</head>
<body>
  <div class="brand">Path2Love Mastery · Homecoming</div>
  <div class="title">${session.clientName}</div>
  <div class="subtitle">
    Somatic Energy Release Session${session.sessionNumber ? ` #${session.sessionNumber}` : ""} &nbsp;·&nbsp; ${session.sessionDate}
    ${session.coachName ? ` &nbsp;·&nbsp; Coach: ${session.coachName}` : ""}
  </div>
  <div class="gold-line"></div>

  <!-- Snapshot -->
  <div class="card">
    <div class="section-label">Session Snapshot</div>
    <div class="meta-grid">
      <div class="meta-item">
        <label>Opening Intensity</label>
        <div class="scale-row">
          <div class="scale-bar-bg"><div class="scale-bar" style="width:${session.openingScale * 10}%"></div></div>
          <span class="scale-num">${session.openingScale}/10</span>
        </div>
      </div>
      <div class="meta-item">
        <label>Closing Intensity</label>
        <div class="scale-row">
          <div class="scale-bar-bg"><div class="scale-bar" style="width:${session.closingScale * 10}%"></div></div>
          <span class="scale-num">${session.closingScale}/10</span>
        </div>
      </div>
      ${bodyLabels ? `<div class="meta-item"><label>Body Location</label><span>${bodyLabels}</span></div>` : ""}
      ${colorLabel ? `<div class="meta-item"><label>Energy Quality</label><span>${colorLabel}</span></div>` : ""}
      ${session.energyShape ? `<div class="meta-item"><label>Energy Shape</label><span>${session.energyShape}</span></div>` : ""}
      ${session.patternSurfaced ? `<div class="meta-item col-span-2"><label>Core Pattern</label><span>${session.patternSurfaced}</span></div>` : ""}
    </div>
    ${session.shiftObserved ? `<div class="shift-badge">✦ ${session.shiftObserved}</div>` : ""}
  </div>

  <!-- Summary -->
  <div class="card">
    <div class="section-label">What Happened Today</div>
    <div class="body-text">${(session.sessionSummary || "").replace(/\n/g, "<br>")}</div>
  </div>

  ${session.inspiredActions ? `
  <!-- Inspired Action -->
  <div class="section-label section-label-gold" style="margin-bottom: 8px;">Your Inspired Action</div>
  <div class="action-box"><div class="action-text">${session.inspiredActions}</div></div>
  <div style="margin-bottom: 24px;"></div>
  ` : ""}

  <!-- Letter -->
  <div class="gold-line"></div>
  <div class="card" style="border-color: rgba(105,29,51,0.2);">
    <div class="section-label section-label-wine">A Letter to Your Inner Child</div>
    <div class="letter">${(session.innerChildLetter || "").replace(/\n/g, "<br>")}</div>
  </div>

  <div class="footer">
    <div class="footer-brand">Homecoming · Path2Love Mastery</div>
    <div class="footer-coach">path2lovemastery.com</div>
  </div>
</body>
</html>`;

    // Open print dialog
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 800);
    }
    setDownloading(false);
  }

  function handleNewSession() {
    clearSession();
    router.replace("/");
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      {!ritualDone ? (
        /* Closing ritual */
        <div className="max-w-md text-center animate-fade-up">
          <div className="mb-10 flex justify-center">
            <div
              className="animate-breathe w-24 h-24 rounded-full flex items-center justify-center"
              style={{
                background: "radial-gradient(circle, rgba(23,126,137,0.25) 0%, rgba(105,29,51,0.15) 50%, transparent 70%)",
                border: "1px solid rgba(196,151,90,0.2)",
              }}
            >
              <div
                className="w-12 h-12 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(196,151,90,0.3) 0%, transparent 70%)" }}
              />
            </div>
          </div>

          <p className="text-[#C4975A] text-xs uppercase tracking-[0.25em] mb-4">
            Session Complete
          </p>
          <h1 className="text-4xl font-normal text-[#FAF8F5] mb-6 leading-tight">
            {session.clientName} did<br />beautiful work today.
          </h1>
          <div className="gold-line my-6 mx-auto w-24" />

          {session.openingScale > session.closingScale ? (
            <p className="quote text-[#FAF8F5]/60 text-lg mb-2 leading-relaxed">
              From {session.openingScale} to {session.closingScale}.<br />
              Something real shifted in this room.
            </p>
          ) : (
            <p className="quote text-[#FAF8F5]/60 text-lg mb-2 leading-relaxed">
              This work takes courage. The shift is already in motion.
            </p>
          )}

          {session.inspiredActions && (
            <div className="mt-6 mx-auto max-w-xs">
              <p className="text-[#FAF8F5]/30 text-xs uppercase tracking-widest mb-2">
                {session.clientName}&apos;s inspired action
              </p>
              <p className="quote text-[#FAF8F5]/70 text-sm italic leading-relaxed">
                &ldquo;{session.inspiredActions}&rdquo;
              </p>
            </div>
          )}

          <p className="text-[#FAF8F5]/25 text-xs mt-8 mb-10">
            Take a breath. Be here for a moment.
          </p>

          <button
            onClick={() => setRitualDone(true)}
            className="px-10 py-4 rounded-full text-sm tracking-widest uppercase font-medium transition-all"
            style={{
              background: "linear-gradient(135deg, #177E89, #1a9aa7)",
              border: "1px solid rgba(196,151,90,0.25)",
            }}
          >
            Download Report
          </button>
        </div>
      ) : (
        /* Download screen */
        <div className="max-w-md text-center animate-fade-up">
          <p className="text-[#C4975A] text-xs uppercase tracking-[0.2em] mb-4">
            Your Report is Ready
          </p>
          <h1 className="text-3xl font-normal text-[#FAF8F5] mb-2">
            {session.clientName}&apos;s Homecoming Report
          </h1>
          <div className="gold-line my-5 mx-auto w-24" />

          <p className="text-[#FAF8F5]/40 text-sm leading-relaxed mb-8">
            The report includes the session summary, the inner child letter, and the inspired action.
            It opens in a print window — save as PDF or print directly.
          </p>

          <div className="space-y-3">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full py-4 rounded-full text-sm tracking-widest uppercase font-medium transition-all disabled:opacity-50"
              style={{
                background: "linear-gradient(135deg, #691d33, #8a2642)",
                border: "1px solid rgba(196,151,90,0.3)",
              }}
            >
              {downloading ? "Preparing..." : "Open Report to Print / Save PDF"}
            </button>

            <button
              onClick={handleNewSession}
              className="w-full py-3 rounded-full text-xs uppercase tracking-widest text-[#FAF8F5]/30 hover:text-[#FAF8F5]/60 transition-all"
              style={{ border: "1px solid rgba(196,151,90,0.1)" }}
            >
              Start New Session
            </button>
          </div>

          <p className="text-[#FAF8F5]/20 text-xs mt-6">
            Nothing is saved to our servers. This session lives only on your device.
          </p>
        </div>
      )}
    </main>
  );
}
