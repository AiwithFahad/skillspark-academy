import { GraduationCap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCap className="h-5 w-5" />
              </span>
              <span className="font-display text-lg font-semibold">Academy<span className="text-primary">.</span>LMS</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              A modern learning platform for skill-based academies, bootcamps and coaching institutes.
            </p>
          </div>

          {[
            { title: "Platform", links: ["Courses", "Live Classes", "Curriculum", "Pricing"] },
            { title: "Company", links: ["About", "Careers", "Blog", "Press"] },
            { title: "Support", links: ["Help Center", "Contact", "Privacy", "Terms"] },
          ].map((col) => (
            <div key={col.title}>
              <p className="font-display text-sm font-semibold text-foreground">{col.title}</p>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">© 2026 Academy LMS. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Built for modern learning.</p>
        </div>
      </div>
    </footer>
  );
}
