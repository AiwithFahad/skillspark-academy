import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV: Array<{ label: string; to: "/" | "/courses" | "/about" | "/stories" | "/contact" }> = [
  { label: "Home", to: "/" },
  { label: "Courses", to: "/courses" },
  { label: "About us", to: "/about" },
  { label: "Stories", to: "/stories" },
  { label: "Contact us", to: "/contact" },
];

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
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-semibold" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button size="sm" className="rounded-lg" asChild>
            <Link to="/login">Register</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
