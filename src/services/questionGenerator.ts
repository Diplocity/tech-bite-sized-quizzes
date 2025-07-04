import type { Question, Topic, Difficulty } from '@/types/quiz';

// Mock question database - in a real app, this would be generated by AI
const questionBank: Partial<Record<Topic, Partial<Record<Difficulty, Question[]>>>> = {
  Python: {
    Beginner: [
      {
        id: '1',
        question: 'What is the correct way to create a list in Python?',
        options: ['list = []', 'list = ()', 'list = {}', 'list = ""'],
        correctAnswer: 'list = []',
        explanation: 'Lists in Python are created using square brackets []. Parentheses () create tuples, curly braces {} create dictionaries or sets, and quotes "" create strings.',
        topic: 'Python',
        difficulty: 'Beginner'
      },
      {
        id: '2',
        question: 'Which of the following is used to add an element to the end of a list?',
        options: ['add()', 'append()', 'insert()', 'extend()'],
        correctAnswer: 'append()',
        explanation: 'The append() method adds a single element to the end of a list. insert() adds at a specific position, extend() adds multiple elements, and add() is used for sets.',
        topic: 'Python',
        difficulty: 'Beginner'
      },
      {
        id: '3',
        question: 'What does the len() function return?',
        options: ['The last element', 'The first element', 'The number of elements', 'The sum of elements'],
        correctAnswer: 'The number of elements',
        explanation: 'The len() function returns the number of items (length) in an object like a string, list, tuple, or dictionary.',
        topic: 'Python',
        difficulty: 'Beginner'
      }
    ],
    Intermediate: [
      {
        id: '4',
        question: 'What is a Python decorator?',
        options: ['A design pattern', 'A function that modifies another function', 'A data structure', 'A built-in module'],
        correctAnswer: 'A function that modifies another function',
        explanation: 'A decorator is a function that takes another function as an argument and extends or modifies its behavior without explicitly modifying the function itself.',
        topic: 'Python',
        difficulty: 'Intermediate'
      },
      {
        id: '5',
        question: 'Which method is used to handle exceptions in Python?',
        options: ['catch-finally', 'try-except', 'handle-error', 'exception-catch'],
        correctAnswer: 'try-except',
        explanation: 'Python uses try-except blocks to handle exceptions. Code that might raise an exception goes in the try block, and exception handling code goes in the except block.',
        topic: 'Python',
        difficulty: 'Intermediate'
      }
    ]
  },
  JavaScript: {
    Beginner: [
      {
        id: '6',
        question: 'How do you declare a variable in JavaScript?',
        options: ['var x;', 'variable x;', 'v x;', 'declare x;'],
        correctAnswer: 'var x;',
        explanation: 'Variables in JavaScript can be declared using var, let, or const keywords. var is the traditional way, though let and const are preferred in modern JavaScript.',
        topic: 'JavaScript',
        difficulty: 'Beginner'
      },
      {
        id: '7',
        question: 'What does the === operator do in JavaScript?',
        options: ['Assignment', 'Loose equality', 'Strict equality', 'Not equal'],
        correctAnswer: 'Strict equality',
        explanation: 'The === operator performs strict equality comparison, checking both value and type. It does not perform type coercion like the == operator.',
        topic: 'JavaScript',
        difficulty: 'Beginner'
      }
    ]
  },
  Git: {
    Beginner: [
      {
        id: '8',
        question: 'What command is used to initialize a new Git repository?',
        options: ['git start', 'git init', 'git create', 'git new'],
        correctAnswer: 'git init',
        explanation: 'The "git init" command creates a new Git repository in the current directory, setting up the necessary .git folder and initial structure.',
        topic: 'Git',
        difficulty: 'Beginner'
      },
      {
        id: '9',
        question: 'Which command shows the current status of your Git repository?',
        options: ['git show', 'git status', 'git info', 'git state'],
        correctAnswer: 'git status',
        explanation: 'The "git status" command displays the state of the working directory and staging area, showing which files are modified, staged, or untracked.',
        topic: 'Git',
        difficulty: 'Beginner'
      }
    ]
  }
};

export const generateQuestions = async (topic: Topic, difficulty: Difficulty): Promise<Question[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const allDifficulties: Difficulty[] = ['Beginner', 'Intermediate', 'Advanced'];
  const mixedQuestions: Question[] = [];
  
  // Get questions from the selected topic across all difficulties
  const topicQuestions = questionBank[topic];
  if (topicQuestions) {
    for (const diff of allDifficulties) {
      const difficultyQuestions = topicQuestions[diff] || [];
      mixedQuestions.push(...difficultyQuestions);
    }
  }
  
  // If we have enough questions, shuffle and return 7
  if (mixedQuestions.length >= 7) {
    const shuffled = [...mixedQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 7);
  }
  
  // Otherwise, generate fallback questions with mixed difficulties
  return generateMixedFallbackQuestions(topic, difficulty);
};

const generateMixedFallbackQuestions = (topic: Topic, baseDifficulty: Difficulty): Question[] => {
  const difficulties: Difficulty[] = ['Beginner', 'Intermediate', 'Advanced'];
  const questions: Question[] = [];
  
  for (let i = 0; i < 7; i++) {
    const difficulty = difficulties[i % 3]; // Cycle through difficulties
    questions.push({
      id: `fallback-${topic}-${difficulty}-${i + 1}`,
      question: `What is a key ${difficulty.toLowerCase()} concept in ${topic}?`,
      options: [
        difficulty === 'Beginner' ? 'Basic syntax and structure' : 
        difficulty === 'Intermediate' ? 'Advanced patterns and practices' : 
        'Enterprise architecture and optimization',
        'Legacy system integration',
        'Third-party tool configuration',
        'Documentation standards'
      ],
      correctAnswer: difficulty === 'Beginner' ? 'Basic syntax and structure' : 
                    difficulty === 'Intermediate' ? 'Advanced patterns and practices' : 
                    'Enterprise architecture and optimization',
      explanation: `Understanding ${difficulty.toLowerCase()} concepts in ${topic} is essential for building expertise in this technology.`,
      topic,
      difficulty
    });
  }
  
  return questions;
};
