import { Button } from "@/components/ui/button";
import workshop from "@/assets/workshop.jpg";

export function CertificationCTA() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary-soft">
          <div className="grid grid-cols-1 items-center gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:p-14">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-background px-3 py-1 text-xs font-semibold text-primary shadow-card">
                Get Certified
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
                Earn a prestigious Skill Certification from SkillMaster Academy.
              </h2>
              <p className="mt-4 max-w-md text-base text-muted-foreground">
                Recognized by 500+ hiring partners worldwide. Showcase real, project-backed proof of mastery.
              </p>
              <Button size="lg" className="mt-7 rounded-xl px-6">Get Started</Button>
            </div>
            <div className="relative">
              <img
                src={workshop}
                alt="Mentor and student in classroom"
                loading="lazy"
                width={1024}
                height={768}
                className="aspect-[4/3] w-full rounded-2xl object-cover shadow-card-hover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}