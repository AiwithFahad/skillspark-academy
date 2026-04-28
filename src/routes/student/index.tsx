import { createFileRoute, Link } from "@tanstack/react-router";
import { useLMSStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Calendar as CalendarIcon, 
  Clock, 
  Video,
  CheckCircle2,
  ChevronRight,
  Bell
} from "lucide-react";
import { format, isToday, parseISO } from "date-fns";

export function StudentDashboardView() {
  const { currentUser, sessions, subjects, users, notifications } = useLMSStore();
  
  if (!currentUser || currentUser.role !== 'STUDENT') {
    return <div>Access Denied</div>;
  }

  const studentSubjects = subjects.filter(s => s.studentIds.includes(currentUser.id));
  const studentSessions = sessions.filter(s => s.studentIds.includes(currentUser.id));
  const studentNotifications = notifications.filter(n => n.userId === currentUser.id).slice(0, 5);

  const upcomingSessions = studentSessions
    .filter(s => s.status === 'SCHEDULED' || s.status === 'LIVE')
    .sort((a, b) => parseISO(a.dateTime).getTime() - parseISO(b.dateTime).getTime())
    .slice(0, 5);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Student Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSessions.length > 0 ? (
                upcomingSessions.map((session) => {
                  const subject = subjects.find(s => s.id === session.subjectId);
                  const teacher = users.find(u => u.id === session.teacherId);
                  
                  return (
                    <div key={session.id} className="flex flex-col sm:flex-row items-center justify-between p-4 border rounded-xl bg-card hover:bg-muted/50 transition-colors gap-4">
                      <div className="flex items-center gap-4 w-full">
                        <div className={`p-3 rounded-lg ${session.status === 'LIVE' ? 'bg-red-100' : 'bg-primary/10'}`}>
                          {session.status === 'LIVE' ? (
                            <div className="relative">
                              <Video className="h-6 w-6 text-red-600 animate-pulse" />
                              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                              </span>
                            </div>
                          ) : (
                            <CalendarIcon className="h-6 w-6 text-primary" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-lg">{subject?.name}</p>
                            {session.status === 'LIVE' && <Badge variant="destructive">LIVE NOW</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground">{teacher?.name}</p>
                          <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1 font-medium text-foreground"><Clock className="h-3.5 w-3.5" /> {format(parseISO(session.dateTime), 'h:mm a')}</span>
                            <span>•</span>
                            <span>{session.duration} mins</span>
                          </div>
                        </div>
                      </div>
                      <Button className={`w-full sm:w-auto ${session.status === 'LIVE' ? 'bg-red-600 hover:bg-red-700' : ''}`} asChild>
                        <a href={session.meetLink} target="_blank" rel="noopener noreferrer">
                          <Video className="h-4 w-4 mr-2" />
                          {session.status === 'LIVE' ? 'Join Now' : 'Join Link'}
                        </a>
                      </Button>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 border-2 border-dashed rounded-xl border-muted text-muted-foreground">
                  <div className="flex flex-col items-center gap-2">
                    <CalendarIcon className="h-8 w-8 opacity-20" />
                    <p>No classes scheduled for today.</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base font-semibold">Latest Notifications</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentNotifications.length > 0 ? (
                  studentNotifications.map((n) => (
                    <div key={n.id} className="flex gap-3 text-sm group">
                      <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${n.read ? 'bg-transparent' : 'bg-primary'}`} />
                      <div className="space-y-0.5">
                        <p className="font-medium leading-tight group-hover:text-primary transition-colors">{n.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{n.message}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No new notifications</p>
                )}
                {studentNotifications.length > 0 && (
                  <Button variant="ghost" size="sm" className="w-full text-xs" asChild>
                    <Link to="/student/notifications">View All Notifications</Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Learning Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studentSubjects.map(subject => (
                  <div key={subject.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{subject.name}</span>
                      <span className="text-muted-foreground">65%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full transition-all" style={{ width: '65%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="pt-4">
        <h3 className="text-xl font-bold mb-4">My Subjects</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {studentSubjects.map((subject) => {
            const teacher = users.find(u => u.id === subject.teacherId);
            return (
              <Card key={subject.id} className="overflow-hidden group hover:shadow-lg transition-all border-border/50">
                <CardHeader className="bg-muted/30 pb-4">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="bg-background">Enrolled</Badge>
                    <div className="p-2 bg-background rounded-lg border">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="mt-4">{subject.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">Teacher: {teacher?.name || 'Unassigned'}</p>
                </CardHeader>
                <CardContent className="p-4 flex justify-between items-center bg-card">
                  <span className="text-xs text-muted-foreground">Next class: Tomorrow, 10:00 AM</span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/student/subjects" search={{ subjectId: subject.id }}>
                      View Course <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/student/")({
  component: StudentDashboardView,
});
