import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useLMSStore, Session, SessionStatus } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import { Calendar as CalendarIcon, Clock, Video, Plus, CheckCircle, XCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export function TeacherSessionsView() {
  const { currentUser, sessions, subjects, users, scheduleSession, updateSessionStatus, cancelSession, markAttendance, attendance } = useLMSStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [sessionDateTime, setSessionDateTime] = useState("");
  const [duration, setDuration] = useState("60");
  
  const [attendanceDialogOpen, setAttendanceDialogOpen] = useState(false);
  const [activeSessionForAttendance, setActiveSessionForAttendance] = useState<Session | null>(null);

  if (!currentUser || currentUser.role !== 'TEACHER') return <div>Access Denied</div>;

  const teacherSessions = sessions.filter(s => s.teacherId === currentUser.id);
  const teacherSubjects = subjects.filter(s => s.teacherId === currentUser.id);
  const teacherStudents = users.filter(u => u.role === 'STUDENT' && u.teacherId === currentUser.id);

  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    scheduleSession({
      subjectId: selectedSubjectId,
      teacherId: currentUser.id,
      studentIds: selectedStudentIds,
      dateTime: new Date(sessionDateTime).toISOString(),
      duration: parseInt(duration),
    });
    setIsDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setSelectedSubjectId("");
    setSelectedStudentIds([]);
    setSessionDateTime("");
  };

  const handleMarkAttendance = (studentId: string, status: 'PRESENT' | 'ABSENT' | 'LATE') => {
    if (activeSessionForAttendance) {
      markAttendance(activeSessionForAttendance.id, studentId, status);
    }
  };

  const isAttendanceMarked = (sessionId: string, studentId: string) => {
    return attendance.some(a => a.sessionId === sessionId && a.studentId === studentId);
  };

  const getAttendanceStatus = (sessionId: string, studentId: string) => {
    const record = attendance.find(a => a.sessionId === sessionId && a.studentId === studentId);
    return record?.status;
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Session Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Schedule New Session
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Schedule Session</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateSession} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Subject</Label>
                <Select value={selectedSubjectId} onValueChange={setSelectedSubjectId} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {teacherSubjects.map(s => (
                      <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Students</Label>
                <div className="grid grid-cols-1 gap-2 max-h-[150px] overflow-y-auto p-2 border rounded-md">
                  {teacherStudents.map(student => (
                    <div key={student.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={student.id} 
                        checked={selectedStudentIds.includes(student.id)}
                        onCheckedChange={(checked) => {
                          if (checked) setSelectedStudentIds([...selectedStudentIds, student.id]);
                          else setSelectedStudentIds(selectedStudentIds.filter(id => id !== student.id));
                        }}
                      />
                      <label htmlFor={student.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {student.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Date & Time</Label>
                <Input type="datetime-local" value={sessionDateTime} onChange={(e) => setSessionDateTime(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Duration (minutes)</Label>
                <Input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} min="15" step="15" required />
              </div>
              <Button type="submit" className="w-full">Create Session</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {teacherSessions.sort((a, b) => parseISO(b.dateTime).getTime() - parseISO(a.dateTime).getTime()).map((session) => {
          const subject = subjects.find(s => s.id === session.subjectId);
          const sessionStudents = users.filter(u => session.studentIds.includes(u.id));
          
          return (
            <Card key={session.id} className={session.status === 'CANCELLED' ? 'opacity-50' : ''}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl h-fit">
                      <CalendarIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold">{subject?.name}</h3>
                        <Badge variant={
                          session.status === 'SCHEDULED' ? 'outline' : 
                          session.status === 'LIVE' ? 'default' :
                          session.status === 'COMPLETED' ? 'secondary' : 'destructive'
                        }>
                          {session.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {format(parseISO(session.dateTime), 'MMM d, yyyy h:mm a')}</span>
                        <span>•</span>
                        <span>{session.duration} mins</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {sessionStudents.map(s => (
                          <Badge key={s.id} variant="outline" className="text-[10px]">
                            {s.name}
                            {isAttendanceMarked(session.id, s.id) && (
                              <span className={`ml-1 ${getAttendanceStatus(session.id, s.id) === 'PRESENT' ? 'text-green-500' : 'text-red-500'}`}>
                                ●
                              </span>
                            )}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {session.status === 'SCHEDULED' && (
                       <>
                        <Button variant="outline" size="sm" asChild>
                           <a href={session.meetLink} target="_blank" rel="noopener noreferrer">
                             <Video className="h-4 w-4 mr-2 text-green-600" />
                             Join
                           </a>
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => updateSessionStatus(session.id, 'LIVE')}>Start Session</Button>
                        <Button variant="destructive" size="sm" onClick={() => cancelSession(session.id)}>Cancel</Button>
                       </>
                    )}
                    {session.status === 'LIVE' && (
                       <>
                        <Button variant="default" size="sm" asChild>
                           <a href={session.meetLink} target="_blank" rel="noopener noreferrer">
                             <Video className="h-4 w-4 mr-2" />
                             Join Now
                           </a>
                        </Button>
                        <Button variant="secondary" size="sm" onClick={() => updateSessionStatus(session.id, 'COMPLETED')}>Finish Session</Button>
                       </>
                    )}
                    {(session.status === 'COMPLETED' || session.status === 'LIVE') && (
                      <Button variant="outline" size="sm" onClick={() => {
                        setActiveSessionForAttendance(session);
                        setAttendanceDialogOpen(true);
                      }}>
                        Attendance
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={attendanceDialogOpen} onOpenChange={setAttendanceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Attendance: {subjects.find(s => s.id === activeSessionForAttendance?.subjectId)?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {activeSessionForAttendance?.studentIds.map(studentId => {
              const student = users.find(u => u.id === studentId);
              const status = getAttendanceStatus(activeSessionForAttendance.id, studentId);
              
              return (
                <div key={studentId} className="flex items-center justify-between p-2 border rounded-lg">
                  <span className="font-medium">{student?.name}</span>
                  <div className="flex gap-1">
                    <Button 
                      size="sm" 
                      variant={status === 'PRESENT' ? 'default' : 'outline'} 
                      onClick={() => handleMarkAttendance(studentId, 'PRESENT')}
                    >
                      Present
                    </Button>
                    <Button 
                      size="sm" 
                      variant={status === 'LATE' ? 'warning' : 'outline'} 
                      className={status === 'LATE' ? 'bg-orange-500 text-white' : ''}
                      onClick={() => handleMarkAttendance(studentId, 'LATE')}
                    >
                      Late
                    </Button>
                    <Button 
                      size="sm" 
                      variant={status === 'ABSENT' ? 'destructive' : 'outline'} 
                      onClick={() => handleMarkAttendance(studentId, 'ABSENT')}
                    >
                      Absent
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          <Button onClick={() => setAttendanceDialogOpen(false)} className="w-full">Done</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export const Route = createFileRoute("/teacher/sessions")({
  component: TeacherSessionsView,
});
