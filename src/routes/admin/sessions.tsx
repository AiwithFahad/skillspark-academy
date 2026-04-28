import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useLMSStore, Session } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Plus, Video, Copy, ExternalLink, Calendar, Clock, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

export const Route = createFileRoute("/admin/sessions")({
  component: SessionManagement,
});

function SessionManagement() {
  const { sessions, subjects, users, scheduleSession } = useLMSStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Form State
  const [subjectId, setSubjectId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [dateTime, setDateTime] = useState("");

  const teachers = users.filter((u) => u.role === "TEACHER");

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectId || !teacherId || !dateTime) return;
    
    scheduleSession({
      subjectId,
      teacherId,
      dateTime,
      studentIds: subjects.find(s => s.id === subjectId)?.studentIds || [],
      duration: 60,
    });
    
    toast.success("Session scheduled & Meet link generated");
    setIsDialogOpen(false);
  };

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast.success("Meet link copied to clipboard");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Sessions</h2>
          <p className="text-muted-foreground">Schedule live classes and manage Google Meet links.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Schedule Session
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule Live Class</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSchedule} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Subject</Label>
                <Select value={subjectId} onValueChange={setSubjectId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map(s => (
                      <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Teacher</Label>
                <Select value={teacherId} onValueChange={setTeacherId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map(t => (
                      <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date & Time</Label>
                <Input 
                  type="datetime-local" 
                  value={dateTime} 
                  onChange={(e) => setDateTime(e.target.value)}
                  className="w-full"
                  required 
                />
              </div>
              <DialogFooter>
                <Button type="submit">Schedule & Generate Link</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date & Time</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Meeting Link</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    No sessions scheduled yet.
                  </TableCell>
                </TableRow>
              ) : (
                sessions.slice().reverse().map((session) => (
                  <TableRow key={session.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{format(new Date(session.dateTime), "MMM dd, yyyy")}</span>
                        <span className="text-xs text-muted-foreground">{format(new Date(session.dateTime), "hh:mm a")}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {subjects.find(s => s.id === session.subjectId)?.name}
                    </TableCell>
                    <TableCell>
                      {users.find(u => u.id === session.teacherId)?.name}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        session.status === 'LIVE' ? 'bg-red-100 text-red-700 animate-pulse' :
                        session.status === 'COMPLETED' ? 'bg-slate-100 text-slate-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {session.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-muted px-2 py-1 rounded truncate max-w-[150px]">
                          {session.meetLink.replace('https://', '')}
                        </code>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => copyLink(session.meetLink)}
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-primary"
                          asChild
                        >
                          <a href={session.meetLink} target="_blank" rel="noreferrer">
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                       <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                       </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
