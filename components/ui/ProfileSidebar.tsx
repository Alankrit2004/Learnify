import React, { useState } from "react";
import { Button } from "./button";


export function ProfileSidebar() {
    const [inputText, setInputText] = useState("");
    const [notes, setNotes] = useState<string[]>([]);
    const [showAddNewNote, setShowAddNewNote] = useState(false);
    const handleInputChange = ({ e }: { e: string }) => {
        setInputText(e);
    }
    const handleNewNote = () => {
        
        setNotes([...notes, inputText]);
        setInputText("");
        setShowAddNewNote(false);
    }

    const handleShowAddNewNote = () => {
        setShowAddNewNote(!showAddNewNote);
    }

    const handleDeleteNote = (index: number) => {
        setNotes(notes.filter((_, i) => i !== index));
    }
    return (
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
                <Button onClick={handleShowAddNewNote} className="w-full bg-purple-500 hover:bg-purple-600 text-white">New Note</Button>
            </div>
            {showAddNewNote && (
                <div>
                    <input type="text" value={inputText} onChange={(e) => handleInputChange({ e: e.target.value })} className="w-full bg-aqua-500 hover:bg-white-600 text-white"/>
                    <Button onClick={handleNewNote} className="w-full bg-purple-500 hover:bg-purple-600 text-white">Add Note</Button>
                </div>
            )}
            {notes.length > 0  && (
                <div>
                    {notes.map((note, index) => (
                        <div key={index}>{note}</div>
                    ))}
                </div>
            )}
        </div>
    )
}