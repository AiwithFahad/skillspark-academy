import { createFileRoute } from "@tanstack/react-router";
import { useLMSStore, AvailabilitySlot } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Clock, Bell, Shield } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const DEFAULT_AVAILABILITY: AvailabilitySlot[] = [
  { day: 'Monday', startTime: '09:00', endTime: '17:00', enabled: true },
  { day: 'Tuesday', startTime: '09:00', endTime: '17:00', enabled: true },
  { day: 'Wednesday', startTime: '09:00', endTime: '17:00', enabled: true },
  { day: 'Thursday', startTime: '09:00', endTime: '17:00', enabled: true },
  { day: 'Friday', startTime: '09:00', endTime: '17:00', enabled: true },
  { day: 'Saturday', startTime: '10:00', endTime: '14:00', enabled: false },
  { day: 'Sunday', startTime: '10:00', endTime: '14:00', enabled: false },
];

export function TeacherSettingsView() {
  const { currentUser, updateUser } = useLMSStore();
  const [availability, setAvailability] = useState<AvailabilitySlot[]>(currentUser?.availability || DEFAULT_AVAILABILITY);
  const [profile, setProfile] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    bio: currentUser?.bio || ""
  });

  if (!currentUser || currentUser.role !== 'TEACHER') return <div>Access Denied</div>;

  const handleUpdateAvailability = (index: number, updates: Partial<AvailabilitySlot>) => {
    const newAvail = [...availability];
    newAvail[index] = { ...newAvail[index], ...updates };
    setAvailability(newAvail);
  };

  const handleSaveAll = () => {
    updateUser(currentUser.id, { 
      ...profile,
      availability 
    });
    toast.success("Settings saved successfully");
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Teacher Settings</h2>
        <Button onClick={handleSaveAll}>Save Changes</Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="availability" className="gap-2">
            <Clock className="h-4 w-4" /> Availability
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" /> Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Public Profile</CardTitle>
              <CardDescription>Update your teaching profile information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  value={profile.name} 
                  onChange={(e) => setProfile({...profile, name: e.target.value})} 
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  disabled 
                  value={profile.email} 
                />
                <p className="text-xs text-muted-foreground">Admin manages email changes.</p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bio">About / Bio</Label>
                <Input 
                  id="bio" 
                  value={profile.bio} 
                  onChange={(e) => setProfile({...profile, bio: e.target.value})} 
                  placeholder="Tell students about your expertise..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="availability" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Teaching Hours</CardTitle>
              <CardDescription>Set your weekly availability for session scheduling.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availability.map((slot, index) => (
                  <div key={slot.day} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg gap-4">
                    <div className="flex items-center gap-4">
                      <Switch 
                        checked={slot.enabled} 
                        onCheckedChange={(checked) => handleUpdateAvailability(index, { enabled: checked })} 
                      />
                      <span className="font-semibold w-24">{slot.day}</span>
                    </div>
                    {slot.enabled ? (
                      <div className="flex items-center gap-2">
                        <Input 
                          type="time" 
                          className="w-32 h-9" 
                          value={slot.startTime} 
                          onChange={(e) => handleUpdateAvailability(index, { startTime: e.target.value })}
                        />
                        <span className="text-muted-foreground">to</span>
                        <Input 
                          type="time" 
                          className="w-32 h-9" 
                          value={slot.endTime} 
                          onChange={(e) => handleUpdateAvailability(index, { endTime: e.target.value })}
                        />
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm italic">Not available on this day</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Control how and when you want to be notified.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Session Reminders</Label>
                  <p className="text-xs text-muted-foreground">Notify 15 minutes before a session starts.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between border-t pt-4">
                <div className="space-y-0.5">
                  <Label>Student Updates</Label>
                  <p className="text-xs text-muted-foreground">Notify when students join or message.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between border-t pt-4">
                <div className="space-y-0.5">
                  <Label>Weekly Reports</Label>
                  <p className="text-xs text-muted-foreground">Get an email summary of your teaching week.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export const Route = createFileRoute("/teacher/settings")({
  component: TeacherSettingsView,
});
