"use client";

import { BODY_REGIONS } from "@/lib/protocol";

interface BodyMapProps {
  selected: string[];
  onToggle: (id: string) => void;
}

export default function BodyMap({ selected, onToggle }: BodyMapProps) {
  return (
    <div className="space-y-3">
      <p className="label-muted">Where does this live in the body?</p>
      <div className="flex gap-5 items-start">
        {/* Body silhouette */}
        <div className="flex-shrink-0 w-20">
          <svg viewBox="0 0 48 100" className="w-full" fill="none">
            <ellipse cx="24" cy="8" rx="7" ry="8" fill="rgba(196,151,90,0.25)" />
            <rect x="21" y="15" width="6" height="4" rx="2" fill="rgba(196,151,90,0.2)" />
            <path d="M14 19 Q10 22 10 32 L10 54 Q10 58 14 60 L20 62 L28 62 L34 60 Q38 58 38 54 L38 32 Q38 22 34 19 Z" fill="rgba(196,151,90,0.2)" />
            <path d="M14 22 Q8 28 7 40 Q6 46 8 50" stroke="rgba(196,151,90,0.25)" strokeWidth="4" strokeLinecap="round" />
            <path d="M34 22 Q40 28 41 40 Q42 46 40 50" stroke="rgba(196,151,90,0.25)" strokeWidth="4" strokeLinecap="round" />
            <path d="M20 62 Q19 72 18 80 Q17 88 17 96" stroke="rgba(196,151,90,0.25)" strokeWidth="5" strokeLinecap="round" />
            <path d="M28 62 Q29 72 30 80 Q31 88 31 96" stroke="rgba(196,151,90,0.25)" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Region chips */}
        <div className="flex flex-wrap gap-2 flex-1">
          {BODY_REGIONS.map(region => {
            const isSelected = selected.includes(region.id);
            return (
              <button
                key={region.id}
                onClick={() => onToggle(region.id)}
                className={`chip ${isSelected ? "chip selected" : ""}`}
              >
                {isSelected && <span className="mr-1 text-[10px]">●</span>}
                {region.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
