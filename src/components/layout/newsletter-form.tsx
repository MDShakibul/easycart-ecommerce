"use client";

import { Check, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "done";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email.trim() === "" || status === "submitting") return;
    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 500));
    setStatus("done");
  }

  if (status === "done") {
    return (
      <p
        role="status"
        className="flex items-center gap-2 text-sm font-medium text-success"
      >
        <Check className="h-4 w-4" aria-hidden="true" />
        Thanks — check your inbox to confirm.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="h-11 min-w-0 flex-1 rounded-full border border-line-strong bg-white px-4 text-sm text-ink shadow-sm transition-colors placeholder:text-ink-muted focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="flex h-11 shrink-0 items-center gap-2 rounded-full bg-brand px-5 text-sm font-medium text-brand-ink shadow-sm shadow-indigo-600/30 transition-all hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-footer disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          "Subscribe"
        )}
      </button>
    </form>
  );
}