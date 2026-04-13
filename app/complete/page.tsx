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

    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Homecoming Session — ${session.clientName}</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&family=Lora:ital,wght@1,400&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 300;
      color: #2D2D2D;
      background: #FAF8F5;
      padding: 64px 72px;
      max-width: 760px;
      margin: 0 auto;
    }
    .brand { font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: #691d33; margin-bottom: 5px; }
    h1 { font-family: 'Playfair Display', serif; font-size: 40px; font-weight: 400; color: #2D2D2D; line-height: 1.15; }
    .meta { font-size: 12px; color: #9a9490; margin-top: 6px; }
    .gold-line { height: 1px; background: linear-gradient(90deg, transparent, #C4975A 40%, transparent); margin: 24px 0; opacity: 0.6; }
    .label { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 600; margin-bottom: 10px; }
    .label-teal { color: #177E89; }
    .label-wine { color: #691d33; }
    .label-gold { color: #C4975A; }
    .card { background: #ffffff; border: 1px solid rgba(23,126,137,0.15); border-radius: 14px; padding: 28px 32px; margin-bottom: 22px; box-shadow: 0 2px 12px rgba(23,126,137,0.06); }
    .card-wine { background: #ffffff; border: 1px solid rgba(105,29,51,0.15); border-radius: 14px; padding: 28px 32px; margin-bottom: 22px; }
    .body-text { font-size: 13.5px; line-height: 1.8; color: #3a3a3a; }
    .letter { font-family: 'Lora', serif; font-style: italic; font-size: 14.5px; line-height: 1.9; color: #3a3030; }
    .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px 24px; }
    .meta-label { font-size: 9px; letter-spacing: 0.15em; text-transform: uppercase; color: #9a9490; display: block; margin-bottom: 3px; }
    .meta-value { font-size: 13px; color: #2D2D2D; font-weight: 500; }
    .shift-pill { display: inline-block; padding: 5px 14px; border-radius: 20px; background: rgba(23,126,137,0.08); border: 1px solid rgba(23,126,137,0.2); font-size: 11px; color: #177E89; margin-top: 10px; }
    .action-box { background: rgba(196,151,90,0.07); border-left: 3px solid #C4975A; border-radius: 0 10px 10px 0; padding: 18px 22px; margin-bottom: 22px; }
    .scale-row { display: flex; align-items: center; gap: 10px; margin-top: 6px; }
    .scale-bar-bg { flex: 1; height: 4px; background: #ede9e4; border-radius: 2px; }
    .scale-bar { height: 4px; border-radius: 2px; background: linear-gradient(90deg, #691d33, #C4975A); }
    .scale-num { font-size: 14px; font-weight: 600; color: #177E89; min-width: 36px; }
    .footer { margin-top: 48px; padding-top: 18px; border-top: 1px solid rgba(196,151,90,0.3); display: flex; justify-content: space-between; align-items: center; }
    .footer-brand { font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: #C4975A; }
    .footer-site { font-size: 11px; color: #9a9490; }
    @media print { body { padding: 40px 48px; } }
  </style>
</head>
<body>
  <div class="brand">Path2Love Mastery · Homecoming</div>
  <h1>${session.clientName}</h1>
  <div class="meta">
    Somatic Energy Release${session.sessionNumber ? ` — Session #${session.sessionNumber}` : ""} &nbsp;·&nbsp; ${session.sessionDate}
    ${session.coachName ? ` &nbsp;·&nbsp; Coach: ${session.coachName}` : ""}
  </div>
  <div class="gold-line"></div>

  <!-- Snapshot -->
  <div class="card">
    <div class="label label-teal">Session Snapshot</div>
    <div class="meta-grid">
      <div>
        <span class="meta-label">Opening Intensity</span>
        <div class="scale-row">
          <div class="scale-bar-bg"><div class="scale-bar" style="width:${session.openingScale * 10}%"></div></div>
          <span class="scale-num">${session.openingScale}/10</span>
        </div>
      </div>
      <div>
        <span class="meta-label">Closing Intensity</span>
        <div class="scale-row">
          <div class="scale-bar-bg"><div class="scale-bar" style="width:${session.closingScale * 10}%"></div></div>
          <span class="scale-num">${session.closingScale}/10</span>
        </div>
      </div>
      ${bodyLabels ? `<div><span class="meta-label">Body Location</span><span class="meta-value">${bodyLabels}</span></div>` : ""}
      ${colorLabel ? `<div><span class="meta-label">Energy Quality</span><span class="meta-value">${colorLabel}</span></div>` : ""}
      ${session.energyShape ? `<div><span class="meta-label">Energy Shape</span><span class="meta-value">${session.energyShape}</span></div>` : ""}
      ${session.patternSurfaced ? `<div style="grid-column: span 2"><span class="meta-label">Core Pattern</span><span class="meta-value">${session.patternSurfaced}</span></div>` : ""}
    </div>
    ${session.shiftObserved ? `<div class="shift-pill">✦ ${session.shiftObserved}</div>` : ""}
  </div>

  <!-- What Happened -->
  <div class="card">
    <div class="label label-teal">What Happened Today</div>
    <div class="body-text">${(session.sessionSummary || "").replace(/\n/g, "<br>")}</div>
  </div>

  ${session.inspiredActions ? `
  <div class="action-box">
    <div class="label label-gold" style="margin-bottom: 8px;">Your Inspired Action</div>
    <div class="body-text">${session.inspiredActions}</div>
  </div>
  ` : ""}

  <div class="gold-line"></div>

  <!-- Letter -->
  <div class="card-wine">
    <div class="label label-wine">A Letter to Your Inner Child</div>
    <div class="letter">${(session.innerChildLetter || "").replace(/\n/g, "<br>")}</div>
  </div>

  <div class="footer">
    <div class="footer-brand">Homecoming · Path2Love Mastery</div>
    <div class="footer-site">path2lovemastery.com</div>
  </div>
</body>
</html>`;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => printWindow.print(), 800);
    }
    setDownloading(false);
  }

  function handleNewSession() {
    clearSession();
    router.replace("/");
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16" style={{ background: "#FAF8F5" }}>
      {!ritualDone ? (
        /* Closing ritual */
        <div className="max-w-md text-center animate-fade-up">
          <div className="mb-10 flex justify-center">
            <div
              className="animate-breathe w-24 h-24 rounded-full flex items-center justify-center"
              style={{
                background: "radial-gradient(circle, rgba(23,126,137,0.12) 0%, rgba(196,151,90,0.08) 60%, transparent 100%)",
                border: "1px solid rgba(196,151,90,0.3)",
              }}
            >
              <div
                className="w-12 h-12 rounded-full"
                style={{ background: "radial-gradient(circle, rgba(105,29,51,0.1) 0%, rgba(196,151,90,0.08) 100%)", border: "1px solid rgba(196,151,90,0.25)" }}
              />
            </div>
          </div>

          <p className="label-teal mb-4">Session Complete</p>
          <h1 className="text-4xl font-normal mb-5 leading-tight">
            {session.clientName} did<br />beautiful work today.
          </h1>
          <div className="gold-line mx-auto w-28 my-5" />

          {session.openingScale > session.closingScale ? (
            <p className="quote text-lg mb-2 leading-relaxed" style={{ color: "#5a5550" }}>
              From {session.openingScale} to {session.closingScale}.<br />
              Something real shifted in this room.
            </p>
          ) : (
            <p className="quote text-lg mb-2 leading-relaxed" style={{ color: "#5a5550" }}>
              This work takes courage.<br />The shift is already in motion.
            </p>
          )}

          {session.inspiredActions && (
            <div className="mt-6 mx-auto max-w-xs">
              <p className="label-muted mb-2">{session.clientName}&apos;s inspired action</p>
              <p className="quote text-sm leading-relaxed" style={{ color: "#5a5550" }}>
                &ldquo;{session.inspiredActions}&rdquo;
              </p>
            </div>
          )}

          <p className="text-xs mt-8 mb-10" style={{ color: "#b0ada8" }}>
            Take a breath. Be here for a moment.
          </p>

          <button onClick={() => setRitualDone(true)} className="btn-primary">
            Download Report →
          </button>
        </div>
      ) : (
        /* Download */
        <div className="max-w-md text-center animate-fade-up">
          <p className="label-teal mb-4">Your Report is Ready</p>
          <h1 className="text-3xl font-normal mb-2">{session.clientName}&apos;s Homecoming Report</h1>
          <div className="gold-line mx-auto w-24 my-5" />

          <p className="text-sm leading-relaxed mb-8" style={{ color: "#7a7470" }}>
            Opens in a print window — save as PDF or print directly.
            The report includes the session summary, inner child letter, and inspired action.
          </p>

          <div className="space-y-3">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="btn-wine w-full"
              style={{ width: "100%", borderRadius: "9999px" }}
            >
              {downloading ? "Preparing..." : "Open Report to Print / Save PDF"}
            </button>

            <button
              onClick={handleNewSession}
              className="btn-secondary w-full"
              style={{ width: "100%", borderRadius: "9999px" }}
            >
              Start New Session
            </button>
          </div>

          <p className="text-xs mt-6" style={{ color: "#c0bdb8" }}>
            Nothing is saved to our servers. This session lives only on your device.
          </p>
        </div>
      )}
    </main>
  );
}
