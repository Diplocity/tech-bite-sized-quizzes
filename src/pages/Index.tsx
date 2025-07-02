
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import TopicSelector from '@/components/TopicSelector';
import QuizQuestion from '@/components/QuizQuestion';
import Footer from '@/components/Footer';
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
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto p-6">
          <Card className="mb-8 border-0 shadow-xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl font-bold text-gray-900">Quiz Results</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                {selectedTopic} - Mixed Difficulty Levels
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-8">
                <div className="text-6xl font-bold text-blue-600 mb-2">
                  {percentage}%
                </div>
                <div className="text-xl text-gray-600">
                  {score} out of {questions.length} correct
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                {questions.map((question, index) => (
                  <Card key={index} className={`border-l-4 transform hover:scale-[1.01] transition-all duration-200 ${
                    userAnswers[index] === question.correctAnswer 
                      ? 'border-l-green-500 bg-green-50 shadow-md' 
                      : 'border-l-red-500 bg-red-50 shadow-md'
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
                        <span className="inline-block mt-2 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                          {question.difficulty}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <Button onClick={resetQuiz} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
                Take Another Quiz
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  if (questions.length > 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto p-6">
          <div className="mb-6">
            <Button
              onClick={resetQuiz}
              variant="outline"
              className="flex items-center gap-2 hover:bg-gray-50 hover:border-blue-400 hover:shadow-md hover:scale-105 transition-all duration-200"
            >
              <ArrowLeft size={16} />
              Back to Menu
            </Button>
          </div>
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
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center mb-16 py-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Sharpen Your Tech Skills with Smart AI Quizzes
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-10 leading-relaxed">
            Practice Git, Python, JavaScript, Linux, and more in fast, focused quizzes. 
            Each session delivers real-world questions to help you prep for interviews or boost daily knowledge.
          </p>
          <Button
            onClick={() => document.getElementById('topic-selector')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            🔥 Try a Free Quiz
          </Button>
        </div>

        {/* Topic Selector */}
        <Card id="topic-selector" className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl font-bold text-gray-900">Choose Your Challenge</CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Select a topic and difficulty level to generate 7 personalized questions with mixed difficulty levels
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
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-8 py-3 text-lg rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 disabled:hover:scale-100 transition-all duration-200"
              >
                {isLoading ? 'Generating Questions...' : 'Start Quiz'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-gray-500 mt-8">
          <p>Questions are generated using AI to provide fresh content every time!</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
