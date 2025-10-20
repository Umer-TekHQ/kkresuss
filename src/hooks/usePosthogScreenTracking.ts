import { useEffect } from 'react';
import { useNavigationState } from '@react-navigation/native';
import posthog from 'posthog-react-native';

export function usePosthogScreenTracking() {
  const routeName = useNavigationState((state) => {
    const route = state.routes[state.index];
    return route.name;
  });

  useEffect(() => {
    if (routeName) {
      (posthog as any).capture('$screen', { screen_name: routeName });
        console.log('📊 PostHog captured screen:', routeName);

    }
  }, [routeName]);
}
