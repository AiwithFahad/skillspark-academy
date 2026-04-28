import { createFileRoute } from "@tanstack/react-router";
import { useLMSStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, User as UserIcon, Mail, Book } from "lucide-react";
import { useState } from "react";

export function TeacherStudentsView() {
  const { currentUser, users, subjects } = useLMSStore();
  const [searchTerm, setSearchTerm] = useState("");

  if (!currentUser || currentUser.role !== 'TEACHER') return <div>Access Denied</div>;

  const teacherStudents = users.filter(u => u.role === 'STUDENT' && u.teacherId === currentUser.id);
  const filteredStudents = teacherStudents.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStudentSubjects = (studentId: string) => {
    return subjects.filter(s => s.studentIds.includes(studentId));
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Assigned Students</h2>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Student Roster</CardTitle>
            <div className="relative w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search students..." 
                className="pl-8" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Enrolled Subjects</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Progress</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => {
                  const studentSubs = getStudentSubjects(student.id);
                  return (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
                            <UserIcon className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium leading-none">{student.name}</p>
                            <p className="text-sm text-muted-foreground mt-1">{student.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {studentSubs.map(s => (
                            <Badge key={s.id} variant="secondary" className="text-[10px]">
                              {s.name}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={student.isActive ? 'success' : 'destructive'} className="bg-green-100 text-green-700 hover:bg-green-100">
                          {student.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-xs font-medium">65%</span>
                          <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full" style={{ width: '65%' }} />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No students found.
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

export const Route = createFileRoute("/teacher/students")({
  component: TeacherStudentsView,
});
