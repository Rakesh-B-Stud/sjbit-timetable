import { studentsData, teachersData } from '../data/mockData';

// Authentication utilities
export const authenticateUser = (email, password, userType) => {
  switch (userType) {
    case 'admin':
      if (email === 'admin@sjbit.edu.in' && password === 'admin123') {
        return {
          success: true,
          user: {
            id: 'admin',
            name: 'Administrator',
            email: 'admin@sjbit.edu.in',
            role: 'admin'
          }
        };
      }
      break;

    case 'student':
      const student = studentsData.find(s => s.usn === email && s.password === password);
      if (student) {
        return {
          success: true,
          user: {
            id: student.usn,
            name: student.name,
            email: student.email,
            department: student.department,
            semester: student.semester,
            section: student.section,
            class_teacher: student.class_teacher,
            role: 'student'
          }
        };
      }
      break;

    case 'teacher':
      const teacher = teachersData.find(t => t.email === email && t.password === password);
      if (teacher) {
        return {
          success: true,
          user: {
            id: teacher.teacher_id,
            name: teacher.name,
            email: teacher.email,
            department: teacher.department,
            semester_handling: teacher.semester_handling,
            section_handling: teacher.section_handling,
            subjects_capable: teacher.subjects_capable,
            role: 'teacher'
          }
        };
      }
      break;

    default:
      break;
  }

  return { success: false, message: 'Invalid credentials' };
};

// Session management
export const saveUserSession = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const getUserSession = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

export const clearUserSession = () => {
  // ✅ Only clear user session data — not timetables
  localStorage.removeItem('user');
  //localStorage.removeItem('session');
};


// Check if user is authenticated
export const isAuthenticated = () => {
  return getUserSession() !== null;
};

// Get user role
export const getUserRole = () => {
  const user = getUserSession();
  return user ? user.role : null;
};