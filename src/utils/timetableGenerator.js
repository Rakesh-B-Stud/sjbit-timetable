// 📘 timetableGenerator.js — Optimized & Stable Version
import { teachersData, timeSlots, days, subjectConfig } from '../data/mockData';

// Timetable generation algorithm with enhanced constraints and safety checks
export class TimetableGenerator {
  constructor() {
    this.timeSlots = timeSlots;
    this.days = days;
    this.teacherAvailability = this.loadTeacherAvailability();
  }
  isBreakTime(slotId) {
  // Short Break = 8, Lunch Break = 9
  return slotId === 8 || slotId === 9;
}


  // ✅ Load teacher availability from localStorage or create default
  loadTeacherAvailability() {
    try {
      const saved = localStorage.getItem('teacherAvailability');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load teacher availability, resetting:', e);
    }

    const availability = {};
    teachersData.forEach((teacher) => {
      availability[teacher.teacher_id] = {};
      days.forEach((day) => {
        availability[teacher.teacher_id][day] = {};
        timeSlots.forEach((slot) => {
          availability[teacher.teacher_id][day][slot.id] = true; // default: all available
        });
      });
    });

    localStorage.setItem('teacherAvailability', JSON.stringify(availability));
    return availability;
  }

  // ✅ Generate timetable for a given semester and section
  generateTimetable(semester, section, classTeacher) {
    const timetable = {};
    const subjects = subjectConfig?.[semester]?.[section]?.subjects || [];

    // Initialize timetable
    this.days.forEach((day) => {
      timetable[day] = {};
      this.timeSlots.forEach((slot) => {
        timetable[day][slot.id] = {
          subject: null,
          teacher: null,
          type: 'free',
          room: null,
        };
      });
    });

    // Handle Wednesday special case (PE/NSS/NCC)
    if (timetable['Wednesday']) {
      [5, 6, 7].forEach((slotId) => {
        const specialSubjects = ['PE', 'NSS', 'NCC'];
        const randomSubject =
          specialSubjects[Math.floor(Math.random() * specialSubjects.length)];
        timetable['Wednesday'][slotId] = {
          subject: randomSubject,
          teacher: this.findTeacherForSubject(randomSubject),
          type: 'activity',
          room: randomSubject === 'PE' ? 'Ground' : 'Classroom',
        };
      });
    }

    // Separate theory and lab subjects
    const theorySubjects = subjects.filter((s) => !s.includes('Lab'));
    const labSubjects = subjects.filter((s) => s.includes('Lab'));

    const allocatedSubjects = new Set();
    const dailyLabCount = {};
    this.days.forEach((day) => (dailyLabCount[day] = 0));

    // ✅ Allocate labs (max 1 per day)
    const shuffledDays = [...this.days].sort(() => Math.random() - 0.5);
    let labIndex = 0;

    for (const day of shuffledDays) {
      if (labIndex >= labSubjects.length) break;
      if (day === 'Wednesday') continue; // skip Wednesday for labs

      const labSubject = labSubjects[labIndex];
      const labSlots = this.findConsecutiveSlots(day, timetable);
      if (labSlots.length >= 2) {
        const teacher = this.findAvailableTeacher(
          labSubject,
          day,
          labSlots[0],
          semester,
          section
        );

        if (teacher) {
          timetable[day][labSlots[0]] = {
            subject: labSubject,
            teacher: teacher.name,
            type: 'lab',
            room: 'Lab',
          };
          timetable[day][labSlots[1]] = {
            subject: `${labSubject} (Cont.)`,
            teacher: teacher.name,
            type: 'lab',
            room: 'Lab',
          };
          allocatedSubjects.add(labSubject);
          dailyLabCount[day] = 1;
          labIndex++;
        }
      }
    }

// 🗓️ Handle Saturday — "PBL/ABL" for all class slots, but keep breaks
if (timetable['Saturday']) {
  this.timeSlots.forEach((slot) => {
    if (this.isBreakTime(slot.id)) {
      timetable['Saturday'][slot.id] = {
        subject: slot.label,
        teacher: null,
        type: 'break',
        room: null,
      };
    } else {
      timetable['Saturday'][slot.id] = {
        subject: 'PBL/ABL',
        teacher: null,
        type: 'project',
        room: 'Innovation Lab',
      };
    }
  });
}


// ✅ Allocate theory subjects based on credits from mockData.js
const shuffledTheorySubjects = [...theorySubjects].sort(() => Math.random() - 0.5);

// Helper: get subject credits from teacher data
const getSubjectCredits = (subject) => {
  const teacher = teachersData.find((t) => t.subjects_capable.includes(subject));
  if (teacher) {
    const index = teacher.subjects_capable.indexOf(subject);
    return teacher.subject_credits?.[index] || 1; // default 1 if not defined
  }
  return 1;
};

for (const subject of shuffledTheorySubjects) {
  const credits = getSubjectCredits(subject); // frequency per week
  let sessionsAllocated = 0;
  let safetyCounter = 0;

  while (sessionsAllocated < credits && safetyCounter < 50) {
    safetyCounter++;
    let allocated = false;

    const shuffledDaysDynamic = [...this.days].sort(() => Math.random() - 0.5);
    for (const day of shuffledDaysDynamic) {
      if (allocated) break;
      if (day === 'Saturday') continue; // skip Saturday for theory subjects

      // Avoid placing same subject more than once per day
      const alreadyPlacedToday = Object.values(timetable[day]).some(
        (slot) => slot.subject === subject
      );
      if (alreadyPlacedToday) continue;

      for (const slot of this.timeSlots) {
        // Skip breaks or filled slots
        if (timetable[day][slot.id].subject !== null) continue;
        if (this.isBreakTime(slot.id) || (day === 'Wednesday' && [5, 6, 7].includes(slot.id)))
          continue;

        const teacher = this.findAvailableTeacher(subject, day, slot.id, semester, section);
        if (teacher) {
          timetable[day][slot.id] = {
            subject,
            teacher: teacher.name,
            type: 'theory',
            room: 'Classroom',
          };
          this.teacherAvailability[teacher.teacher_id][day][slot.id] = false;
          sessionsAllocated++;
          allocated = true;
          break;
        }
      }
    }

    if (!allocated) break;
  }

  allocatedSubjects.add(subject);
}

    // ✅ Fill remaining slots as Free Periods
    this.days.forEach((day) => {
      this.timeSlots.forEach((slot) => {
        if (!timetable[day][slot.id].subject) {
          timetable[day][slot.id] = {
            subject: 'Free Period',
            teacher: null,
            type: 'free',
            room: null,
          };
        }
      });
    });

    // Return full timetable object
    return {
      semester,
      section,
      classTeacher,
      timetable,
      generatedAt: new Date().toISOString(),
      constraints: {
        maxLabsPerDay: 1
      },
    };
  }

