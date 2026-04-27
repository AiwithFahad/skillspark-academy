import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import knowledgeImg from "@/assets/knowledge-quest.jpg";

const features = [
  "Structured weekly curriculum",
  "Live mentor cohorts",
  "Project-based learning",
  "Industry-grade certificates",
  "Career support & reviews",
  "Lifetime access to resources",
];

export function KnowledgeQuest() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Mission
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Knowledge Quest
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Empowering ambitious learners with the tools, mentors, and structured paths they need to master in-demand skills and land transformative careers.
            </p>

            <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <Button size="lg" className="mt-8 rounded-xl px-6">Read more</Button>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 -z-10 rounded-3xl bg-primary/5" />
            <img
              src={knowledgeImg}
              alt="Students collaborating with a laptop"
              loading="lazy"
              width={1024}
              height={768}
              className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card-hover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}