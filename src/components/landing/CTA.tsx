import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-14 text-background sm:px-12 sm:py-16">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-primary/40 blur-3xl" />
        <div className="absolute -bottom-16 left-1/3 h-56 w-56 rounded-full bg-peach/30 blur-3xl" />

        <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Ready to start your <span className="text-primary">learning journey</span>?
            </h2>
            <p className="mt-4 max-w-md text-sm text-background/70">
              Join thousands of students building real skills with structured curriculum and live mentorship.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            <Button size="lg" className="rounded-xl px-6">
              Get started free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-xl border-background/20 bg-transparent px-6 text-background hover:bg-background/10 hover:text-background">
              Talk to sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
