import PostHog from 'posthog-react-native';

export const posthog = new PostHog(
  "phc_OlIt0hcMMBiyUUEmefyFySOFNiTFLS1hcHxheyWQG4F",
  {
    host: "https://us.i.posthog.com",
    enableSessionReplay: true,
  }
);
