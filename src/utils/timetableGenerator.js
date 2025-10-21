import { teachersData, timeSlots, days, subjectConfig } from '../data/mockData';

// Timetable generation algorithm with enhanced constraints
export class TimetableGenerator {
  constructor() {
    this.timeSlots = timeSlots;
    this.days = days;
    this.teacherAvailability = this.loadTeacherAvailability();
  }

  loadTeacherAvailability() {
    const saved = localStorage.getItem('teacherAvailability');
    if (saved) {
      return JSON.parse(saved);
    }
    
    // Initialize default availability (all available)
    const availability = {};
    teachersData.forEach(teacher => {
      availability[teacher.teacher_id] = {};
      days.forEach(day => {
        availability[teacher.teacher_id][day] = {};
        timeSlots.forEach(slot => {
          availability[teacher.teacher_id][day][slot.id] = true;
        });
      });
    });
    
    localStorage.setItem('teacherAvailability', JSON.stringify(availability));
    return availability;
  }

  generateTimetable(semester, section, classTeacher) {
    const timetable = {};
    const subjects = subjectConfig[semester]?.[section]?.subjects || [];
    
    // Initialize empty timetable
    days.forEach(day => {
      timetable[day] = {};
      timeSlots.forEach(slot => {
        timetable[day][slot.id] = {
          subject: null,
          teacher: null,
          type: 'theory',
          room: null
        };
      });
    });

    // Track allocated subjects to ensure no repetition
    const allocatedSubjects = new Set();
    const dailyLabCount = {}; // Track labs per day
    
    // Initialize daily lab counter
    days.forEach(day => {
      dailyLabCount[day] = 0;
    });

    // Handle Wednesday special case (PE/NSS/NCC)
    if (timetable['Wednesday']) {
      // Periods 5, 6, 7 (1:30-4:30) for PE/NSS/NCC
      [5, 6, 7].forEach(slotId => {
        const specialSubjects = ['PE', 'NSS', 'NCC'];
        const randomSubject = specialSubjects[Math.floor(Math.random() * specialSubjects.length)];
        timetable['Wednesday'][slotId] = {
          subject: randomSubject,
          teacher: this.findTeacherForSubject(randomSubject, 'Wednesday', slotId),
          type: 'activity',
          room: randomSubject === 'PE' ? 'Ground' : 'Classroom'
        };
      });
    }

    // Separate theory and lab subjects
    const theorySubjects = subjects.filter(subject => !subject.includes('Lab'));
    const labSubjects = subjects.filter(subject => subject.includes('Lab'));

    // First, allocate lab subjects (one per day maximum)
    const shuffledDays = [...days].sort(() => Math.random() - 0.5);
    let labIndex = 0;
    
    for (const day of shuffledDays) {
      if (labIndex >= labSubjects.length) break;
      
      // Skip Wednesday for lab allocation (reserved for activities)
      if (day === 'Wednesday') continue;
      
      const labSubject = labSubjects[labIndex];
      
      // Find suitable consecutive slots for lab (2 hours)
      const labSlots = this.findConsecutiveSlots(day, timetable);
      
      if (labSlots.length >= 2) {
        const teacher = this.findAvailableTeacher(labSubject, day, labSlots[0], semester, section);
        
        if (teacher) {
          // Allocate lab for 2 consecutive periods
          timetable[day][labSlots[0]] = {
            subject: labSubject,
            teacher: teacher.name,
            type: 'lab',
            room: 'Lab'
          };
          
          timetable[day][labSlots[1]] = {
            subject: labSubject + ' (Cont.)',
            teacher: teacher.name,
            type: 'lab',
            room: 'Lab'
          };
          
          allocatedSubjects.add(labSubject);
          dailyLabCount[day] = 1;
          labIndex++;
        }
      }
    }

    // Then allocate theory subjects
    const shuffledTheorySubjects = [...theorySubjects].sort(() => Math.random() - 0.5);
    
    for (const subject of shuffledTheorySubjects) {
      // Skip if subject already allocated
      if (allocatedSubjects.has(subject)) continue;
      
      // Find a suitable slot for this theory subject
      let allocated = false;
      
      for (const day of shuffledDays) {
        if (allocated) break;
        
        for (const slot of timeSlots) {
          // Skip if slot is already occupied
          if (timetable[day][slot.id].subject !== null) continue;
          
          // Skip break times and Wednesday afternoon
          if (this.isBreakTime(slot.id) || (day === 'Wednesday' && [5, 6, 7].includes(slot.id))) {
            continue;
          }
          
          // Try to allocate the subject
          const teacher = this.findAvailableTeacher(subject, day, slot.id, semester, section);
          
          if (teacher) {
            timetable[day][slot.id] = {
              subject: subject,
              teacher: teacher.name,
              type: 'theory',
              room: 'Classroom'
            };
            
            allocatedSubjects.add(subject);
            allocated = true;
            break;
          }
        }
      }
    }

    // Fill remaining slots with break times
    days.forEach(day => {
      timeSlots.forEach(slot => {
        if (timetable[day][slot.id].subject === null) {
          if (slot.id === 3) { // After short break
            timetable[day][slot.id] = {
              subject: 'Free Period',
              teacher: null,
              type: 'free',
              room: null
            };
          } else if (slot.id === 5 && day !== 'Wednesday') { // After lunch break
            timetable[day][slot.id] = {
              subject: 'Free Period',
              teacher: null,
              type: 'free',
              room: null
            };
          } else if (timetable[day][slot.id].subject === null) {
            timetable[day][slot.id] = {
              subject: 'Free Period',
              teacher: null,
              type: 'free',
              room: null
            };
          }
        }
      });
    });

    return {
      semester,
      section,
      classTeacher,
      timetable,
      generatedAt: new Date().toISOString(),
      constraints: {
        maxLabsPerDay: 1,
        subjectFrequency: 'once_per_week',
        noRepetition: true
      }
    };
  }

