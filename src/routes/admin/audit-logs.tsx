import { createFileRoute } from "@tanstack/react-router";
import { useLMSStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Activity } from "lucide-react";

export const Route = createFileRoute("/admin/audit-logs")({
  component: AuditLogsPage,
});

function AuditLogsPage() {
  const { auditLogs, users } = useLMSStore();

  const getActionColor = (action: string) => {
    if (action.includes('CREATE')) return 'bg-green-100 text-green-800 border-green-200';
    if (action.includes('DELETE')) return 'bg-red-100 text-red-800 border-red-200';
    if (action.includes('UPDATE')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (action.includes('AUTH')) return 'bg-purple-100 text-purple-800 border-purple-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Audit Logs</h2>
          <p className="text-muted-foreground">Track all system activities and administrative changes.</p>
        </div>
        <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
          <Activity className="h-5 w-5 text-primary" />
        </div>
      </div>

      <Card className="shadow-soft border-border/40">
        <CardHeader>
          <CardTitle className="text-lg">Activity History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[180px]">Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10 text-muted-foreground italic">
                    No activity logs recorded yet.
                  </TableCell>
                </TableRow>
              ) : (
                auditLogs.map((log) => {
                  const user = users.find(u => u.id === log.userId);
                  return (
                    <TableRow key={log.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {format(new Date(log.timestamp), 'MMM dd, HH:mm:ss')}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">
                            {user?.name.charAt(0) || 'S'}
                          </div>
                          <span className="text-sm font-medium">{user?.name || 'System'}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getActionColor(log.action)}>
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {log.details}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
