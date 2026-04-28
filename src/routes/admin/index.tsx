import { createFileRoute, Link } from "@tanstack/react-router";
import { useLMSStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, Calendar } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from "recharts";

export function AdminDashboardView() {
  const { users, subjects, sessions, auditLogs } = useLMSStore();
  
  const stats = [
    { name: "Total Students", value: users.filter(u => u.role === 'STUDENT').length, icon: Users, color: "text-blue-600" },
    { name: "Teachers", value: users.filter(u => u.role === 'TEACHER').length, icon: Users, color: "text-indigo-600" },
    { name: "Active Subjects", value: subjects.length, icon: BookOpen, color: "text-green-600" },
    { name: "Scheduled Sessions", value: sessions.filter(s => s.status === 'SCHEDULED' || s.status === 'LIVE').length, icon: Calendar, color: "text-amber-600" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">System Overview</h2>
          <p className="text-muted-foreground">Manage your academy ecosystem at a glance.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/admin/audit-logs">View Logs</Link>
          </Button>
          <Button asChild>
            <Link to="/admin/users">Manage Users</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="shadow-soft hover:shadow-card-hover transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">System total</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 shadow-soft">
          <CardHeader>
            <CardTitle>Session Activity</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Mon', sessions: 4 },
                  { name: 'Tue', sessions: 3 },
                  { name: 'Wed', sessions: 6 },
                  { name: 'Thu', sessions: 8 },
                  { name: 'Fri', sessions: 5 },
                  { name: 'Sat', sessions: 2 },
                  { name: 'Sun', sessions: 1 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="sessions" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3 shadow-soft">
          <CardHeader>
            <CardTitle>System Audit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {auditLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="flex items-start gap-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{log.action}</p>
                    <p className="text-xs text-muted-foreground line-clamp-1">{log.details}</p>
                    <p className="text-[10px] text-muted-foreground">{new Date(log.timestamp).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
              {auditLogs.length === 0 && (
                <p className="text-sm text-muted-foreground italic text-center py-10">No logs recorded yet.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/admin/")({
  component: AdminDashboardView,
});

