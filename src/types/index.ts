export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student' | 'teacher';
  department?: string;
  semester?: number;
  section?: string;
  class_teacher?: string;
  semester_handling?: number[];
  section_handling?: string[];
  subjects_capable?: string[];
}

export interface TimetableEntry {
  subject: string | null;
  teacher: string | null;
  type: 'theory' | 'lab' | 'break' | 'activity';
  room: string | null;
  semester?: number;
  section?: string;
}

export interface Timetable {
  semester: number;
  section: string;
  classTeacher: string;
  timetable: {
    [day: string]: {
      [slotId: number]: TimetableEntry;
    };
  };
  generatedAt: string;
  published?: boolean;
  publishedAt?: string;
}

export interface Notification {
  id: number;
  message: string;
  type: string;
  timestamp: string;
}

export interface TeacherSchedule {
  semester: number;
  section: string;
  schedule: {
    [day: string]: {
      [slotId: number]: TimetableEntry;
    };
  };
}