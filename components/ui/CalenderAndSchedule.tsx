import React, { useState, useEffect } from "react";
import { Button } from "./button";
import { ChevronLeft, ChevronRight, Clock, MapPin, User } from "lucide-react";
import { timetableData, Subject, Day } from "@/data/timetableData";

interface CalenderAndScheduleProps {
    selectedBranch: string | null;
    selectedSemester: string | null;
}

export function CalenderAndSchedule({ selectedBranch, selectedSemester }: CalenderAndScheduleProps) {
    const [currentWeek, setCurrentWeek] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<Day>("Monday");
    const [schedule, setSchedule] = useState<Subject[]>([]);

    const days: Day[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Update schedule when branch, semester, or selected day changes
    useEffect(() => {
        if (selectedBranch && selectedSemester) {
            const branch = selectedBranch.toUpperCase() as keyof typeof timetableData;
            const semester = selectedSemester.charAt(0) as keyof (typeof timetableData)[keyof typeof timetableData];
            const daySchedule = timetableData[branch]?.[semester]?.[selectedDay] || [];
            setSchedule(daySchedule);
        }
    }, [selectedBranch, selectedSemester, selectedDay]);

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

    // Get the dates for the current week
    const getWeekDates = () => {
        const dates = [];
        const firstDay = new Date(currentWeek);
        firstDay.setDate(firstDay.getDate() - firstDay.getDay() + 1);

        for (let i = 0; i < 6; i++) {
            const date = new Date(firstDay);
            date.setDate(firstDay.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    const weekDates = getWeekDates();

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Schedule</h2>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={handlePreviousWeek}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleNextWeek}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Days of the week */}
            <div className="grid grid-cols-6 gap-2 mb-6">
                {days.map((day, index) => (
                    <Button
                        key={day}
                        variant={selectedDay === day ? "default" : "outline"}
                        onClick={() => setSelectedDay(day)}
                        className="w-full"
                    >
                        <div className="text-center">
                            <div className="font-medium">{day.slice(0, 3)}</div>
                            <div className="text-sm text-muted-foreground">
                                {weekDates[index].getDate()}
                            </div>
                        </div>
                    </Button>
                ))}
            </div>

            {/* Schedule for selected day */}
            <div className="flex-1 space-y-4">
                {schedule.length > 0 ? (
                    schedule.map((slot, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold">{slot.subject}</h3>
                                <span className="text-sm text-gray-500">{slot.time}</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center text-sm text-gray-600">
                                    <User className="h-4 w-4 mr-2" />
                                    {slot.professor}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    {slot.room}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <Clock className="h-4 w-4 mr-2" />
                                    {slot.time}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center text-gray-500">
                            No classes scheduled for {selectedDay}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}