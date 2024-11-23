'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';

interface BranchSelectionProps {
  setSelectedBranch: (branch: string | null) => void;
  setSelectedSemester: (semester: string | null) => void;
  onSubmit: () => void;
}

export default function Home() {
  const [branch, setBranch] = useState<string | null>(null);
  const [semester, setSemester] = useState<string | null>(null);
  const router = useRouter();

  // Add check for existing selection
  useEffect(() => {
    const savedBranch = getCookie('selectedBranch');
    const savedSemester = getCookie('selectedSemester');
    
    if (savedBranch && savedSemester) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleSubmit = () => {
    // You can add any additional logic here when form is submitted
    console.log('Form submitted with:', { branch, semester });
    router.push('/dashboard');
  };

  return (
    <BranchSelection
      setSelectedBranch={setBranch}
      setSelectedSemester={setSemester}
      onSubmit={handleSubmit}
    />
  );
}

export function BranchSelection({ setSelectedBranch, setSelectedSemester, onSubmit }: BranchSelectionProps) {
  const { user } = useUser();
  const [selectedBranch, localSetSelectedBranch] = useState<string | null>(null);
  const [selectedSemester, localSetSelectedSemester] = useState<string | null>(null);
  const router = useRouter();

  const branches = [
    { id: 'ai', name: 'AI' },
    { id: 'ds', name: 'DS' },
  ];

  const semesters = [
    { id: '1st', name: '1st' },
    { id: '3rd', name: '3rd' },
    { id: '5th', name: '5th' },
    { id: '7th', name: '7th' },
  ];

  const handleSubmit = () => {
    if (selectedBranch && selectedSemester) {
      document.cookie = `selectedBranch=${selectedBranch};path=/;max-age=31536000`;
      document.cookie = `selectedSemester=${selectedSemester};path=/;max-age=31536000`;
      
      setSelectedBranch(selectedBranch);
      setSelectedSemester(selectedSemester);
      
      toast({
        title: "Selection Submitted",
        description: `Branch: ${selectedBranch}, Semester: ${selectedSemester}`,
      });
      
      onSubmit();
      
      router.push('/dashboard');
    } else {
      toast({
        title: "Incomplete Selection",
        description: "Please select both a branch and a semester.",
        variant: "destructive",
      });
    }
  };

  console.log(setSelectedBranch);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-2xl mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold tracking-tight">
            Welcome {user ? user.firstName : "User!"}!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4 text-center">Select your Branch</h2>
            <div className="grid grid-cols-2 gap-4">
              {branches.map((branch) => (
                <Button
                  key={branch.id}
                  onClick={() => localSetSelectedBranch(branch.id)}
                  variant={selectedBranch === branch.id ? "default" : "secondary"}
                  className={`p-6 text-lg font-medium h-24 transition-all duration-200 transform hover:scale-105 ${selectedBranch === branch.id ? 'shadow-lg scale-105' : 'hover:shadow-md'}`}
                >
                  {branch.name}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4 text-center">Select your semester</h2>
            <div className="grid grid-cols-2 gap-4">
              {semesters.map((semester) => (
                <Button
                  key={semester.id}
                  onClick={() => localSetSelectedSemester(semester.id)}
                  variant={selectedSemester === semester.id ? "default" : "secondary"}
                  className={`p-6 text-lg font-medium h-24 transition-all duration-200 transform hover:scale-105 ${selectedSemester === semester.id ? 'shadow-lg scale-105' : 'hover:shadow-md'}`}
                >
                  {semester.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleSubmit} 
            className="w-full py-6 text-lg font-medium"
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(';').shift();
    return cookieValue ?? null;
  }
  
  return null;
}