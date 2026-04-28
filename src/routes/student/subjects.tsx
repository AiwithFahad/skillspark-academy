import { createFileRoute } from "@tanstack/react-router";
import { useLMSStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Circle, 
  Lock, 
  BookOpen, 
  FileText, 
  ExternalLink,
  ChevronRight,
  Clock
} from "lucide-react";
import { z } from "zod";

const searchSchema = z.object({
  subjectId: z.string().optional(),
});

export function StudentSubjectsView() {
  const { subjectId } = Route.useSearch();
  const { subjects, curriculum, currentUser, users } = useLMSStore();
  
  if (!currentUser || currentUser.role !== 'STUDENT') return <div>Access Denied</div>;

  const studentSubjects = subjects.filter(s => s.studentIds.includes(currentUser.id));
  const currentSubject = studentSubjects.find(s => s.id === subjectId) || studentSubjects[0];
  const weeks = currentSubject ? (curriculum[currentSubject.id] || []) : [];
  const teacher = currentSubject ? users.find(u => u.id === currentSubject.teacherId) : null;

  if (!currentSubject) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
        <h2 className="text-xl font-semibold">No Enrolled Subjects</h2>
        <p className="text-muted-foreground">You are not enrolled in any subjects yet.</p>
      </div>
    );
  }

  // Mock progress logic
  const currentWeekNum = 2;

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">Learning Journey</Badge>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">{weeks.length} Weeks Total</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">{currentSubject.name}</h2>
          <p className="text-muted-foreground">Subject Instructor: <span className="text-foreground font-medium">{teacher?.name || 'Assigned soon'}</span></p>
        </div>
        <div className="flex gap-2">
           {studentSubjects.length > 1 && (
             <div className="flex gap-1 bg-muted p-1 rounded-lg">
                {studentSubjects.map(s => (
                  <Button 
                    key={s.id} 
                    variant={s.id === currentSubject.id ? 'secondary' : 'ghost'}
                    size="sm"
                    asChild
                    className="h-8 px-3"
                  >
                    <a href={`/student/subjects?subjectId=${s.id}`}>
                      {s.name}
                    </a>
                  </Button>
                ))}
             </div>
           )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8 relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-muted-foreground/20 hidden md:block" />

          {weeks.sort((a, b) => a.weekNumber - b.weekNumber).map((week, idx) => {
            const isCompleted = week.weekNumber < currentWeekNum;
            const isCurrent = week.weekNumber === currentWeekNum;
            const isLocked = week.weekNumber > currentWeekNum;

            return (
              <div key={week.id} className="relative pl-0 md:pl-12 group">
                {/* Timeline Node */}
                <div className={`absolute left-0 top-0 w-12 h-12 rounded-full border-4 border-background flex items-center justify-center z-10 transition-colors hidden md:flex ${
                  isCompleted ? 'bg-green-100 border-green-50' : 
                  isCurrent ? 'bg-primary border-primary/20 shadow-lg shadow-primary/20' : 
                  'bg-muted border-muted/50'
                }`}>
                  {isCompleted ? <CheckCircle2 className="h-6 w-6 text-green-600" /> : 
                   isCurrent ? <Circle className="h-6 w-6 text-white animate-pulse" /> : 
                   <Lock className="h-4 w-4 text-muted-foreground" />}
                </div>

                <Card className={`overflow-hidden transition-all duration-300 border-l-4 ${
                  isCompleted ? 'border-l-green-500 opacity-80' : 
                  isCurrent ? 'border-l-primary scale-[1.02] shadow-xl' : 
                  'border-l-muted'
                }`}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Week {week.weekNumber}</p>
                        <CardTitle className="text-xl">{week.title}</CardTitle>
                      </div>
                      {isCurrent && <Badge>Active Now</Badge>}
                    </div>
                    <CardDescription className="line-clamp-2 mt-1">{week.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {!isLocked ? (
                      <>
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold flex items-center gap-2 italic">
                            <FileText className="h-4 w-4" /> Weekly Task:
                          </h4>
                          <div className="p-3 bg-muted/40 rounded-lg text-sm border-l-2 border-primary/40">
                             {week.assignment}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                           {week.resources.map((res, i) => (
                             <Button key={i} variant="outline" size="sm" className="h-8 text-xs gap-2" asChild>
                               <a href={res} target="_blank" rel="noreferrer">
                                 <ExternalLink className="h-3 w-3" /> View Resource
                               </a>
                             </Button>
                           ))}
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-2 py-4 text-muted-foreground italic text-sm">
                        <Lock className="h-4 w-4" /> Content locked until Week {week.weekNumber}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Course Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex justify-between text-sm mb-1">
                 <span className="text-muted-foreground">Overall Completion</span>
                 <span className="font-bold">40%</span>
               </div>
               <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                 <div className="h-full bg-primary rounded-full" style={{ width: '40%' }} />
               </div>
               
               <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-3 rounded-xl bg-green-100/50">
                    <p className="text-2xl font-bold text-green-700">1</p>
                    <p className="text-[10px] uppercase font-bold text-green-600">Weeks Done</p>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-blue-100/50">
                    <p className="text-2xl font-bold text-blue-700">6</p>
                    <p className="text-[10px] uppercase font-bold text-blue-600">Pending</p>
                  </div>
               </div>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
               <CardTitle className="text-lg">Need help?</CardTitle>
               <CardDescription className="text-primary-foreground/80">Message your instructor directly if you have questions about this week's assignments.</CardDescription>
            </CardHeader>
            <CardContent>
               <Button className="w-full bg-white text-primary hover:bg-white/90">Contact Teacher</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/student/subjects")({
  validateSearch: (search) => searchSchema.parse(search),
  component: StudentSubjectsView,
});
