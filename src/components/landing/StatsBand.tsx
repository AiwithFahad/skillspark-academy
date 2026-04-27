import { Users, BookOpen, Award, GraduationCap } from "lucide-react";

const stats = [
  { icon: Users, value: "9+", label: "Years of teaching" },
  { icon: GraduationCap, value: "22k+", label: "Active learners" },
  { icon: Award, value: "98%", label: "Success rate" },
  { icon: BookOpen, value: "186k+", label: "Hours of content" },
];

export function StatsBand() {
  return (
    <section className="bg-primary-soft py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-4 rounded-2xl bg-background p-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
            >
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="h-6 w-6" />
              </span>
              <div>
                <div className="font-display text-2xl font-semibold text-foreground">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}