import React, { useState } from 'react';
import { Button } from './button1';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { createWorker } from 'tesseract.js';
import { BranchSchedule } from '@/data/timetableData';

interface TimetableImageUploadProps {
    selectedBranch: string | null;
    selectedSemester: string | null;
    onUpload: (data: BranchSchedule) => void;
}

export function TimetableImageUpload({ selectedBranch, selectedSemester, onUpload }: TimetableImageUploadProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [lastProcessedText, setLastProcessedText] = useState('');

    const parseRecognizedText = (text: string) => {
        // Split text into lines and remove empty lines
        const lines = text.split('\n').filter(line => line.trim());
        console.log('Processing lines:', lines);
        
        // Initialize timetable structure
        const timetable: { [key: string]: any[] } = {
            'Monday': [],
            'Tuesday': [],
            'Wednesday': [],
            'Thursday': [],
            'Friday': [],
        };

        let currentDay = '';
        
        // Process each line
        lines.forEach((line, index) => {
            const cleanLine = line.trim().toUpperCase();
            console.log(`Line ${index}:`, cleanLine);
            
            // Check if line contains a day
            const dayMatches = {
                'Monday': ['MONDAY', 'MON', 'MOND', 'M'],
                'Tuesday': ['TUESDAY', 'TUE', 'TUES', 'T'],
                'Wednesday': ['WEDNESDAY', 'WED', 'WEDS', 'W'],
                'Thursday': ['THURSDAY', 'THU', 'THUR', 'THURS', 'TH'],
                'Friday': ['FRIDAY', 'FRI', 'F']
            };

            // Try to find a day match
            let foundDay = false;
            for (const [day, patterns] of Object.entries(dayMatches)) {
                if (patterns.some(pattern => cleanLine.includes(pattern))) {
                    currentDay = day;
                    foundDay = true;
                    console.log('Found day:', currentDay);
                    break;
                }
            }

            // If this line is not a day name, and we have a current day, try to extract subject
            if (!foundDay && currentDay) {
                // Remove common non-subject text
                const skipWords = ['TIME', 'BREAK', 'LUNCH', 'AM', 'PM', 'THE', 'AND', 'FOR', 'TO', 'OF', 'IN', 'AT'];
                
                // Clean the line more aggressively
                let processedLine = cleanLine
                    .replace(/[0-9:]/g, '') // Remove numbers and colons
                    .replace(/[^A-Z\s]/g, ' ') // Keep only letters and spaces
                    .replace(/\s+/g, ' ') // Normalize spaces
                    .trim();
                
                // Split into words and filter out common words
                const words = processedLine.split(' ').filter(word => 
                    word.length > 1 && !skipWords.includes(word)
                );
                
                // Join remaining words to form subject name
                const subject = words.join(' ').trim();
                
                if (subject.length >= 2) {
                    console.log(`Found potential subject for ${currentDay}:`, subject);
                    
                    // Add the subject to the current day's schedule
                    const timeSlots = [
                        '9:00 AM - 10:00 AM',
                        '10:00 AM - 11:00 AM',
                        '11:00 AM - 12:00 PM',
                        '12:00 PM - 1:00 PM',
                        '2:00 PM - 3:00 PM',
                        '3:00 PM - 4:00 PM',
                        '4:00 PM - 5:00 PM'
                    ];
                    
                    const currentDaySchedule = timetable[currentDay];
                    const timeSlotIndex = currentDaySchedule.length;
                    
                    if (timeSlotIndex < timeSlots.length) {
                        const subjectEntry = {
                            subject: subject,
                            time: timeSlots[timeSlotIndex],
                            room: 'Room TBD',
                            professor: 'Professor TBD'
                        };
                        console.log(`Adding subject to ${currentDay}:`, subjectEntry);
                        timetable[currentDay].push(subjectEntry);
                    }
                }
            }
        });

        // Log the contents of each day
        Object.entries(timetable).forEach(([day, subjects]) => {
            console.log(`${day} schedule:`, subjects);
        });

        return timetable;
    };

    const processImage = async (file: File) => {
        setIsProcessing(true);
        setError(null);
        setLastProcessedText('');

        try {
            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);

            // Initialize Tesseract worker with improved settings
            const worker = await createWorker();
            await worker.loadLanguage('eng');
            await worker.initialize('eng');
            
            // Set parameters for better text recognition
            await worker.setParameters({
                tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 -',
                preserve_interword_spaces: '1',
                tessedit_pageseg_mode: '6', // Assume uniform text block
                tessedit_ocr_engine_mode: '3', // Use LSTM neural network
            });

            // Recognize text from image with progress logging
            console.log('Starting OCR processing...');
            const result = await worker.recognize(file);
            console.log('OCR Confidence:', result.data.confidence);
            console.log('Raw OCR text:', result.data.text);
            
            // Split text into lines for debugging
            const lines = result.data.text.split('\n');
            console.log('Text lines:', lines);
            
            await worker.terminate();

            if (!selectedBranch || !selectedSemester) {
                throw new Error('Please select a branch and semester first');
            }

            // Parse the recognized text into timetable format
            const timetableData = parseRecognizedText(result.data.text);

            // Create the nested structure for the timetable
            const newTimetable = {
                [selectedBranch]: {
                    [selectedSemester]: timetableData
                }
            };

            console.log('Final structure:', JSON.stringify(newTimetable, null, 2));

            // Save to localStorage
            localStorage.setItem('userTimetable', JSON.stringify(newTimetable));

            // Notify parent component
            onUpload(newTimetable);

            setIsOpen(false);
            setError(null);
            setLastProcessedText(result.data.text);
        } catch (err) {
            console.error('Error processing image:', err);
            setError(err instanceof Error ? err.message : 'Failed to process timetable image');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Check if file is an image
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file');
            return;
        }

        processImage(file);
    };

    return (
        <div>
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-purple-500 hover:bg-purple-600 text-white mb-4"
            >
                <ImageIcon className="w-4 h-4 mr-2" />
                Upload Timetable Image
            </Button>

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Upload Timetable Image</h3>
                            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    id="timetable-image-upload"
                                />
                                <label
                                    htmlFor="timetable-image-upload"
                                    className="cursor-pointer flex flex-col items-center space-y-2"
                                >
                                    {preview ? (
                                        <img 
                                            src={preview} 
                                            alt="Timetable preview" 
                                            className="max-h-48 object-contain"
                                        />
                                    ) : (
                                        <>
                                            <ImageIcon className="w-8 h-8 text-gray-400" />
                                            <span className="text-sm text-gray-500">Click to upload image</span>
                                        </>
                                    )}
                                </label>
                            </div>

                            {isProcessing && (
                                <div className="text-center py-2">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
                                    <p className="text-sm text-gray-500 mt-2">Processing image...</p>
                                </div>
                            )}

                            {error && (
                                <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
                                    {error}
                                </div>
                            )}

                            <div className="text-sm text-gray-500">
                                <p className="font-semibold mb-2">Image Requirements:</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    <li>Clear, readable text</li>
                                    <li>Days of the week clearly visible</li>
                                    <li>Subject names under each day</li>
                                    <li>Good contrast between text and background</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            {/* Debug output */}
            <div className="mt-4 text-sm text-gray-600">
                <p>Last processed text:</p>
                <pre className="bg-gray-100 p-2 rounded mt-1 text-xs overflow-auto max-h-40">
                    {lastProcessedText}
                </pre>
            </div>
        </div>
    );
}
