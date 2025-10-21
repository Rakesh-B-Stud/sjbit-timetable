import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { 
  Upload, 
  Users, 
  GraduationCap, 
  Calendar, 
  Eye, 
  Send, 
  LogOut,
  CheckCircle,
  Clock,
  Settings
} from 'lucide-react';
import { clearUserSession } from '@/utils/auth';
import { teachersData, studentsData, timeSlots, days, classTeachers } from '@/data/mockData';
import { TimetableGenerator, saveTimetable, getTimetables, publishTimetable, getNotifications } from '@/utils/timetableGenerator';
import { User, Timetable } from '@/types';
//import "./index.css";

interface AdminDashboardProps {
  user: User;
  onLogout: () => void;
}

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [selectedClassTeacher, setSelectedClassTeacher] = useState('');
  const [generatedTimetable, setGeneratedTimetable] = useState<Timetable | null>(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [teacherAvailability, setTeacherAvailability] = useState(() => {
    const saved = localStorage.getItem('teacherAvailability');
    return saved ? JSON.parse(saved) : {};
  });

  const handleLogout = () => {
    clearUserSession();
    onLogout();
  };

  const handleFileUpload = (type: 'students' | 'teachers') => {
    setUploadMessage(`${type === 'students' ? 'Students' : 'Teachers'} data uploaded successfully! Data has been processed and stored.`);
    setTimeout(() => setUploadMessage(''), 3000);
  };

  const handleGenerateTimetable = () => {
    if (!selectedSemester || !selectedSection || !selectedClassTeacher) {
      alert('Please select semester, section, and class teacher');
      return;
    }

    const generator = new TimetableGenerator();
    const timetable = generator.generateTimetable(
      parseInt(selectedSemester), 
      selectedSection, 
      selectedClassTeacher
    );
    
    setGeneratedTimetable(timetable);
    saveTimetable(timetable);
  };

  const handlePublishTimetable = () => {
    if (generatedTimetable) {
      publishTimetable(generatedTimetable.semester, generatedTimetable.section);
      alert('Timetable published successfully! Notifications sent to students and teachers.');
    }
  };

  const toggleTeacherAvailability = (teacherId: string, day: string, slotId: number) => {
    const updated = { ...teacherAvailability };
    if (!updated[teacherId]) updated[teacherId] = {};
    if (!updated[teacherId][day]) updated[teacherId][day] = {};
    
    updated[teacherId][day][slotId] = !updated[teacherId][day][slotId];
    setTeacherAvailability(updated);
    localStorage.setItem('teacherAvailability', JSON.stringify(updated));
  };

  const renderTimetableGrid = (timetable: Timetable) => {
    if (!timetable) return null;

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-50">
              <th className="border border-gray-300 p-2 font-semibold">Time</th>
              {days.map(day => (
                <th key={day} className="border border-gray-300 p-2 font-semibold">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map(slot => (
              <tr key={slot.id}>
                <td className="border border-gray-300 p-2 bg-gray-50 font-medium">
                  {slot.time}
                </td>
                {days.map(day => {
                  const entry = timetable.timetable[day]?.[slot.id];
                  return (
                    <td key={`${day}-${slot.id}`} className="border border-gray-300 p-2">
                      {entry?.subject && (
                        <div className="text-sm">
                          <div className="font-medium text-blue-800">{entry.subject}</div>
                          {entry.teacher && (
                            <div className="text-gray-600">{entry.teacher}</div>
                          )}
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
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">SJBIT Timetable Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.name}</span>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="teachers">Teachers Data</TabsTrigger>
            <TabsTrigger value="students">Students Data</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
            <TabsTrigger value="timetable">Timetable</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{studentsData.length}</div>
                  <p className="text-xs text-muted-foreground">Across all sections</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Teachers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{teachersData.length}</div>
                  <p className="text-xs text-muted-foreground">Active faculty</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Published Timetables</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{Object.keys(getTimetables()).filter(key => getTimetables()[key].published).length}</div>
                  <p className="text-xs text-muted-foreground">Current semester</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="teachers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Teachers Data Upload
                </CardTitle>
                <CardDescription>
                  Upload teachers data in CSV format. Sample data is already loaded in the system.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Input type="file" accept=".csv" className="flex-1" />
                  <Button onClick={() => handleFileUpload('teachers')}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload CSV
                  </Button>
                </div>
                {uploadMessage && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>{uploadMessage}</AlertDescription>
                  </Alert>
                )}
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Current Teachers Data</h3>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Subjects</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {teachersData.slice(0, 5).map((teacher) => (
                          <TableRow key={teacher.teacher_id}>
                            <TableCell>{teacher.teacher_id}</TableCell>
                            <TableCell>{teacher.name}</TableCell>
                            <TableCell>{teacher.email}</TableCell>
                            <TableCell>{teacher.department}</TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {teacher.subjects_capable.slice(0, 2).map((subject, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {subject}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Students Data Upload
                </CardTitle>
                <CardDescription>
                  Upload students data in CSV format. Sample data is already loaded in the system.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Input type="file" accept=".csv" className="flex-1" />
                  <Button onClick={() => handleFileUpload('students')}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload CSV
                  </Button>
                </div>
                {uploadMessage && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>{uploadMessage}</AlertDescription>
                  </Alert>
                )}
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Current Students Data</h3>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>USN</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Semester</TableHead>
                          <TableHead>Section</TableHead>
                          <TableHead>Class Teacher</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {studentsData.slice(0, 5).map((student) => (
                          <TableRow key={student.usn}>
                            <TableCell>{student.usn}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.department}</TableCell>
                            <TableCell>{student.semester}</TableCell>
                            <TableCell>{student.section}</TableCell>
                            <TableCell>{student.class_teacher}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="availability" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Teacher Availability</CardTitle>
                <CardDescription>
                  View and manage teacher availability for timetable generation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {teachersData.slice(0, 3).map((teacher) => (
                    <div key={teacher.teacher_id} className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-3">{teacher.name}</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr>
                              <th className="text-left p-2">Time</th>
                              {days.map(day => (
                                <th key={day} className="text-center p-2">{day.substring(0, 3)}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {timeSlots.map(slot => (
                              <tr key={slot.id}>
                                <td className="p-2 font-medium">{slot.time}</td>
                                {days.map(day => (
                                  <td key={`${day}-${slot.id}`} className="text-center p-2">
                                    <Switch
                                      checked={teacherAvailability[teacher.teacher_id]?.[day]?.[slot.id] ?? true}
                                      onCheckedChange={() => toggleTeacherAvailability(teacher.teacher_id, day, slot.id)}
                                       className="w-10 h-6"
                                    />
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timetable" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Timetable Generation</CardTitle>
                <CardDescription>
                  Generate and manage class timetables with intelligent scheduling.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="semester">Semester</Label>
                    <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5th Semester</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="section">Section</Label>
                    <Select value={selectedSection} onValueChange={setSelectedSection}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">Section A</SelectItem>
                        <SelectItem value="B">Section B</SelectItem>
                        <SelectItem value="C">Section C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="classTeacher">Class Teacher</Label>
                    <Select value={selectedClassTeacher} onValueChange={setSelectedClassTeacher}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class teacher" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Shubha T V">Shubha T V</SelectItem>
                        <SelectItem value="Vinutha K">Vinutha K</SelectItem>
                        <SelectItem value="Jyothi P K">Jyothi P K</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button onClick={handleGenerateTimetable} className="flex-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Generate Timetable
                  </Button>
                  
                  {generatedTimetable && (
                    <Button onClick={handlePublishTimetable} variant="outline">
                      <Send className="h-4 w-4 mr-2" />
                      Publish Timetable
                    </Button>
                  )}
                </div>

                {generatedTimetable && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">
                        Timetable Preview - Semester {generatedTimetable.semester} Section {generatedTimetable.section}
                      </h3>
                      <Badge variant="secondary">
                        Class Teacher: {generatedTimetable.classTeacher}
                      </Badge>
                    </div>
                    {renderTimetableGrid(generatedTimetable)}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Recent system notifications and announcements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getNotifications().slice(-5).reverse().map((notification) => (
                    <div key={notification.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {getNotifications().length === 0 && (
                    <p className="text-center text-gray-500 py-8">No notifications yet</p>
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