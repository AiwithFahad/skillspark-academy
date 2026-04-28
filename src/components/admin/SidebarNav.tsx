import { Link } from "@tanstack/react-router";
import { 
  Users, 
  BookOpen, 
  Calendar, 
  BarChart3, 
  LayoutDashboard,
  GraduationCap,
  Settings,
  Bell,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLMSStore } from "@/lib/store";

const items = [
  { name: "Overview", icon: LayoutDashboard, href: "/admin" },
  { name: "User Management", icon: Users, href: "/admin/users" },
  { name: "Subjects", icon: BookOpen, href: "/admin/subjects" },
  { name: "Sessions", icon: Calendar, href: "/admin/sessions" },
  { name: "Audit Logs", icon: BarChart3, href: "/admin/audit-logs" },
];

const teacherItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/teacher" },
  { name: "My Students", icon: Users, href: "/teacher/students" },
  { name: "Sessions", icon: Calendar, href: "/teacher/sessions" },
  { name: "Curriculum", icon: BookOpen, href: "/teacher/curriculum" },
];

const studentItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/student" },
  { name: "My Subjects", icon: BookOpen, href: "/student/subjects" },
  { name: "Attendance", icon: CheckCircle2, href: "/student/history" },
  { name: "Inbox", icon: Bell, href: "/student/notifications" },
];

export function SidebarNav() {
  const { currentUser } = useLMSStore();
  
  const currentItems = 
    currentUser?.role === 'ADMIN' ? items : 
    currentUser?.role === 'TEACHER' ? teacherItems : 
    studentItems;

  const settingsLink = 
    currentUser?.role === 'ADMIN' ? "/admin/settings" : 
    currentUser?.role === 'TEACHER' ? "/teacher/settings" : 
    "/student/profile";

  return (
    <aside className="hidden w-64 border-r border-border/60 bg-muted/30 md:block">
      <div className="flex h-full flex-col gap-4 p-4">
        <div className="flex-1 space-y-1">
          {currentItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              activeProps={{ className: "bg-primary/10 text-primary" }}
              inactiveProps={{ className: "text-muted-foreground hover:bg-muted" }}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </div>
        <div className="border-t border-border/60 pt-4">
          <Link
            to={settingsLink}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
          >
            <Settings className="h-4 w-4" />
            {currentUser?.role === 'ADMIN' ? 'Settings' : 'Profile'}
          </Link>
        </div>
      </div>
    </aside>
  );
}
