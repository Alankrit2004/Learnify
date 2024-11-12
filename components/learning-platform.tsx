/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { CourseSection } from "./ui/CourseSection";
import { CalenderAndSchedule } from "./ui/CalenderAndSchedule";
import { ProfileSidebar } from "./ui/ProfileSidebar";
import { dataMapping } from "@/data/courseData"; // Import the course data mapping
import BranchSelection from "@/app/page"; // Adjusted import path
import { useRouter } from 'next/router';

export function LearningPlatform() {
  const router = useRouter();
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);

  const handleBranchSelection = (branch: string | null) => {
    setSelectedBranch(branch);
  };

  const handleSemesterSelection = (semester: string | null) => {
    setSelectedSemester(semester);
  };

  const handleSubmit = () => {
    if (selectedBranch && selectedSemester) {
      // Redirect to the desired page after submission
      router.push('/'); // Adjust the path as needed
    }
  };

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
        <BranchSelection 
          setSelectedBranch={handleBranchSelection} 
          setSelectedSemester={handleSemesterSelection} 
          onSubmit={handleSubmit}
        />
        <CourseSection courseData={dataMapping[selectedBranch as 'ai' | 'ds'][selectedSemester as '1st' | '3rd' | '5th' | '7th'] || []} />
        <CalenderAndSchedule />
      </div>
    </div>
  );
}
