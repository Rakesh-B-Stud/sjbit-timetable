SJBIT Timetable Automation - Development Plan
Project Overview
Building a comprehensive timetable automation system for SJBIT with three user portals: Admin, Student, and Teacher.

Core Files to Create (Max 8 files limit)
src/App.tsx - Main routing and authentication logic
src/pages/Login.tsx - Unified login page for all user types
src/pages/AdminDashboard.tsx - Complete admin portal with all features
src/pages/StudentDashboard.tsx - Student portal with timetable view
src/pages/TeacherDashboard.tsx - Teacher portal with availability setting
src/utils/timetableGenerator.js - Core timetable generation algorithm
src/data/mockData.js - Hardcoded student and teacher data
src/utils/auth.js - Authentication and user management utilities
Key Features Implementation:
Role-based authentication (Admin/Student/Teacher)
CSV upload simulation with hardcoded data
Teacher availability grid system
Smart timetable generation with constraints
Notification system
Responsive design with Shadcn-UI components
Technical Approach:
Use localStorage for data persistence
Implement constraint-based timetable algorithm
Modern React patterns with hooks
Professional UI with Tailwind CSS
Mobile-responsive design