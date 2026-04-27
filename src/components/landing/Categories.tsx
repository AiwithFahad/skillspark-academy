import { Palette, Code2, MessageSquare, Video, Camera, Megaphone, PenTool, Wallet } from "lucide-react";

const categories = [
  { icon: Palette, name: "Art & Design", count: "38 Courses", tint: "bg-rose" },
  { icon: Code2, name: "Development", count: "65 Courses", tint: "bg-mint" },
  { icon: MessageSquare, name: "Communication", count: "24 Courses", tint: "bg-sky" },
  { icon: Video, name: "Videography", count: "18 Courses", tint: "bg-lemon" },
  { icon: Camera, name: "Photography", count: "30 Courses", tint: "bg-rose" },
  { icon: Megaphone, name: "Marketing", count: "42 Courses", tint: "bg-mint" },
  { icon: PenTool, name: "Content Writing", count: "21 Courses", tint: "bg-sky" },
  { icon: Wallet, name: "Finance & Bank", count: "15 Courses", tint: "bg-lemon" },
];

export function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Top Categories</p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Explore curated learning paths
          </h2>
        </div>
        <a href="#" className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:inline">
          View all →
        </a>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {categories.map(({ icon: Icon, name, count, tint }) => (
          <button
            key={name}
            className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card-hover"
          >
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tint} text-foreground/80 transition-transform group-hover:scale-105`}>
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">{name}</p>
              <p className="truncate text-xs text-muted-foreground">{count}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
