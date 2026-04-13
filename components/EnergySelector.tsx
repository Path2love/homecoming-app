"use client";

import { ENERGY_COLORS, ENERGY_SHAPES } from "@/lib/protocol";

interface EnergySelectorProps {
  selectedColor: string;
  selectedShape: string;
  onColorChange: (value: string, label: string) => void;
  onShapeChange: (value: string) => void;
}

export default function EnergySelector({
  selectedColor,
  selectedShape,
  onColorChange,
  onShapeChange,
}: EnergySelectorProps) {
  return (
    <div className="space-y-6">
      {/* Color */}
      <div>
        <p className="text-[#FAF8F5]/50 text-xs uppercase tracking-widest mb-3">
          If this energy had a colour...
        </p>
        <div className="grid grid-cols-5 gap-2">
          {ENERGY_COLORS.map(color => (
            <button
              key={color.value}
              onClick={() => onColorChange(color.value, color.label)}
              title={`${color.name} — ${color.label}`}
              className="group flex flex-col items-center gap-1"
            >
              <div
                className="w-8 h-8 rounded-full transition-all"
                style={{
                  background: color.value,
                  border: selectedColor === color.value
                    ? "2px solid #C4975A"
                    : "2px solid transparent",
                  boxShadow: selectedColor === color.value
                    ? `0 0 12px ${color.value}80`
                    : "none",
                  transform: selectedColor === color.value ? "scale(1.15)" : "scale(1)",
                }}
              />
              <span className="text-[9px] text-[#FAF8F5]/30 group-hover:text-[#FAF8F5]/60 text-center leading-tight max-w-[52px]">
                {color.label}
              </span>
            </button>
          ))}
        </div>
        {selectedColor && (
          <p className="mt-2 text-xs text-[#C4975A]/70 italic">
            Selected: {ENERGY_COLORS.find(c => c.value === selectedColor)?.name} — {ENERGY_COLORS.find(c => c.value === selectedColor)?.label}
          </p>
        )}
      </div>

      {/* Shape */}
      <div>
        <p className="text-[#FAF8F5]/50 text-xs uppercase tracking-widest mb-3">
          ...and a shape or texture
        </p>
        <div className="grid grid-cols-4 gap-2">
          {ENERGY_SHAPES.map(shape => (
            <button
              key={shape.name}
              onClick={() => onShapeChange(shape.name)}
              className="flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-all"
              style={{
                background: selectedShape === shape.name
                  ? "rgba(105,29,51,0.3)"
                  : "rgba(255,255,255,0.03)",
                border: selectedShape === shape.name
                  ? "1px solid rgba(196,151,90,0.4)"
                  : "1px solid rgba(196,151,90,0.08)",
              }}
            >
              <span className="text-lg" style={{ color: selectedShape === shape.name ? "#C4975A" : "rgba(250,248,245,0.4)" }}>
                {shape.icon}
              </span>
              <span className="text-[9px] text-[#FAF8F5]/40 text-center leading-tight">
                {shape.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
