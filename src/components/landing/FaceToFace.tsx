import { GraduationCap, Users, Presentation } from "lucide-react";

const items = [
  {
    icon: GraduationCap,
    title: "Interactive Teaching",
    desc: "Live cohorts where mentors guide every concept with hands-on examples and real feedback loops.",
    bg: "bg-[oklch(0.96_0.06_85)]",
    iconBg: "bg-[oklch(0.92_0.10_85)]",
    iconColor: "text-[oklch(0.45_0.15_55)]",
  },
  {
    icon: Users,
    title: "1:1 Expert Guidance",
    desc: "Personal mentorship sessions with industry practitioners to unblock you and accelerate growth.",
    bg: "bg-muted",
    iconBg: "bg-background",
    iconColor: "text-primary",
  },
  {
    icon: Presentation,
    title: "Virtual Classrooms",
    desc: "Structured weekly classrooms with auto-generated Google Meet links and shared resources.",
    bg: "bg-[oklch(0.96_0.04_260)]",
    iconBg: "bg-[oklch(0.92_0.07_260)]",
    iconColor: "text-[oklch(0.45_0.18_270)]",
  },
];

export function FaceToFace() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Becoming Adaptable</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Face-to-face Teaching
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Learn the way that fits your pace — live mentorship, peer cohorts, and immersive virtual classrooms designed for real outcomes.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((it) => (
            <article
              key={it.title}
              className={`${it.bg} group rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover`}
            >
              <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${it.iconBg}`}>
                <it.icon className={`h-6 w-6 ${it.iconColor}`} />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">{it.desc}</p>
              <a href="#" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
                Learn more →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}