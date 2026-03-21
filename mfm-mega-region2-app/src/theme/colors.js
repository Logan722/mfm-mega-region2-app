// MFM Mega Region 2 — Brand Colors
// Purple = Royal Priesthood (1 Peter 2:9)
// Fire/Orange = Baptism of Holy Ghost and Fire (Acts 2:1-4)
// Dark = Mountain of God's supremacy

export const Colors = {
  // Primary palette
  purple: '#6A0DAD',
  purpleDark: '#4A0778',
  purpleDeep: '#1A0533',
  purpleLight: '#9B4DCA',
  purpleMuted: '#E8D5F5',
  purpleSoft: '#F3E8FF',

  // Fire accent
  fire: '#E8530E',
  fireLight: '#FF7A3D',
  fireGlow: '#FFA726',
  fireDark: '#BF360C',

  // Gold accent (royalty)
  gold: '#D4A017',
  goldLight: '#F5D565',
  goldSoft: '#FFF8E1',

  // Neutrals
  white: '#FFFFFF',
  offWhite: '#FAF8FC',
  gray50: '#F8F6FA',
  gray100: '#F0ECF4',
  gray200: '#E0D8E8',
  gray300: '#C4B8D0',
  gray400: '#9E8FB0',
  gray500: '#6B5C7B',
  gray600: '#4A3D5C',
  gray700: '#332B42',
  gray800: '#1F1830',
  black: '#0D0A14',

  // Semantic
  success: '#2E7D32',
  successLight: '#E8F5E9',
  warning: '#F57F17',
  warningLight: '#FFF8E1',
  error: '#C62828',
  errorLight: '#FFEBEE',
  info: '#1565C0',
  infoLight: '#E3F2FD',

  // Overlays
  overlay: 'rgba(13, 10, 20, 0.6)',
  overlayLight: 'rgba(106, 13, 173, 0.08)',
};

export const Gradients = {
  purpleFire: ['#6A0DAD', '#E8530E'],
  purpleDeep: ['#1A0533', '#4A0778'],
  purpleGlow: ['#6A0DAD', '#9B4DCA'],
  fireGold: ['#E8530E', '#D4A017'],
  cardDark: ['#1A0533', '#2D1456'],
  headerPurple: ['#4A0778', '#6A0DAD'],
};

export const Shadows = {
  sm: {
    shadowColor: '#6A0DAD',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowColor: '#6A0DAD',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#6A0DAD',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
  },
  fire: {
    shadowColor: '#E8530E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
};
