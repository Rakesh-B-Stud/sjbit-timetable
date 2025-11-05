import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
//import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { authenticateUser, saveUserSession } from '@/utils/auth';
import { User } from '@/types';
import { GraduationCap, Users, UserCheck } from 'lucide-react';
import backgroundImage from '@/assets/login-bg.jpg';
import collegeLogo from '@/assets/sjbit_logo.png';

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
      case 'admin':
        return <UserCheck className="h-5 w-5" />;
      case 'student':
        return <GraduationCap className="h-5 w-5" />;
      case 'teacher':
        return <Users className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const getPlaceholderText = () => {
    switch (userType) {
      case 'admin':
        return 'admin@sjbit.edu.in';
      case 'student':
        return 'Enter your USN (e.g., 1JB23CS001)';
      case 'teacher':
        return 'teacher@sjbit.edu.in';
      default:
        return 'Enter credentials';
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`
      }}
    >
      {/* 🔹 Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px] z-0" />

      {/* 🔹 Login Card */}
      <Card
        className="relative z-10 w-full max-w-md shadow-2xl bg-white/10 backdrop-blur-md border border-white/20
        text-white transition-transform duration-700 hover:scale-[1.02] rounded-2xl"
      >
        <CardHeader className="text-center space-y-4">
          {/* College Logo */}
          <div className="mx-auto w-20 h-20 rounded-full overflow-hidden shadow-md bg-white/80 p-2">
            <img
              src={collegeLogo}
              alt="College Logo"
              className="object-contain w-full h-full"
            />
          </div>

          <div>
            <CardTitle className="text-2xl font-bold text-white">
              SJBIT
            </CardTitle>
            <CardDescription className="text-lg text-white/80">
              Timetable Automation System
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {/* User Type */}
            <div className="space-y-2">
              <Label htmlFor="userType" className="text-white/90">
                Login As
              </Label>
              <Select value={userType} onValueChange={setUserType}>
                <SelectTrigger className="bg-transparent border border-white/40 text-white placeholder-white/60">
                  <SelectValue placeholder="Select user type" />
                </SelectTrigger>
                <SelectContent className="bg-white/90 text-gray-900">
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

            {/* Email / USN */}
<div className="space-y-2">
  <Label htmlFor="email" className="text-white/90">
    {userType === 'student' ? 'USN' : 'Email'}
  </Label>
  <div className="relative">
    {userType && (
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70">
        {getUserTypeIcon(userType)}
      </div>
    )}
    <input
      id="email"
      type="text"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder={getPlaceholderText()}
      className={`w-full ${userType ? 'pl-10' : ''} rounded-md border border-white/40 bg-transparent text-white placeholder-white/60 focus:border-white focus:ring-2 focus:ring-white/60 outline-none py-2 px-3 transition-all`}
      required
    />
  </div>
</div>

{/* Password */}
<div className="space-y-2">
  <Label htmlFor="password" className="text-white/90">
    Password
  </Label>
  <input
    id="password"
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Enter password"
    className="w-full rounded-md border border-white/40 bg-transparent text-white placeholder-white/60 focus:border-white focus:ring-2 focus:ring-white/60 outline-none py-2 px-3 transition-all"
    required
  />
</div>


            {/* Error Message */}
            {error && (
              <Alert variant="destructive" className="bg-red-500/90 text-white border-none">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
