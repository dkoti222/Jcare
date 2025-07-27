import { Platform } from 'react-native';

export const customFonts = {
  // Inter font family (same across platforms)
  interRegular: 'Inter-Regular',
  interMedium: 'Inter-Medium',
  interSemi_Bold: 'Inter-SemiBold',
  interBold: 'Inter-Bold',

  // Acta Display W01 - use correct PostScript name for iOS, Android fallback
  actaRegular: Platform.select({
    ios: 'ActaDisplayW01-Light',
    android: 'Acta Display W01 Light',
  }),
  actaMedium: Platform.select({
    ios: 'ActaDisplayW01-Book',
    android: 'Acta Display W01 Book',
  }),
  actaSemi_Bold: Platform.select({
    ios: 'ActaDisplayW01-MediumIt',
    android: 'Acta Display W01 Medium Italic', // Replace with actual Android name if needed
  }),
  actaBold: Platform.select({
    ios: 'ActaDisplayW01-Bold',
    android: 'Acta Display W01 Bold',
  }),
};
