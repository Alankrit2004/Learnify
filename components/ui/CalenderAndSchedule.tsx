import React, { useState, useEffect } from "react";
import { Button } from "./button1";
import { ChevronLeft, ChevronRight, Clock, MapPin, User } from "lucide-react";
import { timetableData, TimeSlot, BranchSchedule } from "@/data/timetableData";
import { TimetableImageUpload } from "./TimetableImageUpload";

interface CalenderAndScheduleProps {
    selectedBranch: string | null;
    selectedSemester: string | null;
}

export function CalenderAndSchedule({ selectedBranch, selectedSemester }: CalenderAndScheduleProps) {
    const [currentWeek, setCurrentWeek] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<string>("Monday");
    const [schedule, setSchedule] = useState<TimeSlot[]>([]);
    const [userTimetable, setUserTimetable] = useState<BranchSchedule | null>(null);

    // Load user timetable from localStorage
    useEffect(() => {
        const savedTimetable = localStorage.getItem('userTimetable');
        if (savedTimetable) {
            setUserTimetable(JSON.parse(savedTimetable));
        }
    }, []);

    // Update schedule when branch, semester, or selected day changes
    useEffect(() => {
        if (selectedBranch && selectedSemester) {
            // Try to get user's custom timetable first
            const userSchedule = userTimetable?.[selectedBranch]?.[selectedSemester]?.[selectedDay];
            console.log('User Schedule for', selectedDay, ':', userSchedule);
            
            // Fall back to default timetable if no user timetable exists
            const defaultSchedule = timetableData[selectedBranch]?.[selectedSemester]?.[selectedDay];
            console.log('Default Schedule:', defaultSchedule);
            
            const finalSchedule = userSchedule || defaultSchedule || [];
            console.log('Final Schedule:', finalSchedule);
            setSchedule(finalSchedule);
        }
    }, [selectedBranch, selectedSemester, selectedDay, userTimetable]);

    const handleTimetableUpload = (newTimetable: BranchSchedule) => {
        console.log('New Timetable:', newTimetable);
        setUserTimetable(newTimetable);
        // Force a refresh of localStorage
        localStorage.setItem('userTimetable', JSON.stringify(newTimetable));
    };

    // Get the dates for the current week
    const getWeekDates = (date: Date) => {
        const week = [];
        const start = new Date(date);
        start.setDate(start.getDate() - start.getDay() + 1); // Start from Monday

        for (let i = 0; i < 7; i++) {
            const day = new Date(start);
            day.setDate(start.getDate() + i);
            week.push(day);
        }
        return week;
    };

    const weekDates = getWeekDates(currentWeek);
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    const handlePreviousWeek = () => {
        const newDate = new Date(currentWeek);
        newDate.setDate(currentWeek.getDate() - 7);
        setCurrentWeek(newDate);
    };

    const handleNextWeek = () => {
        const newDate = new Date(currentWeek);
        newDate.setDate(currentWeek.getDate() + 7);
        setCurrentWeek(newDate);
    };

    return (
        <div className="w-1/3 bg-white p-6">
            <div className="flex justify-between items-center mb-6">
                <Button variant="ghost" size="icon" onClick={handlePreviousWeek}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-lg font-semibold">
                    {currentWeek.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h2>
                <Button variant="ghost" size="icon" onClick={handleNextWeek}>
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-6">
                {days.map((day, index) => (
                    <div key={day} className="text-center">
                        <div className="text-sm text-gray-500 mb-1">{day.slice(0, 3)}</div>
                        <Button
                            onClick={() => setSelectedDay(day)}
                            variant={day === selectedDay ? "default" : "ghost"}
                            className={`w-full h-10 ${day === selectedDay ? "bg-purple-500 text-white" : ""}`}
                        >
                            {weekDates[index].getDate()}
                        </Button>
                    </div>
                ))}
            </div>

            <div className="space-y-4">
                <TimetableImageUpload 
                    selectedBranch={selectedBranch}
                    selectedSemester={selectedSemester}
                    onUpload={handleTimetableUpload}
                />
                
                {selectedBranch && selectedSemester ? (
                    schedule.length > 0 ? (
                        schedule.map((slot, index) => (
                            <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-semibold text-purple-600">{slot.subject}</h3>
                                    <div className="flex items-center text-gray-500 text-sm">
                                        <Clock className="h-4 w-4 mr-1" />
                                        {slot.time}
                                    </div>
                                </div>
                                {(slot.room || slot.professor) && (
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                        {slot.room && (
                                            <div className="flex items-center">
                                                <MapPin className="h-4 w-4 mr-1" />
                                                {slot.room}
                                            </div>
                                        )}
                                        {slot.professor && (
                                            <div className="flex items-center">
                                                <User className="h-4 w-4 mr-1" />
                                                {slot.professor}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 py-4">
                            No classes scheduled for this day
                        </div>
                    )
                ) : (
                    <div className="text-center text-gray-500 py-4">
                        Please select a branch and semester to view the schedule
                    </div>
                )}
            </div>
        </div>
    );
}