  findConsecutiveSlots(day, timetable) {
    const availableSlots = [];
    
    for (let i = 0; i < timeSlots.length - 1; i++) {
      const currentSlot = timeSlots[i];
      const nextSlot = timeSlots[i + 1];
      
      // Skip break times and Wednesday afternoon
      if (this.isBreakTime(currentSlot.id) || this.isBreakTime(nextSlot.id)) {
        continue;
      }
      
      if (day === 'Wednesday' && ([5, 6, 7].includes(currentSlot.id) || [5, 6, 7].includes(nextSlot.id))) {
        continue;
      }
      
      // Check if both slots are free
      if (timetable[day][currentSlot.id].subject === null && 
          timetable[day][nextSlot.id].subject === null) {
        availableSlots.push(currentSlot.id, nextSlot.id);
        break; // Return first available consecutive pair
      }
    }
    
    return availableSlots;
  }

  findAvailableTeacher(subject, day, slotId, semester, section) {
    // Priority 1: Find teacher who teaches this subject to this section
    let teacher = teachersData.find(t => 
      t.subjects_capable.includes(subject) &&
      t.semester_handling.includes(semester) &&
      t.section_handling.includes(section) &&
      this.teacherAvailability[t.teacher_id]?.[day]?.[slotId]
    );

    if (teacher) return teacher;

    // Priority 2: Find teacher who teaches this subject (any section)
    teacher = teachersData.find(t => 
      t.subjects_capable.includes(subject) &&
      this.teacherAvailability[t.teacher_id]?.[day]?.[slotId]
    );

    if (teacher) return teacher;

    // Priority 3: Find any available teacher
    teacher = teachersData.find(t => 
      this.teacherAvailability[t.teacher_id]?.[day]?.[slotId]
    );

    return teacher || null;
  }

  findTeacherForSubject(subject, day, slotId) {
    const specialTeachers = {
      'PE': 'PE Teacher',
      'NSS': 'NSS Coordinator',
      'NCC': 'NCC Officer'
    };
    return specialTeachers[subject] || 'Activity Coordinator';
  }

  isBreakTime(slotId) {
    // These are handled separately in the UI
    return false;
  }
}

// Utility functions for timetable management
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
    
    // Add notification
    addNotification({
      message: `Timetable for Semester ${semester} Section ${section} has been published with enhanced constraints: Max 1 lab per day, each subject once per week`,
      type: 'timetable',
      timestamp: new Date().toISOString()
    });
    
    return true;
  }
  return false;
};

export const addNotification = (notification) => {
  const notifications = getNotifications();
  notifications.push({
    id: Date.now(),
    ...notification
  });
  localStorage.setItem('notifications', JSON.stringify(notifications));
};

export const getNotifications = () => {
  const saved = localStorage.getItem('notifications');
  return saved ? JSON.parse(saved) : [];
};