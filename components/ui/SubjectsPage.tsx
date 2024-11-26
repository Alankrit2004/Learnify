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
      icon: "🤖",
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
            { id: "6", name: "Decision Trees", completed: false },
            { id: "7", name: "Neural Networks", completed: false },
          ],
        },
        {
          name: "Unsupervised Learning",
          topics: [
            { id: "8", name: "Clustering", completed: false },
            { id: "9", name: "Dimensionality Reduction", completed: false },
            { id: "10", name: "Anomaly Detection", completed: false },
          ],
        },
      ],
    },
    {
      title: "Natural Language Processing",
      color: "bg-blue-200",
      icon: "🌐",
      units: [
        {
          name: "Frontend Basics",
          topics: [
            { id: "11", name: "HTML Fundamentals", completed: false },
            { id: "12", name: "CSS Styling", completed: false },
            { id: "13", name: "JavaScript Basics", completed: false },
            { id: "14", name: "Responsive Design", completed: false },
          ],
        },
        {
          name: "Modern Frontend",
          topics: [
            { id: "15", name: "React Fundamentals", completed: false },
            { id: "16", name: "State Management", completed: false },
            { id: "17", name: "Next.js", completed: false },
          ],
        },
        {
          name: "Backend Development",
          topics: [
            { id: "18", name: "Node.js Basics", completed: false },
            { id: "19", name: "RESTful APIs", completed: false },
            { id: "20", name: "Database Integration", completed: false },
          ],
        },
      ],
    },
    {
      title: "Intelligent Data Analysis",
      color: "bg-green-200",
      icon: "📊",
      units: [
        {
          name: "Data Analysis",
          topics: [
            { id: "21", name: "Python for Data Science", completed: false },
            { id: "22", name: "Pandas", completed: false },
            { id: "23", name: "Data Visualization", completed: false },
          ],
        },
        {
          name: "Statistics",
          topics: [
            { id: "24", name: "Descriptive Statistics", completed: false },
            { id: "25", name: "Probability", completed: false },
            { id: "26", name: "Hypothesis Testing", completed: false },
          ],
        },
        {
          name: "Big Data",
          topics: [
            { id: "27", name: "Data Processing", completed: false },
            { id: "28", name: "Apache Spark", completed: false },
            { id: "29", name: "Data Warehousing", completed: false },
          ],
        },
      ],
    },
    {
      title: "Cryptography and Network Security",
      color: "bg-purple-200",
      icon: "🔢",
      units: [
        {
          name: "Calculus",
          topics: [
            { id: "30", name: "Limits and Continuity", completed: false },
            { id: "31", name: "Derivatives", completed: false },
            { id: "32", name: "Integration", completed: false },
          ],
        },
        {
          name: "Linear Algebra",
          topics: [
            { id: "33", name: "Vectors and Matrices", completed: false },
            { id: "34", name: "Eigenvalues", completed: false },
            { id: "35", name: "Linear Transformations", completed: false },
          ],
        },
        {
          name: "Discrete Mathematics",
          topics: [
            { id: "36", name: "Logic and Proofs", completed: false },
            { id: "37", name: "Graph Theory", completed: false },
            { id: "38", name: "Combinatorics", completed: false },
          ],
        },
      ],
    },
    {
      title: "MPIT",
      color: "bg-yellow-200",
      icon: "💻",
      units: [
        {
          name: "Programming Fundamentals",
          topics: [
            { id: "39", name: "Variables and Data Types", completed: false },
            { id: "40", name: "Control Structures", completed: false },
            { id: "41", name: "Functions and Methods", completed: false },
          ],
        },
        {
          name: "Data Structures",
          topics: [
            { id: "42", name: "Arrays and Lists", completed: false },
            { id: "43", name: "Trees and Graphs", completed: false },
            { id: "44", name: "Hash Tables", completed: false },
          ],
        },
        {
          name: "Algorithms",
          topics: [
            { id: "45", name: "Sorting Algorithms", completed: false },
            { id: "46", name: "Search Algorithms", completed: false },
            { id: "47", name: "Dynamic Programming", completed: false },
          ],
        },
      ],
    }
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
    setSubjects(prevSubjects => 
      prevSubjects.map((subject, sIndex) => {
        if (sIndex !== subjectIndex) return subject;
        
        return {
          ...subject,
          units: subject.units.map((unit, uIndex) => {
            if (uIndex !== unitIndex) return unit;
            
            return {
              ...unit,
              topics: unit.topics.map(topic => 
                topic.id === topicId 
                  ? { ...topic, completed: !topic.completed }
                  : topic
              )
            };
          })
        };
      })
    );
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
