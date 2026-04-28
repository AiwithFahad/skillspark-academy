export interface Story {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  body: string[];
}

export const STORIES: Story[] = [
  {
    slug: "from-zero-to-frontend",
    title: "From zero to frontend developer in 14 weeks",
    excerpt: "How our Web Development cohort helped Aisha land her first role at a product startup.",
    author: "Aisha Khan",
    date: "March 12, 2026",
    readTime: "6 min read",
    category: "Student Story",
    body: [
      "When Aisha joined our Web Development track, she had never written a line of HTML. Fourteen weeks later, she was shipping production features at a Series A startup.",
      "The secret wasn't any single lesson — it was the weekly curriculum, the live sessions with a dedicated teacher, and the habit of building one small project every week.",
      "Her advice to new learners: show up consistently, ask questions in live class, and ship publicly. The feedback loop is the whole point.",
    ],
  },
  {
    slug: "teachers-guide-to-live-classes",
    title: "A teacher's guide to running great live classes",
    excerpt: "Five practices our top instructors use to keep every student engaged on Google Meet.",
    author: "Priya Sharma",
    date: "February 28, 2026",
    readTime: "8 min read",
    category: "Teaching",
    body: [
      "Live classes are where the real learning happens. After running hundreds of sessions, our instructors have converged on a handful of practices that consistently work.",
      "Start with a 2-minute recap, then a 5-minute warm-up problem, then a demo, then a breakout. Keep it tight — attention is the scarcest resource in an online classroom.",
      "Most importantly: close the loop. Every session should end with a clear, specific assignment that is due before the next class.",
    ],
  },
  {
    slug: "why-small-cohorts-win",
    title: "Why we cap every teacher at six students",
    excerpt: "The case for small cohorts, personal attention, and slow scaling over mass enrollment.",
    author: "System Admin",
    date: "February 10, 2026",
    readTime: "4 min read",
    category: "Philosophy",
    body: [
      "Scale is seductive. But in education, scale almost always comes at the cost of outcomes. We built our academy around six students per teacher for a reason.",
      "At six, a teacher knows every student's name, their progress, their blockers, and their goals. At sixty, they know a spreadsheet.",
      "We will scale — but by adding more great teachers, not by stretching the ones we have thinner.",
    ],
  },
];

export const getStory = (slug: string) => STORIES.find((s) => s.slug === slug);