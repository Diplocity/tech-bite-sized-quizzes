
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 py-8 border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="text-gray-600">
          💖 Enjoying the quizzes?{' '}
          <a
            href="https://ko-fi.com/acewise"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 underline font-medium transition-colors duration-200"
          >
            Buy me a coffee
          </a>
          {' '}to support future development!
        </p>
      </div>
    </footer>
  );
};

export default Footer;
