import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroStudent from "@/assets/hero-student.png";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative mt-6 overflow-hidden rounded-3xl shadow-soft">
          {/* Background panels */}
          <div className="absolute inset-0 bg-mint hero-clip" />
          <div className="absolute inset-0 bg-ink hero-clip-right" />
          {/* Peach diagonal accent */}
          <div className="absolute inset-y-0 left-[40%] w-[28%] -skew-x-[18deg] bg-peach" />

          <div className="relative grid grid-cols-1 gap-8 px-6 py-12 sm:px-10 sm:py-16 md:grid-cols-2 md:py-20 lg:px-16 lg:py-24">
            {/* Left content */}
            <div className="relative z-10 max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-background/70 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                New cohort starting soon
              </span>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Build skills with <br />
                <span className="text-primary">Online courses</span>
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-foreground/70">
                Discover hands-on programs taught by world-class mentors. Live classes, structured weekly curriculum, and a supportive cohort — all in one place.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg" className="rounded-xl px-6">
                  Explore courses
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="ghost" className="rounded-xl px-4 text-foreground hover:bg-background/60">
                  <span className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-background shadow-card">
                    <Play className="h-3.5 w-3.5 fill-primary text-primary" />
                  </span>
                  Watch intro
                </Button>
              </div>
            </div>

            {/* Right student image */}
            <div className="relative z-10 hidden md:block">
              <div className="relative h-full min-h-[360px]">
                <img
                  src={heroStudent}
                  alt="Smiling student holding a notebook"
                  width={1024}
                  height={1024}
                  className="absolute inset-x-0 bottom-0 mx-auto h-[420px] w-auto object-contain drop-shadow-2xl lg:h-[520px]"
                />
                {/* decorative blob */}
                <svg className="absolute right-2 top-1/2 h-24 w-24 -translate-y-1/2 text-primary/40 lg:right-6" viewBox="0 0 100 100" fill="none">
                  <path d="M50 10C70 10 90 30 90 50C90 70 70 90 50 90C30 90 10 70 10 50C10 30 30 10 50 10Z" stroke="currentColor" strokeWidth="2" />
                  <path d="M30 50 Q40 30 50 50 T70 50" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
