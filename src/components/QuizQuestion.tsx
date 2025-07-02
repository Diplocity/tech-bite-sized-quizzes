
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

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl text-gray-900 leading-relaxed">
            {question.question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onAnswerSelect(option)}
                className={`w-full p-6 text-left rounded-xl border-2 transition-all duration-200 ${
                  selectedAnswer === option
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                    selectedAnswer === option
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswer === option && (
                      <div className="w-3 h-3 bg-white rounded-full"></div>
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
              className="px-6 py-3 rounded-xl"
            >
              Previous
            </Button>
            
            <Button
              onClick={onNext}
              disabled={!canGoNext}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
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
