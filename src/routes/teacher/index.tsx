import { createFileRoute, Link } from "@tanstack/react-router";
import { useLMSStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  BookOpen, 
  Calendar as CalendarIcon, 
  Clock, 
  Video,
  CheckCircle2,
  ChevronRight
} from "lucide-react";
import { format, isToday, parseISO } from "date-fns";

export function TeacherDashboardView() {
  const { currentUser, sessions, subjects, users } = useLMSStore();
  
  if (!currentUser || currentUser.role !== 'TEACHER') {
    return <div>Access Denied</div>;
  }

  const teacherSessions = sessions.filter(s => s.teacherId === currentUser.id);
  const teacherSubjects = subjects.filter(s => s.teacherId === currentUser.id);
  const teacherStudents = users.filter(u => u.role === 'STUDENT' && u.teacherId === currentUser.id);
  
  const todaySessions = teacherSessions.filter(s => isToday(parseISO(s.dateTime)));
  const pendingAttendance = teacherSessions.filter(s => s.status === 'COMPLETED').length; // Mock logic

  const stats = [
    { title: "Assigned Students", value: teacherStudents.length, icon: Users, color: "text-blue-600" },
    { title: "Active Subjects", value: teacherSubjects.length, icon: BookOpen, color: "text-purple-600" },
    { title: "Today's Sessions", value: todaySessions.length, icon: CalendarIcon, color: "text-orange-600" },
    { title: "Completed Sessions", value: pendingAttendance, icon: CheckCircle2, color: "text-green-600" },
  ];

  const upcomingSessions = teacherSessions
    .filter(s => s.status === 'SCHEDULED')
    .sort((a, b) => parseISO(a.dateTime).getTime() - parseISO(b.dateTime).getTime())
    .slice(0, 5);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button asChild>
            <Link to="/teacher/sessions">Schedule Session</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSessions.length > 0 ? (
                upcomingSessions.map((session) => {
                  const subject = subjects.find(s => s.id === session.subjectId);
                  const sessionStudents = users.filter(u => session.studentIds.includes(u.id));
                  
                  return (
                    <div key={session.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <CalendarIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{subject?.name}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {format(parseISO(session.dateTime), 'MMM d, h:mm a')} ({session.duration}m)
                          </div>
                          <div className="flex gap-1 mt-1">
                            {sessionStudents.slice(0, 2).map(s => (
                              <Badge key={s.id} variant="secondary" className="text-[10px] px-1 h-4">
                                {s.name}
                              </Badge>
                            ))}
                            {sessionStudents.length > 2 && (
                                <Badge variant="secondary" className="text-[10px] px-1 h-4">
                                    +{sessionStudents.length - 2}
                                </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                           <a href={session.meetLink} target="_blank" rel="noopener noreferrer">
                             <Video className="h-4 w-4 mr-2" />
                             Join
                           </a>
                        </Button>
                        <Button size="sm" asChild>
                          <Link to="/teacher/sessions">Manage</Link>
                        </Button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No upcoming sessions. Schedule one to get started.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>My Subjects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teacherSubjects.map((subject) => (
                <div key={subject.id} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-primary">
                      {subject.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{subject.name}</p>
                      <p className="text-xs text-muted-foreground">{subject.studentIds.length} Students</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" asChild>
                    <Link to="/teacher/curriculum" search={{ subjectId: subject.id }}>
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/teacher/")({
  component: TeacherDashboardView,
});
