import { createFileRoute } from "@tanstack/react-router";
import { useLMSStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bell, Shield, BookOpen } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function StudentProfileView() {
  const { currentUser, updateUser, subjects } = useLMSStore();
  const [profile, setProfile] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || ""
  });

  if (!currentUser || currentUser.role !== 'STUDENT') return <div>Access Denied</div>;

  const studentSubjects = subjects.filter(s => s.studentIds.includes(currentUser.id));

  const handleSave = () => {
    updateUser(currentUser.id, profile);
    toast.success("Profile updated");
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account" className="gap-2">
            <User className="h-4 w-4" /> Account
          </TabsTrigger>
          <TabsTrigger value="academic" className="gap-2">
            <BookOpen className="h-4 w-4" /> Academic
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" /> Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Manage your public display name and contact email.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-6 pb-4">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold border-4 border-background shadow-md">
                   {profile.name.charAt(0)}
                </div>
                <Button variant="outline" size="sm">Change Photo</Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={profile.name} 
                    onChange={(e) => setProfile({...profile, name: e.target.value})} 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    disabled 
                    value={profile.email} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Enrolled Subjects</CardTitle>
              <CardDescription>View your current academic enrollments.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {studentSubjects.map(subject => (
                  <div key={subject.id} className="flex items-center p-4 border rounded-xl bg-muted/20 gap-3">
                    <div className="h-10 w-10 rounded-lg bg-background border flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold">{subject.name}</p>
                      <p className="text-xs text-muted-foreground">ID: {subject.id}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Update your password and security preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="current">Current Password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new">New Password</Label>
                <Input id="new" type="password" />
              </div>
              <Button variant="outline" className="w-[150px]">Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export const Route = createFileRoute("/student/profile")({
  component: StudentProfileView,
});
