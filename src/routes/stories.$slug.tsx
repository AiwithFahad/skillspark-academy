import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { getStory } from "@/lib/stories";
import { ArrowLeft, Clock } from "lucide-react";

export const Route = createFileRoute("/stories/$slug")({
  loader: ({ params }) => {
    const story = getStory(params.slug);
    if (!story) throw notFound();
    return { story };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.story.title} — Academy LMS` },
          { name: "description", content: loaderData.story.excerpt },
          { property: "og:title", content: loaderData.story.title },
          { property: "og:description", content: loaderData.story.excerpt },
        ]
      : [{ title: "Story not found — Academy LMS" }],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-bold">Story not found</h1>
        <p className="mt-3 text-muted-foreground">The story you're looking for may have been moved or removed.</p>
        <Button asChild className="mt-6"><Link to="/stories">Back to stories</Link></Button>
      </div>
      <Footer />
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl font-bold">Something went wrong</h1>
        <p className="mt-3 text-muted-foreground">{error.message}</p>
        <Button asChild className="mt-6"><Link to="/stories">Back to stories</Link></Button>
      </div>
      <Footer />
    </div>
  ),
  component: StoryDetail,
});

function StoryDetail() {
  const { story } = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" asChild className="mb-8 -ml-3">
            <Link to="/stories"><ArrowLeft className="mr-1 h-4 w-4" /> All stories</Link>
          </Button>
          <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{story.category}</span>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">{story.title}</h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <span>{story.author}</span><span>·</span><span>{story.date}</span><span>·</span>
            <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{story.readTime}</span>
          </div>
          <div className="prose prose-neutral mt-10 max-w-none dark:prose-invert">
            {story.body.map((p, i) => (
              <p key={i} className="mb-5 text-base leading-relaxed text-foreground/90">{p}</p>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}