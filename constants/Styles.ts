import { Platform, StyleSheet } from 'react-native';
import Colors from './Colors';

// Typography
export const Typography = {
  // Headings
  h1: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    color: Colors.text,
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    color: Colors.text,
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: Colors.text,
    lineHeight: 32,
  },
  h4: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: Colors.text,
    lineHeight: 28,
  },
  h5: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: Colors.text,
    lineHeight: 26,
  },
  h6: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: Colors.text,
    lineHeight: 24,
  },

  // Body Text
  body1: {
    fontSize: 16,
    fontWeight: 'normal' as const,
    color: Colors.text,
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    fontWeight: 'normal' as const,
    color: Colors.text,
    lineHeight: 20,
  },
  body3: {
    fontSize: 12,
    fontWeight: 'normal' as const,
    color: Colors.textSoft,
    lineHeight: 18,
  },

  // Caption
  caption: {
    fontSize: 12,
    fontWeight: 'normal' as const,
    color: Colors.textSoft,
    lineHeight: 16,
  },

  // Button Text
  button: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: Colors.buttonText,
    lineHeight: 24,
  },
  buttonSmall: {
    fontSize: 14,
    fontWeight: 'bold' as const,
    color: Colors.buttonText,
    lineHeight: 20,
  },
};

// Spacing
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border Radius
export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  round: 50,
};

// Shadows
export const Shadows = {
  small: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    android: {
      elevation: 2,
    },
  }),
  medium: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: 4,
    },
  }),
  large: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    android: {
      elevation: 8,
    },
  }),
};

// Common Components
export const CommonStyles = StyleSheet.create({
  // Container
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  // Safe Area Container
  safeContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    ...Shadows.small,
  },

  // Card
  card: {
    backgroundColor: 'white',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.medium,
  },

  // Section
  section: {
    backgroundColor: 'white',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.medium,
  },

  // Input
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    fontSize: 16,
    backgroundColor: 'white',
    color: Colors.text,
  },

  // Button
  button: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.small,
  },

  buttonDisabled: {
    backgroundColor: Colors.textSoft,
  },

  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Label
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },

  // Row
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // Center
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Text Center
  textCenter: {
    textAlign: 'center',
  },

  // Separator
  separator: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.sm,
  },

  // Badge
  badge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.round,
  },

  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },

  // Empty State
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },

  emptyStateText: {
    ...Typography.body2,
    color: Colors.textSoft,
    textAlign: 'center',
    marginTop: Spacing.md,
  },

  // Loading
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Footer
  footer: {
    backgroundColor: 'white',
    padding: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    ...Shadows.medium,
  },

  // Scroll Container
  scrollContainer: {
    flexGrow: 1,
    padding: Spacing.md,
  },

  // Modal
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },

  modalContainer: {
    backgroundColor: 'white',
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    margin: Spacing.lg,
    maxHeight: '80%',
    ...Shadows.large,
  },
});

// Form Styles
export const FormStyles = StyleSheet.create({
  formContainer: {
    padding: Spacing.md,
  },

  formSection: {
    marginBottom: Spacing.lg,
  },

  formSectionTitle: {
    ...Typography.h5,
    marginBottom: Spacing.md,
  },

  inputContainer: {
    marginBottom: Spacing.md,
  },

  inputRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },

  inputLabel: {
    ...Typography.body2,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },

  inputField: {
    ...CommonStyles.input,
  },

  inputError: {
    borderColor: Colors.error,
  },

  errorText: {
    ...Typography.caption,
    color: Colors.error,
    marginTop: Spacing.xs,
  },

  submitButton: {
    ...CommonStyles.button,
    marginTop: Spacing.lg,
  },

  submitButtonDisabled: {
    ...CommonStyles.buttonDisabled,
  },
});

// Flight Card Styles
export const FlightCardStyles = StyleSheet.create({
  card: {
    ...CommonStyles.card,
    marginBottom: Spacing.md,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },

  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  fromText: {
    ...Typography.h5,
  },

  toText: {
    ...Typography.h5,
  },

  planeIcon: {
    marginHorizontal: Spacing.sm,
    transform: [{ rotate: '45deg' }],
  },

  price: {
    ...Typography.h4,
    color: Colors.primary,
  },

  details: {
    marginBottom: Spacing.md,
  },

  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },

  detailText: {
    ...Typography.body2,
    color: Colors.textSoft,
    marginLeft: Spacing.xs,
  },

  technicalRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.sm,
  },

  technicalRouteText: {
    ...Typography.caption,
    marginLeft: Spacing.xs,
    fontStyle: 'italic',
  },

  separator: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.sm,
  },

  reservationButton: {
    ...CommonStyles.button,
    marginTop: Spacing.sm,
  },

  reservationButtonText: {
    ...Typography.button,
  },
});

export default {
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
  CommonStyles,
  FormStyles,
  FlightCardStyles,
}; 