  // ✅ Find consecutive free slots for labs
  findConsecutiveSlots(day, timetable) {
    for (let i = 0; i < this.timeSlots.length - 1; i++) {
      const current = this.timeSlots[i];
      const next = this.timeSlots[i + 1];
      if (this.isBreakTime(current.id) || this.isBreakTime(next.id)) continue;
      if (
        day === 'Wednesday' &&
        ([5, 6, 7].includes(current.id) || [5, 6, 7].includes(next.id))
      )
        continue;

      if (
        timetable[day][current.id].subject === null &&
        timetable[day][next.id].subject === null
      ) {
        return [current.id, next.id];
      }
    }
    return [];
  }

  // ✅ Find suitable teacher based on subject and availability
  findAvailableTeacher(subject, day, slotId, semester, section) {
    const candidates = teachersData.filter((t) =>
      t.subjects_capable.includes(subject)
    );

    for (const teacher of candidates) {
      const available =
        this.teacherAvailability?.[teacher.teacher_id]?.[day]?.[slotId];
      if (
        available &&
        teacher.semester_handling?.includes(semester) &&
        teacher.section_handling?.includes(section)
      ) {
        return teacher;
      }
    }

    // fallback — any teacher who can handle subject
    return (
      teachersData.find(
        (t) =>
          t.subjects_capable.includes(subject) &&
          this.teacherAvailability?.[t.teacher_id]?.[day]?.[slotId]
      ) || null
    );
  }

  findTeacherForSubject(subject) {
    const specialTeachers = {
      PE: 'PE Teacher',
      NSS: 'NSS Coordinator',
      NCC: 'NCC Officer',
    };
    return specialTeachers[subject] || 'Activity Coordinator';
  }
}

// 🔧 Utility Functions — unchanged, just cleaned up
export const saveTimetable = (timetableData) => {
  const timetables = getTimetables();
  const key = `${timetableData.semester}${timetableData.section}`;
  timetables[key] = timetableData;
  localStorage.setItem('timetables', JSON.stringify(timetables));
};

export const getTimetables = () => {
  const saved = localStorage.getItem('timetables');
  return saved ? JSON.parse(saved) : {};
};

export const publishTimetable = (semester, section) => {
  const timetables = getTimetables();
  const key = `${semester}${section}`;
  if (timetables[key]) {
    timetables[key].published = true;
    timetables[key].publishedAt = new Date().toISOString();
    localStorage.setItem('timetables', JSON.stringify(timetables));

    addNotification({
      message: `✅ Timetable for Semester ${semester} Section ${section} published successfully.`,
      type: 'timetable',
      timestamp: new Date().toISOString(),
    });
    return true;
  }
  return false;
};
export const savePublishedTimetable = (timetables) => {
  localStorage.setItem('publishedTimetables', JSON.stringify(timetables));
};

export const getPublishedTimetables = () => {
  const data = localStorage.getItem('publishedTimetables');
  return data ? JSON.parse(data) : {};
};

export const addNotification = (notification) => {
  const notifications = getNotifications();
  notifications.push({ id: Date.now(), ...notification });
  localStorage.setItem('notifications', JSON.stringify(notifications));
};

export const getNotifications = () => {
  const saved = localStorage.getItem('notifications');
  return saved ? JSON.parse(saved) : [];
};
