import { Video, Users, MessageSquare } from "lucide-react";
import workshop from "@/assets/workshop.jpg";

const tags = [
  { icon: Video, label: "Live cohorts" },
  { icon: Users, label: "Peer learning" },
  { icon: MessageSquare, label: "Mentor Q&A" },
];

export function Workshops() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
              Live with us
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Virtual Learning Workshops
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Join live, interactive workshops with practitioners and a global community of learners. Auto-generated Google Meet links, structured agendas, and lifetime recordings.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {tags.map((t) => (
                <div key={t.label} className="flex items-center gap-2 rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground shadow-card">
                  <t.icon className="h-4 w-4 text-primary" />
                  {t.label}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-3 -z-10 rounded-3xl bg-primary/5" />
            <img
              src={workshop}
              alt="Mentor leading a workshop"
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