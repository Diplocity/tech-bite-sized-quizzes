
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/xeokwkbq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (response.ok) {
        // Track the email submission
        trackEvent('email_submitted', { email_domain: email.split('@')[1] });
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValidEmail = email.includes('@') && email.length > 3;

  if (isSubmitted) {
    return (
      <div className="max-w-md mx-auto">
        <Card className="rounded-xl shadow-lg bg-white">
          <CardContent className="px-8 py-12 text-center">
            <div className="text-4xl mb-4">📬</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Thanks! You're now subscribed to weekly tech quizzes.</h3>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="rounded-xl shadow-lg bg-white">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-xl font-bold text-gray-900">
            Track Your Quiz Progress & Get Weekly Tech Challenges!
          </CardTitle>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 text-base rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              required
            />
            <Button
              type="submit"
              disabled={!isValidEmail || isSubmitting}
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              {isSubmitting ? 'Submitting...' : 'Get Started'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailSignup;
