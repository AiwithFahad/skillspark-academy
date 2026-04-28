import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useLMSStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, Plus, Search, User, ChevronRight, Users, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Route = createFileRoute("/admin/subjects")({
  component: SubjectManagement,
});

function SubjectManagement() {
  const { 
    subjects, 
    users, 
    addSubject, 
    assignTeacherToSubject, 
    assignStudentToSubject,
    unenrollStudentFromSubject,
    deleteSubject
  } = useLMSStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [selectedTeacherId, setSelectedTeacherId] = useState<string>("");
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

  const teachers = users.filter((u) => u.role === "TEACHER");
  const students = users.filter((u) => u.role === "STUDENT");

  const filteredSubjects = subjects.filter((s) => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectName.trim()) return;
    addSubject(subjectName);
    toast.success("Subject created");
    setSubjectName("");
    setIsDialogOpen(false);
  };

  const handleAssignTeacher = (subjectId: string, teacherId: string) => {
    assignTeacherToSubject(subjectId, teacherId);
    toast.success("Teacher assigned to subject");
  };

  const openEnrollment = (id: string) => {
    setSelectedSubjectId(id);
    setIsEnrollOpen(true);
  };

  const handleEnroll = (studentId: string) => {
    if (!selectedSubjectId || studentId === 'none') return;
    assignStudentToSubject(selectedSubjectId, studentId);
    toast.success("Student enrolled");
  };

  const currentSubject = subjects.find(s => s.id === selectedSubjectId);
  const enrolledStudents = students.filter(s => currentSubject?.studentIds.includes(s.id));
  const otherStudents = students.filter(s => !currentSubject?.studentIds.includes(s.id));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Subjects</h2>
          <p className="text-muted-foreground">Define teaching tracks and manage student enrollments.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Create Subject
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Subject</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddSubject} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Subject Name</Label>
                <Input 
                  value={subjectName} 
                  onChange={(e) => setSubjectName(e.target.value)} 
                  placeholder="e.g. UX Design" 
                  required 
                />
              </div>
              <DialogFooter>
                <Button type="submit">Create</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search subjects..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSubjects.map((subject) => {
          return (
            <Card key={subject.id} className="group relative overflow-hidden shadow-soft hover:shadow-card-hover transition-all border-none bg-card">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <BookOpen className="h-24 w-24" />
              </div>
              <CardHeader className="bg-muted/30 pb-4 border-b">
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => { if(confirm('Delete subject?')) deleteSubject(subject.id); }}>
                       <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" asChild className="h-8 px-2 text-primary">
                      <Link 
                        to="/admin/curriculum" 
                        search={{ subjectId: subject.id }}
                      >
                        Curriculum <ChevronRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <CardTitle className="mt-4 text-xl">{subject.name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Users className="h-3.5 w-3.5" /> {subject.studentIds.length} Enrolled Students
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Subject Lead</Label>
                    <Select 
                      value={subject.teacherId || "unassigned"} 
                      onValueChange={(val) => handleAssignTeacher(subject.id, val)}
                    >
                      <SelectTrigger className="h-10 bg-background/50 border-dashed">
                        <SelectValue placeholder="Assign Teacher" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unassigned">Unassigned</SelectItem>
                        {teachers.map(t => (
                          <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full gap-2 border-dashed h-10 rounded-xl"
                    onClick={() => openEnrollment(subject.id)}
                  >
                    <Plus className="h-3.5 w-3.5" /> Manage Enrollment
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Enrollment Dialog */}
      <Dialog open={isEnrollOpen} onOpenChange={setIsEnrollOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enrollment: {currentSubject?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Enroll New Student</Label>
              <Select onValueChange={handleEnroll}>
                <SelectTrigger>
                  <SelectValue placeholder="Select student to enroll" />
                </SelectTrigger>
                <SelectContent>
                  {otherStudents.length === 0 ? (
                    <SelectItem value="none" disabled>No students available</SelectItem>
                  ) : (
                    otherStudents.map(s => (
                      <SelectItem key={s.id} value={s.id}>{s.name} ({s.email})</SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Enrolled Students</Label>
              <ScrollArea className="h-48 rounded-md border p-4">
                {enrolledStudents.length === 0 ? (
                   <div className="text-center py-10 text-muted-foreground italic text-sm">No students enrolled yet.</div>
                ) : (
                  <div className="space-y-3">
                    {enrolledStudents.map(student => (
                      <div key={student.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <User className="h-3 w-3 text-muted-foreground" />
                           <span className="text-sm font-medium">{student.name}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 text-[10px] uppercase text-destructive hover:bg-destructive/10"
                          onClick={() => currentSubject && unenrollStudentFromSubject(currentSubject.id, student.id)}
                        >
                          Unenroll
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>
          </div>
          <DialogFooter>
             <Button className="w-full" onClick={() => setIsEnrollOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
