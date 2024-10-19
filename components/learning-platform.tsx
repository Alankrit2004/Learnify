'use client'

import { Bell, ChevronLeft, ChevronRight, MoreHorizontal, Search, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

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
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-1/4 bg-white p-6 flex flex-col">
          <div className="flex flex-col items-center mb-6">
            <div className="w-32 h-32 relative mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-purple-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-purple-500 border-t-transparent transform -rotate-45"></div>
            </div>
            <h2 className="text-2xl font-bold mb-1">Alankrit</h2>
            <p className="text-sm text-gray-500">5th Semester Data Science</p>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold">10</div>
              <div className="text-xs text-gray-500">Total Classes Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">8/10</div>
              <div className="text-xs text-gray-500">Average score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">3</div>
              <div className="text-xs text-gray-500">Certificates obtained</div>
            </div>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-2">Notes</h3>
            <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">New Note</Button>
          </div>
        </div>

        {/* Middle Section - Courses */}
        <div className="w-2/5 bg-white border-l border-r border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Courses</h2>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-12rem)]">
            {[
              { title: "Pattern Recognition and Machine Learning", color: "bg-red-200", icon: "👤" },
              { title: "Natural Language Processing", color: "bg-green-200", icon: "🔗" },
              { title: "Cryptography and Network Security", color: "bg-yellow-200", icon: "🎯" },
              { title: "Intelligent Data Analysis", color: "bg-pink-200", icon: "📱" },
              { title: "Computational Complexity", color: "bg-orange-200", icon: "🌟" },
            ].map((course, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${course.color} rounded-lg flex items-center justify-center text-2xl`}>
                    {course.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{course.title}</h3>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                      <span>5/10 lessons</span>
                      <span>50%</span>
                    </div>
                    <Progress value={50} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - Calendar and Schedule */}
        <div className="w-1/3 bg-white p-6">
          <div className="flex justify-between items-center mb-6">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-semibold">March 2024</h2>
            <Button variant="ghost" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-7 gap-2 mb-6">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
              <div key={index} className="text-center text-sm text-gray-500">{day}</div>
            ))}
            {[25, 26, 27, 28, 29, 30, 31].map((date, index) => (
              <Button
                key={index}
                variant={date === 26 ? "default" : "ghost"}
                className={`h-10 ${date === 26 ? "bg-purple-500 text-white" : ""}`}
              >
                {date}
              </Button>
            ))}
          </div>
          <div className="space-y-4">
            {[
              { time: "10:00 - 10:30", title: "Works review", subtitle: "Figma fundamentals: first step into UI/UX Design" },
              { time: "11:00 - 12:30", title: "Notes and messages", subtitle: "Creative collaboration: teamwork in Figma", live: true },
              { time: "15:00 - 16:45", title: "Teamwork", subtitle: "Figma fundamentals: first step into UI/UX Design" },
              { time: "17:00 - 17:30", title: "Tutor", subtitle: "" },
            ].map((event, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-yellow-400"></div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-semibold">{event.time}</p>
                      <h3 className="font-bold">{event.title}</h3>
                      {event.subtitle && <p className="text-sm text-gray-500">{event.subtitle}</p>}
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  {event.live && (
                    <div className="mt-2 inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      <span className="w-2 h-2 mr-1 bg-red-500 rounded-full"></span>
                      Live
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}