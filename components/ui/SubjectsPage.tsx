'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Topic {
  id: string;
  name: string;
  completed: boolean;
}

interface Unit {
  name: string;
  topics: Topic[];
}

interface Subject {
  title: string;
  color: string;
  icon: string;
  units: Unit[];
}

export function SubjectsPage() {
  // This would come from your data store in a real app
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      title: "Machine Learning",
      color: "bg-red-200",
      icon: "🎍",
      units: [
        {
          name: "Introduction to ML",
          topics: [
            { id: "1", name: "What is Machine Learning", completed: false },
            { id: "2", name: "Types of ML", completed: false },
            { id: "3", name: "Applications of ML", completed: false },
          ],
        },
        {
          name: "Supervised Learning",
          topics: [
            { id: "4", name: "Linear Regression", completed: false },
            { id: "5", name: "Classification", completed: false },
          ],
        },
      ],
    },
    // Add more subjects here
  ]);

  const calculateProgress = (subject: Subject) => {
    const totalTopics = subject.units.reduce((acc, unit) => acc + unit.topics.length, 0);
    const completedTopics = subject.units.reduce(
      (acc, unit) => acc + unit.topics.filter(topic => topic.completed).length,
      0
    );
    return (completedTopics / totalTopics) * 100;
  };

  const toggleTopic = (subjectIndex: number, unitIndex: number, topicId: string) => {
    setSubjects(prevSubjects => {
      const newSubjects = [...prevSubjects];
      const unit = newSubjects[subjectIndex].units[unitIndex];
      const topic = unit.topics.find(t => t.id === topicId);
      if (topic) {
        topic.completed = !topic.completed;
      }
      return newSubjects;
    });
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {subjects.map((subject, subjectIndex) => (
        <Card key={subject.title} className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>{subject.icon}</span>
              {subject.title}
            </CardTitle>
            <div className="mt-2">
              <Progress value={calculateProgress(subject)} className="h-2" />
              <p className="text-sm text-gray-500 mt-1">
                {Math.round(calculateProgress(subject))}% Complete
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {subject.units.map((unit, unitIndex) => (
                <AccordionItem key={unit.name} value={unit.name}>
                  <AccordionTrigger>{unit.name}</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {unit.topics.map((topic) => (
                        <div key={topic.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={topic.id}
                            checked={topic.completed}
                            onCheckedChange={() => toggleTopic(subjectIndex, unitIndex, topic.id)}
                          />
                          <label
                            htmlFor={topic.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {topic.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
