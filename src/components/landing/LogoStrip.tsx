export function LogoStrip() {
  const logos = ["Logoipsum", "LOGO", "Logoipsum", "LearnHub", "Skillset"];
  return (
    <section className="border-b border-border/60 bg-background py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-70">
          {logos.map((name) => (
            <span key={name} className="font-display text-lg font-semibold tracking-tight text-foreground/60">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}