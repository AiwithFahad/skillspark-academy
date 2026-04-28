import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Role = 'ADMIN' | 'TEACHER' | 'STUDENT';
export type SessionStatus = 'SCHEDULED' | 'LIVE' | 'COMPLETED' | 'CANCELLED';

export interface AvailabilitySlot {
  day: string; // 'Monday', 'Tuesday', etc.
  startTime: string; // '09:00'
  endTime: string; // '17:00'
  enabled: boolean;
}

export interface User {
  id: string;
  email: string;
  password?: string;
  name: string;
  role: Role;
  isActive: boolean;
  subjects?: string[]; // IDs of subjects assigned
  teacherId?: string; // For students, the assigned teacher
  availability?: AvailabilitySlot[];
  bio?: string;
}

export interface Subject {
  id: string;
  name: string;
  teacherId?: string;
  studentIds: string[];
}

export interface CurriculumWeek {
  id: string;
  weekNumber: number;
  title: string;
  description: string;
  resources: string[]; // Mock URLs
  assignment: string;
}

export interface Session {
  id: string;
  subjectId: string;
  teacherId: string;
  studentIds: string[];
  dateTime: string;
  duration: number; // in minutes
  meetLink: string;
  status: SessionStatus;
}

export interface AttendanceRecord {
  id: string;
  sessionId: string;
  studentId: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE';
  timestamp: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  read: boolean;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface SystemSettings {
  timezone: string;
  notificationsEnabled: boolean;
  allowSelfRegistration: boolean;
  academicYear: string;
}

interface LMSState {
  users: User[];
  subjects: Subject[];
  curriculum: Record<string, CurriculumWeek[]>; // subjectId -> weeks
  sessions: Session[];
  attendance: AttendanceRecord[];
  notifications: Notification[];
  auditLogs: AuditLog[];
  settings: SystemSettings;
  currentUser: User | null;
  
  // Auth actions
  login: (email: string, password: string) => boolean;
  logout: () => void;
  
