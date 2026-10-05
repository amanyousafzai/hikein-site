import type { ReactNode } from "react";

export function Alert({
  tone = "info",
  children,
}: {
  tone?: "info" | "success" | "error";
  children: ReactNode;
}) {
  const styles = {
    info: "border-amber-200 bg-amber-50 text-amber-900",
    success: "border-forest/20 bg-forest/5 text-forest",
    error: "border-red-200 bg-red-50 text-red-800",
  };
  return (
    <div role="alert" className={`border rounded-xl px-4 py-3 text-sm ${styles[tone]}`}>
      {children}
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="text-center py-14 px-6 bg-white border border-dashed border-cream-darker rounded-2xl">
      <span className="mx-auto size-12 rounded-full bg-forest/10 text-forest flex items-center justify-center" aria-hidden="true">
        <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 19 10 6l3 7 2-4 5 10H4Z" strokeLinejoin="round" />
        </svg>
      </span>
      <p className="font-display text-xl font-bold text-stone mt-4">{title}</p>
      <p className="text-stone-light text-sm mt-1 max-w-sm mx-auto">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white border border-cream-dark rounded-2xl p-5 animate-pulse" aria-label="Loading content">
      <div className="flex gap-3">
        <span className="size-11 rounded-full bg-cream-dark" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-cream-dark rounded w-1/3" />
          <div className="h-3 bg-cream-dark rounded w-1/4" />
        </div>
      </div>
      <div className="h-4 bg-cream-dark rounded w-4/5 mt-5" />
      <div className="h-4 bg-cream-dark rounded w-3/5 mt-2" />
      <div className="aspect-video bg-cream-dark rounded-xl mt-5" />
    </div>
  );
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  busy,
  onCancel,
  onConfirm,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  busy?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] bg-stone/60 backdrop-blur-sm flex items-center justify-center p-4" role="presentation" onMouseDown={onCancel}>
      <div role="dialog" aria-modal="true" aria-labelledby="confirm-title" className="w-full max-w-md bg-white rounded-2xl border border-cream-darker shadow-2xl p-6" onMouseDown={(event) => event.stopPropagation()}>
        <p id="confirm-title" className="font-display text-2xl font-bold text-stone">{title}</p>
        <p className="text-stone-mid text-sm leading-relaxed mt-2">{description}</p>
        <div className="flex justify-end gap-3 mt-7">
          <button onClick={onCancel} className="border border-cream-darker text-stone-mid font-semibold text-sm px-4 py-2.5 rounded-xl hover:border-stone-light">Cancel</button>
          <button disabled={busy} onClick={onConfirm} className="bg-red-700 text-white font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-red-800 disabled:opacity-60">
            {busy ? "Please wait…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
