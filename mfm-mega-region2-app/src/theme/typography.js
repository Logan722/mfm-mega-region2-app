import { Platform } from 'react-native';

// Typography
export const Fonts = {
  // We use system fonts initially; swap to custom fonts via expo-font later
  heading: Platform.select({
    ios: 'Georgia',
    android: 'serif',
  }),
  body: Platform.select({
    ios: 'System',
    android: 'Roboto',
  }),
  mono: Platform.select({
    ios: 'Menlo',
    android: 'monospace',
  }),
};

export const FontSizes = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  '2xl': 30,
  '3xl': 36,
  '4xl': 48,
};

export const FontWeights = {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  heavy: '800',
};

export const LineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.7,
};

// Spacing scale (4px base)
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
};

// Border radius
export const Radius = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  full: 999,
};
