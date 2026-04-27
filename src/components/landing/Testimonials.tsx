import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Mark Owens",
    role: "Frontend Engineer @ Stripe",
    quote: "Every project I shipped at the academy went straight into my portfolio. The mentor feedback loops are unreal — I landed my dream job within 8 weeks.",
    date: "12 May, 2025",
  },
  {
    name: "Lina Patel",
    role: "Product Designer @ Notion",
    quote: "The live workshops felt like a real studio. Critique sessions, peer reviews, and structured weekly briefs gave me the confidence to ship work I'm proud of.",
    date: "06 May, 2025",
  },
  {
    name: "David Chen",
    role: "ML Engineer @ Anthropic",
    quote: "I tried 4 platforms before this. Nothing comes close — the curriculum is current, mentors are world-class, and the community is wildly supportive.",
    date: "02 May, 2025",
  },
];

export function Testimonials() {
  return (
    <section className="bg-muted/60 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Testimonials</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              From knowledge to action
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Real stories from learners who turned skills into careers and impact.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground shadow-card hover:bg-primary hover:text-primary-foreground">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-card hover:opacity-90">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <article key={t.name} className="rounded-2xl bg-background p-6 shadow-card">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-gradient-to-br from-primary to-primary/60" />
                <div>
                  <div className="text-sm font-semibold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
              <div className="mt-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground/75">"{t.quote}"</p>
              <div className="mt-5 text-xs text-muted-foreground">{t.date}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}