import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Academy<span className="text-primary">.</span>LMS
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {["Home", "Courses", "Pages", "Articles", "Contact us"].map((l) => (
            <a key={l} href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {l}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">Login</Button>
          <Button size="sm" className="rounded-lg">Register</Button>
        </div>
      </div>
    </header>
  );
}
