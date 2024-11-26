import React, { useState, useEffect } from "react";
import { Button } from "./button";
import { X } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { timetableData } from "@/data/timetableData";
import Cookies from "js-cookie";

type Day = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";

export function ProfileSidebar() {
    const { user } = useUser();
    const [inputText, setInputText] = useState("");
    const [notes, setNotes] = useState<string[]>([]);
    const [showAddNewNote, setShowAddNewNote] = useState(false);
    const [todayClasses, setTodayClasses] = useState(0);

    useEffect(() => {
        const selectedBranch = Cookies.get('selectedBranch');
        const selectedSemester = Cookies.get('selectedSemester');
        
        if (selectedBranch && selectedSemester) {
            const days: Day[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const today = new Date().getDay(); // 0 is Sunday, 1 is Monday, etc.
            const dayIndex = today === 0 ? 5 : today - 1; // Map Sunday to Saturday, otherwise subtract 1
            const currentDay = days[dayIndex];
            
            const branch = selectedBranch.toUpperCase() as keyof typeof timetableData;
            const semester = selectedSemester.charAt(0) as keyof (typeof timetableData)[keyof typeof timetableData];
            
            const classesForToday = timetableData[branch]?.[semester]?.[currentDay]?.length || 0;
            setTodayClasses(classesForToday);
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    }

    const handleNewNote = () => {
        if (inputText.trim()) {
            setNotes([...notes, inputText.trim()]);
            setInputText("");
            setShowAddNewNote(false);
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleNewNote();
        }
    }

    const handleShowAddNewNote = () => {
        setShowAddNewNote(!showAddNewNote);
        setInputText("");
    }

    const handleDeleteNote = (index: number) => {
        setNotes(notes.filter((_, i) => i !== index));
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border p-6 w-full h-full">
            <div className="flex flex-col items-center mb-6">
                <div className="w-32 h-32 relative mb-4">
                    {user?.imageUrl ? (
                        <img 
                            src={user.imageUrl} 
                            alt={user.fullName || "Profile"} 
                            className="w-full h-full rounded-full object-cover"
                        />
                    ) : (
                        <>
                            <div className="absolute inset-0 rounded-full border-4 border-purple-200"></div>
                            <div className="absolute inset-0 rounded-full border-4 border-purple-500 border-t-transparent transform -rotate-45"></div>
                        </>
                    )}
                </div>
                <h2 className="text-2xl font-bold mb-1">{user?.fullName || "Welcome"}</h2>
                <p className="text-sm text-gray-500">
                    {Cookies.get('selectedBranch') && Cookies.get('selectedSemester') 
                        ? `${Cookies.get('selectedSemester')} Semester ${Cookies.get('selectedBranch')}`
                        : "Select Branch & Semester"}
                </p>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                    <div className="text-2xl font-bold">{todayClasses}</div>
                    <div className="text-xs text-gray-500">Classes Today</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold">8/10</div>
                    <div className="text-xs text-gray-500">Progress</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold">3</div>
                    <div className="text-xs text-gray-500">Certificates obtained</div>
                </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 mb-6 flex-grow">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Notes</h3>
                    <Button 
                        onClick={handleShowAddNewNote} 
                        className="bg-purple-500 hover:bg-purple-600 text-white text-sm px-3 py-1 rounded"
                    >
                        {showAddNewNote ? 'Cancel' : 'New Note'}
                    </Button>
                </div>
                
                {showAddNewNote && (
                    <div className="mb-4">
                        <input 
                            type="text" 
                            value={inputText} 
                            onChange={handleInputChange}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your note here..."
                            className="w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                        />
                        <Button 
                            onClick={handleNewNote} 
                            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded"
                            disabled={!inputText.trim()}
                        >
                            Add Note
                        </Button>
                    </div>
                )}
                
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                    {notes.map((note, index) => (
                        <div 
                            key={index} 
                            className="flex items-center justify-between bg-white p-2 rounded shadow-sm group"
                        >
                            <p className="text-sm text-gray-700 break-words flex-1">{note}</p>
                            <button
                                onClick={() => handleDeleteNote(index)}
                                className="ml-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ))}
                    {notes.length === 0 && !showAddNewNote && (
                        <p className="text-sm text-gray-500 text-center">No notes yet. Click 'New Note' to add one.</p>
                    )}
                </div>
            </div>
        </div>
    )
}