import { Progress } from "@radix-ui/react-progress";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import { Button } from "./button";

interface Course {
  title: string;
  color: string;
  icon: string;
}

interface CourseSectionProps {
  courses: Course[];
}

export function CourseSection({ courses = [] }: CourseSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Courses</h2>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-12rem)]">
        {courses && courses.length > 0 ? (
          courses.map((course, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
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
                    <span>Not Started</span>
                  </div>
                  <Progress value={0} className="h-2" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">
            {courses === null ? 'Loading courses...' : 'No courses available. Please select a branch and semester.'}
          </div>
        )}
      </div>
    </div>
  );
}