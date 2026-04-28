import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useLMSStore } from "@/lib/store";
import { Header } from "@/components/landing/Header";
import { SidebarNav } from "@/components/admin/SidebarNav";

export const Route = createFileRoute("/teacher")({
  beforeLoad: ({ location }) => {
    const user = useLMSStore.getState().currentUser;
    if (!user || user.role !== 'TEACHER') {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: TeacherLayout,
});

function TeacherLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <SidebarNav />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
