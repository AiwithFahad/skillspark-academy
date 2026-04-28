import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Sparkles, Heart } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About us — Academy LMS" },
      { name: "description", content: "Meet the team behind Academy LMS — a modern learning platform for skill-based academies and bootcamps." },
      { property: "og:title", content: "About us — Academy LMS" },
      { property: "og:description", content: "Meet the team behind Academy LMS." },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { icon: Target, title: "Outcomes first", text: "Every feature ladders up to a student shipping real work, not watching another video." },
  { icon: Users,  title: "Small cohorts", text: "Six students per teacher by default — enough to know every name, every blocker." },
  { icon: Sparkles, title: "Teacher autonomy", text: "We give instructors real tools and real trust. They own the classroom." },
  { icon: Heart, title: "Built with care", text: "Production-grade software for people doing the hardest, most important work." },
];

function AboutPage() {
  return (
    <PageShell
      eyebrow="About"
      title="We build software for people who teach"
      description="Academy LMS is a learning platform for skill-based academies, coaching institutes, and bootcamps. We believe great education happens in small groups with dedicated teachers — and that the software should get out of the way."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {VALUES.map((v) => (
          <Card key={v.title} className="border-border/60">
            <CardContent className="p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight">Our story</h2>
          <p className="mt-4 text-muted-foreground">
            Academy LMS grew out of a simple observation: the best learning happens when a skilled teacher works closely with a handful of motivated students. Most learning platforms are built for scale. We built ours for depth.
          </p>
          <p className="mt-4 text-muted-foreground">
            Today we serve five teachers, thirty students, and five subject tracks — Mathematics, Science, English, Computer Science, and Social Studies. Tomorrow, many more. But the ratio stays the same.
          </p>
        </div>
        <div>
          <h2 className="font-display text-3xl font-bold tracking-tight">By the numbers</h2>
          <dl className="mt-6 grid grid-cols-2 gap-6">
            {[
              { k: "Teachers", v: "5" },
              { k: "Students", v: "30" },
              { k: "Subjects", v: "5" },
              { k: "Students per teacher", v: "6" },
            ].map((s) => (
              <div key={s.k} className="rounded-xl border border-border/60 bg-card p-5">
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.k}</dt>
                <dd className="mt-2 font-display text-3xl font-bold text-primary">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </PageShell>
  );
}