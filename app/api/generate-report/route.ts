import OpenAI from "openai";
import { type SessionData } from "@/lib/session-store";

export async function POST(request: Request) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const session: SessionData = await request.json();

    const context = [
      session.clientName ? `Client: ${session.clientName}` : "",
      session.sessionNumber ? `Session: #${session.sessionNumber}` : "",
      session.sessionIntention ? `Intention: ${session.sessionIntention}` : "",
      session.imago?.analysis ? `Imago Summary: ${session.imago.analysis}` : "",
      session.openingScale ? `Opening intensity: ${session.openingScale}/10` : "",
      session.closingScale ? `Closing intensity: ${session.closingScale}/10` : "",
      session.bodyLocation?.length ? `Body location(s): ${session.bodyLocation.join(", ")}` : "",
      session.energyColorLabel ? `Energy colour/quality: ${session.energyColorLabel}` : "",
      session.energyShape ? `Energy shape: ${session.energyShape}` : "",
      session.energyDialogue ? `Energy dialogue: ${session.energyDialogue}` : "",
      session.transformation ? `Transformation: ${session.transformation}` : "",
      session.futureVision ? `Future vision: ${session.futureVision}` : "",
      session.inspiredActions ? `Inspired actions: ${session.inspiredActions}` : "",
      session.patternSurfaced ? `Core pattern: ${session.patternSurfaced}` : "",
      session.shiftObserved ? `Shift observed: ${session.shiftObserved}` : "",
    ].filter(Boolean).join("\n");

    const systemPrompt = `You are a compassionate somatic healing facilitator and relationship intelligence coach. You write with warmth, depth, and precision — like a trusted guide speaking directly to someone's heart. You use no em dashes. Write in Canadian spelling (favourite, honour, colour, behaviour). Avoid therapy-speak like "hold space", "unpack", "healing journey", "nervous system".`;

    // Generate inner child letter
    const letterPrompt = `Write a deeply personal letter from ${session.clientName}'s adult self to their inner child. This is based on a somatic energy release session.

Session context:
${context}

The letter must:
- Be 3-4 paragraphs, warm and intimate
- Speak directly to the child by name (${session.clientName})
- Acknowledge what the energy/pattern was protecting
- Validate what the child needed and didn't receive
- Offer what the adult self can now provide
- Reference the specific body location and energy quality
- Close with something the child can carry forward
- Feel like something they would print and put on their fridge

Write only the letter. No headers. No preamble.`;

    // Generate session summary
    const summaryPrompt = `Write a session summary for ${session.clientName}'s somatic energy release session.

Session context:
${context}

Write three short sections:
1. WHAT SURFACED: 2-3 sentences describing the energy, pattern, and where it lived in the body. Specific, not generic.
2. WHAT SHIFTED: 2-3 sentences describing what moved or changed during the session. Use the shift data to be concrete.
3. YOUR INSPIRED ACTION: 1-2 sentences framing their inspired action as a meaningful next step.

Keep each section direct and personal. No bullet points. Speak to ${session.clientName} directly (you/your).`;

    // Generate seed questions for next session
    const seedPrompt = `Based on this somatic energy release session with ${session.clientName}, generate 3 powerful questions to open the next session.

Session context:
${context}

Questions should:
- Build on what emerged in this session
- Invite deeper exploration of the pattern or transformation
- Be open, curious, not leading
- Feel alive and specific to this person's journey

Return only the 3 questions, numbered. No preamble.`;

    const [letterRes, summaryRes, seedRes] = await Promise.all([
      openai.chat.completions.create({
        model: "gpt-4o",
        max_tokens: 800,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: letterPrompt },
        ],
      }),
      openai.chat.completions.create({
        model: "gpt-4o",
        max_tokens: 500,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: summaryPrompt },
        ],
      }),
      openai.chat.completions.create({
        model: "gpt-4o",
        max_tokens: 300,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: seedPrompt },
        ],
      }),
    ]);

    return Response.json({
      success: true,
      innerChildLetter: letterRes.choices[0].message.content || "",
      sessionSummary: summaryRes.choices[0].message.content || "",
      nextSeedQuestions: seedRes.choices[0].message.content || "",
    });
  } catch (error: unknown) {
    console.error("Report generation error:", error);
    const err = error as { status?: number; message?: string };
    let errorMessage = "Unable to generate report. Please try again.";
    if (err.status === 401) errorMessage = "API authentication failed. Check your OpenAI key.";
    else if (err.status === 429) errorMessage = "Rate limited. Please wait a moment and try again.";
    else if (err.message?.includes("network")) errorMessage = "Network error. Check your connection.";

    return Response.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
