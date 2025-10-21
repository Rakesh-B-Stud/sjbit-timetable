import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  GraduationCap, 
  Calendar, 
  Users, 
  Bell, 
  LogOut,
  Clock,
  BookOpen,
  User
} from 'lucide-react';
import { clearUserSession } from '@/utils/auth';
import { teachersData, timeSlots, days } from '@/data/mockData';
import { getTimetables, getNotifications } from '@/utils/timetableGenerator';
import { User as UserType, Timetable } from '@/types';
//import "./index.css";

interface StudentDashboardProps {
  user: UserType;
  onLogout: () => void;
}

export default function StudentDashboard({ user, onLogout }: StudentDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    clearUserSession();
    onLogout();
  };

  const getStudentTimetable = (): Timetable | null => {
    const timetables = getTimetables();
    const key = `${user.semester}${user.section}`;
    return timetables[key]?.published ? timetables[key] : null;
  };

  const renderTimetableGrid = (timetable: Timetable | null) => {
    if (!timetable) {
      return (
        <div className="text-center py-8 text-gray-500">
          <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>No timetable published yet</p>
          <p className="text-sm">Please check back later</p>
        </div>
      );
    }

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
                {days.map(day => {
                  const entry = timetable.timetable[day]?.[slot.id];
                  return (
                    <td key={`${day}-${slot.id}`} className="border border-gray-300 p-3">
                      {entry?.subject && (
                        <div className="text-sm space-y-1">
                          <div className="font-medium text-blue-800">{entry.subject}</div>
                          {entry.teacher && (
                            <div className="text-gray-600 text-xs">{entry.teacher}</div>
                          )}
                          <div className="flex items-center gap-2">
                            {entry.type === 'lab' && (
                              <Badge variant="secondary" className="text-xs">Lab</Badge>
                            )}
                            {entry.type === 'activity' && (
                              <Badge variant="outline" className="text-xs">Activity</Badge>
                            )}
                            {entry.room && (
                              <span className="text-xs text-gray-500">{entry.room}</span>
                            )}
                          </div>
                        </div>
                      )}
                      {entry?.type === 'break' && (
                        <div className="text-center text-gray-500 text-sm font-medium">
                          {entry.subject}
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
    );
  };

  const timetable = getStudentTimetable();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Student Portal</h1>
                <p className="text-sm text-gray-600">SJBIT Timetable System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-600">
                  {user.department} - Sem {user.semester} - Section {user.section}
                </p>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Student Info Banner */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <div>
                <p className="text-sm opacity-90">Student Name</p>
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
                <p className="text-sm opacity-90">Semester & Section</p>
                <p className="font-semibold">Sem {user.semester} - Section {user.section}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <div>
                <p className="text-sm opacity-90">Class Teacher</p>
                <p className="font-semibold">{user.class_teacher}</p>
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
            <TabsTrigger value="timetable">Timetable</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Semester</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{user.semester}</div>
                  <p className="text-xs text-muted-foreground">Semester {user.semester}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Section</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{user.section}</div>
                  <p className="text-xs text-muted-foreground">Class Section</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Timetable Status</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {timetable ? '✓' : '⏳'}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {timetable ? 'Published' : 'Pending'}
                  </p>
                </CardContent>
              </Card>
            </div>

            {timetable && (
              <Card>
                <CardHeader>
                  <CardTitle>Today's Schedule</CardTitle>
                  <CardDescription>Your classes for today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {timeSlots.slice(0, 4).map(slot => {
                      const today = 'Monday'; // For demo purposes
                      const entry = timetable.timetable[today]?.[slot.id];
                      return (
                        <div key={slot.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="text-sm font-medium">{slot.time}</div>
                            <div>
                              <div className="font-medium">{entry?.subject || 'Free Period'}</div>
                              {entry?.teacher && (
                                <div className="text-sm text-gray-600">{entry.teacher}</div>
                              )}
                            </div>
                          </div>
                          {entry?.type === 'lab' && (
                            <Badge variant="secondary">Lab</Badge>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="timetable" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Class Timetable
                </CardTitle>
                <CardDescription>
                  Your complete weekly class schedule
                  {timetable && (
                    <span className="ml-2">
                      - Semester {timetable.semester} Section {timetable.section}
                    </span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderTimetableGrid(timetable)}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teachers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Faculty Information
                </CardTitle>
                <CardDescription>
                  Details about your teachers and their subjects
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* TODO: Add teacher information here */}
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Teacher information will be displayed here</p>
                  <p className="text-sm">Contact details, office hours, and subject expertise</p>
                </div>
              </CardContent>
            </Card>
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
                      <Bell className="h-5 w-5 text-blue-600 mt-0.5" />
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