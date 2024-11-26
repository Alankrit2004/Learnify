/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { CourseSection } from "./ui/CourseSection";
import { CalenderAndSchedule } from "./ui/CalenderAndSchedule";
import { ProfileSidebar } from "./ui/ProfileSidebar";
import { SubjectsPage } from "./ui/SubjectsPage";
import { dataMapping } from "@/data/courseData";
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { UserButton } from "@clerk/nextjs";
import Cookies from 'js-cookie';

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
  const [currentView, setCurrentView] = useState<'courses' | 'subjects'>('courses');
  const [showBranchSelection, setShowBranchSelection] = useState(false);

  // Set isClient to true when component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load stored selections and update course data
  useEffect(() => {
    const branch = Cookies.get('selectedBranch');
    const semester = Cookies.get('selectedSemester');
    if (branch) setSelectedBranch(branch);
    if (semester) setSelectedSemester(semester);
    if (!branch || !semester) {
      setShowBranchSelection(true);
    }
  }, []);

  const handleBranchSelection = (branch: string | null) => {
    setSelectedBranch(branch);
    if (branch && typeof window !== 'undefined') {
      document.cookie = `selectedBranch=${branch};path=/;max-age=31536000`;
    }
  };

  const handleSemesterSelection = (semester: string | null) => {
    setSelectedSemester(semester);
    if (semester && typeof window !== 'undefined') {
      document.cookie = `selectedSemester=${semester};path=/;max-age=31536000`;
    }
  };

  const handleSubmit = () => {
    if (selectedBranch && selectedSemester) {
      try {
        const branch = selectedBranch as keyof typeof dataMapping;
        const semester = selectedSemester as keyof (typeof dataMapping)[keyof typeof dataMapping];
        const data = dataMapping[branch][semester];
        if (Array.isArray(data)) {
          setCourseData(data);
        }
      } catch (error) {
        console.error('Error loading course data:', error);
        setCourseData([]);
      }
      setShowBranchSelection(false);
    }
  };

  // Get courses based on selected branch and semester
  const getCourses = () => {
    if (!selectedBranch || !selectedSemester) return [];
    try {
      const branch = selectedBranch as keyof typeof dataMapping;
      const semester = selectedSemester as keyof (typeof dataMapping)[keyof typeof dataMapping];
      return dataMapping[branch][semester] || [];
    } catch (error) {
      console.error('Error loading course data:', error);
      return [];
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-full items-center justify-between px-4">
          <div className="flex gap-4">
            <Button
              variant={currentView === 'courses' ? 'default' : 'outline'}
              onClick={() => setCurrentView('courses')}
            >
              Courses
            </Button>
            <Button
              variant={currentView === 'subjects' ? 'default' : 'outline'}
              onClick={() => setCurrentView('subjects')}
            >
              Subjects
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => {
                setShowBranchSelection(true);
              }}
            >
              {selectedBranch && selectedSemester 
                ? `${selectedBranch.toUpperCase()} - ${selectedSemester} Sem`
                : 'Select Branch & Semester'}
            </Button>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>
      
      <main className="flex-1 container max-w-full p-4">
        {currentView === 'courses' ? (
          <div className="grid h-[calc(100vh-5rem)] grid-cols-1 lg:grid-cols-3 gap-4">
            <aside className="w-full">
              <ProfileSidebar />
            </aside>
            <div className="w-full">
              <CourseSection courses={getCourses()} />
            </div>
            <div className="w-full">
              <CalenderAndSchedule 
                selectedBranch={selectedBranch}
                selectedSemester={selectedSemester}
              />
            </div>
          </div>
        ) : (
          <SubjectsPage />
        )}
      </main>

      {showBranchSelection && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Select Branch & Semester</h2>
            
            <div className="space-y-4 mb-6">
              <h3 className="font-medium">Branch</h3>
              <div className="grid grid-cols-2 gap-2">
                {['ai', 'ds'].map((branch) => (
                  <Button
                    key={branch}
                    variant={selectedBranch === branch ? 'default' : 'outline'}
                    onClick={() => handleBranchSelection(branch)}
                    className="w-full"
                  >
                    {branch.toUpperCase()}
                  </Button>
                ))}
              </div>
            </div>

            {selectedBranch && (
              <div className="space-y-4">
                <h3 className="font-medium">Semester</h3>
                <div className="grid grid-cols-2 gap-2">
                  {['1st', '3rd', '5th', '7th'].map((semester) => (
                    <Button
                      key={semester}
                      variant={selectedSemester === semester ? 'default' : 'outline'}
                      onClick={() => {
                        handleSemesterSelection(semester);
                        handleSubmit();
                      }}
                      className="w-full"
                    >
                      {semester} Semester
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
