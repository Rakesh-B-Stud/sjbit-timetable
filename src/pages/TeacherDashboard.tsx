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
  Settings
} from 'lucide-react';
import { clearUserSession } from '@/utils/auth';
import { timeSlots, days } from '@/data/mockData';
import { getTimetables, getNotifications } from '@/utils/timetableGenerator';
import { User as UserType, TeacherSchedule, TimetableEntry } from '@/types';


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
    
    Object.values(timetables).forEach((timetable: Record<string, unknown>) => {
      if (timetable.published) {
        const teacherSchedule: { [day: string]: { [slotId: number]: TimetableEntry } } = {};

days.forEach(day => {
  teacherSchedule[day] = {};
  timeSlots.forEach(slot => {
    const timetableData = timetable.timetable as { [day: string]: { [slotId: number]: TimetableEntry } };
    const entry = timetableData[day]?.[slot.id];

    if (entry?.teacher === user.name) {
      teacherSchedule[day][slot.id] = {
        subject: entry.subject,
        teacher: entry.teacher,
        type: entry.type,
        room: entry.room,
        semester: timetable.semester as number,
        section: timetable.section as string
      };
    }
  });
});

        
        // Check if teacher has any classes in this timetable
        const hasClasses = Object.values(teacherSchedule).some((daySchedule: Record<number, unknown>) => 
          Object.keys(daySchedule).length > 0
        );
        
        if (hasClasses) {
          teacherTimetables.push({
            semester: timetable.semester as number,
            section: timetable.section as string,
            schedule: teacherSchedule
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
              {days.map(day => (
                <th key={day} className="border border-gray-300 p-3 font-semibold text-center">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map(slot => (
              <tr key={slot.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 p-3 bg-gray-50 font-medium">
                  <div className="text-sm font-semibold">{slot.label}</div>
                  <div className="text-xs text-gray-600">{slot.time}</div>
                </td>
                {days.map(day => (
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
                <span>Semester {tt.semester} - Section {tt.section}</span>
                <Badge variant="secondary">Your Classes</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="border border-gray-300 p-3 font-semibold text-left">Time</th>
                      {days.map(day => (
                        <th key={day} className="border border-gray-300 p-3 font-semibold text-center">{day}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {timeSlots.map(slot => (
                      <tr key={slot.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-3 bg-gray-50 font-medium">
                          <div className="text-sm font-semibold">{slot.label}</div>
                          <div className="text-xs text-gray-600">{slot.time}</div>
                        </td>
                        {days.map(day => {
                          const entry = tt.schedule[day]?.[slot.id] as { subject?: string; semester?: number; section?: string; type?: string } | undefined;
                          return (
                            <td key={`${day}-${slot.id}`} className="border border-gray-300 p-3">
                              {entry && (
                                <div className="text-sm space-y-1">
                                  <div className="font-medium text-blue-800">{entry.subject}</div>
                                  <div className="text-xs text-gray-600">
                                    Sem {entry.semester} - Sec {entry.section}
                                  </div>
                                  {entry.type === 'lab' && (
                                    <Badge variant="secondary" className="text-xs">Lab</Badge>
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

      {/* Teacher Info Banner */}
      <div className="bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <div>
                <p className="text-sm opacity-90">Teacher Name</p>
                <p className="font-semibold">{user.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <div>
                <p className="text-sm opacity-90">Department</p>
                <p className="font-semibold">{user.department}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <div>
                <p className="text-sm opacity-90">Semesters Handling</p>
                <p className="font-semibold">{user.semester_handling?.join(', ') || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <div>
                <p className="text-sm opacity-90">Sections Handling</p>
                <p className="font-semibold">{user.section_handling?.join(', ') || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="availability">Set Availability</TabsTrigger>
            <TabsTrigger value="timetable">My Timetable</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Subjects Teaching</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{user.subjects_capable?.length || 0}</div>
                  <p className="text-xs text-muted-foreground">Active subjects</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Classes Today</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {teacherTimetables.reduce((count, tt) => {
                      const today = 'Monday'; // For demo purposes
                      return count + Object.keys(tt.schedule[today] || {}).length;
                    }, 0)}
                  </div>
                  <p className="text-xs text-muted-foreground">Scheduled classes</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Availability Status</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">✓</div>
                  <p className="text-xs text-muted-foreground">Available today</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Subjects Teaching</CardTitle>
                <CardDescription>Your current subject assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.subjects_capable?.map((subject: string, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{subject}</div>
                        <div className="text-sm text-gray-600">
                          Sections: {user.section_handling?.join(', ') || 'N/A'}
                        </div>
                      </div>
                      <Badge variant={subject.includes('Lab') ? 'secondary' : 'default'}>
                        {subject.includes('Lab') ? 'Lab' : 'Theory'}
                      </Badge>
                    </div>
                  )) || (
                    <p className="text-center text-gray-500 py-4">No subjects assigned</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="availability" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Set Your Availability
                </CardTitle>
                <CardDescription>
                  Mark your available time slots for timetable generation. Green indicates available, gray indicates not available.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {renderAvailabilityGrid()}
                
                <div className="flex items-center justify-between pt-4">
                  <div className="text-sm text-gray-600">
                    Toggle switches to set your availability for each time slot
                  </div>
                  <Button onClick={saveAvailability} className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Save Availability
                  </Button>
                </div>
                
                {saveMessage && (
                  <div className="flex items-center space-x-2 text-green-600 text-sm">
                    <CheckCircle className="h-4 w-4" />
                    <span>{saveMessage}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timetable" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  My Teaching Schedule
                </CardTitle>
                <CardDescription>
                  Your personalized timetable showing all your classes across different semesters and sections
                </CardDescription>
              </CardHeader>
              <CardContent>
                {teacherTimetables.length > 0 ? (
                  renderTeacherTimetable(teacherTimetables)
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No timetable assigned yet</p>
                    <p className="text-sm">Your schedule will appear here once timetables are published</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {teacherTimetables.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Subject Summary</CardTitle>
                  <CardDescription>Overview of your teaching assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Theory Classes (1 hour each)</h4>
                      <div className="space-y-2">
                        {user.subjects_capable?.filter((subject: string) => !subject.includes('Lab')).map((subject: string, index: number) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span>{subject}</span>
                            <Badge variant="default">Theory</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Lab Classes (2 hours each)</h4>
                      <div className="space-y-2">
                        {user.subjects_capable?.filter((subject: string) => subject.includes('Lab')).map((subject: string, index: number) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span>{subject}</span>
                            <Badge variant="secondary">Lab</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
                <CardDescription>
                  Recent updates and announcements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getNotifications().slice(-5).reverse().map((notification) => (
                    <div key={notification.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <Bell className="h-5 w-5 text-green-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {getNotifications().length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No notifications yet</p>
                      <p className="text-sm">You'll see updates here when available</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}