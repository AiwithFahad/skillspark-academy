import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useLMSStore, CurriculumWeek } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, GripVertical, FileText, Link, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const searchSchema = z.object({
  subjectId: z.string().optional(),
});

export const Route = createFileRoute("/admin/curriculum")({
  validateSearch: (search) => searchSchema.parse(search),
  component: CurriculumBuilder,
});

function CurriculumBuilder() {
  const { subjectId } = Route.useSearch();
  const { subjects, curriculum, addWeek, updateWeek } = useLMSStore();
  
  const currentSubject = subjects.find(s => s.id === subjectId);
  const weeks = curriculum[subjectId || ""] || [];

  const handleAddWeek = () => {
    if (!subjectId) return;
    addWeek(subjectId, {
      weekNumber: weeks.length + 1,
      title: `Week ${weeks.length + 1}: New Topic`,
      description: "Explain what students will learn this week.",
      resources: [],
      assignment: "Define the weekly task.",
    });
    toast.success("Week added");
  };

  const handleUpdateWeek = (weekId: string, updates: Partial<CurriculumWeek>) => {
    if (!subjectId) return;
    updateWeek(subjectId, weekId, updates);
  };

  if (!subjectId) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
        <h2 className="text-xl font-semibold">No Subject Selected</h2>
        <p className="text-muted-foreground">Select a subject from the Subjects page to build its curriculum.</p>
        <Button asChild><a href="/admin/subjects">Go to Subjects</a></Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{currentSubject?.name} Curriculum</h2>
          <p className="text-muted-foreground">Structure the learning journey week by week.</p>
        </div>
        <Button onClick={handleAddWeek} className="gap-2">
          <Plus className="h-4 w-4" /> Add Week
        </Button>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {weeks.map((week) => (
          <AccordionItem 
            key={week.id} 
            value={week.id} 
            className="border rounded-xl bg-card overflow-hidden shadow-soft px-4"
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
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input 
                      value={week.title} 
                      onChange={(e) => handleUpdateWeek(week.id, { title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea 
                      rows={4}
                      value={week.description} 
                      onChange={(e) => handleUpdateWeek(week.id, { description: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                   <div className="space-y-2">
                    <Label>Weekly Assignment</Label>
                    <Textarea 
                      rows={3}
                      placeholder="Enter assignment details..."
                      value={week.assignment} 
                      onChange={(e) => handleUpdateWeek(week.id, { assignment: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Link className="h-3.5 w-3.5" /> Resources (URLs)
                    </Label>
                    <div className="space-y-2">
                      {week.resources.map((res, i) => (
                        <div key={i} className="flex gap-2">
                          <Input value={res} readOnly className="h-8 text-xs" />
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" className="w-full text-xs h-8 border-dashed">
                        <Plus className="h-3 w-3 mr-1" /> Add Link
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex bg-muted/30 p-2 rounded-lg items-center justify-between">
                <span className="text-xs text-muted-foreground italic">Last saved: Just now</span>
                <Button size="sm" className="gap-2 h-8">
                  <Save className="h-3.5 w-3.5" /> Save Week
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
