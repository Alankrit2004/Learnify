import React, { useState } from "react";
import { Button } from "./button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

const CalenderData = [
    { time: "10:00 - 10:30", title: "Works review", subtitle: "Figma fundamentals: first step into UI/UX Design" },
    { time: "11:00 - 12:30", title: "Notes and messages", subtitle: "Creative collaboration: teamwork in Figma", live: true },
    { time: "15:00 - 16:45", title: "Teamwork", subtitle: "Figma fundamentals: first step into UI/UX Design" },
    { time: "17:00 - 17:30", title: "Tutor", subtitle: "" },
];
const dateData = [25, 26, 27, 28, 29, 30, 31];

export function CalenderAndSchedule() {
    const currentDate = new Date();
    const [selectedDate, setSelectedDate] = useState(dateData[0]);

    return (
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
                {dateData.map((date, index) => (
                    <Button
                        key={index}
                        onClick={() => setSelectedDate(date)}
                        variant={date === selectedDate ? "default" : "ghost"}
                        className={`h-10 ${date === selectedDate ? "bg-purple-500 text-white" : ""}`}
                    >
                        {date}
                    </Button>
                ))}
            </div>
            <div className="space-y-4">
                {CalenderData.map((event, index) => (
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
    )
}