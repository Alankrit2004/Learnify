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
        '4': {
            Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: []
        },
        '5': {
            Monday: [
                { 
                    subject: "Cryptography And Network Security",
                    professor: "Dr.Nachiket Tapas",
                    time: "10:30 AM - 11:20 PM",
                    room: "SC-10"
                },
                {
                    subject: "Artificial Neural Networks",
                    professor: "Dr.Toran Verma",
                    time: "11:20 AM - 01:00 PM",
                    room: "SC-10"
                },

                {
                    subject: "Computational Complexity",
                    professor: "Dr.Nachiket Tapas",
                    time: "01:00 PM - 01:50 PM",
                    room: "SC-10"
                },
                {
                    subject: "Major Project Based on Indudtrial Training",
                    professor: "Mr.Abhinaw Jagtap",
                    time: "02:40 PM - 04:20 PM",
                    room: "SC-10"
                },
                {
                    subject: "Sports",
                    professor: ".. ",
                    time: "04:20 PM - 05:10 PM",
                    room: ".."
                }
            ],
            Tuesday: [
                { 
                    subject: "Machine Language",
                    professor: "Mr.Shesh Narayan Sahu",
                    time: "10:30 AM - 11:20 AM",
                    room: "SC-10"
                },
                {
                    subject: "Computational Complexity",
                    professor: "Dr.Nachiket Tapas",
                    time: "11:20 AM - 01:00 PM",
                    room: "SC-10"
                },

                {
                    subject: "Cryptography And Network Security",
                    professor: "Dr.Nachiket Tapas",
                    time: "01:00 PM - 01:50 PM",
                    room: "SC-10"
                },
                {
                    subject: "Artificial Neural Networks",
                    professor: "Dr.Toran Verma",
                    time: "02:40 PM - 04:20 PM",
                    room: "SC-10"
                },
                {
                    subject: "Library",
                    professor: ".. ",
                    time: "04:20 PM - 05:10 PM",
                    room: ".."
                }
            ],
            Wednesday: [
                {
                    subject: "Machine Language",
                    professor: "Mr.Shesh Narayan Sahu",
                    time: "10:30 AM - 11:20 AM",
                    room: "SC-10"
                },
                {
                    subject: "Artificial Neural Networks",
                    professor: "Dr.Toran Verma",
                    time: "11:20 AM - 12:10 PM",
                    room: "SC-10"
                },
                {
                    subject: "ML-LAB(BATCH-2nd),PMA-LAB(BATCH-1st)",
                    professor: "Mr.Shesh Narayan Sahu(Batch-2nd), K.Vibhooti Rajkumar(Batch-1st)",
                    time: "12:10 PM - 01:50 PM",
                    room: "LAB-01(BATCH-2nd) & LAB-02(BATCH-1st)"
                },
                {
                    subject: "Cryptography And Network Security",
                    professor: "Dr.Nachiket Tapas",
                    time: "02:40 PM - 04:20 PM",
                    room: "SC-10"
                },
                {
                    subject: "Sports",
                    professor: "..",
                    time: "04:20 PM - 05:10 PM",
                    room: ".."
                }

            ],
            Thursday: [
                {
                    subject: "Machine Language",
                    professor: "Mr.Shesh Narayan Sahu",
                    time: "10:30 AM - 12:10 PM",
                    room: "SC-10"
                },
                {
                    subject: "Artificial Neural Networks",
                    professor: "Dr.Toran Verma",
                    time: "12:10 PM - 01:00 PM",
                    room: "SC-10"
                },
                {
                    subject: "Cryptography And Network Security",
                    professor: "Dr.Nachiket Tapas",
                    time: "12:10 PM - 01:50 PM",
                    room: "SC-10"
                },
                {
                    subject: "Predictive Modeling And Analysis",
                    professor: "Dr.Tirath Prasad Sahu",
                    time: "02:40 PM - 04:20 PM",
                    room: "SC-10"
                },
                {
                    subject: "LIBRARY",
                    professor: "..",
                    time: "04:20 PM - 05:10 PM",
                    room: ".."
                }
            ],
            Friday: [
                {
                    subject: "Major Project Based on Indudtrial Training",
                    professor: "Mr.Abhinaw Jagtap",
                    time: "10:30 AM - 12:10 PM",
                    room: "SC-10"
                },
                {
                    subject: "Computational Complexity",
                    professor: "Dr.Nachiket Tapas",
                    time: "12:10 PM - 01:50 PM",
                    room: "SC-10"
                },
                {
                    subject: "ANN-LAB(BATCH-1st), ML-LAB(BATCH-2nd)",
                    professor: "Ramakant Ganjeswar(Batch-1st), Shesh Narayan Sahu(Batch-2nd)",
                    time: "02:40 PM - 04:20 PM",
                    room: "SC-10"
                },
                {
                    subject: "Sports",
                    professor: "..",
                    time: "04:20 PM - 05:10 PM",
                    room: ".."
                }
            ],
            Saturday: [
                {
                    subject: "PMA-LAB(BATCH-2nd), ANN-LAB(BATCH-1st)",
                    professor: "K.Vibhooti Rajkumar(Batch-2nd), Ramakant Ganjeswar(Batch-1st)",
                    time: "10:30 AM - 12:10 PM",
                    room: "LAB-01(BATCH-2nd) & LAB-01(BATCH-01)"
                },
                {
                    subject: "Predictive Modeling And Analysis",
                    professor: "Dr.Tirath Prasad Sahu",
                    time: "12:10 PM - 01:50 PM",
                    room: "SC-10"
                },
                {
                    subject: "CLUB-ACTIVITY SPORTS",
                    professor: "..",
                    time: "02:40 PM - 05:10 PM",
                    room: ".."
                }
            ]
        },
        '6': {
            Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: []
        },
        '7': {
            Monday: [
                {
                    subject: "BIA",
                    professor: "Mrs.K.Vibhooti Rajkumar",
                    time: "10:30 AM - 11:20 AM",
                    room: "SC-01"
                },
                {
                    subject: "ISR",
                    professor: "Mr.Ramakant Ganjeshwer",
                    time: "11:20 AM - 12:10 PM",
                    room: "SC-01"
                },
                {
                    subject: "SE-Lab",
                    professor: "Ms.Basanti Minj",
                    time: "12:10 PM - 1:50 PM",
                    room: "Lab-01"
                },
                {
                    subject: "MIS",
                    professor: "NPTEL",
                    time: "2:40 PM - 3:30 PM",
                    room: "SC-01"
                },
                {
                    subject: "AGT",
                    professor: "NPTEL",
                    time: "3:30 PM - 5:10 PM",
                    room: "SC-01"
                },
            ],
            Tuesday: [
                {
                    subject: "SE",
                    professor: "Ms.Basanti Minj",
                    time: "10:30 AM - 11:20 AM",
                    room: "SC-01"
                },
               
                {
                    subject: "ISR",
                    professor: "Mr.Ramakant Ganjeshwer",
                    time: "11:20 AM - 12:10 PM",
                    room: "SC-01"
                },
                {
                    subject: "BIA",
                    professor: "Mrs.K.Vibhooti Rajkumar",
                    time: "12:10 PM - 1:00 PM",
                    room: "SC-01"
                },
                {
                    subject: "IP",
                    professor: "Mr.Shesh Narayan Sahu",
                    time: "1:00 PM - 1:50 PM",
                    room: "SC-01"
                },
                {
                    subject: "AGT",
                    professor: "NPTEL",
                    time: "2:40 PM - 3:30 PM",
                    room: "SC-01"
                },
                {
                    subject: "MIS",
                    professor: "NPTEL",
                    time: "3:30 PM - 5:10 PM",
                    room: "SC-01"
                },
            ],
            Wednesday: [
                {
                    subject: "BIA",
                    professor: "Mrs.K.Vibhooti Rajkumar",
                    time: "10:30 AM - 11:20 AM",
                    room: "SC-01"
                },
                {
                    subject: "SE",
                    professor: "Ms.Basanti Minj",
                    time: "11:20 AM - 12:10 PM",
                    room: "SC-01"
                },
                {
                    subject: "TCS",
                    professor: "MR.Ashish Sharma",
                    time: "12:10 PM - 1:50 PM",
                    room: "SC-01"
                },
                {
                    subject: "MIS",
                    professor: "NPTEL",
                    time: "2:40 PM - 3:30 PM",
                    room: "SC-01"
                },
                {
                    subject: "AGT",
                    professor: "NPTEL",
                    time: "3:30 PM - 4:20 PM",
                    room: "SC-01"
                },
                {
                    subject: "LIB",
                    professor: "",
                    time: "3:30 PM - 4:20 PM",
                    room: "LIB"
                },
            ],
            Thursday: [
               
                {
                    subject: "SE",
                    professor: "Ms.Basanti Minj",
                    time: "10:30 AM - 12:10 PM",
                    room: "SC-01"
                },
                {
                    subject: "IP",
                    professor: "Mr.Shesh Narayan Sahu",
                    time: "12:10 PM - 1:50 PM",
                    room: "SC-01"
                },
                {
                    subject: "BIA-LAB",
                    professor: "Mrs.K.Vibhooti Rajkumar",
                    time: "2:40 PM - 4:20 PM",
                    room: "LAB-01"
                },
                {
                    subject: "AGT",
                    professor: "NPTEL",
                    time: "4:20 PM - 5:10 PM",
                    room: "SC-01"
                },
               
            ],
            Friday: [
                {
                    subject: "IP",
                    professor: "Mr.Shesh Narayan Sahu",
                    time: "10:30 AM- 11:20 AM",
                    room: "SC-01"
                },
                {
                    subject: "BIA",
                    professor: "Mrs.K.Vibhooti Rajkumar",
                    time: "11:20 AM - 12:10 PM",
                    room: "SC-01"
                },
                {
                    subject: "SE",
                    professor: "Ms.Basanti Minj",
                    time: "12:10 PM - 1:00 PM",
                    room: "SC-01"
                },
               
                {
                    subject: "ISR",
                    professor: "Mr.Ramakant Ganjeshwer",
                    time: "1:00 PM - 1:50 PM",
                    room: "SC-01"
                },
               
               
                {
                    subject: "PT",
                    professor: "Dr. J P Patra",
                    time: "2:40 PM - 4:20 PM",
                    room: "SC-01"
                },
                {
                    subject: "SPORT",
                    professor: "",
                    time: "3:30 PM - 5:10 PM",
                    room: ""
                },
            ],
            Saturday: [
                {
                    subject: "ISR",
                    professor: "Mr.Ramakant Ganjeshwer",
                    time: "10:30 AM - 11:20 AM",
                    room: "SC-01"
                },
                {
                    subject: "MIS",
                    professor: "NPTEL",
                    time: "11:20 AM - 12:10 PM",
                    room: "SC-01"
                },
                
                {
                    subject: "SE-LAB",
                    professor: "Ms.Basanti Minj",
                    time: "12:10 PM - 1:50 PM",
                    room: "LAB-01"
                },
                {
                    subject: "CLUB ACTIVIYT",
                    professor: "",
                    time: "2:40 PM - 5:10 PM",
                    room: ""
                },
               
            ],
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
        '4': {
            Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: []
        },
        '5': {
            Monday: [
                {
                    subject: "Intelligent Data Analysis",
                    professor: "Mr.Shesh Narayan Sahu",
                    time: "10:30AM - 12:10 PM",
                    room: "SC-05"
                },
                {
                    subject: "Computational Complexity",
                    professor: "Dr. Nachiket Tapas",
                    time: "12:10 PM - 01:00 PM",
                    room: "SC-05"
                },

                {
                    subject: "Cryptography And Network Security",
                    professor: "Dr.Toran Verma",
                    time: "01:00 PM - 01:50 PM",
                    room: "SC-05"
                },
                {
                    subject: "NLP-LAB(BATCH 2nd),PRML-LAB(BATCH 1st)",
                    professor: "Ramakant Ganjeshwar(Batch-2nd) , Basanti Minj(Batch 1st)",
                    time: "02:40 PM - 04:20 PM",
                    room: "SC-05"
                },
                {
                    subject: "Library",
                    professor: "Self ",
                    time: "04:20 PM - 05:10 PM",
                    room: ".."
                }
            ],
            Tuesday: [
                {
                    subject: "Natural Language Processing",
                    professor: "Mr.Ramakant Ganjeshwar",
                    time: "10:30 AM - 11:20 AM",
                    room: "SC-05"
                },
                { 
                    subject: "Computational Complexity",
                    professor: "Dr. Nachiket Tapas",
                    time: "11:20 AM - 12:10 PM",
                    room: "SC-05"
                },
                {
                    subject: "Cryptography And Network Security",
                    professor: "Dr.Toran Verma",
                    time: "12:10 AM - 01:50 PM",
                    room: "SC-05"
                },
                {
                    subject: "IDA-LAB(BATCH 2nd),NLP-LAB(BATCH 1st)",
                    professor: "Mr.Ramakant Ganjeshwar(Batch-1st),Mr.Shesh Narayan Sahu(Batch-2nd) ",
                    time: "02:40 PM - 04:20 PM",
                    room: "SC-05"
                },
                {
                    subject: "Sports",
                    professor: "..",
                    time: "04:20 PM - 05:10 pM",
                    room: ".."
                }
            ],
            Wednesday: [
                {
                    subject: "Computational Complexity",
                    professor: "Dr. Nachiket Tapas",
                    time: "10:30 AM - 11:20 AM",
                    room: "SC-05"
                },
                {
                    subject: "Intelligent Data Analysis",
                    professor: "Mr.Shesh Narayan Sahu",
                    time: "11:20 AM - 12:10 PM",
                    room: "SC-05"
                },
                {
                    subject: "Major Project Based on Indudtrial Training",
                    professor: "Mr.Abhinaw Jagtap",
                    time: "12:10 PM - 01:50 PM",
                    room: "SC-05"
                },
                {
                    subject: "PRML-LAB(BATCH-2nd), IDA-LAB(BATCH-1st)",
                    professor: "Basanti Minj(Batch-2nd), Shesh Narayan Sahu(Batch-1st)",
                    time: "02:40 PM - 04:20 PM",
                    room: "SC-05"
                },
                {
                    subject: "Library",
                    professor: "..",
                    time: "04:20 PM - 05:10 PM",
                    room: "SC-.."
                }
            ],
            Thursday: [
                {
                    subject: "Cryptography And Network Security",
                    professor: "Dr.Toran Verma",
                    time: "10:30 AM - 11:20 PM",
                    room: "SC-05"
                },
                {
                    subject: "Natural Language Processing",
                    professor: "Mr.Ramakant Ganjeshwar",
                    time: "11:20 AM - 12:10 PM",
                    room: "SC-05"
                },
                {
                    
                    subject: "Major Project Based on Indudtrial Training",
                    professor: "Mr.Abhinaw Jagtap",
                    time: "12:10 PM - 01:50 PM",
                    room: "SC-05"
                },
                {
                    subject: "Pattern Recoginition And Machine Language",
                    professor: "Dr.Deepak Kumar Singh",
                    time: "2:40 PM - 04:20 PM",
                    room: "SC-05"
                },
                {
                    subject: "Sports",
                    professor: "..",
                    time: "04:20 PM - 05:10 PM",
                    room: "SC-05"
                }
                
            ],
            Friday: [
                {
                    subject: "Computational Complexity",
                    professor: "Dr. Nachiket Tapas",
                    time: "10:30 AM - 11:20 AM",
                    room: "SC-05"
                },
                {
                    subject: "Cryptography And Network Security",
                    professor: "Dr.Toran Verma",
                    time: "11:20 AM - 12:10 PM",
                    room: "SC-05"
                },
                {   
                    subject: "Intelligent Data Analysis",
                    professor: "Mr.Shesh Narayan Sahu",
                    time: "12:10 PM - 01:50 PM",
                    room: "SC-05"
                },
                {
                    subject: "Natural Language Processing",
                    professor: "Mr.Ramakant Ganjeshwar",
                    time: "02:40 PM - 04:20 PM",
                    room: "SC-05"
                },
                {
                    subject: "Library",
                    professor: "..",
                    time: "04:20 PM - 05:10 PM",
                    room: "SC-.."
                }
            ],
            Saturday: [
                {
                    
                    subject: "Computational Complexity",
                    professor: "Dr. Nachiket Tapas",
                    time: "10:30 AM - 11:20 AM",
                    room: "SC-05"
                },
                {
                    subject: "Pattern Recoginition And Machine Language",
                    professor: "Dr.Deepak Kumar Singh",
                    time: "11:20 AM - 01:00 PM",
                    room: "SC-05"
                },
                {
                    subject: "Natural Language Processing",
                    professor: "Mr.Ramakant Ganjeshwar",
                    time: "01:00 PM - 01:50 PM",
                    room: "SC-05"
                },
                {
                    subject: "CLUB ACTIVITY SPORTS",
                    professor: "..",
                    time: "02:40 PM - 05:10 PM",
                    room: "DS-LAB"
                },
            ]
        },
        '6': {
            Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: []
        },
        '7': {
            Monday: [
                {
                    subject: "DW",
                    professor: "Mrs.Thaneshwari Sahu",
                    time: "10:30 AM - 11:20 AM",
                    room: "SC-02"
                },
                {
                    subject: "IP",
                    professor: "Mr.Ramakant Ganjeshwer",
                    time: "11:20 AM - 12:10 PM",
                    room: "SC-02"
                },
                {
                    subject: "BDA-Lab",
                    professor: "Mrs.K.Vibhooti Rajkumar",
                    time: "12:10 PM - 1:50 PM",
                    room: "Lab-01"
                },
                {
                    subject: "BDA",
                    professor: "Mrs.K.Vibhooti Rajkumar",
                    time: "2:40 PM - 3:30 PM",
                    room: "SC-02"
                },
                {
                    subject: "MIS",
                    professor: "NPTEL",
                    time: "3:30 PM - 5:10 PM",
                    room: "SC-02"
                },
            ],
            Tuesday: [
                {
                    subject: "BDA",
                    professor: "Mrs.K.Vibhooti Rajkumar",
                    time: "10:30 AM - 11:20 AM",
                    room: "SC-02"
                },
                {
                    subject: "SE",
                    professor: "Ms.Basanti Minj",
                    time: "11:20 AM - 12:10 PM",
                    room: "SC-02"
                },
                {
                    subject: "SE-Lab",
                    professor: "Ms.Basanti Minj",
                    time: "12:10 PM - 1:50 PM",
                    room: "Lab-01"
                },
                {
                    subject: "DW",
                    professor: "Mrs.Thaneshwari Sahu",
                    time: "2:40 PM - 3:30 PM",
                    room: "SC-02"
                },
                {
                    subject: "AGT",
                    professor: "NPTEL",
                    time: "3:30 PM - 5:10 PM",
                    room: "SC-02"
                },
            ],
            Wednesday: [
                {
                    subject: "DW",
                    professor: "Mrs.Thaneshwari Sahu",
                    time: "10:30 AM - 12:20 AM",
                    room: "SC-02"
                },
                {
                    subject: "IP",
                    professor: "Mr.Ramakant Ganjeshwer",
                    time: "11:20 AM - 12:10 PM",
                    room: "SC-02"
                },
                {
                    subject: "SE",
                    professor: "Ms.Basanti Minj",
                    time: "12:10 PM - 1:50 PM",
                    room: "SC-02"
                },
                {
                    subject: "PT",
                    professor: "Dr.Toran Verma",
                    time: "2:40 PM - 4:20 PM",
                    room: "SC-02"
                },
                
                {
                    subject: "LIB",
                    professor: "",
                    time: "12:10 PM - 1:50 PM",
                    room: "LIB"
                },
            ],
            Thursday: [
                {
                    subject: "IP",
                    professor: "Mr.Ramakant Ganjeshwer",
                    time: "10:30 AM - 12:10 PM",
                    room: "SC-02"
                },
                {
                    subject: "BDA",
                    professor: "Mrs.K.Vibhooti Rajkumar",
                    time: "12:10 PM - 1:00 PM",
                    room: "SC-02"
                },
                {
                    subject: "DW",
                    professor: "Mrs.Thaneshwari Sahu",
                    time: "1:00 PM - 1:50 PM",
                    room: "SC-02"
                },
                {
                    subject: "SE",
                    professor: "Ms.Basanti Minj",
                    time: "2:40 PM - 3:30 PM",
                    room: "SC-02"
                },
                {
                    subject: "AGT",
                    professor: "NPTEL",
                    time: "3:30 PM - 4:20 PM",
                    room: "SC-02"
                },
                {
                    subject: "MIS",
                    professor: "NPTEL",
                    time: "4:20 PM - 5:10 PM",
                    room: "SC-02"
                },
            ],
            Friday: [
                {
                    subject: "BDA",
                    professor: "Mrs.K.Vibhooti Rajkumar",
                    time: "10:30 AM - 11:20 AM",
                    room: "SC-02"
                },
                {
                    subject: "SE",
                    professor: "Ms.Basanti Minj",
                    time: "11:20 AM - 12:10 PM",
                    room: "SC-02"
                },
                {
                    subject: "MIS",
                    professor: "NPTEL",
                    time: "12:20 PM - 1:00 PM",
                    room: "SC-02"
                },
                {
                    subject: "AGT",
                    professor: "NPTEL",
                    time: "1:00 PM - 1:50 PM",
                    room: "SC-02"
                },
                
                {
                    subject: "BDA-Lab",
                    professor: "Mrs.K.Vibhooti Rajkumar",
                    time: "12:10 PM - 1:50 PM",
                    room: "Lab-01"
                },
                {
                    subject: "SPORT",
                    professor: "",
                    time: "4:20 PM - 5:10 PM",
                    room: ""
                },
               
                
            ],
            Saturday: [
                {
                    subject: "TCS",
                    professor: "Mr.Ashish Sharma",
                    time: "10:30 AM - 12:10 PM",
                    room: "SC-02"
                },
              
                {
                    subject: "MIS",
                    professor: "NPTEL",
                    time: "12:20 PM - 1:00 PM",
                    room: "SC-02"
                },
                {
                    subject: "AGT",
                    professor: "NPTEL",
                    time: "1:00 PM - 1:50 PM",
                    room: "SC-02"
                },
                
              
                {
                    subject: "Club Activity",
                    professor: "",
                    time: "2:40 PM - 5:10 PM",
                    room: ""
                },
               
                
            ],
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
