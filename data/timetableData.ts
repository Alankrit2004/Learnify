// Types for timetable data
export type Subject = {
    subject: string;
    professor: string;
    time: string;
    room: string;
}

export type TimeSlot = Subject;

export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

export type DaySchedule = {
    [key in Day]: Subject[];
}

export type Branch = 'AI' | 'DS';
export type Semester = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';

// Main timetable data structure
export const timetableData: Record<Branch, Record<Semester, DaySchedule>> = {
    AI: {
        '1': {
            Monday: [
                {
                    subject: "Introduction to AI",
                    professor: "Dr. Smith",
                    time: "9:00 AM - 10:00 AM",
                    room: "AI-101"
                },
                {
                    subject: "Machine Learning Basics",
                    professor: "Dr. Johnson",
                    time: "10:00 AM - 11:00 AM",
                    room: "AI-102"
                }
            ],
            Tuesday: [
                {
                    subject: "Python Programming",
                    professor: "Prof. Williams",
                    time: "9:00 AM - 10:00 AM",
                    room: "AI-103"
                }
            ],
            Wednesday: [
                {
                    subject: "Statistics for AI",
                    professor: "Dr. Brown",
                    time: "11:00 AM - 12:00 PM",
                    room: "AI-104"
                }
            ],
            Thursday: [
                {
                    subject: "Neural Networks",
                    professor: "Dr. Davis",
                    time: "2:00 PM - 3:00 PM",
                    room: "AI-105"
                }
            ],
            Friday: [
                {
                    subject: "AI Ethics",
                    professor: "Prof. Miller",
                    time: "10:00 AM - 11:00 AM",
                    room: "AI-106"
                }
            ],
            Saturday: [
                {
                    subject: "AI Lab",
                    professor: "Dr. Wilson",
                    time: "9:00 AM - 11:00 AM",
                    room: "AI-LAB"
                }
            ]
        },
        '2': {
            Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: []
        },
        '3': {
            Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: []
        },
        '4': {
            Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: []
        },
        '5': {
            Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: []
        },
        '6': {
            Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: []
        },
        '7': {
            Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: []
        },
        '8': {
            Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: []
        }
    },
    DS: {
        '1': {
            Monday: [
                {
                    subject: "Data Structures",
                    professor: "Dr. Anderson",
                    time: "9:00 AM - 10:00 AM",
                    room: "DS-101"
                },
                {
                    subject: "Database Management",
                    professor: "Prof. Taylor",
                    time: "10:00 AM - 11:00 AM",
                    room: "DS-102"
                }
            ],
            Tuesday: [
                {
                    subject: "Big Data Analytics",
                    professor: "Dr. Thomas",
                    time: "9:00 AM - 10:00 AM",
                    room: "DS-103"
                }
            ],
            Wednesday: [
                {
                    subject: "Data Mining",
                    professor: "Dr. White",
                    time: "11:00 AM - 12:00 PM",
                    room: "DS-104"
                }
            ],
            Thursday: [
                {
                    subject: "Statistical Analysis",
                    professor: "Dr. Clark",
                    time: "2:00 PM - 3:00 PM",
                    room: "DS-105"
                }
            ],
            Friday: [
                {
                    subject: "Data Visualization",
                    professor: "Prof. Lewis",
                    time: "10:00 AM - 11:00 AM",
                    room: "DS-106"
                }
            ],
            Saturday: [
                {
                    subject: "DS Lab",
                    professor: "Dr. Moore",
                    time: "9:00 AM - 11:00 AM",
                    room: "DS-LAB"
                }
            ]
        },
        '2': {
            Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: []
        },
        '3': {
            Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: []
        },
        '4': {
            Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: []
        },
        '5': {
            Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: []
        },
        '6': {
            Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: []
        },
        '7': {
            Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: []
        },
        '8': {
            Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: []
        }
    }
};

// Helper function to get timetable for a specific branch and semester
export function getTimetable(branch: Branch, semester: Semester): DaySchedule {
    return timetableData[branch][semester];
}
