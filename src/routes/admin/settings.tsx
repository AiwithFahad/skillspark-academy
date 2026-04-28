import { createFileRoute } from "@tanstack/react-router";
import { useLMSStore } from "@/lib/store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useState } from "react";
import { Save, Bell, Globe, Lock, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const { settings, updateSettings, addAuditLog } = useLMSStore();
  const [formData, setFormData] = useState(settings);

  const handleSave = () => {
    updateSettings(formData);
    addAuditLog('SETTINGS_UPDATE', 'Administrative system settings modified.');
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">System Settings</h2>
        <p className="text-muted-foreground">Configure global LMS parameters and integrations.</p>
      </div>

      <div className="grid gap-6">
        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-500" />
              <CardTitle>General Configuration</CardTitle>
            </div>
            <CardDescription>Regional and localization settings for the entire platform.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="timezone">System Timezone</Label>
                <Select 
                  value={formData.timezone} 
                  onValueChange={(val) => setFormData({...formData, timezone: val})}
                >
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC (GMT+0)</SelectItem>
                    <SelectItem value="EST">EST (GMT-5)</SelectItem>
                    <SelectItem value="PST">PST (GMT-8)</SelectItem>
                    <SelectItem value="BST">BST (GMT+1)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="academicYear">Academic Year</Label>
                <Input 
                  id="academicYear" 
                  value={formData.academicYear} 
                  onChange={(e) => setFormData({...formData, academicYear: e.target.value})}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-amber-500" />
              <CardTitle>Notifications & Alerts</CardTitle>
            </div>
            <CardDescription>Control how the system communicates with users.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>System-wide Notifications</Label>
                <p className="text-sm text-muted-foreground">Enable or disable all in-app notifications.</p>
              </div>
              <Switch 
                checked={formData.notificationsEnabled} 
                onCheckedChange={(checked) => setFormData({...formData, notificationsEnabled: checked})}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-green-500" />
              <CardTitle>Security & Registration</CardTitle>
            </div>
            <CardDescription>Manage user access and registration policies.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between border-b pb-6">
              <div className="space-y-0.5">
                <Label>Allow Self-Registration</Label>
                <p className="text-sm text-muted-foreground">Allow students to create their own accounts (not recommended for strict RBAC).</p>
              </div>
              <Switch 
                checked={formData.allowSelfRegistration} 
                onCheckedChange={(checked) => setFormData({...formData, allowSelfRegistration: checked})}
              />
            </div>
            <div className="pt-2">
              <Button variant="outline" className="gap-2">
                <Lock className="h-4 w-4" />
                Rotate API Keys
              </Button>
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 flex justify-end py-4 rounded-b-xl border-t">
            <Button onClick={handleSave} className="gap-2 shadow-sm">
              <Save className="h-4 w-4" />
              Save Configuration
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
