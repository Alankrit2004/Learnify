'use client';

import { useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';

export default function TestOCR() {
    const [result, setResult] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const processImage = async () => {
            try {
                setLoading(true);
                const worker = await createWorker('eng');
                
                // Process the sample image
                const response = await fetch('/data/Screenshot 2024-11-23 185004.png');
                const blob = await response.blob();
                const result = await worker.recognize(blob);
                console.log('Raw OCR Result:', result.data.text);
                setResult(result.data.text);
                
                await worker.terminate();
                setLoading(false);
            } catch (err) {
                console.error('Error:', err);
                setError(err instanceof Error ? err.message : 'Failed to process image');
                setLoading(false);
            }
        };

        processImage();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">OCR Test Results</h1>
            
            {loading && <div>Processing image...</div>}
            
            {error && (
                <div className="text-red-500 mb-4">
                    Error: {error}
                </div>
            )}
            
            {result && (
                <div>
                    <h2 className="text-xl font-semibold mb-2">Extracted Text:</h2>
                    <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
                        {result}
                    </pre>
                </div>
            )}
        </div>
    );
}
