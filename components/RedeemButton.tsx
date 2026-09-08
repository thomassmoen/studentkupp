"use client";

import { useState } from "react";

export default function RedeemButton({
  code,
  websiteUrl,
}: {
  code?: string;
  websiteUrl?: string;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!websiteUrl) {
    return (
      <button
        disabled
        className="mt-8 w-full cursor-not-allowed rounded-full bg-slate-200 py-3 text-center text-sm font-semibold text-slate-400"
      >
        Kommer snart
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-8 w-full rounded-full bg-indigo-600 py-3 text-center text-sm font-semibold text-white hover:bg-indigo-700"
      >
        Hent tilbud
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
              aria-label="Lukk"
            >
              ✕
            </button>

            {code && (
              <>
                <p className="text-sm text-slate-500">Din rabattkode</p>
                <div className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-dashed border-indigo-300 bg-indigo-50 px-4 py-3">
                  <span className="text-lg font-bold tracking-wide text-indigo-700">
                    {code}
                  </span>
                  <button
                    onClick={handleCopy}
                    className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white hover:bg-indigo-700"
                  >
                    {copied ? "Kopiert!" : "Kopier"}
                  </button>
                </div>
              </>
            )}

            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block w-full rounded-full bg-indigo-600 py-3 text-center text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Gå til nettsiden →
            </a>
          </div>
        </div>
      )}
    </>
  );
}
