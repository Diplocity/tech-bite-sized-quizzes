
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { Question } from '@/types/quiz';

interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: string | undefined;
  onAnswerSelect: (answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLastQuestion: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  isLastQuestion,
}) => {
  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="text-lg text-gray-600 mb-4 font-medium">
          Question {questionNumber} of {totalQuestions}
        </div>
        <Progress value={progress} className="w-full max-w-md mx-auto h-2" />
      </div>

      <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm transform perspective-1000 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
        <CardHeader className="pb-6 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-t-lg"></div>
          <CardTitle className="text-2xl text-gray-900 leading-relaxed relative z-10">
            {question.question}
          </CardTitle>
          <div className="absolute top-4 right-4 text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
            {question.difficulty}
          </div>
        </CardHeader>
        <CardContent className="relative">
          <div className="space-y-4 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onAnswerSelect(option)}
                className={`w-full p-6 text-left rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 ${
                  selectedAnswer === option
                    ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-100/50 scale-[1.01]'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-lg shadow-md'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-200 ${
                    selectedAnswer === option
                      ? 'border-blue-500 bg-blue-500 shadow-md'
                      : 'border-gray-300 hover:border-blue-400'
                  }`}>
                    {selectedAnswer === option && (
                      <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
                    )}
                  </div>
                  <span className="text-gray-900 text-lg">{option}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <Button
              onClick={onPrevious}
              disabled={!canGoPrevious}
              variant="outline"
              className="px-6 py-3 rounded-xl border-2 hover:border-blue-400 hover:shadow-md hover:scale-105 transition-all duration-200 disabled:hover:scale-100"
            >
              Previous
            </Button>
            
            <Button
              onClick={onNext}
              disabled={!canGoNext}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 disabled:hover:scale-100 disabled:bg-gray-400"
            >
              {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizQuestion;
