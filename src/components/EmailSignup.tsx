
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trackEvent } from '@/utils/analytics';

const EmailSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSectionView = () => {
    trackEvent('email_section_viewed');
  };

  React.useEffect(() => {
    handleSectionView();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    
    setIsSubmitting(true);
    
    // Store email in localStorage
    localStorage.setItem('userEmail', email);
    
    // Track the email submission
    trackEvent('email_submitted', { email_domain: email.split('@')[1] });
    
    // Simulate a brief loading state
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
    }, 500);
  };

  const isValidEmail = email.includes('@') && email.length > 3;

  if (isSubmitted) {
    return (
      <Card className="border-0 shadow-xl bg-gradient-to-r from-green-50 to-blue-50 backdrop-blur-sm">
        <CardContent className="px-8 py-12 text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank you!</h3>
          <p className="text-gray-600">
            We'll keep track of your quiz progress and send you weekly challenges.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-50 to-purple-50 backdrop-blur-sm">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
          <span>🚀</span>
          Track Your Progress & Get Weekly Tech Quizzes!
        </CardTitle>
        <p className="text-gray-600 text-base mt-2">
          Want to see how you're doing and receive fresh challenges every week? Drop your email below.
        </p>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              required
            />
            <Button
              type="submit"
              disabled={!isValidEmail || isSubmitting}
              className="h-12 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 disabled:hover:scale-100 transition-all duration-200"
            >
              {isSubmitting ? 'Submitting...' : 'Get Started'}
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">
            We respect your privacy. No spam, unsubscribe anytime.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default EmailSignup;
