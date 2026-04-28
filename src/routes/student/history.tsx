import { createFileRoute } from "@tanstack/react-router";
import { useLMSStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BookOpen, Calendar, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { format, parseISO } from "date-fns";

export function StudentHistoryView() {
  const { currentUser, sessions, subjects, attendance } = useLMSStore();
  
  if (!currentUser || currentUser.role !== 'STUDENT') return <div>Access Denied</div>;

  const studentSessions = sessions
    .filter(s => s.studentIds.includes(currentUser.id) && s.status === 'COMPLETED')
    .sort((a, b) => parseISO(b.dateTime).getTime() - parseISO(a.dateTime).getTime());

  const getAttendanceForSession = (sessionId: string) => {
    return attendance.find(a => a.sessionId === sessionId && a.studentId === currentUser.id);
  };

  const totalPresent = attendance.filter(a => a.studentId === currentUser.id && a.status === 'PRESENT').length;
  const totalAbsent = attendance.filter(a => a.studentId === currentUser.id && a.status === 'ABSENT').length;
  const totalLate = attendance.filter(a => a.studentId === currentUser.id && a.status === 'LATE').length;
  const totalSessions = studentSessions.length;
  const attendanceRate = totalSessions > 0 ? Math.round(((totalPresent + totalLate * 0.5) / totalSessions) * 100) : 100;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Learning History</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Attendance</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceRate}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessions Attended</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPresent}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Absences</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAbsent}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late Arrivals</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLate}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Session Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Attendance Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentSessions.length > 0 ? (
                studentSessions.map((session) => {
                  const subject = subjects.find(s => s.id === session.subjectId);
                  const att = getAttendanceForSession(session.id);
                  return (
                    <TableRow key={session.id}>
                      <TableCell className="font-medium">
                        {format(parseISO(session.dateTime), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell>{subject?.name}</TableCell>
                      <TableCell>{session.duration} mins</TableCell>
                      <TableCell>
                        {att ? (
                          <Badge variant={
                            att.status === 'PRESENT' ? 'success' : 
                            att.status === 'LATE' ? 'warning' : 'destructive'
                          } className={
                            att.status === 'PRESENT' ? 'bg-green-100 text-green-700' :
                            att.status === 'LATE' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
                          }>
                            {att.status}
                          </Badge>
                        ) : (
                          <Badge variant="outline">Not Recorded</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Details</Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No completed sessions found in history.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export const Route = createFileRoute("/student/history")({
  component: StudentHistoryView,
});
