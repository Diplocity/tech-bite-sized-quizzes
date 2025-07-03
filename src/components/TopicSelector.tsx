
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Topic, Difficulty } from '@/types/quiz';

interface TopicSelectorProps {
  selectedTopic: Topic | null;
  selectedDifficulty: Difficulty | null;
  onTopicSelect: (topic: Topic) => void;
  onDifficultySelect: (difficulty: Difficulty) => void;
}

const topics: { name: Topic; icon: string; color: string }[] = [
  { name: 'Python', icon: '🐍', color: 'bg-slate-100 hover:bg-slate-200 border-slate-300' },
  { name: 'JavaScript', icon: '🟨', color: 'bg-amber-50 hover:bg-amber-100 border-amber-200' },
  { name: 'Git', icon: '🔧', color: 'bg-orange-50 hover:bg-orange-100 border-orange-200' },
  { name: 'Linux', icon: '🐧', color: 'bg-gray-50 hover:bg-gray-100 border-gray-200' },
  { name: 'HTML/CSS', icon: '🎨', color: 'bg-rose-50 hover:bg-rose-100 border-rose-200' },
  { name: 'React', icon: '⚛️', color: 'bg-sky-50 hover:bg-sky-100 border-sky-200' },
  { name: 'Node.js', icon: '🟢', color: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200' },
  { name: 'SQL', icon: '🗄️', color: 'bg-violet-50 hover:bg-violet-100 border-violet-200' },
  { name: 'Docker', icon: '🐳', color: 'bg-cyan-50 hover:bg-cyan-100 border-cyan-200' },
  { name: 'AWS', icon: '☁️', color: 'bg-orange-50 hover:bg-orange-100 border-orange-200' },
];

const difficulties: { name: Difficulty; description: string; color: string }[] = [
  { name: 'Beginner', description: 'Basic concepts and fundamentals', color: 'bg-emerald-600' },
  { name: 'Intermediate', description: 'Practical applications and deeper understanding', color: 'bg-amber-600' },
  { name: 'Advanced', description: 'Complex scenarios and expert-level knowledge', color: 'bg-red-600' },
];

const TopicSelector: React.FC<TopicSelectorProps> = ({
  selectedTopic,
  selectedDifficulty,
  onTopicSelect,
  onDifficultySelect,
}) => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Select Topic</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {topics.map((topic) => (
            <Card
              key={topic.name}
              className={`cursor-pointer transition-all duration-200 ${topic.color} ${
                selectedTopic === topic.name
                  ? 'ring-2 ring-blue-500 shadow-lg transform scale-105'
                  : 'hover:shadow-md'
              }`}
              onClick={() => onTopicSelect(topic.name)}
            >
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">{topic.icon}</div>
                <div className="text-sm font-medium text-gray-800">{topic.name}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Select Difficulty</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {difficulties.map((difficulty) => (
            <Card
              key={difficulty.name}
              className={`cursor-pointer transition-all duration-200 ${
                selectedDifficulty === difficulty.name
                  ? 'ring-2 ring-blue-500 shadow-lg transform scale-105'
                  : 'hover:shadow-md'
              }`}
              onClick={() => onDifficultySelect(difficulty.name)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-800">{difficulty.name}</span>
                  <Badge className={`${difficulty.color} text-white`}>
                    {difficulty.name}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{difficulty.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicSelector;
