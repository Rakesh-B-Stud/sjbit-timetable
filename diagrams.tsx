import React, { useState } from 'react';
import { Download, ChevronLeft, ChevronRight } from 'lucide-react';

const SJBITDiagrams = () => {
  const [currentDiagram, setCurrentDiagram] = useState(0);

  const diagrams = [
    {
      title: "Use Case Diagram",
      content: (
        <svg viewBox="0 0 1200 800" className="w-full h-full">
          {/* System Boundary */}
          <rect x="300" y="50" width="600" height="700" fill="none" stroke="#2563eb" strokeWidth="3" strokeDasharray="10,5"/>
          <text x="550" y="35" fontSize="24" fontWeight="bold" fill="#1e40af" textAnchor="middle">SJBIT Timetable System</text>
          
          {/* Admin Actor */}
          <g transform="translate(100, 150)">
            <circle cx="30" cy="20" r="15" fill="none" stroke="#dc2626" strokeWidth="2"/>
            <line x1="30" y1="35" x2="30" y2="70" stroke="#dc2626" strokeWidth="2"/>
            <line x1="30" y1="50" x2="10" y2="65" stroke="#dc2626" strokeWidth="2"/>
            <line x1="30" y1="50" x2="50" y2="65" stroke="#dc2626" strokeWidth="2"/>
            <line x1="30" y1="70" x2="10" y2="95" stroke="#dc2626" strokeWidth="2"/>
            <line x1="30" y1="70" x2="50" y2="95" stroke="#dc2626" strokeWidth="2"/>
            <text x="30" y="115" fontSize="16" fontWeight="bold" fill="#dc2626" textAnchor="middle">Admin</text>
          </g>

          {/* Teacher Actor */}
          <g transform="translate(100, 380)">
            <circle cx="30" cy="20" r="15" fill="none" stroke="#059669" strokeWidth="2"/>
            <line x1="30" y1="35" x2="30" y2="70" stroke="#059669" strokeWidth="2"/>
            <line x1="30" y1="50" x2="10" y2="65" stroke="#059669" strokeWidth="2"/>
            <line x1="30" y1="50" x2="50" y2="65" stroke="#059669" strokeWidth="2"/>
            <line x1="30" y1="70" x2="10" y2="95" stroke="#059669" strokeWidth="2"/>
            <line x1="30" y1="70" x2="50" y2="95" stroke="#059669" strokeWidth="2"/>
            <text x="30" y="115" fontSize="16" fontWeight="bold" fill="#059669" textAnchor="middle">Teacher</text>
          </g>

          {/* Student Actor */}
          <g transform="translate(1040, 380)">
            <circle cx="30" cy="20" r="15" fill="none" stroke="#7c3aed" strokeWidth="2"/>
            <line x1="30" y1="35" x2="30" y2="70" stroke="#7c3aed" strokeWidth="2"/>
            <line x1="30" y1="50" x2="10" y2="65" stroke="#7c3aed" strokeWidth="2"/>
            <line x1="30" y1="50" x2="50" y2="65" stroke="#7c3aed" strokeWidth="2"/>
            <line x1="30" y1="70" x2="10" y2="95" stroke="#7c3aed" strokeWidth="2"/>
            <line x1="30" y1="70" x2="50" y2="95" stroke="#7c3aed" strokeWidth="2"/>
            <text x="30" y="115" fontSize="16" fontWeight="bold" fill="#7c3aed" textAnchor="middle">Student</text>
          </g>

          {/* Admin Use Cases */}
          <ellipse cx="450" cy="120" rx="100" ry="40" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
          <text x="450" y="125" fontSize="13" textAnchor="middle" fontWeight="500">Login</text>

          <ellipse cx="450" cy="200" rx="100" ry="40" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
          <text x="450" y="200" fontSize="13" textAnchor="middle" fontWeight="500">Upload Student</text>
          <text x="450" y="215" fontSize="13" textAnchor="middle" fontWeight="500">Data (CSV)</text>

          <ellipse cx="450" cy="290" rx="100" ry="40" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
          <text x="450" y="290" fontSize="13" textAnchor="middle" fontWeight="500">Upload Teacher</text>
          <text x="450" y="305" fontSize="13" textAnchor="middle" fontWeight="500">Data (CSV)</text>

          <ellipse cx="650" cy="200" rx="100" ry="40" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
          <text x="650" y="200" fontSize="13" textAnchor="middle" fontWeight="500">Create Student</text>
          <text x="650" y="215" fontSize="13" textAnchor="middle" fontWeight="500">Accounts</text>

          <ellipse cx="650" cy="290" rx="100" ry="40" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
          <text x="650" y="290" fontSize="13" textAnchor="middle" fontWeight="500">Create Teacher</text>
          <text x="650" y="305" fontSize="13" textAnchor="middle" fontWeight="500">Accounts</text>

          <ellipse cx="450" cy="380" rx="100" ry="40" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
          <text x="450" y="380" fontSize="13" textAnchor="middle" fontWeight="500">Generate</text>
          <text x="450" y="395" fontSize="13" textAnchor="middle" fontWeight="500">Timetable</text>

          <ellipse cx="650" cy="380" rx="100" ry="40" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
          <text x="650" y="380" fontSize="13" textAnchor="middle" fontWeight="500">Publish</text>
          <text x="650" y="395" fontSize="13" textAnchor="middle" fontWeight="500">Timetable</text>

          <ellipse cx="450" cy="470" rx="100" ry="40" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
          <text x="450" y="470" fontSize="13" textAnchor="middle" fontWeight="500">Send</text>
          <text x="450" y="485" fontSize="13" textAnchor="middle" fontWeight="500">Notifications</text>

          {/* Teacher Use Cases */}
          <ellipse cx="550" cy="560" rx="100" ry="40" fill="#d1fae5" stroke="#059669" strokeWidth="2"/>
          <text x="550" y="560" fontSize="13" textAnchor="middle" fontWeight="500">Set Teacher</text>
          <text x="550" y="575" fontSize="13" textAnchor="middle" fontWeight="500">Availability</text>

          <ellipse cx="550" cy="650" rx="100" ry="40" fill="#d1fae5" stroke="#059669" strokeWidth="2"/>
          <text x="550" y="650" fontSize="13" textAnchor="middle" fontWeight="500">View Personal</text>
          <text x="550" y="665" fontSize="13" textAnchor="middle" fontWeight="500">Schedule</text>

          {/* Student Use Cases */}
          <ellipse cx="750" cy="560" rx="100" ry="40" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2"/>
          <text x="750" y="560" fontSize="13" textAnchor="middle" fontWeight="500">View Class</text>
          <text x="750" y="575" fontSize="13" textAnchor="middle" fontWeight="500">Timetable</text>

          <ellipse cx="750" cy="650" rx="100" ry="40" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2"/>
          <text x="750" y="650" fontSize="13" textAnchor="middle" fontWeight="500">View Teacher</text>
          <text x="750" y="665" fontSize="13" textAnchor="middle" fontWeight="500">Information</text>

          {/* Shared Use Cases */}
          <ellipse cx="650" cy="470" rx="100" ry="40" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2"/>
          <text x="650" y="470" fontSize="13" textAnchor="middle" fontWeight="500">Download PDF</text>
          <text x="650" y="485" fontSize="13" textAnchor="middle" fontWeight="500">Timetable</text>

          <ellipse cx="750" cy="120" rx="100" ry="40" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
          <text x="750" y="120" fontSize="13" textAnchor="middle" fontWeight="500">Receive</text>
          <text x="750" y="135" fontSize="13" textAnchor="middle" fontWeight="500">Notifications</text>

          {/* Connections - Admin */}
          <line x1="160" y1="200" x2="350" y2="120" stroke="#dc2626" strokeWidth="2"/>
          <line x1="160" y1="200" x2="350" y2="200" stroke="#dc2626" strokeWidth="2"/>
          <line x1="160" y1="200" x2="350" y2="290" stroke="#dc2626" strokeWidth="2"/>
          <line x1="160" y1="200" x2="350" y2="380" stroke="#dc2626" strokeWidth="2"/>
          <line x1="160" y1="200" x2="550" y2="380" stroke="#dc2626" strokeWidth="2"/>
          <line x1="160" y1="200" x2="350" y2="470" stroke="#dc2626" strokeWidth="2"/>

          {/* Connections - Teacher */}
          <line x1="160" y1="430" x2="450" y2="560" stroke="#059669" strokeWidth="2"/>
          <line x1="160" y1="430" x2="450" y2="650" stroke="#059669" strokeWidth="2"/>
          <line x1="160" y1="430" x2="550" y2="470" stroke="#059669" strokeWidth="2"/>
          <line x1="160" y1="430" x2="650" y2="120" stroke="#059669" strokeWidth="2"/>
          <line x1="160" y1="430" x2="350" y2="120" stroke="#059669" strokeWidth="2"/>

          {/* Connections - Student */}
          <line x1="1040" y1="430" x2="850" y2="560" stroke="#7c3aed" strokeWidth="2"/>
          <line x1="1040" y1="430" x2="850" y2="650" stroke="#7c3aed" strokeWidth="2"/>
          <line x1="1040" y1="430" x2="750" y2="470" stroke="#7c3aed" strokeWidth="2"/>
          <line x1="1040" y1="430" x2="850" y2="120" stroke="#7c3aed" strokeWidth="2"/>
          <line x1="1040" y1="430" x2="850" y2="120" stroke="#7c3aed" strokeWidth="2"/>

          {/* Include relationships */}
          <line x1="550" y1="200" x2="550" y2="200" stroke="#666" strokeWidth="1.5" strokeDasharray="5,5"/>
          <line x1="550" y1="200" x2="650" y2="200" stroke="#666" strokeWidth="1.5" strokeDasharray="5,5"/>
          <text x="600" y="190" fontSize="11" fill="#666" fontStyle="italic">«include»</text>

          <line x1="550" y1="290" x2="650" y2="290" stroke="#666" strokeWidth="1.5" strokeDasharray="5,5"/>
          <text x="600" y="280" fontSize="11" fill="#666" fontStyle="italic">«include»</text>
        </svg>
      )
    },
    {
      title: "Activity Diagram - Admin Generates Timetable",
      content: (
        <svg viewBox="0 0 900 1100" className="w-full h-full">
          {/* Start */}
          <circle cx="450" cy="40" r="20" fill="#1e40af"/>
          
          {/* Activity: Login */}
          <rect x="350" y="90" width="200" height="60" rx="30" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
          <text x="450" y="125" fontSize="14" textAnchor="middle" fontWeight="500">Admin Login</text>
          <line x1="450" y1="60" x2="450" y2="90" stroke="#1e40af" strokeWidth="2" markerEnd="url(#arrowblue)"/>

          {/* Decision: Authentication */}
          <path d="M 450,180 L 520,220 L 450,260 L 380,220 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
          <text x="450" y="225" fontSize="13" textAnchor="middle" fontWeight="500">Valid?</text>
          <line x1="450" y1="150" x2="450" y2="180" stroke="#1e40af" strokeWidth="2" markerEnd="url(#arrowblue)"/>

          {/* No - Back to Login */}
          <text x="320" y="225" fontSize="12" fill="#dc2626" fontWeight="bold">No</text>
          <path d="M 380,220 Q 300,220 300,120" stroke="#dc2626" strokeWidth="2" fill="none" markerEnd="url(#arrowred)"/>

          {/* Yes - Continue */}
          <text x="540" y="225" fontSize="12" fill="#059669" fontWeight="bold">Yes</text>
          <line x1="520" y1="220" x2="600" y2="220" stroke="#059669" strokeWidth="2"/>
          <line x1="600" y1="220" x2="600" y2="300" stroke="#1e40af" strokeWidth="2"/>
          <line x1="600" y1="300" x2="450" y2="300" stroke="#1e40af" strokeWidth="2" markerEnd="url(#arrowblue)"/>

          {/* Activity: Upload Data */}
          <rect x="350" y="300" width="200" height="60" rx="30" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
          <text x="450" y="325" fontSize="13" textAnchor="middle" fontWeight="500">Upload Student &</text>
          <text x="450" y="345" fontSize="13" textAnchor="middle" fontWeight="500">Teacher Data (CSV)</text>
          <line x1="450" y1="360" x2="450" y2="390" stroke="#1e40af" strokeWidth="2" markerEnd="url(#arrowblue)"/>

          {/* Activity: Configure Constraints */}
          <rect x="350" y="390" width="200" height="60" rx="30" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
          <text x="450" y="415" fontSize="13" textAnchor="middle" fontWeight="500">Configure Timetable</text>
          <text x="450" y="435" fontSize="13" textAnchor="middle" fontWeight="500">Constraints</text>
          <line x1="450" y1="450" x2="450" y2="480" stroke="#1e40af" strokeWidth="2" markerEnd="url(#arrowblue)"/>

          {/* Activity: Check Teacher Availability */}
          <rect x="350" y="480" width="200" height="60" rx="30" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
          <text x="450" y="505" fontSize="13" textAnchor="middle" fontWeight="500">Retrieve Teacher</text>
          <text x="450" y="525" fontSize="13" textAnchor="middle" fontWeight="500">Availability</text>
          <line x1="450" y1="540" x2="450" y2="570" stroke="#1e40af" strokeWidth="2" markerEnd="url(#arrowblue)"/>

          {/* Activity: Generate Timetable */}
          <rect x="350" y="570" width="200" height="60" rx="30" fill="#dcfce7" stroke="#059669" strokeWidth="2"/>
          <text x="450" y="595" fontSize="13" textAnchor="middle" fontWeight="500">Generate Timetable</text>
          <text x="450" y="615" fontSize="13" textAnchor="middle" fontWeight="500">(Algorithm)</text>
          <line x1="450" y1="630" x2="450" y2="660" stroke="#1e40af" strokeWidth="2" markerEnd="url(#arrowblue)"/>

          {/* Decision: Success */}
          <path d="M 450,690 L 520,730 L 450,770 L 380,730 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
          <text x="450" y="735" fontSize="12" textAnchor="middle" fontWeight="500">Success?</text>
          <line x1="450" y1="660" x2="450" y2="690" stroke="#1e40af" strokeWidth="2" markerEnd="url(#arrowblue)"/>

          {/* No - Retry */}
          <text x="280" y="735" fontSize="12" fill="#dc2626" fontWeight="bold">No</text>
          <path d="M 380,730 Q 250,730 250,600" stroke="#dc2626" strokeWidth="2" fill="none" markerEnd="url(#arrowred)"/>
          <text x="220" y="665" fontSize="11" fill="#dc2626">Adjust</text>
          <text x="220" y="680" fontSize="11" fill="#dc2626">Parameters</text>

          {/* Yes - Preview */}
          <text x="540" y="735" fontSize="12" fill="#059669" fontWeight="bold">Yes</text>
          <line x1="520" y1="730" x2="600" y2="730" stroke="#059669" strokeWidth="2"/>
          <line x1="600" y1="730" x2="600" y2="810" stroke="#1e40af" strokeWidth="2"/>
          <line x1="600" y1="810" x2="450" y2="810" stroke="#1e40af" strokeWidth="2" markerEnd="url(#arrowblue)"/>

          {/* Activity: Preview Timetable */}
          <rect x="350" y="810" width="200" height="60" rx="30" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
          <text x="450" y="835" fontSize="13" textAnchor="middle" fontWeight="500">Preview & Validate</text>
          <text x="450" y="855" fontSize="13" textAnchor="middle" fontWeight="500">Timetable</text>
          <line x1="450" y1="870" x2="450" y2="900" stroke="#1e40af" strokeWidth="2" markerEnd="url(#arrowblue)"/>

          {/* Activity: Publish Timetable */}
          <rect x="350" y="900" width="200" height="60" rx="30" fill="#dcfce7" stroke="#059669" strokeWidth="2"/>
          <text x="450" y="925" fontSize="13" textAnchor="middle" fontWeight="500">Publish Timetable</text>
          <text x="450" y="945" fontSize="13" textAnchor="middle" fontWeight="500">to System</text>
          <line x1="450" y1="960" x2="450" y2="990" stroke="#1e40af" strokeWidth="2" markerEnd="url(#arrowblue)"/>

          {/* Activity: Send Notifications */}
          <rect x="350" y="990" width="200" height="60" rx="30" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
          <text x="450" y="1015" fontSize="13" textAnchor="middle" fontWeight="500">Send Notifications to</text>
          <text x="450" y="1035" fontSize="13" textAnchor="middle" fontWeight="500">Teachers & Students</text>
          <line x1="450" y1="1050" x2="450" y2="1070" stroke="#1e40af" strokeWidth="2" markerEnd="url(#arrowblue)"/>

          {/* End */}
          <circle cx="450" cy="1080" r="15" fill="none" stroke="#1e40af" strokeWidth="2"/>
          <circle cx="450" cy="1080" r="10" fill="#1e40af"/>

          {/* Arrow markers */}
          <defs>
            <marker id="arrowblue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#1e40af"/>
            </marker>
            <marker id="arrowred" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#dc2626"/>
            </marker>
          </defs>
        </svg>
      )
    },
    {
      title: "Data Flow Diagram - Level 0 (Context Diagram)",
      content: (
        <svg viewBox="0 0 1000 700" className="w-full h-full">
          {/* Title */}
          <text x="500" y="30" fontSize="22" fontWeight="bold" fill="#1e40af" textAnchor="middle">Context Diagram (Level 0)</text>

          {/* Central System */}
          <circle cx="500" cy="350" r="120" fill="#dbeafe" stroke="#2563eb" strokeWidth="3"/>
          <text x="500" y="340" fontSize="16" fontWeight="bold" textAnchor="middle">SJBIT</text>
          <text x="500" y="360" fontSize="16" fontWeight="bold" textAnchor="middle">Timetable</text>
          <text x="500" y="380" fontSize="16" fontWeight="bold" textAnchor="middle">System</text>

          {/* Admin External Entity */}
          <rect x="100" y="150" width="140" height="80" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
          <text x="170" y="195" fontSize="15" fontWeight="bold" textAnchor="middle" fill="#dc2626">Admin</text>

          {/* Teacher External Entity */}
          <rect x="100" y="480" width="140" height="80" fill="#d1fae5" stroke="#059669" strokeWidth="2"/>
          <text x="170" y="525" fontSize="15" fontWeight="bold" textAnchor="middle" fill="#059669">Teacher</text>

          {/* Student External Entity */}
          <rect x="760" y="300" width="140" height="80" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2"/>
          <text x="830" y="345" fontSize="15" fontWeight="bold" textAnchor="middle" fill="#7c3aed">Student</text>

          {/* Data Flows - Admin to System */}
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
              <path d="M0,0 L0,6 L9,3 z" fill="#1e40af"/>
            </marker>
          </defs>

          <path d="M 240,180 Q 350,240 380,300" stroke="#1e40af" strokeWidth="2" fill="none" markerEnd="url(#arrow)"/>
          <text x="290" y="220" fontSize="12" fill="#1e40af">Student/Teacher Data</text>
          <text x="290" y="235" fontSize="12" fill="#1e40af">Constraints, Publish</text>

          <path d="M 380,280 Q 350,220 240,200" stroke="#059669" strokeWidth="2" fill="none" markerEnd="url(#arrow)"/>
          <text x="290" y="255" fontSize="12" fill="#059669">Generated Timetable</text>
          <text x="290" y="270" fontSize="12" fill="#059669">Reports</text>

          {/* Data Flows - Teacher to System */}
          <path d="M 240,510 Q 340,460 380,400" stroke="#1e40af" strokeWidth="2" fill="none" markerEnd="url(#arrow)"/>
          <text x="280" y="465" fontSize="12" fill="#1e40af">Availability</text>
          <text x="280" y="480" fontSize="12" fill="#1e40af">Login Credentials</text>

          <path d="M 400,400 Q 340,460 240,530" stroke="#059669" strokeWidth="2" fill="none" markerEnd="url(#arrow)"/>
          <text x="280" y="510" fontSize="12" fill="#059669">Personal Schedule</text>
          <text x="280" y="525" fontSize="12" fill="#059669">Notifications</text>

          {/* Data Flows - Student to System */}
          <path d="M 760,330 Q 660,340 620,345" stroke="#1e40af" strokeWidth="2" fill="none" markerEnd="url(#arrow)"/>
          <text x="670" y="325" fontSize="12" fill="#1e40af">Login Credentials</text>
          <text x="670" y="340" fontSize="12" fill="#1e40af">View Requests</text>

          <path d="M 620,355 Q 660,360 760,360" stroke="#059669" strokeWidth="2" fill="none" markerEnd="url(#arrow)"/>
          <text x="670" y="375" fontSize="12" fill="#059669">Class Timetable</text>
          <text x="670" y="390" fontSize="12" fill="#059669">Teacher Info, Notifications</text>
        </svg>
      )
    },
    {
      title: "Data Flow Diagram - Level 1",
      content: (
        <svg viewBox="0 0 1200 900" className="w-full h-full">
          {/* Title */}
          <text x="600" y="30" fontSize="22" fontWeight="bold" fill="#1e40af" textAnchor="middle">Data Flow Diagram - Level 1</text>

          {/* External Entities */}
          <rect x="50" y="200" width="120" height="60" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
          <text x="110" y="235" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#dc2626">Admin</text>

          <rect x="50" y="450" width="120" height="60" fill="#d1fae5" stroke="#059669" strokeWidth="2"/>
          <text x="110" y="485" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#059669">Teacher</text>

          <rect x="1030" y="400" width="120" height="60" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2"/>
          <text x="1090" y="435" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#7c3aed">Student</text>

          {/* Process 1: Authentication */}
          <circle cx="350" cy="150" r="60" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
          <text x="350" y="145" fontSize="13" fontWeight="bold" textAnchor="middle">1.0</text>
          <text x="350" y="165" fontSize="12" textAnchor="middle">Authenticate</text>

          {/* Process 2: Data Management */}
          <circle cx="450" cy="300" r="60" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
          <text x="450" y="295" fontSize="13" fontWeight="bold" textAnchor="middle">2.0</text>
          <text x="450" y="310" fontSize="11" textAnchor="middle">Manage Data</text>
          <text x="450" y="325" fontSize="11" textAnchor="middle">(Upload CSV)</text>

          {/* Process 3: Availability Management */}
          <circle cx="350" cy="550" r="60" fill="#d1fae5" stroke="#059669" strokeWidth="2"/>
          <text x="350" y="545" fontSize="13" fontWeight="bold" textAnchor="middle">3.0</text>
          <text x="350" y="560" fontSize="11" textAnchor="middle">Manage</text>
          <text x="350" y="575" fontSize="11" textAnchor="middle">Availability</text>

          {/* Process 4: Timetable Generation */}
          <circle cx="700" cy="300" r="60" fill="#dcfce7" stroke="#059669" strokeWidth="2"/>
          <text x="700" y="295" fontSize="13" fontWeight="bold" textAnchor="middle">4.0</text>
          <text x="700" y="310" fontSize="11" textAnchor="middle">Generate</text>
          <text x="700" y="325" fontSize="11" textAnchor="middle">Timetable</text>

          {/* Process 5: View & Access */}
          <circle cx="850" cy="500" r="60" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2"/>
          <text x="850" y="495" fontSize="13" fontWeight="bold" textAnchor="middle">5.0</text>
          <text x="850" y="510" fontSize="11" textAnchor="middle">View</text>
          <text x="850" y="525" fontSize="11" textAnchor="middle">Timetable</text>

          {/* Process 6: Notification System */}
          <circle cx="700" cy="650" r="60" fill="#fce7f3" stroke="#ec4899" strokeWidth="2"/>
          <text x="700" y="645" fontSize="13" fontWeight="bold" textAnchor="middle">6.0</text>
          <text x="700" y="660" fontSize="11" textAnchor="middle">Send</text>
          <text x="700" y="675" fontSize="11" textAnchor="middle">Notifications</text>

          {/* Data Stores */}
          <g>
            <rect x="450" y="450" width="180" height="40" fill="white" stroke="#64748b" strokeWidth="2"/>
            <path d="M 450,450 L 465,450 L 465,490 L 450,490" fill="#64748b"/>
            <text x="540" y="473" fontSize="12" fontWeight="500" textAnchor="middle">D1: User Database</text>
          </g>

          <g>
            <rect x="450" y="720" width="180" height="40" fill="white" stroke="#64748b" strokeWidth="2"/>
            <path d="M 450,720 L 465,720 L 465,760 L 450,760" fill="#64748b"/>
            <text x="540" y="743" fontSize="12" fontWeight="500" textAnchor="middle">D2: Student/Teacher Data</text>
          </g>

          <g>
            <rect x="850" y="200" width="180" height="40" fill="white" stroke="#64748b" strokeWidth="2"/>
            <path d="M 850,200 L 865,200 L 865,240 L 850,240" fill="#64748b"/>
            <text x="940" y="223" fontSize="12" fontWeight="500" textAnchor="middle">D3: Timetable Database</text>
          </g>

          <g>
            <rect x="500" y="600" width="180" height="40" fill="white" stroke="#64748b" strokeWidth="2"/>
            <path d="M 500,600 L 515,600 L 515,640 L 500,640" fill="#64748b"/>
            <text x="590" y="623" fontSize="12" fontWeight="500" textAnchor="middle">D4: Availability Data</text>
          </g>

          {/* Data Flows */}
          <defs>
            <marker id="arrowDFD" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
              <path d="M0,0 L0,6 L7,3 z" fill="#1e40af"/>
            </marker>
          </defs>

          {/* Admin flows */}
          <line x1="170" y1="220" x2="290" y2="160" stroke="#1e40af" strokeWidth="1.5" markerEnd="url(#arrowDFD)"/>
          <text x="210" y="185" fontSize="10" fill="#1e40af">Credentials</text>

          <line x1="170" y1="240" x2="390" y2="280" stroke="#1e40af" strokeWidth="1.5" markerEnd="url(#arrowDFD)"/>
          <text x="250" y="265" fontSize="10" fill="#1e40af">CSV Data</text>

          {/* Teacher flows */}
          <line x1="170" y1="470" x2="290" y2="540" stroke="#1e40af" strokeWidth="1.5" markerEnd="url(#arrowDFD)"/>
          <text x="210" y="510" fontSize="10" fill="#1e40af">Availability</text>

          {/* Student flows */}
          <line x1="1030" y1="430" x2="910" y2="490" stroke="#1e40af" strokeWidth="1.5" markerEnd="url(#arrowDFD)"/>
          <text x="960" y="455" fontSize="10" fill="#1e40af">View Request</text>

          <line x1="910" y1="510" x2="1030" y2="440" stroke="#059669" strokeWidth="1.5" markerEnd="url(#arrowDFD)"/>
          <text x="960" y="480" fontSize="10" fill="#059669">Timetable</text>

          {/* Process to Data Store flows */}
          <line x1="450" y1="350" x2="520" y2="450" stroke="#1e40af" strokeWidth="1.5" markerEnd="url(#arrowDFD)"/>
          <text x="480" y="405" fontSize="10" fill="#1e40af">Store Data</text>

          <line x1="450" y1="340" x2="540" y2="720" stroke="#1e40af" strokeWidth="1.5" markerEnd="url(#arrowDFD)"/>
          
          <line x1="350" y1="600" x2="500" y2="615" stroke="#1e40af" strokeWidth="1.5" markerEnd="url(#arrowDFD)"/>
          <text x="410" y="610" fontSize="10" fill="#1e40af">Save</text>

          <line x1="680" y1="615" x2="640" y2="330" stroke="#059669" strokeWidth="1.5" markerEnd="url(#arrowDFD)"/>
          <text x="660" y="470" fontSize="10" fill="#059669">Read</text>

          <line x1="760" y1="300" x2="850" y2="220" stroke="#1e40af" strokeWidth="1.5" markerEnd="url(#arrowDFD)"/>
          <text x="800" y="265" fontSize="10" fill="#1e40af">Store</text>

          <line x1="910" y1="220" x2="790" y2="480" stroke="#059669" strokeWidth="1.5" markerEnd="url(#arrowDFD)"/>
          <text x="860" y="350" fontSize="10" fill="#059669">Retrieve</text>

          <line x1="700" y1="360" x2="700" y2="590" stroke="#1e40af" strokeWidth="1.5" markerEnd="url(#arrowDFD)"/>
          <text x="710" y="480" fontSize="10" fill="#1e40af">Publish Event</text>

          <line x1="640" y1="660" x2="170" y2="500" stroke="#ec4899" strokeWidth="1.5" markerEnd="url(#arrowDFD)"/>
          <text x="380" y="580" fontSize="10" fill="#ec4899">Notification</text>

          <line x1="760" y1="670" x2="1030" y2="450" stroke="#ec4899" strokeWidth="1.5" markerEnd="url(#arrowDFD)"/>
          <text x="880" y="560" fontSize="10" fill="#ec4899">Notification</text>
        </svg>
      )
    },
    {
      title: "Activity Diagram - Teacher Sets Availability",
      content: (
        <svg viewBox="0 0 800 950" className="w-full h-full">
          {/* Start */}
          <circle cx="400" cy="40" r="20" fill="#059669"/>
          
          {/* Activity: Login */}
          <rect x="300" y="90" width="200" height="60" rx="30" fill="#d1fae5" stroke="#059669" strokeWidth="2"/>
          <text x="400" y="125" fontSize="14" textAnchor="middle" fontWeight="500">Teacher Login</text>
          <line x1="400" y1="60" x2="400" y2="90" stroke="#059669" strokeWidth="2" markerEnd="url(#arrowgreen)"/>

          {/* Decision: Authentication */}
          <path d="M 400,180 L 470,220 L 400,260 L 330,220 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
          <text x="400" y="225" fontSize="13" textAnchor="middle" fontWeight="500">Valid?</text>
          <line x1="400" y1="150" x2="400" y2="180" stroke="#059669" strokeWidth="2" markerEnd="url(#arrowgreen)"/>

          {/* No - Error */}
          <text x="270" y="225" fontSize="12" fill="#dc2626" fontWeight="bold">No</text>
          <path d="M 330,220 Q 250,220 250,120" stroke="#dc2626" strokeWidth="2" fill="none" markerEnd="url(#arrowred2)"/>
          <text x="210" y="170" fontSize="11" fill="#dc2626">Show Error</text>

          {/* Yes */}
          <text x="490" y="225" fontSize="12" fill="#059669" fontWeight="bold">Yes</text>
          <line x1="470" y1="220" x2="550" y2="220" stroke="#059669" strokeWidth="2"/>
          <line x1="550" y1="220" x2="550" y2="300" stroke="#059669" strokeWidth="2"/>
          <line x1="550" y1="300" x2="400" y2="300" stroke="#059669" strokeWidth="2" markerEnd="url(#arrowgreen)"/>

          {/* Activity: Navigate to Availability */}
          <rect x="300" y="300" width="200" height="60" rx="30" fill="#d1fae5" stroke="#059669" strokeWidth="2"/>
          <text x="400" y="325" fontSize="13" textAnchor="middle" fontWeight="500">Navigate to</text>
          <text x="400" y="345" fontSize="13" textAnchor="middle" fontWeight="500">Availability Page</text>
          <line x1="400" y1="360" x2="400" y2="390" stroke="#059669" strokeWidth="2" markerEnd="url(#arrowgreen)"/>

          {/* Activity: View Current Availability */}
          <rect x="300" y="390" width="200" height="60" rx="30" fill="#d1fae5" stroke="#059669" strokeWidth="2"/>
          <text x="400" y="415" fontSize="13" textAnchor="middle" fontWeight="500">View Current</text>
          <text x="400" y="435" fontSize="13" textAnchor="middle" fontWeight="500">Availability Status</text>
          <line x1="400" y1="450" x2="400" y2="480" stroke="#059669" strokeWidth="2" markerEnd="url(#arrowgreen)"/>

          {/* Activity: Select Days/Time Slots */}
          <rect x="300" y="480" width="200" height="60" rx="30" fill="#dcfce7" stroke="#059669" strokeWidth="2"/>
          <text x="400" y="505" fontSize="13" textAnchor="middle" fontWeight="500">Select Days &</text>
          <text x="400" y="525" fontSize="13" textAnchor="middle" fontWeight="500">Time Slots</text>
          <line x1="400" y1="540" x2="400" y2="570" stroke="#059669" strokeWidth="2" markerEnd="url(#arrowgreen)"/>

          {/* Activity: Mark Availability */}
          <rect x="300" y="570" width="200" height="60" rx="30" fill="#dcfce7" stroke="#059669" strokeWidth="2"/>
          <text x="400" y="595" fontSize="13" textAnchor="middle" fontWeight="500">Mark as Available/</text>
          <text x="400" y="615" fontSize="13" textAnchor="middle" fontWeight="500">Unavailable</text>
          <line x1="400" y1="630" x2="400" y2="660" stroke="#059669" strokeWidth="2" markerEnd="url(#arrowgreen)"/>

          {/* Activity: Submit Changes */}
          <rect x="300" y="660" width="200" height="60" rx="30" fill="#d1fae5" stroke="#059669" strokeWidth="2"/>
          <text x="400" y="685" fontSize="13" textAnchor="middle" fontWeight="500">Submit Availability</text>
          <text x="400" y="705" fontSize="13" textAnchor="middle" fontWeight="500">Changes</text>
          <line x1="400" y1="720" x2="400" y2="750" stroke="#059669" strokeWidth="2" markerEnd="url(#arrowgreen)"/>

          {/* Activity: Save to System */}
          <rect x="300" y="750" width="200" height="60" rx="30" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
          <text x="400" y="775" fontSize="13" textAnchor="middle" fontWeight="500">Save to Database</text>
          <text x="400" y="795" fontSize="13" textAnchor="middle" fontWeight="500">& Update System</text>
          <line x1="400" y1="810" x2="400" y2="840" stroke="#059669" strokeWidth="2" markerEnd="url(#arrowgreen)"/>

          {/* Activity: Show Confirmation */}
          <rect x="300" y="840" width="200" height="60" rx="30" fill="#d1fae5" stroke="#059669" strokeWidth="2"/>
          <text x="400" y="865" fontSize="13" textAnchor="middle" fontWeight="500">Display Success</text>
          <text x="400" y="885" fontSize="13" textAnchor="middle" fontWeight="500">Message</text>
          <line x1="400" y1="900" x2="400" y2="920" stroke="#059669" strokeWidth="2" markerEnd="url(#arrowgreen)"/>

          {/* End */}
          <circle cx="400" cy="930" r="15" fill="none" stroke="#059669" strokeWidth="2"/>
          <circle cx="400" cy="930" r="10" fill="#059669"/>

          {/* Arrow markers */}
          <defs>
            <marker id="arrowgreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#059669"/>
            </marker>
            <marker id="arrowred2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#dc2626"/>
            </marker>
          </defs>
        </svg>
      )
    },
    {
      title: "Activity Diagram - Student Views Timetable",
      content: (
        <svg viewBox="0 0 800 900" className="w-full h-full">
          {/* Start */}
          <circle cx="400" cy="40" r="20" fill="#7c3aed"/>
          
          {/* Activity: Login */}
          <rect x="300" y="90" width="200" height="60" rx="30" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2"/>
          <text x="400" y="125" fontSize="14" textAnchor="middle" fontWeight="500">Student Login</text>
          <line x1="400" y1="60" x2="400" y2="90" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#arrowpurple)"/>

          {/* Decision: Authentication */}
          <path d="M 400,180 L 470,220 L 400,260 L 330,220 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
          <text x="400" y="225" fontSize="13" textAnchor="middle" fontWeight="500">Valid?</text>
          <line x1="400" y1="150" x2="400" y2="180" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#arrowpurple)"/>

          {/* No */}
          <text x="270" y="225" fontSize="12" fill="#dc2626" fontWeight="bold">No</text>
          <path d="M 330,220 Q 250,220 250,120" stroke="#dc2626" strokeWidth="2" fill="none" markerEnd="url(#arrowred3)"/>

          {/* Yes */}
          <text x="490" y="225" fontSize="12" fill="#7c3aed" fontWeight="bold">Yes</text>
          <line x1="470" y1="220" x2="550" y2="220" stroke="#7c3aed" strokeWidth="2"/>
          <line x1="550" y1="220" x2="550" y2="300" stroke="#7c3aed" strokeWidth="2"/>
          <line x1="550" y1="300" x2="400" y2="300" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#arrowpurple)"/>

          {/* Activity: Navigate to Dashboard */}
          <rect x="300" y="300" width="200" height="60" rx="30" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2"/>
          <text x="400" y="325" fontSize="13" textAnchor="middle" fontWeight="500">Open Student</text>
          <text x="400" y="345" fontSize="13" textAnchor="middle" fontWeight="500">Dashboard</text>
          <line x1="400" y1="360" x2="400" y2="390" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#arrowpurple)"/>

          {/* Activity: Select Timetable View */}
          <rect x="300" y="390" width="200" height="60" rx="30" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2"/>
          <text x="400" y="415" fontSize="13" textAnchor="middle" fontWeight="500">Click "View</text>
          <text x="400" y="435" fontSize="13" textAnchor="middle" fontWeight="500">Timetable"</text>
          <line x1="400" y1="450" x2="400" y2="480" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#arrowpurple)"/>

          {/* Activity: Retrieve Data */}
          <rect x="300" y="480" width="200" height="60" rx="30" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
          <text x="400" y="505" fontSize="13" textAnchor="middle" fontWeight="500">Retrieve Timetable</text>
          <text x="400" y="525" fontSize="13" textAnchor="middle" fontWeight="500">from Database</text>
          <line x1="400" y1="540" x2="400" y2="570" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#arrowpurple)"/>

          {/* Decision: Timetable Published */}
          <path d="M 400,600 L 470,640 L 400,680 L 330,640 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="2"/>
          <text x="400" y="635" fontSize="11" textAnchor="middle" fontWeight="500">Timetable</text>
          <text x="400" y="650" fontSize="11" textAnchor="middle" fontWeight="500">Published?</text>
          <line x1="400" y1="570" x2="400" y2="600" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#arrowpurple)"/>

          {/* No - Show Message */}
          <rect x="550" y="610" width="180" height="60" rx="20" fill="#fee2e2" stroke="#dc2626" strokeWidth="2"/>
          <text x="640" y="635" fontSize="12" textAnchor="middle">Show "Timetable</text>
          <text x="640" y="655" fontSize="12" textAnchor="middle">Not Yet Published"</text>
          <text x="490" y="645" fontSize="12" fill="#dc2626" fontWeight="bold">No</text>
          <line x1="470" y1="640" x2="550" y2="640" stroke="#dc2626" strokeWidth="2" markerEnd="url(#arrowred3)"/>

          {/* Yes */}
          <text x="400" y="700" fontSize="12" fill="#7c3aed" fontWeight="bold">Yes</text>
          <line x1="400" y1="680" x2="400" y2="720" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#arrowpurple)"/>

          {/* Activity: Display Timetable */}
          <rect x="300" y="720" width="200" height="60" rx="30" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2"/>
          <text x="400" y="745" fontSize="13" textAnchor="middle" fontWeight="500">Display Class</text>
          <text x="400" y="765" fontSize="13" textAnchor="middle" fontWeight="500">Timetable</text>
          <line x1="400" y1="780" x2="400" y2="810" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#arrowpurple)"/>

          {/* Decision: Download PDF */}
          <path d="M 400,840 L 470,880 L 400,920 L 330,880 Z" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2"/>
          <text x="400" y="875" fontSize="11" textAnchor="middle" fontWeight="500">Download</text>
          <text x="400" y="890" fontSize="11" textAnchor="middle" fontWeight="500">PDF?</text>
          <line x1="400" y1="810" x2="400" y2="840" stroke="#7c3aed" strokeWidth="2" markerEnd="url(#arrowpurple)"/>

          {/* Yes - Generate PDF */}
          <rect x="520" y="850" width="160" height="60" rx="20" fill="#dbeafe" stroke="#2563eb" strokeWidth="2"/>
          <text x="600" y="875" fontSize="12" textAnchor="middle">Generate & </text>
          <text x="600" y="895" fontSize="12" textAnchor="middle">Download PDF</text>
          <text x="490" y="885" fontSize="12" fill="#4f46e5" fontWeight="bold">Yes</text>
          <line x1="470" y1="880" x2="520" y2="880" stroke="#4f46e5" strokeWidth="2" markerEnd="url(#arrowpurple)"/>

          {/* No - End */}
          <text x="335" y="930" fontSize="12" fill="#7c3aed" fontWeight="bold">No</text>
          <line x1="365" y1="910" x2="365" y2="850" stroke="#7c3aed" strokeWidth="1.5" strokeDasharray="5,5"/>

          {/* End */}
          <circle cx="365" cy="850" r="15" fill="none" stroke="#7c3aed" strokeWidth="2"/>
          <circle cx="365" cy="850" r="10" fill="#7c3aed"/>

          {/* Arrow markers */}
          <defs>
            <marker id="arrowpurple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#7c3aed"/>
            </marker>
            <marker id="arrowred3" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
              <path d="M0,0 L0,6 L9,3 z" fill="#dc2626"/>
            </marker>
          </defs>
        </svg>
      )
    }
  ];

  const downloadSVG = () => {
    const svg = document.querySelector('.diagram-container svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${diagrams[currentDiagram].title.replace(/\s+/g, '_')}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            SJBIT Timetable System
          </h1>
          <p className="text-lg text-gray-600">Professional UML & DFD Diagrams</p>
        </div>

        {/* Diagram Display */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              {diagrams[currentDiagram].title}
            </h2>
            <button
              onClick={downloadSVG}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download size={20} />
              Download SVG
            </button>
          </div>
          
          <div className="diagram-container border-2 border-gray-200 rounded-xl p-4 bg-gray-50 min-h-[600px] flex items-center justify-center">
            {diagrams[currentDiagram].content}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between bg-white rounded-xl shadow-lg p-4">
          <button
            onClick={() => setCurrentDiagram((prev) => (prev - 1 + diagrams.length) % diagrams.length)}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} />
            Previous
          </button>
          
          <div className="flex gap-2">
            {diagrams.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentDiagram(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentDiagram
                    ? 'bg-blue-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={() => setCurrentDiagram((prev) => (prev + 1) % diagrams.length)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Next
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Diagram List */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {diagrams.map((diagram, index) => (
            <button
              key={index}
              onClick={() => setCurrentDiagram(index)}
              className={`p-4 rounded-xl text-left transition-all ${
                index === currentDiagram
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:shadow-md hover:bg-gray-50'
              }`}
            >
              <div className="font-semibold">{index + 1}. {diagram.title}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SJBITDiagrams;