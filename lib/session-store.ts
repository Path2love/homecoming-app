"use client";

export interface ImagoSummary {
  caregivers?: string;
  wounds?: string;
  attractionPatterns?: string;
  consciousVision?: string;
  analysis?: string;
}

export interface SessionData {
  // Setup
  clientName: string;
  coachName: string;
  sessionDate: string;
  sessionNumber?: number;
  imago?: ImagoSummary;
  sessionIntention?: string;

  // Opening
  openingScale: number;

  // Protocol captures
  bodyLocation: string[];
  energyColor: string;
  energyColorLabel: string;
  energyShape: string;
  energyDialogue: string;
  transformation: string;
  futureVision: string;
  inspiredActions: string;

  // Closing
  closingScale: number;

  // Coach synthesis (Mode 2)
  patternSurfaced: string;
  shiftObserved: string;
  coachNotes: string;

  // Generated
  innerChildLetter?: string;
  sessionSummary?: string;
  nextSeedQuestions?: string;
}

export const EMPTY_SESSION: SessionData = {
  clientName: "",
  coachName: "",
  sessionDate: new Date().toISOString().split("T")[0],
  openingScale: 5,
  bodyLocation: [],
  energyColor: "",
  energyColorLabel: "",
  energyShape: "",
  energyDialogue: "",
  transformation: "",
  futureVision: "",
  inspiredActions: "",
  closingScale: 5,
  patternSurfaced: "",
  shiftObserved: "",
  coachNotes: "",
};

export function saveSession(data: SessionData) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("homecoming_session", JSON.stringify(data));
  }
}

export function loadSession(): SessionData | null {
  if (typeof window !== "undefined") {
    const raw = sessionStorage.getItem("homecoming_session");
    if (raw) return JSON.parse(raw);
  }
  return null;
}

export function clearSession() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("homecoming_session");
  }
}
