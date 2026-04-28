import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/landing/PageShell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLMSStore } from "@/lib/store";
import { BookOpen, Users, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses — Academy LMS" },
      { name: "description", content: "Browse all subjects offered at Academy LMS, led by dedicated expert instructors." },
      { property: "og:title", content: "Courses — Academy LMS" },
      { property: "og:description", content: "Browse all subjects offered at Academy LMS." },
    ],
  }),
  component: CoursesPage,
});

function CoursesPage() {
  const { subjects, users } = useLMSStore();
  return (
    <PageShell
      eyebrow="Courses"
      title="Learn a real skill, with a real teacher"
      description="Every course is led by a dedicated instructor, runs on a weekly curriculum, and caps enrollment to keep cohorts small and focused."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {subjects.map((s) => {
          const teacher = users.find((u) => u.id === s.teacherId);
          return (
            <Card key={s.id} className="group border-border/60 transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">{s.studentIds.length} enrolled</span>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">{s.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{teacher ? `Led by ${teacher.name}` : "Teacher TBD"}</p>
                <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Users className="h-3.5 w-3.5" /> Small cohort
                  </span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/login">Enroll <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </PageShell>
  );
}