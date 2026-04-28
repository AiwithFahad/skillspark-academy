import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";
import { Card, CardContent } from "@/components/ui/card";
import { STORIES } from "@/lib/stories";
import { ArrowRight, Clock } from "lucide-react";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "Stories — Academy LMS" },
      { name: "description", content: "Student stories, teaching guides, and thoughts on how we build Academy LMS." },
      { property: "og:title", content: "Stories — Academy LMS" },
      { property: "og:description", content: "Student stories and teaching guides from Academy LMS." },
    ],
  }),
  component: StoriesPage,
});

function StoriesPage() {
  return (
    <PageShell
      eyebrow="Stories"
      title="From students, teachers, and the team"
      description="What we're learning about teaching, learning, and building software for small cohorts."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {STORIES.map((s) => (
          <Link key={s.slug} to="/stories/$slug" params={{ slug: s.slug }} className="group">
            <Card className="h-full border-border/60 transition-shadow group-hover:shadow-md">
              <CardContent className="p-6">
                <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{s.category}</span>
                <h3 className="mt-4 font-display text-xl font-semibold tracking-tight group-hover:text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.excerpt}</p>
                <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{s.author} · {s.date}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{s.readTime}</span>
                </div>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Read story <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}