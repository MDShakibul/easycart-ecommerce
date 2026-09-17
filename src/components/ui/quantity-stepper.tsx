"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/cn";

export type QuantityStepperSize = "sm" | "md" | "lg";

const buttonSizeStyles: Record<QuantityStepperSize, string> = {
  sm: "h-8 w-8",
  md: "h-9 w-9",
  lg: "h-10 w-10",
};

const inputSizeStyles: Record<QuantityStepperSize, string> = {
  sm: "w-8 text-sm",
  md: "w-9 text-sm",
  lg: "w-10 text-sm",
};

export interface QuantityStepperProps {
  /** Current quantity. */
  value: number;
  /** Maximum selectable quantity (available stock). */
  max: number;
  /** Minimum selectable quantity. Defaults to 1. */
  min?: number;
  onDecrement: () => void;
  onIncrement: () => void;
  /** Called with the clamped quantity typed into the input. */
  onCommit: (quantity: number) => void;
  /** Product title, used for accessible labels. */
  itemLabel: string;
  size?: QuantityStepperSize;
  className?: string;
}

/**
 * Stepper with an editable quantity input.
 *
 * The input accepts typing (digits only, empty while editing) and commits a
 * value clamped to min..max on blur or Enter. The +/- buttons delegate to
 * the parent so cart rows can keep their own semantics (e.g. decrementing
 * from 1 removes the row).
 */
export function QuantityStepper({
  value,
  max,
  min = 1,
  onDecrement,
  onIncrement,
  onCommit,
  itemLabel,
  size = "md",
  className,
}: QuantityStepperProps) {
  const lower = Math.max(1, Math.floor(min));
  const upper = Math.max(lower, Math.floor(max));
  const [draft, setDraft] = useState(String(value));
  const [syncedValue, setSyncedValue] = useState(value);

  // Keep the editable text in sync when the quantity changes elsewhere
  // (stepper buttons, another tab). Render-phase update, not an effect.
  if (value !== syncedValue) {
    setSyncedValue(value);
    setDraft(String(value));
  }

  function commit(raw: string) {
    const parsed = Number.parseInt(raw, 10);
    const clamped = Number.isNaN(parsed)
      ? lower
      : Math.min(Math.max(lower, parsed), upper);
    setDraft(String(clamped));
    if (clamped !== value) onCommit(clamped);
  }

  const atMin = value <= lower;
  const atMax = value >= upper;

  const stepButton =
    "flex items-center justify-center text-ink transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink disabled:pointer-events-none disabled:opacity-40";

  return (
    <div
      className={cn(
        "flex items-center rounded-full border border-line-strong",
        className,
      )}
    >
      <button
        type="button"
        onClick={onDecrement}
        disabled={atMin}
        aria-label={`Decrease quantity of ${itemLabel}`}
        className={cn(stepButton, "rounded-l-full", buttonSizeStyles[size])}
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="off"
        aria-label={`Quantity for ${itemLabel}, maximum ${upper}`}
        value={draft}
        onChange={(event) => {
          const digits = event.target.value.replace(/[^0-9]/g, "");
          setDraft(digits);
        }}
        onBlur={(event) => commit(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            commit((event.target as HTMLInputElement).value);
          }
        }}
        className={cn(
          "min-w-0 bg-transparent text-center font-medium text-ink focus:outline-none",
          inputSizeStyles[size],
        )}
      />
      <button
        type="button"
        onClick={onIncrement}
        disabled={atMax}
        aria-label={`Increase quantity of ${itemLabel}`}
        title={atMax ? `Only ${upper} available` : undefined}
        className={cn(stepButton, "rounded-r-full", buttonSizeStyles[size])}
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
