import { createFileRoute } from "@tanstack/react-router";
import { useLMSStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FileText, ExternalLink, Calendar } from "lucide-react";
import { z } from "zod";

const searchSchema = z.object({
  subjectId: z.string().optional(),
});

export function TeacherCurriculumView() {
  const { subjectId } = Route.useSearch();
  const { subjects, curriculum, currentUser } = useLMSStore();
  
  if (!currentUser || currentUser.role !== 'TEACHER') return <div>Access Denied</div>;

  const teacherSubjects = subjects.filter(s => s.teacherId === currentUser.id);
  const currentSubject = teacherSubjects.find(s => s.id === subjectId) || teacherSubjects[0];
  const weeks = currentSubject ? (curriculum[currentSubject.id] || []) : [];

  if (!currentSubject) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
        <h2 className="text-xl font-semibold">No Assigned Subjects</h2>
        <p className="text-muted-foreground">You don't have any subjects assigned to you yet.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{currentSubject.name} Curriculum</h2>
          <p className="text-muted-foreground italic">Read-only access for teaching reference.</p>
        </div>
        <div className="flex flex-wrap gap-2">
            {teacherSubjects.map(s => (
                <Button 
                    key={s.id} 
                    variant={s.id === currentSubject.id ? 'default' : 'outline'}
                    size="sm"
                    asChild
                >
                    <a href={`/teacher/curriculum?subjectId=${s.id}`}>
                        {s.name}
                    </a>
                </Button>
            ))}
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {weeks.sort((a, b) => a.weekNumber - b.weekNumber).map((week) => (
          <AccordionItem 
            key={week.id} 
            value={week.id} 
            className="border rounded-xl bg-card overflow-hidden shadow-sm px-4"
          >
            <AccordionTrigger className="hover:no-underline py-6">
              <div className="flex items-center gap-4 text-left">
                <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  {week.weekNumber}
                </div>
                <div>
                  <div className="font-semibold text-lg">{week.title}</div>
                  <div className="text-sm text-muted-foreground line-clamp-1">{week.description}</div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6 pt-2 space-y-6">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" /> Topic Description
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {week.description}
                  </p>
                  
                  <h4 className="font-semibold flex items-center gap-2 pt-2">
                    <Calendar className="h-4 w-4 text-primary" /> Session Plan Suggestion
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Align your weekly sessions around this topic. Ensure students complete the defined assignment.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-muted/30 rounded-xl space-y-3">
                    <h4 className="font-semibold text-sm">Student Assignment</h4>
                    <p className="text-sm border-l-2 border-primary pl-3 py-1">
                      {week.assignment}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Teaching Resources</h4>
                    <div className="space-y-2">
                      {week.resources.length > 0 ? week.resources.map((res, i) => (
                        <a 
                          key={i} 
                          href={res} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center justify-between p-2 text-xs bg-card border rounded-lg hover:bg-muted group transition-colors"
                        >
                          <span className="truncate max-w-[200px]">{res}</span>
                          <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      )) : (
                        <p className="text-xs text-muted-foreground italic">No resources attached for this week.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export const Route = createFileRoute("/teacher/curriculum")({
  validateSearch: (search) => searchSchema.parse(search),
  component: TeacherCurriculumView,
});
