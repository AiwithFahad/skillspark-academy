import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import web from "@/assets/course-web.jpg";
import design from "@/assets/course-design.jpg";
import ai from "@/assets/course-ai.jpg";
import content from "@/assets/course-content.jpg";

const courses = [
  { img: web, tag: "Web Development", price: "Free", instructor: "Daniel Hayes", rating: "4.9" },
  { img: design, tag: "Creative Design", price: "$49", instructor: "Aria Chen", rating: "4.8" },
  { img: ai, tag: "AI & Machine Learning", price: "Paid", instructor: "Marco Silva", rating: "4.9" },
  { img: content, tag: "Content Production", price: "$29", instructor: "Lena Park", rating: "4.7" },
];

export function TopCourses() {
  return (
    <section className="bg-[oklch(0.97_0.02_20)] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Our Courses</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Top Online Courses
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Hand-picked programs taught by world-class mentors — built to take you from fundamentals to job-ready in weeks.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {courses.map((c) => (
            <article
              key={c.tag}
              className="group flex gap-5 rounded-2xl bg-background p-4 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
            >
              <img
                src={c.img}
                alt={c.tag}
                loading="lazy"
                width={800}
                height={600}
                className="h-32 w-44 shrink-0 rounded-xl object-cover sm:h-36 sm:w-52"
              />
              <div className="flex flex-1 flex-col py-1">
                <span className="self-start rounded-full bg-primary-soft px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                  {c.tag}
                </span>
                <h3 className="mt-2 font-display text-base font-semibold text-foreground sm:text-lg">{c.tag}</h3>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary to-primary/60" />
                    <span className="text-xs text-muted-foreground">{c.instructor}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-foreground">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {c.rating}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button size="lg" className="rounded-xl px-6">All Courses</Button>
        </div>
      </div>
    </section>
  );
}