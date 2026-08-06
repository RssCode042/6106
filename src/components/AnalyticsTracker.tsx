import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initAnalytics, trackPageView } from '../lib/analytics';

export default function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    const fullPath = location.pathname + location.search + location.hash;
    trackPageView(fullPath);
  }, [location]);

  return null;
}
