export default function GlobalLoading() {
  return (
    <div className="relative isolate flex min-h-[60vh] items-center justify-center overflow-hidden bg-[hsl(var(--background))] px-6 py-16">
      <div className="loading-aura absolute inset-0" aria-hidden="true" />
      <div className="relative w-full max-w-md rounded-2xl border bg-white/90 p-8 text-center shadow-xl backdrop-blur-sm">
        <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full border border-primary/20 bg-primary/5">
          <span className="loading-spinner size-6 rounded-full border-2 border-primary/25 border-t-primary" aria-hidden="true" />
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">Please Wait</p>
        <h2 className="mt-2 font-serif text-2xl font-semibold text-primary">Loading Campaign Page</h2>
        <p className="mt-2 text-sm text-muted-foreground">Bringing everything in clean and fast.</p>
        <div className="mt-6 grid gap-2" aria-hidden="true">
          <div className="loading-bar h-2 w-full rounded-full" />
          <div className="loading-bar h-2 w-4/5 rounded-full" />
          <div className="loading-bar h-2 w-3/5 rounded-full" />
        </div>
      </div>
    </div>
  );
}
