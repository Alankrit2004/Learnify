/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { CourseSection } from "./ui/CourseSection";
import { CalenderAndSchedule } from "./ui/CalenderAndSchedule";
import { ProfileSidebar } from "./ui/ProfileSidebar";
import { dataMapping } from "@/data/courseData";
import { useRouter } from 'next/navigation';
import { BranchSelection } from "@/app/page";
import { usePathname } from 'next/navigation';

interface CourseData {
  title: string;
  color: string;
  icon: string;
}

export function LearningPlatform() {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);
  const [courseData, setCourseData] = useState<CourseData[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true when component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load stored selections and update course data
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedBranch = localStorage.getItem('selectedBranch');
      const storedSemester = localStorage.getItem('selectedSemester');
      
      console.log('Stored values:', { storedBranch, storedSemester });
      
      if (storedBranch && storedSemester) {
        setSelectedBranch(storedBranch);
        setSelectedSemester(storedSemester);
        
        try {
          const branch = storedBranch as 'ai' | 'ds';
          const semester = storedSemester as '1st' | '3rd' | '5th' | '7th';
          const data = dataMapping[branch][semester];
          
          console.log('Loading initial course data:', { branch, semester, data });
          
          if (Array.isArray(data)) {
            setCourseData(data);
          } else {
            console.error('Invalid course data format:', data);
            setCourseData([]);
          }
        } catch (error) {
          console.error('Error loading initial course data:', error);
          setCourseData([]);
        }
      }
    }
  }, []);

  const handleBranchSelection = (branch: string | null) => {
    console.log('Branch selected:', branch);
    setSelectedBranch(branch);
    if (branch && typeof window !== 'undefined') {
      localStorage.setItem('selectedBranch', branch);
      
      const storedSemester = localStorage.getItem('selectedSemester');
      if (storedSemester) {
        const data = dataMapping[branch as 'ai' | 'ds'][storedSemester as '1st' | '3rd' | '5th' | '7th'];
        setCourseData(data || []);
      }
    }
  };

  const handleSemesterSelection = (semester: string | null) => {
    console.log('Semester selected:', semester);
    setSelectedSemester(semester);
    if (semester && typeof window !== 'undefined') {
      localStorage.setItem('selectedSemester', semester);
      
      const storedBranch = localStorage.getItem('selectedBranch');
      if (storedBranch) {
        const data = dataMapping[storedBranch as 'ai' | 'ds'][semester as '1st' | '3rd' | '5th' | '7th'];
        setCourseData(data || []);
      }
    }
  };

  const handleSubmit = () => {
    if (selectedBranch && selectedSemester) {
      console.log('Submitting with:', { selectedBranch, selectedSemester });
      router.push('/dashboard');
    }
  };

  // Only render content after client-side hydration
  if (!isClient) {
    return null;
  }

  const isOnDashboard = pathname === '/dashboard';

  console.log('Current state:', {
    selectedBranch,
    selectedSemester,
    courseData: courseData.length,
    isOnDashboard
  });

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-semibold">e</span>
                </div>
              </div>
              <nav className="ml-6 flex space-x-8">
                <a href="#" className="text-purple-600 font-medium">Home</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Subjects</a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <ProfileSidebar />
        {!isOnDashboard && (
          <BranchSelection 
            setSelectedBranch={handleBranchSelection} 
            setSelectedSemester={handleSemesterSelection} 
            onSubmit={handleSubmit}
          />
        )}
        <CourseSection courseData={courseData} />
        <CalenderAndSchedule />
      </div>
    </div>
  );
}
