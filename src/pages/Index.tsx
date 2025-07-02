
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TopicSelector from '@/components/TopicSelector';
import QuizQuestion from '@/components/QuizQuestion';
import { generateQuestions } from '@/services/questionGenerator';
import type { Question, Topic, Difficulty } from '@/types/quiz';

const Index = () => {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleStartQuiz = async () => {
    if (!selectedTopic || !selectedDifficulty) return;
    
    setIsLoading(true);
    try {
      const generatedQuestions = await generateQuestions(selectedTopic, selectedDifficulty);
      setQuestions(generatedQuestions);
      setCurrentQuestionIndex(0);
      setUserAnswers([]);
      setShowResults(false);
    } catch (error) {
      console.error('Error generating questions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const resetQuiz = () => {
    setSelectedTopic(null);
    setSelectedDifficulty(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowResults(false);
  };

  const calculateScore = () => {
    return userAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index]?.correctAnswer ? 1 : 0);
    }, 0);
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl text-blue-900">Quiz Results</CardTitle>
              <CardDescription className="text-lg">
                {selectedTopic} - {selectedDifficulty} Level
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-6">
                <div className="text-6xl font-bold text-blue-600 mb-2">
                  {percentage}%
                </div>
                <div className="text-xl text-gray-600">
                  {score} out of {questions.length} correct
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                {questions.map((question, index) => (
                  <Card key={index} className={`border-l-4 ${
                    userAnswers[index] === question.correctAnswer 
                      ? 'border-l-green-500 bg-green-50' 
                      : 'border-l-red-500 bg-red-50'
                  }`}>
                    <CardContent className="p-4">
                      <div className="text-left">
                        <p className="font-semibold mb-2">{question.question}</p>
                        <p className="text-sm">
                          <span className="font-medium">Your answer:</span> {userAnswers[index]}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Correct answer:</span> {question.correctAnswer}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                          <span className="font-medium">Explanation:</span> {question.explanation}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Button onClick={resetQuiz} className="bg-blue-600 hover:bg-blue-700">
                Take Another Quiz
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (questions.length > 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          <QuizQuestion
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            selectedAnswer={userAnswers[currentQuestionIndex]}
            onAnswerSelect={handleAnswerSelect}
            onNext={handleNextQuestion}
            onPrevious={handlePreviousQuestion}
            canGoNext={!!userAnswers[currentQuestionIndex]}
            canGoPrevious={currentQuestionIndex > 0}
            isLastQuestion={currentQuestionIndex === questions.length - 1}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-900 mb-4">
            IT Quiz Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Test your knowledge with AI-generated multiple choice questions. 
            Perfect for microlearning and interview preparation.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Choose Your Challenge</CardTitle>
            <CardDescription className="text-center">
              Select a topic and difficulty level to generate personalized questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TopicSelector
              selectedTopic={selectedTopic}
              selectedDifficulty={selectedDifficulty}
              onTopicSelect={setSelectedTopic}
              onDifficultySelect={setSelectedDifficulty}
            />
            
            <div className="text-center mt-8">
              <Button
                onClick={handleStartQuiz}
                disabled={!selectedTopic || !selectedDifficulty || isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              >
                {isLoading ? 'Generating Questions...' : 'Start Quiz'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-gray-500">
          <p>Questions are generated using AI to provide fresh content every time!</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
