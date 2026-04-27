import { Play } from "lucide-react";
import instructorImg from "@/assets/instructor-video.jpg";

export function InstructorVideo() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Our Vision</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Instructing our learners
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Watch how our mentors guide students through real-world projects, live problem-solving, and personalized feedback every week.
          </p>
        </div>

        <div className="relative mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl shadow-card-hover">
          <img
            src={instructorImg}
            alt="Instructor recording a lesson"
            loading="lazy"
            width={1280}
            height={720}
            className="aspect-video w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/10">
            <button
              aria-label="Play video"
              className="group inline-flex h-20 w-20 items-center justify-center rounded-full bg-background/95 shadow-soft transition-transform hover:scale-105"
            >
              <Play className="h-7 w-7 fill-primary text-primary transition-transform group-hover:scale-110" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}