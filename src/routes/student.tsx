import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useLMSStore } from "@/lib/store";
import { Header } from "@/components/landing/Header";
import { LayoutDashboard, BookOpen, Calendar, Settings } from "lucide-react";

export const Route = createFileRoute("/student")({
  beforeLoad: ({ location }) => {
    const user = useLMSStore.getState().currentUser;
    if (!user || user.role !== 'STUDENT') {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: StudentLayout,
});

function StudentLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col pb-20 md:pb-0">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 md:p-8 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
      
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/80 backdrop-blur-lg px-6 h-16 flex items-center justify-between md:hidden shadow-lg">
         <button className="flex flex-col items-center gap-1 text-primary">
            <LayoutDashboard className="h-5 w-5" />
            <span className="text-[10px] font-bold">Dashboard</span>
         </button>
         <button className="flex flex-col items-center gap-1 text-muted-foreground">
            <BookOpen className="h-5 w-5" />
            <span className="text-[10px] font-bold">Subjects</span>
         </button>
         <button className="flex flex-col items-center gap-1 text-muted-foreground">
            <Calendar className="h-5 w-5" />
            <span className="text-[10px] font-bold">Sessions</span>
         </button>
         <button className="flex flex-col items-center gap-1 text-muted-foreground">
            <Settings className="h-5 w-5" />
            <span className="text-[10px] font-bold">Settings</span>
         </button>
      </nav>
    </div>
  );
}
