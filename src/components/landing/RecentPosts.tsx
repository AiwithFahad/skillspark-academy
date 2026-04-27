import post1 from "@/assets/post-1.jpg";
import post2 from "@/assets/post-2.jpg";

const posts = [
  {
    img: post1,
    title: "10 habits of highly effective self-taught learners in 2025",
    author: "Emma Wright",
    date: "12 Sept, 2025",
  },
  {
    img: post2,
    title: "How to build a portfolio that gets recruiters to reply",
    author: "Jordan Lee",
    date: "08 Sept, 2025",
  },
];

export function RecentPosts() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Our blog</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Recent Posts
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Fresh insights, learning playbooks, and career tips from our mentors and alumni.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {posts.map((p) => (
            <article key={p.title} className="group flex gap-5 rounded-2xl border border-border bg-background p-4 transition-all hover:-translate-y-1 hover:shadow-card-hover">
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                width={800}
                height={600}
                className="h-32 w-40 shrink-0 rounded-xl object-cover sm:h-36 sm:w-48"
              />
              <div className="flex flex-1 flex-col py-1">
                <h3 className="font-display text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-lg">
                  {p.title}
                </h3>
                <div className="mt-auto pt-3 text-xs text-muted-foreground">
                  By {p.author} · {p.date}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}