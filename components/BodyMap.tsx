"use client";

import { BODY_REGIONS } from "@/lib/protocol";

interface BodyMapProps {
  selected: string[];
  onToggle: (id: string) => void;
}

export default function BodyMap({ selected, onToggle }: BodyMapProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-[#FAF8F5]/50 text-xs uppercase tracking-widest">
        Where does this live in the body?
      </p>
      <div className="flex gap-6 items-start">
        {/* SVG body silhouette */}
        <div className="relative w-24 flex-shrink-0">
          <svg viewBox="0 0 48 100" className="w-full opacity-30" fill="none">
            {/* Head */}
            <ellipse cx="24" cy="8" rx="7" ry="8" fill="#C4975A" />
            {/* Neck */}
            <rect x="21" y="15" width="6" height="4" rx="2" fill="#C4975A" />
            {/* Torso */}
            <path d="M14 19 Q10 22 10 32 L10 54 Q10 58 14 60 L20 62 L28 62 L34 60 Q38 58 38 54 L38 32 Q38 22 34 19 Z" fill="#C4975A" />
            {/* Arms */}
            <path d="M14 22 Q8 28 7 40 Q6 46 8 50" stroke="#C4975A" strokeWidth="4" strokeLinecap="round" />
            <path d="M34 22 Q40 28 41 40 Q42 46 40 50" stroke="#C4975A" strokeWidth="4" strokeLinecap="round" />
            {/* Legs */}
            <path d="M20 62 Q19 72 18 80 Q17 88 17 96" stroke="#C4975A" strokeWidth="5" strokeLinecap="round" />
            <path d="M28 62 Q29 72 30 80 Q31 88 31 96" stroke="#C4975A" strokeWidth="5" strokeLinecap="round" />
          </svg>
        </div>

        {/* Region buttons */}
        <div className="flex flex-col gap-2 flex-1">
          {BODY_REGIONS.map(region => {
            const isSelected = selected.includes(region.id);
            return (
              <button
                key={region.id}
                onClick={() => onToggle(region.id)}
                className="text-left px-3 py-2 rounded-lg text-xs transition-all"
                style={{
                  background: isSelected ? "rgba(105,29,51,0.4)" : "rgba(255,255,255,0.04)",
                  border: isSelected ? "1px solid rgba(196,151,90,0.5)" : "1px solid rgba(196,151,90,0.1)",
                  color: isSelected ? "#C4975A" : "rgba(250,248,245,0.5)",
                }}
              >
                {isSelected && <span className="mr-1">●</span>}
                {region.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
