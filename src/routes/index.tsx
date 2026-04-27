import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { LogoStrip } from "@/components/landing/LogoStrip";
import { FaceToFace } from "@/components/landing/FaceToFace";
import { KnowledgeQuest } from "@/components/landing/KnowledgeQuest";
import { StatsBand } from "@/components/landing/StatsBand";
import { InstructorVideo } from "@/components/landing/InstructorVideo";
import { TopTips } from "@/components/landing/TopTips";
import { TopCourses } from "@/components/landing/TopCourses";
import { Workshops } from "@/components/landing/Workshops";
import { Testimonials } from "@/components/landing/Testimonials";
import { RecentPosts } from "@/components/landing/RecentPosts";
import { CertificationCTA } from "@/components/landing/CertificationCTA";
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
        <LogoStrip />
        <FaceToFace />
        <KnowledgeQuest />
        <StatsBand />
        <InstructorVideo />
        <TopTips />
        <TopCourses />
        <Workshops />
        <Testimonials />
        <RecentPosts />
        <CertificationCTA />
      </main>
      <Footer />
    </div>
  );
}
