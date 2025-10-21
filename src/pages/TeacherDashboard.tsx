import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Users,
  Calendar,
  Clock,
  Bell,
  LogOut,
  BookOpen,
  User,
  CheckCircle,
  Settings,
} from 'lucide-react';
import { clearUserSession } from '@/utils/auth';
import { timeSlots, days } from '@/data/mockData';
import { getTimetables, getNotifications } from '@/utils/timetableGenerator';
import { User as UserType, TeacherSchedule, TimetableEntry } from '@/types';
//import './index.css';

interface TeacherDashboardProps {
  user: UserType;
  onLogout: () => void;
}

export default function TeacherDashboard({ user, onLogout }: TeacherDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [availability, setAvailability] = useState(() => {
    const saved = localStorage.getItem('teacherAvailability');
    const allAvailability = saved ? JSON.parse(saved) : {};
    return allAvailability[user.id] || {};
  });
  const [saveMessage, setSaveMessage] = useState('');

  const handleLogout = () => {
    clearUserSession();
    onLogout();
  };

  const toggleAvailability = (day: string, slotId: number) => {
    const updated = { ...availability };
    if (!updated[day]) updated[day] = {};
    updated[day][slotId] = !updated[day][slotId];
    setAvailability(updated);
  };

  const saveAvailability = () => {
    const allAvailability = JSON.parse(localStorage.getItem('teacherAvailability') || '{}');
    allAvailability[user.id] = availability;
    localStorage.setItem('teacherAvailability', JSON.stringify(allAvailability));
    setSaveMessage('Availability saved successfully!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const getTeacherTimetables = (): TeacherSchedule[] => {
    const timetables = getTimetables();
    const teacherTimetables: TeacherSchedule[] = [];

    Object.values(timetables).forEach((timetable: any) => {
      if (timetable.published) {
        const teacherSchedule: { [day: string]: { [slotId: number]: TimetableEntry } } = {};
        days.forEach((day) => {
          teacherSchedule[day] = {};
          timeSlots.forEach((slot) => {
            const timetableData = timetable.timetable as Record<
              string,
              Record<number, TimetableEntry>
            >;
            const entry = timetableData[day]?.[slot.id];
            if (entry?.teacher === user.name) {
              teacherSchedule[day][slot.id] = {
                ...entry,
                semester: timetable.semester,
                section: timetable.section,
              };
            }
          });
        });

        const hasClasses = Object.values(teacherSchedule).some(
          (daySchedule: Record<number, TimetableEntry>) =>
            Object.keys(daySchedule).length > 0
        );

        if (hasClasses) {
          teacherTimetables.push({
            semester: timetable.semester as number,
            section: timetable.section as string,
            schedule: teacherSchedule,
          });
        }
      }
    });

    return teacherTimetables;
  };

  const renderAvailabilityGrid = () => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-50">
              <th className="border border-gray-300 p-3 font-semibold text-left">Time</th>
              {days.map((day) => (
                <th key={day} className="border border-gray-300 p-3 font-semibold text-center">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((slot) => (
              <tr key={slot.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-3 bg-gray-50 font-medium">
                  <div className="text-sm font-semibold">{slot.label}</div>
                  <div className="text-xs text-gray-600">{slot.time}</div>
                </td>
                {days.map((day) => (
                  <td key={`${day}-${slot.id}`} className="border border-gray-300 p-3 text-center">
                    <Switch
                      checked={availability[day]?.[slot.id] ?? true}
                      onCheckedChange={() => toggleAvailability(day, slot.id)}
                    />
                    <div className="text-xs mt-1 text-gray-500">
                      {availability[day]?.[slot.id] ?? true ? 'Available' : 'Not Available'}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderTeacherTimetable = (timetableData: TeacherSchedule[]) => {
    return (
      <div className="space-y-6">
        {timetableData.map((tt: TeacherSchedule) => (
          <Card key={`${tt.semester}${tt.section}`}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>
                  Semester {tt.semester} - Section {tt.section}
                </span>
                <Badge variant="secondary">Your Classes</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="border border-gray-300 p-3 font-semibold text-left">Time</th>
                      {days.map((day) => (
                        <th key={day} className="border border-gray-300 p-3 font-semibold text-center">
                          {day}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map((slot) => (
                      <tr key={slot.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-3 bg-gray-50 font-medium">
                          <div className="text-sm font-semibold">{slot.label}</div>
                          <div className="text-xs text-gray-600">{slot.time}</div>
                        </td>
                        {days.map((day) => {
                          const entry = tt.schedule[day]?.[slot.id];
                          return (
                            <td key={`${day}-${slot.id}`} className="border border-gray-300 p-3">
                              {entry && (
                                <div className="text-sm space-y-1">
                                  <div className="font-medium text-blue-800">{entry.subject}</div>
                                  <div className="text-xs text-gray-600">
                                    Sem {entry.semester} - Sec {entry.section}
                                  </div>
                                  {entry.type === 'lab' && (
                                    <Badge variant="secondary" className="text-xs">
                                      Lab
                                    </Badge>
                                  )}
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const teacherTimetables = getTeacherTimetables();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Teacher Portal</h1>
                <p className="text-sm text-gray-600">SJBIT Timetable System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-600">{user.department} Department</p>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the JSX (Overview, Availability, Timetable, Notifications tabs) remain unchanged */}
    </div>
  );
}
