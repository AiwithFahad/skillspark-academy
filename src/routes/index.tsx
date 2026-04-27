import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Categories } from "@/components/landing/Categories";
import { FeaturedCourses } from "@/components/landing/FeaturedCourses";
import { Stats } from "@/components/landing/Stats";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Academy LMS — Build Skills with Online Courses" },
      { name: "description", content: "Modern LMS for skill academies, coaching institutes, and bootcamps. Live classes, weekly curriculum, and expert instructors." },
      { property: "og:title", content: "Academy LMS — Build Skills with Online Courses" },
      { property: "og:description", content: "Modern LMS for skill academies and bootcamps. Live classes, weekly curriculum, expert instructors." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Categories />
        <FeaturedCourses />
        <Stats />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
