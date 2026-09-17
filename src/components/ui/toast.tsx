"use client";

import { Check } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";

interface Toast {
  id: number;
  message: string;
}

interface ToastValue {
  toast: (message: string) => void;
}

const ToastContext = createContext<ToastValue | null>(null);

const AUTO_DISMISS_MS = 2600;

function Toaster({ toasts }: { toasts: Toast[] }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex flex-col items-center gap-2 px-4"
      aria-live="polite"
      aria-atomic="false"
    >
      <AnimatePresence initial={false}>
        {toasts.map((item) => (
          <m.div
            key={item.id}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="pointer-events-auto flex items-center gap-2.5 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-paper shadow-lg"
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success">
              <Check className="h-3 w-3 text-white" aria-hidden="true" />
            </span>
            {item.message}
          </m.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/**
 * Toast notifications (Phase 12).
 *
 * The value is memoised because a fresh object identity would re-render every
 * consumer of `useToast` each time the toast list changes. The auto-dismiss
 * timer lives in `toast` rather than an effect so no effect is needed.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(0);

  const toast = useCallback((message: string) => {
    const id = nextId.current;
    nextId.current += 1;

    setToasts((previous) => [...previous, { id, message }]);

    setTimeout(() => {
      setToasts((previous) => previous.filter((item) => item.id !== id));
    }, AUTO_DISMISS_MS);
  }, []);

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toaster toasts={toasts} />
    </ToastContext.Provider>
  );
}

export function useToast(): ToastValue {
  const value = useContext(ToastContext);
  if (value === null) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return value;
}