  // User management
  addUser: (user: Omit<User, 'id' | 'isActive'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  toggleUserStatus: (id: string) => void;
  
  // Subject & Enrollment
  addSubject: (name: string) => void;
  deleteSubject: (id: string) => void;
  assignTeacherToSubject: (subjectId: string, teacherId: string) => void;
  assignStudentToSubject: (subjectId: string, studentId: string) => void;
  unenrollStudentFromSubject: (subjectId: string, studentId: string) => void;
  
  // Curriculum
  addWeek: (subjectId: string, week: Omit<CurriculumWeek, 'id'>) => void;
  updateWeek: (subjectId: string, weekId: string, updates: Partial<CurriculumWeek>) => void;
  deleteWeek: (subjectId: string, weekId: string) => void;
  
  // Sessions
  scheduleSession: (session: Omit<Session, 'id' | 'meetLink' | 'status'>) => void;
  updateSession: (id: string, updates: Partial<Session>) => void;
  updateSessionStatus: (id: string, status: SessionStatus) => void;
  cancelSession: (id: string) => void;
  
  // Attendance
  markAttendance: (sessionId: string, studentId: string, status: AttendanceRecord['status']) => void;
  
  // Notifications
  addNotification: (userId: string, title: string, message: string, type: Notification['type']) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: (userId: string) => void;
  
  // Settings & Logs
  updateSettings: (updates: Partial<SystemSettings>) => void;
  addAuditLog: (action: string, details: string) => void;

  // Assignments
  assignStudentToTeacher: (studentId: string, teacherId: string) => void;
}

// Initial Mock Data
const initialSettings: SystemSettings = {
  timezone: 'UTC',
  notificationsEnabled: true,
  allowSelfRegistration: false,
  academicYear: '2024-2025'
};

const initialUsers: User[] = [
  { id: '1', email: 'admin@example.com', password: 'admin12345', name: 'System Admin', role: 'ADMIN', isActive: true },
  { id: '2', email: 'teacher@example.com', password: 'password123', name: 'John Doe', role: 'TEACHER', isActive: true, subjects: ['s1', 's2'] },
  { id: '4', email: 'sarah.jones@example.com', password: 'password123', name: 'Sarah Jones', role: 'TEACHER', isActive: true, subjects: ['s3'] },
  { id: '3', email: 'student@example.com', password: 'password123', name: 'Alice Smith', role: 'STUDENT', isActive: true, teacherId: '2' },
  { id: '5', email: 'bob.wilson@example.com', password: 'password123', name: 'Bob Wilson', role: 'STUDENT', isActive: true, teacherId: '2' },
  { id: '6', email: 'emma.clarke@example.com', password: 'password123', name: 'Emma Clarke', role: 'STUDENT', isActive: true, teacherId: '4' },
];

const initialSubjects: Subject[] = [
  { id: 's1', name: 'Web Development', teacherId: '2', studentIds: ['3', '5'] },
  { id: 's2', name: 'UI/UX Design', teacherId: '2', studentIds: ['3'] },
  { id: 's3', name: 'Marketing Strategy', teacherId: '4', studentIds: ['6'] },
];

const initialCurriculum: Record<string, CurriculumWeek[]> = {
  's1': [
    { id: 'w1', weekNumber: 1, title: 'HTML & CSS Basics', description: 'Foundation of the web', resources: ['https://example.com/res1'], assignment: 'Build a profile page' },
    { id: 'w2', weekNumber: 2, title: 'Flexbox & Grid', description: 'Advanced layouts', resources: [], assignment: 'Responsive Dashboard' },
  ],
  's2': [
    { id: 'd1', weekNumber: 1, title: 'Introduction to Figma', description: 'Design tools basics', resources: [], assignment: 'Wireframe a login page' }
  ]
};

const initialSessions: Session[] = [
  {
    id: 'sess1',
    subjectId: 's1',
    teacherId: '2',
    studentIds: ['3', '5'],
    dateTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
    duration: 60,
    meetLink: 'https://meet.google.com/abc-defg-hij',
    status: 'SCHEDULED'
  },
  {
    id: 'sess2',
    subjectId: 's2',
    teacherId: '2',
    studentIds: ['3'],
    dateTime: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    duration: 45,
    meetLink: 'https://meet.google.com/xyz-pqrs-uvw',
    status: 'COMPLETED'
  }
];

export const useLMSStore = create<LMSState>()(
  persist(
    (set, get) => ({
      users: initialUsers,
      subjects: initialSubjects,
      curriculum: initialCurriculum,
      sessions: initialSessions,
      attendance: [],
      notifications: [],
      auditLogs: [],
      settings: initialSettings,
      currentUser: null,

      login: (email, password) => {
        const user = get().users.find((u) => u.email === email && u.password === password) || 
                     initialUsers.find((u) => u.email === email && u.password === password);
        
        if (user && user.isActive) {
          set({ currentUser: user });
          get().addAuditLog('AUTH_LOGIN', `User ${user.name} (${user.role}) logged in.`);
          return true;
        }
        return false;
      },

      logout: () => {
        const user = get().currentUser;
        if (user) {
          get().addAuditLog('AUTH_LOGOUT', `User ${user.name} logged out.`);
        }
        set({ currentUser: null });
      },

      addUser: (user) => set((state) => {
        const newUser = { ...user, id: Math.random().toString(36).substr(2, 9), isActive: true };
        state.addAuditLog('USER_CREATE', `Created user: ${newUser.name} (${newUser.role})`);
        return { users: [...state.users, newUser] };
      }),

      updateUser: (id, updates) => set((state) => {
        const user = state.users.find(u => u.id === id);
        if (user) {
          state.addAuditLog('USER_UPDATE', `Updated user: ${user.name}`);
        }
        return {
          users: state.users.map((u) => (u.id === id ? { ...u, ...updates } : u)),
        };
      }),

      deleteUser: (id) => set((state) => {
        const user = state.users.find(u => u.id === id);
        if (user) {
          state.addAuditLog('USER_DELETE', `Deleted user: ${user.name}`);
        }
        return {
          users: state.users.filter((u) => u.id !== id),
        };
      }),

      toggleUserStatus: (id) => set((state) => ({
        users: state.users.map(u => u.id === id ? { ...u, isActive: !u.isActive } : u)
      })),

      addSubject: (name) => set((state) => {
        const newSubject = { id: 's' + Math.random().toString(36).substr(2, 5), name, studentIds: [] };
        state.addAuditLog('SUBJECT_CREATE', `Created subject: ${name}`);
        return { subjects: [...state.subjects, newSubject] };
      }),

      deleteSubject: (id) => set((state) => ({
        subjects: state.subjects.filter(s => s.id !== id)
      })),

      assignTeacherToSubject: (subjectId, teacherId) => set((state) => ({
        subjects: state.subjects.map((s) => (s.id === subjectId ? { ...s, teacherId } : s)),
        users: state.users.map((u) => (u.id === teacherId ? { ...u, subjects: [...new Set([...(u.subjects || []), subjectId])] } : u)),
      })),

      assignStudentToSubject: (subjectId, studentId) => set((state) => ({
        subjects: state.subjects.map((s) => (s.id === subjectId ? { ...s, studentIds: [...new Set([...s.studentIds, studentId])] } : s)),
      })),

      unenrollStudentFromSubject: (subjectId, studentId) => set((state) => ({
        subjects: state.subjects.map(s => s.id === subjectId ? { ...s, studentIds: s.studentIds.filter(id => id !== studentId) } : s)
      })),

      addWeek: (subjectId, week) => set((state) => {
        const subjectCurriculum = state.curriculum[subjectId] || [];
        return {
          curriculum: {
            ...state.curriculum,
            [subjectId]: [...subjectCurriculum, { ...week, id: Math.random().toString(36).substr(2, 9) }],
          },
        };
      }),

      updateWeek: (subjectId, weekId, updates) => set((state) => ({
        curriculum: {
          ...state.curriculum,
          [subjectId]: (state.curriculum[subjectId] || []).map((w) => (w.id === weekId ? { ...w, ...updates } : w)),
        },
      })),

      deleteWeek: (subjectId, weekId) => set((state) => ({
        curriculum: {
          ...state.curriculum,
          [subjectId]: (state.curriculum[subjectId] || []).filter(w => w.id !== weekId)
        }
      })),

      scheduleSession: (session) => {
        const meetCode = Math.random().toString(36).substr(2, 3) + '-' + Math.random().toString(36).substr(2, 4) + '-' + Math.random().toString(36).substr(2, 3);
        const meetLink = `https://meet.google.com/${meetCode}`;
        set((state) => {
          const newSession = { ...session, id: Math.random().toString(36).substr(2, 9), meetLink, status: 'SCHEDULED' as SessionStatus };
          
          // Notify students
          session.studentIds.forEach(studentId => {
            state.addNotification(
              studentId,
              'New Session Scheduled',
              `A session for subject ${state.subjects.find(s => s.id === session.subjectId)?.name || ''} has been scheduled.`,
              'INFO'
            );
          });

          return { sessions: [...state.sessions, newSession] };
        });
      },

      updateSession: (id, updates) => set((state) => ({
        sessions: state.sessions.map(s => s.id === id ? { ...s, ...updates } : s)
      })),

      updateSessionStatus: (id, status) => set((state) => ({
        sessions: state.sessions.map(s => s.id === id ? { ...s, status } : s)
      })),

      cancelSession: (id) => set((state) => ({
        sessions: state.sessions.map(s => s.id === id ? { ...s, status: 'CANCELLED' } : s)
      })),

      markAttendance: (sessionId, studentId, status) => set((state) => ({
        attendance: [...state.attendance, {
          id: Math.random().toString(36).substr(2, 9),
          sessionId,
          studentId,
          status,
          timestamp: new Date().toISOString()
        }]
      })),

      addNotification: (userId, title, message, type) => set((state) => ({
        notifications: [{
          id: Math.random().toString(36).substr(2, 9),
          userId,
          title,
          message,
          type,
          read: false,
          createdAt: new Date().toISOString()
        }, ...state.notifications]
      })),

      markNotificationRead: (id) => set((state) => ({
        notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
      })),

      markAllNotificationsRead: (userId) => set((state) => ({
        notifications: state.notifications.map(n => n.userId === userId ? { ...n, read: true } : n)
      })),

      updateSettings: (updates) => set((state) => ({
        settings: { ...state.settings, ...updates }
      })),

      addAuditLog: (action, details) => set((state) => ({
        auditLogs: [{
          id: Math.random().toString(36).substr(2, 9),
          userId: state.currentUser?.id || 'SYSTEM',
          action,
          details,
          timestamp: new Date().toISOString()
        }, ...state.auditLogs].slice(0, 100)
      })),

      assignStudentToTeacher: (studentId, teacherId) => set((state) => ({
        users: state.users.map(u => u.id === studentId ? { ...u, teacherId } : u)
      })),
    }),
    {
      name: 'skillspark-lms-storage',
    }
  )
);
