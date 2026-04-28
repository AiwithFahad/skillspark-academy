import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useLMSStore } from "@/lib/store";
import { Header } from "@/components/landing/Header";
import { SidebarNav } from "@/components/admin/SidebarNav";

export const Route = createFileRoute("/admin")({
  beforeLoad: ({ location }) => {
    const user = useLMSStore.getState().currentUser;
    if (!user || user.role !== 'ADMIN') {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: AdminLayout,
});

function AdminLayout() {
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
