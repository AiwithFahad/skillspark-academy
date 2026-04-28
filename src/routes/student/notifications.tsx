import { createFileRoute } from "@tanstack/react-router";
import { useLMSStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  CheckCircle2, 
  Info, 
  AlertTriangle, 
  Trash2,
  MailOpen,
  Calendar
} from "lucide-react";
import { format, parseISO } from "date-fns";

export function StudentNotificationsView() {
  const { currentUser, notifications, markNotificationRead, markAllNotificationsRead } = useLMSStore();
  
  if (!currentUser || currentUser.role !== 'STUDENT') return <div>Access Denied</div>;

  const studentNotifications = notifications
    .filter(n => n.userId === currentUser.id)
    .sort((a, b) => parseISO(b.createdAt).getTime() - parseISO(a.createdAt).getTime());

  const getIcon = (type: string) => {
    switch (type) {
      case 'SUCCESS': return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'WARNING': return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'ERROR': return <Trash2 className="h-5 w-5 text-red-500" />;
      default: return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Bell className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Notification Center</h2>
        </div>
        <Button variant="outline" onClick={() => markAllNotificationsRead(currentUser.id)} className="gap-2">
            <MailOpen className="h-4 w-4" /> Mark all as read
        </Button>
      </div>

      <div className="grid gap-4">
        {studentNotifications.length > 0 ? (
          studentNotifications.map((n) => (
            <Card key={n.id} className={`transition-all ${n.read ? 'opacity-60 border-transparent bg-muted/20' : 'border-primary/20 shadow-md'}`}>
              <CardContent className="p-0">
                <div className="flex items-start gap-4 p-6">
                  <div className={`mt-1 p-2 rounded-full ${n.read ? 'bg-muted' : 'bg-primary/5'}`}>
                    {getIcon(n.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-bold ${n.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                        {n.title}
                      </h3>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(parseISO(n.createdAt), 'MMM d, h:mm a')}
                      </span>
                    </div>
                    <p className={`text-sm ${n.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                      {n.message}
                    </p>
                    {!n.read && (
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="p-0 h-auto text-xs" 
                        onClick={() => markNotificationRead(n.id)}
                      >
                        Mark as read
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-4">
             <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center">
                <Bell className="h-8 w-8 text-muted-foreground/50" />
             </div>
             <h3 className="text-xl font-semibold">All caught up!</h3>
             <p className="text-muted-foreground">You don't have any notifications at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export const Route = createFileRoute("/student/notifications")({
  component: StudentNotificationsView,
});
