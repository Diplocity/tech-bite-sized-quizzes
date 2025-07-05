
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trackEvent } from '@/utils/analytics';

const EmailSignup: React.FC = () => {
  const handleFormLoad = () => {
    trackEvent('email_form_viewed');
  };

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
        <div className="max-w-2xl mx-auto">
          <iframe
            src="https://tally.so/embed/meOZjo?transparentBackground=1"
            width="100%"
            height="300"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="Email Signup Form"
            className="rounded-lg"
            onLoad={handleFormLoad}
          ></iframe>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmailSignup;
