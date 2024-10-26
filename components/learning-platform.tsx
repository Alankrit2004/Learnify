/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import { ChevronLeft, ChevronRight, MoreHorizontal, Search } from "lucide-react"
// Remove unused imports
// import { Bell } from "lucide-react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { UserButton } from "@clerk/nextjs";
import { CalenderAndSchedule } from "./ui/CalenderAndSchedule";
import { CourseSection } from "./ui/CourseSection";
import { ProfileSidebar } from "./ui/ProfileSidebar";

export function LearningPlatform() {

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header with bottom border as separator */}
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
            <div className="flex items-center">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <ProfileSidebar />

        {/* Middle Section - Courses */}
        <CourseSection />

        {/* Right Section - Calendar and Schedule */}
        <CalenderAndSchedule />
      </div>
    </div>
  )
}
