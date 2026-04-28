import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useLMSStore, Role, User } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Search, UserCheck, UserMinus, Trash2, Edit } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/users")({
  component: UserManagement,
});

function UserManagement() {
  const { users, addUser, updateUser, deleteUser } = useLMSStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Form State
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState<Role>("STUDENT");
  const [assignedTeacherId, setAssignedTeacherId] = useState<string>("");

  const teachers = users.filter(u => u.role === 'TEACHER');

  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleOpenAddDialog = () => {
    setEditingUser(null);
    setNewName("");
    setNewEmail("");
    setNewPassword("");
    setNewRole("STUDENT");
    setAssignedTeacherId("");
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (user: User) => {
    setEditingUser(user);
    setNewName(user.name);
    setNewEmail(user.email);
    setNewPassword(user.password || "");
    setNewRole(user.role);
    setAssignedTeacherId(user.teacherId || "");
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      updateUser(editingUser.id, { 
        name: newName, 
        email: newEmail, 
        password: newPassword,
        role: newRole,
        teacherId: newRole === 'STUDENT' ? assignedTeacherId : undefined
      });
      toast.success("User updated successfully");
    } else {
      addUser({ 
        name: newName, 
        email: newEmail, 
        password: newPassword,
        role: newRole,
        teacherId: newRole === 'STUDENT' ? assignedTeacherId : undefined
      });
      toast.success("User created successfully");
    }
    setIsDialogOpen(false);
  };

  const toggleStatus = (user: User) => {
    updateUser(user.id, { isActive: !user.isActive });
    toast.info(`User ${user.isActive ? 'deactivated' : 'activated'}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
          <p className="text-muted-foreground">Manage your teachers and students permissions.</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={handleOpenAddDialog}>
              <Plus className="h-4 w-4" /> Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingUser ? 'Edit User' : 'Add New User'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Jane Doe" required />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="jane@example.com" required />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" required={!editingUser} />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={newRole} onValueChange={(val) => setNewRole(val as Role)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TEACHER">Teacher</SelectItem>
                    <SelectItem value="STUDENT">Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newRole === 'STUDENT' && (
                <div className="space-y-2">
                  <Label>Assign Teacher</Label>
                  <Select value={assignedTeacherId} onValueChange={setAssignedTeacherId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Teacher</SelectItem>
                      {teachers.map(t => (
                        <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-[10px] text-muted-foreground italic">Students are assigned to a primary tutor for mentoring.</p>
                </div>
              )}

              <DialogFooter>
                <Button type="submit">{editingUser ? 'Save Changes' : 'Create User'}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Search users..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Roles</SelectItem>
                <SelectItem value="TEACHER">Teachers</SelectItem>
                <SelectItem value="STUDENT">Students</SelectItem>
                <SelectItem value="ADMIN">Admins</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Assignment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{user.name}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        user.role === 'ADMIN' ? 'bg-indigo-100 text-indigo-700' :
                        user.role === 'TEACHER' ? 'bg-blue-100 text-blue-700' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      {user.role === 'STUDENT' ? (
                        <span className="text-xs text-muted-foreground">
                          {users.find(u => u.id === user.teacherId)?.name || 'Unassigned'}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground italic">System User</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className={`flex items-center gap-1.5 text-xs ${user.isActive ? 'text-green-600' : 'text-red-500'}`}>
                        <div className={`h-1.5 w-1.5 rounded-full ${user.isActive ? 'bg-green-600' : 'bg-red-500'}`} />
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleOpenEditDialog(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => toggleStatus(user)}
                          title={user.isActive ? "Deactivate" : "Activate"}
                        >
                          {user.isActive ? <UserMinus className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            if (confirm('Delete user?')) deleteUser(user.id);
                          }}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
