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

// ===== Academy seed: 5 teachers, 30 students (6 per teacher), 5 subjects =====
const TEACHER_SEED: Array<{ id: string; name: string; email: string; subjectId: string; subjectName: string }> = [
  { id: 't1', name: 'Priya Sharma',  email: 'priya.math@academy.com',     subjectId: 's1', subjectName: 'Mathematics' },
  { id: 't2', name: 'Arjun Mehta',   email: 'arjun.science@academy.com',  subjectId: 's2', subjectName: 'Science' },
  { id: 't3', name: 'Sarah Jones',   email: 'sarah.english@academy.com',  subjectId: 's3', subjectName: 'English' },
  { id: 't4', name: 'Daniel Okafor', email: 'daniel.cs@academy.com',      subjectId: 's4', subjectName: 'Computer Science' },
  { id: 't5', name: 'Mei Tanaka',    email: 'mei.social@academy.com',     subjectId: 's5', subjectName: 'Social Studies' },
];

const STUDENT_FIRST = ['Alice','Bob','Emma','Liam','Noah','Olivia','Ava','Ethan','Sophia','Mia','James','Lucas','Isabella','Henry','Charlotte','Amelia','Benjamin','Harper','Jack','Evelyn','Leo','Zara','Omar','Layla','Kai','Nora','Ibrahim','Chloe','Theo','Ruby'];
const STUDENT_LAST  = ['Smith','Wilson','Clarke','Patel','Khan','Garcia','Chen','Kim','Brown','Davis','Lopez','Singh','Martinez','Rossi','Nguyen','Ahmed','Rivera','Cohen','Dubois','Silva','Fischer','Ito','Haddad','Diallo','Yusuf','Park','Schmidt','Taylor','Abbas','Moreno'];

const initialUsers: User[] = [
  { id: '1', email: 'admin@example.com', password: 'admin12345', name: 'System Admin', role: 'ADMIN', isActive: true },
  // Back-compat login for existing demos
  { id: 'legacy-teacher', email: 'teacher@example.com', password: 'password123', name: 'Demo Teacher', role: 'TEACHER', isActive: true, subjects: ['s1'] },
  { id: 'legacy-student', email: 'student@example.com', password: 'password123', name: 'Demo Student', role: 'STUDENT', isActive: true, teacherId: 't1' },
  ...TEACHER_SEED.map((t) => ({
    id: t.id,
    email: t.email,
    password: 'password123',
    name: t.name,
    role: 'TEACHER' as Role,
    isActive: true,
    subjects: [t.subjectId],
    bio: `Lead instructor — ${t.subjectName}`,
  })),
  ...TEACHER_SEED.flatMap((t, ti) =>
    Array.from({ length: 6 }).map((_, si) => {
      const idx = ti * 6 + si;
      const first = STUDENT_FIRST[idx];
      const last  = STUDENT_LAST[idx];
      return {
        id: `st${idx + 1}`,
        email: `${first.toLowerCase()}.${last.toLowerCase()}@academy.com`,
        password: 'password123',
        name: `${first} ${last}`,
        role: 'STUDENT' as Role,
        isActive: true,
        teacherId: t.id,
      };
    })
  ),
];

const initialSubjects: Subject[] = TEACHER_SEED.map((t, ti) => ({
  id: t.subjectId,
  name: t.subjectName,
  teacherId: t.id,
  studentIds: Array.from({ length: 6 }).map((_, si) => `st${ti * 6 + si + 1}`),
}));

const initialCurriculum: Record<string, CurriculumWeek[]> = Object.fromEntries(
  TEACHER_SEED.map((t) => [
    t.subjectId,
    [
      { id: `${t.subjectId}-w1`, weekNumber: 1, title: `${t.subjectName} — Foundations`, description: 'Core concepts and vocabulary.', resources: [], assignment: 'Intro worksheet' },
      { id: `${t.subjectId}-w2`, weekNumber: 2, title: `${t.subjectName} — Applied Practice`, description: 'Hands-on exercises and group work.', resources: [], assignment: 'Practice set 1' },
    ],
  ])
);

const initialSessions: Session[] = TEACHER_SEED.map((t, ti) => ({
  id: `sess-${t.subjectId}`,
  subjectId: t.subjectId,
  teacherId: t.id,
  studentIds: Array.from({ length: 6 }).map((_, si) => `st${ti * 6 + si + 1}`),
  dateTime: new Date(Date.now() + (ti + 1) * 3600000).toISOString(),
  duration: 60,
  meetLink: `https://meet.google.com/${t.subjectId}-demo-${ti + 1}`,
  status: 'SCHEDULED' as SessionStatus,
}));

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
        if (user) state.addAuditLog('USER_DELETE', `Deleted user: ${user.name}`);
        return {
          users: state.users.filter((u) => u.id !== id)
            .map(u => u.teacherId === id ? { ...u, teacherId: undefined } : u),
          subjects: state.subjects.map(s => ({
            ...s,
            teacherId: s.teacherId === id ? undefined : s.teacherId,
            studentIds: s.studentIds.filter(sid => sid !== id),
          })),
          sessions: state.sessions
            .filter(s => s.teacherId !== id)
            .map(s => ({ ...s, studentIds: s.studentIds.filter(sid => sid !== id) })),
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

      deleteSubject: (id) => set((state) => {
        const subj = state.subjects.find(s => s.id === id);
        if (subj) state.addAuditLog('SUBJECT_DELETE', `Deleted subject: ${subj.name}`);
        const { [id]: _removed, ...restCurriculum } = state.curriculum;
        return {
          subjects: state.subjects.filter(s => s.id !== id),
          curriculum: restCurriculum,
          sessions: state.sessions.filter(s => s.subjectId !== id),
          users: state.users.map(u =>
            u.subjects ? { ...u, subjects: u.subjects.filter(sid => sid !== id) } : u
          ),
        };
      }),

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
      version: 2,
    }
  )
);
