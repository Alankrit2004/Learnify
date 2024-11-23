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
import { UserButton } from "@clerk/nextjs";

interface CourseData {
  title: string;
  color: string;
  icon: string;
}

function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() ?? undefined;
  return undefined;
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
      const storedBranch = getCookie('selectedBranch');
      const storedSemester = getCookie('selectedSemester');
      
      console.log('Initial load - Stored values:', { storedBranch, storedSemester });
      
      if (storedBranch && storedSemester) {
        setSelectedBranch(storedBranch);
        setSelectedSemester(storedSemester);
        
        try {
          const branch = storedBranch as 'ai' | 'ds';
          const semester = storedSemester as '1st' | '3rd' | '5th' | '7th';
          console.log('Loading initial data for:', { branch, semester });
          const data = dataMapping[branch][semester];
          
          console.log('Loaded initial course data:', data);
          
          if (Array.isArray(data)) {
            setCourseData(data);
          } else {
            console.error('Invalid initial course data format:', data);
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
      document.cookie = `selectedBranch=${branch};path=/;max-age=31536000`;
      
      const storedSemester = getCookie('selectedSemester');
      if (storedSemester) {
        console.log('Loading data after branch selection:', { branch, semester: storedSemester });
        try {
          const data = dataMapping[branch as 'ai' | 'ds'][storedSemester as '1st' | '3rd' | '5th' | '7th'];
          console.log('Loaded course data:', data);
          if (Array.isArray(data)) {
            setCourseData(data);
          } else {
            console.error('Invalid course data format:', data);
            setCourseData([]);
          }
        } catch (error) {
          console.error('Error loading course data:', error);
          setCourseData([]);
        }
      }
    }
  };

  const handleSemesterSelection = (semester: string | null) => {
    console.log('Semester selected:', semester);
    setSelectedSemester(semester);
    if (semester && typeof window !== 'undefined') {
      localStorage.setItem('selectedSemester', semester);
      document.cookie = `selectedSemester=${semester};path=/;max-age=31536000`;
      
      const storedBranch = getCookie('selectedBranch');
      if (storedBranch) {
        console.log('Loading data after semester selection:', { branch: storedBranch, semester });
        try {
          const data = dataMapping[storedBranch as 'ai' | 'ds'][semester as '1st' | '3rd' | '5th' | '7th'];
          console.log('Loaded course data:', data);
          if (Array.isArray(data)) {
            setCourseData(data);
          } else {
            console.error('Invalid course data format:', data);
            setCourseData([]);
          }
        } catch (error) {
          console.error('Error loading course data:', error);
          setCourseData([]);
        }
      }
    }
  };

  const handleSubmit = () => {
    if (selectedBranch && selectedSemester) {
      console.log('Submitting with:', { selectedBranch, selectedSemester });
      try {
        const data = dataMapping[selectedBranch as 'ai' | 'ds'][selectedSemester as '1st' | '3rd' | '5th' | '7th'];
        console.log('Setting course data on submit:', data);
        if (Array.isArray(data)) {
          setCourseData(data);
        }
      } catch (error) {
        console.error('Error setting course data on submit:', error);
      }
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
              <nav className="flex space-x-8">
                <a href="#" className="text-purple-600 font-medium">Home</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Subjects</a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => {
                  // Clear existing selections and course data
                  localStorage.removeItem('selectedBranch');
                  localStorage.removeItem('selectedSemester');
                  document.cookie = 'selectedBranch=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
                  document.cookie = 'selectedSemester=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
                  setSelectedBranch(null);
                  setSelectedSemester(null);
                  setCourseData([]);
                  router.push('/');
                }}
              >
                Change Branch
              </Button>
              <UserButton afterSignOutUrl="/"/>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {!isOnDashboard ? (
          <BranchSelection 
            setSelectedBranch={handleBranchSelection} 
            setSelectedSemester={handleSemesterSelection} 
            onSubmit={handleSubmit}
          />
        ) : (
          <div className="flex gap-6 p-6 w-full">
            <ProfileSidebar />
            <CourseSection courseData={courseData} />
            <CalenderAndSchedule 
              selectedBranch={selectedBranch}
              selectedSemester={selectedSemester}
            />
          </div>
        )}
      </div>
    </div>
  );
}
