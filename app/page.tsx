'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BranchSelection } from '@/components/ui/BranchSelection';

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null;
  return null;
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