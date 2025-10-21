import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { authenticateUser, saveUserSession } from '@/utils/auth';
import { User } from '@/types';
import { GraduationCap, Users, UserCheck } from 'lucide-react';
//import "./index.css";

interface LoginProps {
  onLogin: (user: User) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [userType, setUserType] = useState<string>('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!userType) {
      setError('Please select user type');
      setLoading(false);
      return;
    }

    const result = authenticateUser(email, password, userType);
    
    if (result.success) {
      saveUserSession(result.user);
      onLogin(result.user);
    } else {
      setError(result.message || 'Invalid credentials');
    }
    
    setLoading(false);
  };

  const getUserTypeIcon = (type: string) => {
    switch (type) {
      case 'admin': return <UserCheck className="h-5 w-5" />;
      case 'student': return <GraduationCap className="h-5 w-5" />;
      case 'teacher': return <Users className="h-5 w-5" />;
      default: return null;
    }
  };

  const getPlaceholderText = () => {
    switch (userType) {
      case 'admin': return 'admin@sjbit.edu.in';
      case 'student': return 'Enter your USN (e.g., 1JB23CS001)';
      case 'teacher': return 'teacher@sjbit.edu.in';
      default: return 'Enter credentials';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">SJBIT</CardTitle>
            <CardDescription className="text-lg">Timetable Automation System</CardDescription>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userType">Login As</Label>
              <Select value={userType} onValueChange={setUserType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4" />
                      Administrator
                    </div>
                  </SelectItem>
                  <SelectItem value="student">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Student
                    </div>
                  </SelectItem>
                  <SelectItem value="teacher">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Teacher
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                {userType === 'student' ? 'USN' : 'Email'}
              </Label>
              <div className="relative">
                {userType && (
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    {getUserTypeIcon(userType)}
                  </div>
                )}
                <Input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={getPlaceholderText()}
                  className={userType ? 'pl-10' : ''}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          {/*<div className="mt-6 text-sm text-gray-600 space-y-2">
            <p className="font-semibold">Demo Credentials:</p>
            <div className="space-y-1 text-xs">
              <p><strong>Admin:</strong> admin@sjbit.edu.in / admin123</p>
              <p><strong>Student:</strong> 1JB23CS001 / default123</p>
              <p><strong>Teacher:</strong> shubha@sjbit.edu.in / Shubha T V</p>
            </div>
          </div>*/}
        </CardContent>
      </Card>
    </div>
  );
}