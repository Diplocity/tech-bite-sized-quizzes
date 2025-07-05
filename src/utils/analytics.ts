
import Plausible from 'plausible-tracker';

// Initialize Plausible with privacy-first settings
const plausible = Plausible({
  domain: window.location.hostname,
  trackLocalhost: false,
  apiHost: 'https://plausible.io'
});

// Enable automatic pageview tracking
plausible.enableAutoPageviews();

export const trackEvent = (eventName: string, props?: Record<string, any>) => {
  try {
    // Track with Plausible (privacy-focused)
    plausible.trackEvent(eventName, props);
    
    // Console log for debugging
    console.log('Analytics event:', eventName, props);
  } catch (error) {
    console.warn('Analytics tracking failed:', error);
  }
};

export const trackPageView = (page?: string) => {
  try {
    if (page) {
      plausible.trackPageview({ url: page });
    } else {
      plausible.trackPageview();
    }
  } catch (error) {
    console.warn('Page view tracking failed:', error);
  }
};

// Quiz-specific tracking functions
export const trackQuizStart = (topic: string, difficulty: string) => {
  trackEvent('quiz_started', { topic, difficulty });
};

export const trackQuizComplete = (topic: string, score: number, totalQuestions: number) => {
  trackEvent('quiz_completed', { 
    topic, 
    score, 
    total_questions: totalQuestions,
    percentage: Math.round((score / totalQuestions) * 100)
  });
};

export const trackTopicSelection = (topic: string) => {
  trackEvent('topic_selected', { topic });
};

export const trackDifficultySelection = (difficulty: string) => {
  trackEvent('difficulty_selected', { difficulty });
};
