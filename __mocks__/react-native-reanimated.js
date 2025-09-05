// __mocks__/react-native-reanimated.js
const Reanimated = {
  // Worklets
  runOnJS: (fn) => fn,
  runOnUI: (fn) => fn,

  // Shared values
  useSharedValue: (init) => ({ value: init }),
  useAnimatedStyle: (fn) => fn(),
  useAnimatedScrollHandler: () => ({}),
  useDerivedValue: (fn) => ({ value: fn() }),
  withTiming: (val) => val,
  withSpring: (val) => val,
  withDecay: (val) => val,

  // Animations
  Easing: {
    linear: jest.fn(),
    ease: jest.fn(),
    in: jest.fn(),
    out: jest.fn(),
    inOut: jest.fn(),
  },
};

module.exports = Reanimated;
