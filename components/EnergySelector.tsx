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
      {/* Colour */}
      <div>
        <p className="label-muted mb-3">If this energy had a colour...</p>
        <div className="grid grid-cols-5 gap-3">
          {ENERGY_COLORS.map(color => {
            const isSelected = selectedColor === color.value;
            return (
              <button
                key={color.value}
                onClick={() => onColorChange(color.value, color.label)}
                title={`${color.name} — ${color.label}`}
                className="flex flex-col items-center gap-1.5"
              >
                <div
                  className="w-9 h-9 rounded-full transition-all duration-150"
                  style={{
                    background: color.value,
                    border: isSelected ? "2px solid #177E89" : "2px solid transparent",
                    boxShadow: isSelected ? `0 0 0 3px rgba(23,126,137,0.2), 0 2px 8px ${color.value}60` : "none",
                    transform: isSelected ? "scale(1.15)" : "scale(1)",
                  }}
                />
                <span
                  className="text-[9px] text-center leading-tight"
                  style={{ color: isSelected ? "#177E89" : "#b0ada8", maxWidth: "52px" }}
                >
                  {color.label}
                </span>
              </button>
            );
          })}
        </div>
        {selectedColor && (
          <p className="mt-2 text-xs" style={{ color: "#177E89" }}>
            {ENERGY_COLORS.find(c => c.value === selectedColor)?.name} — {ENERGY_COLORS.find(c => c.value === selectedColor)?.label}
          </p>
        )}
      </div>

      {/* Shape */}
      <div>
        <p className="label-muted mb-3">...and a shape or texture</p>
        <div className="grid grid-cols-4 gap-2">
          {ENERGY_SHAPES.map(shape => {
            const isSelected = selectedShape === shape.name;
            return (
              <button
                key={shape.name}
                onClick={() => onShapeChange(shape.name)}
                className={`chip ${isSelected ? "selected" : ""} flex flex-col items-center gap-1 py-3`}
              >
                <span className="text-xl" style={{ color: isSelected ? "#177E89" : "#b0ada8" }}>
                  {shape.icon}
                </span>
                <span className="text-[10px] text-center leading-tight">{shape.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
