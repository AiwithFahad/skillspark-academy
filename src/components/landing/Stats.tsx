const stats = [
  { value: "25K+", label: "Active Students" },
  { value: "899", label: "Total Courses" },
  { value: "158", label: "Expert Instructors" },
  { value: "96%", label: "Completion Rate" },
];

export function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card px-6 py-8 text-center">
            <p className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{s.value}</p>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
