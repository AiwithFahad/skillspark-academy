import { Button } from "@/components/ui/button";
import { Lightbulb, Download, Award, Palette, Video, Bot } from "lucide-react";

const tips = [
  {
    icon: Lightbulb,
    title: "Marketing Strategy",
    desc: "Master positioning, channel selection, and growth funnels with proven frameworks from senior marketers.",
    bg: "bg-[oklch(0.97_0.05_85)]",
    iconBg: "bg-[oklch(0.92_0.10_85)]",
    iconColor: "text-[oklch(0.45_0.15_55)]",
  },
  {
    icon: Download,
    title: "Smart Resources",
    desc: "Curated downloads, templates, and toolkits to apply your learnings on day one.",
    bg: "bg-muted",
    iconBg: "bg-background",
    iconColor: "text-foreground",
  },
  {
    icon: Award,
    title: "Skill Mastery",
    desc: "Earn verifiable certificates as you progress through challenge-based modules.",
    bg: "bg-[oklch(0.96_0.04_260)]",
    iconBg: "bg-[oklch(0.92_0.07_260)]",
    iconColor: "text-[oklch(0.45_0.18_270)]",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    desc: "Design beautiful, accessible interfaces using modern tools and proven design systems.",
    bg: "bg-[oklch(0.97_0.04_20)]",
    iconBg: "bg-[oklch(0.92_0.07_20)]",
    iconColor: "text-[oklch(0.5_0.18_25)]",
  },
  {
    icon: Video,
    title: "Video Content",
    desc: "Plan, shoot, and edit content that grows audiences across every social platform.",
    bg: "bg-[oklch(0.96_0.05_175)]",
    iconBg: "bg-[oklch(0.92_0.08_175)]",
    iconColor: "text-[oklch(0.42_0.12_180)]",
  },
  {
    icon: Bot,
    title: "AI & Automation",
    desc: "Use modern AI tools to automate workflows and ship faster with less effort.",
    bg: "bg-[oklch(0.97_0.04_300)]",
    iconBg: "bg-[oklch(0.92_0.07_300)]",
    iconColor: "text-[oklch(0.45_0.18_300)]",
  },
];

export function TopTips() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Our Top Courses</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Discover the Top Tips
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Bite-sized, expert-curated insights across the most in-demand skills — pick any track and start learning today.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tips.map((t) => (
            <article
              key={t.title}
              className={`${t.bg} group rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover`}
            >
              <div className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${t.iconBg}`}>
                <t.icon className={`h-6 w-6 ${t.iconColor}`} />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">{t.desc}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button size="lg" className="rounded-xl px-6">View all courses</Button>
        </div>
      </div>
    </section>
  );
}