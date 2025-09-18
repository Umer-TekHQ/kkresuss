import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export const defaultScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'slide_from_left', 
  animationTypeForReplace: 'pop',
  gestureEnabled: true,
  contentStyle: {
    backgroundColor: '#000000',
  },
};
