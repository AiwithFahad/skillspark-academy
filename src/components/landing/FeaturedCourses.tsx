import { Star, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

type Course = {
  title: string;
  category: string;
  price: string;
  oldPrice?: string;
  rating: number;
  duration: string;
  cover: "card" | "code" | "rocket" | "cube" | "laptop" | "browser";
  tint: string;
  iconTint: string;
};

const courses: Course[] = [
  { title: "HTML & CSS3 Essentials in 4 Hours", category: "Web Development", price: "$49.00", oldPrice: "$89.00", rating: 4.8, duration: "4h 20m", cover: "card", tint: "bg-mint", iconTint: "text-foreground/80" },
  { title: "JS Programming Tutorials for Beginners", category: "Development", price: "$39.00", oldPrice: "$69.00", rating: 4.7, duration: "6h 10m", cover: "code", tint: "bg-ink", iconTint: "text-background" },
  { title: "Advance Course for Photo Editing", category: "Design", price: "Free", rating: 4.9, duration: "3h 45m", cover: "rocket", tint: "bg-primary", iconTint: "text-primary-foreground" },
  { title: "From Zero to Hero with Node.js", category: "Backend", price: "$59.00", oldPrice: "$99.00", rating: 4.6, duration: "8h 00m", cover: "cube", tint: "bg-accent", iconTint: "text-accent-foreground" },
  { title: "Introduction to React for Beginners", category: "Frontend", price: "$45.00", oldPrice: "$79.00", rating: 4.8, duration: "5h 30m", cover: "laptop", tint: "bg-mint", iconTint: "text-foreground/80" },
  { title: "C Programming for Beginners", category: "Programming", price: "$29.00", rating: 4.5, duration: "7h 15m", cover: "browser", tint: "bg-primary", iconTint: "text-primary-foreground" },
];

function CoverArt({ kind }: { kind: Course["cover"] }) {
  const common = "h-16 w-16 opacity-90";
  switch (kind) {
    case "card":
      return (
        <svg className={common} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2">
          <rect x="8" y="14" width="48" height="36" rx="4" />
          <path d="M8 24h48" />
          <circle cx="18" cy="40" r="2.5" fill="currentColor" />
        </svg>
      );
    case "code":
      return (
        <svg className={common} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M22 22l-10 10 10 10" />
          <path d="M42 22l10 10-10 10" />
          <path d="M36 18l-8 28" />
        </svg>
      );
    case "rocket":
      return (
        <svg className={common} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M32 8c8 6 12 16 12 26l-6 6h-12l-6-6c0-10 4-20 12-26z" />
          <circle cx="32" cy="26" r="4" />
          <path d="M22 44l-6 8 8-2M42 44l6 8-8-2" />
        </svg>
      );
    case "cube":
      return (
        <svg className={common} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M32 8l20 10v22L32 52 12 40V18z" />
          <path d="M12 18l20 10 20-10M32 28v24" />
        </svg>
      );
    case "laptop":
      return (
        <svg className={common} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2">
          <rect x="12" y="14" width="40" height="26" rx="3" />
          <path d="M6 46h52l-4 6H10z" />
          <path d="M22 24l-4 4 4 4M42 24l4 4-4 4" />
        </svg>
      );
    case "browser":
      return (
        <svg className={common} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.2">
          <rect x="8" y="12" width="48" height="40" rx="3" />
          <path d="M8 22h48" />
          <circle cx="14" cy="17" r="1.5" fill="currentColor" />
          <path d="M20 34h24M20 40h16" />
        </svg>
      );
  }
}

export function FeaturedCourses() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Featured Courses</p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Pick up where talent meets opportunity
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Hand-picked programs designed to help you go from beginner to job-ready with mentor-guided practice.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <article
            key={c.title}
            className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
          >
            <div className={`relative flex h-44 items-center justify-center ${c.tint} ${c.iconTint}`}>
              <CoverArt kind={c.cover} />
              <button className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-muted-foreground transition-colors hover:text-primary">
                <Heart className="h-4 w-4" />
              </button>
            </div>
            <div className="p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-primary">{c.category}</p>
              <h3 className="mt-1.5 font-display text-lg font-semibold leading-snug text-foreground">
                {c.title}
              </h3>
              <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-medium text-foreground">{c.rating}</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {c.duration}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-lg font-semibold text-foreground">{c.price}</span>
                  {c.oldPrice && <span className="text-xs text-muted-foreground line-through">{c.oldPrice}</span>}
                </div>
                <Button size="sm" variant="ghost" className="text-primary hover:bg-primary-soft">
                  Enroll →
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
