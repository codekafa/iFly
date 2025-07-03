import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Colors from '../../constants/Colors';
import { BorderRadius, Shadows, Spacing, Typography } from '../../constants/Styles';

// Typography Components
export const Heading1 = ({ children, style, ...props }: any) => (
  <Text style={[Typography.h1, style]} {...props}>
    {children}
  </Text>
);

export const Heading2 = ({ children, style, ...props }: any) => (
  <Text style={[Typography.h2, style]} {...props}>
    {children}
  </Text>
);

export const Heading3 = ({ children, style, ...props }: any) => (
  <Text style={[Typography.h3, style]} {...props}>
    {children}
  </Text>
);

export const Heading4 = ({ children, style, ...props }: any) => (
  <Text style={[Typography.h4, style]} {...props}>
    {children}
  </Text>
);

export const Heading5 = ({ children, style, ...props }: any) => (
  <Text style={[Typography.h5, style]} {...props}>
    {children}
  </Text>
);

export const Heading6 = ({ children, style, ...props }: any) => (
  <Text style={[Typography.h6, style]} {...props}>
    {children}
  </Text>
);

export const BodyText1 = ({ children, style, ...props }: any) => (
  <Text style={[Typography.body1, style]} {...props}>
    {children}
  </Text>
);

export const BodyText2 = ({ children, style, ...props }: any) => (
  <Text style={[Typography.body2, style]} {...props}>
    {children}
  </Text>
);

export const BodyText3 = ({ children, style, ...props }: any) => (
  <Text style={[Typography.body3, style]} {...props}>
    {children}
  </Text>
);

export const Caption = ({ children, style, ...props }: any) => (
  <Text style={[Typography.caption, style]} {...props}>
    {children}
  </Text>
);

// Button Components
interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  icon?: keyof typeof Ionicons.glyphMap;
  style?: any;
}

export const Button = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'medium',
  icon,
  style,
  ...props
}: ButtonProps) => {
  const getButtonStyle = () => {
    const baseStyle = {
      borderRadius: BorderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row' as const,
      ...Shadows.small,
    };

    const sizeStyles = {
      small: {
        paddingVertical: Spacing.sm,
        paddingHorizontal: Spacing.md,
      },
      medium: {
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.lg,
      },
      large: {
        paddingVertical: Spacing.lg,
        paddingHorizontal: Spacing.xl,
      },
    };

    const variantStyles = {
      primary: {
        backgroundColor: disabled ? Colors.textSoft : Colors.primary,
      },
      secondary: {
        backgroundColor: disabled ? Colors.textSoft : Colors.primarySoft,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: disabled ? Colors.textSoft : Colors.primary,
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  const getTextStyle = () => {
    const baseStyle = {
      fontWeight: 'bold' as const,
      color: 'white',
    };

    const sizeStyles = {
      small: { fontSize: 14 },
      medium: { fontSize: 16 },
      large: { fontSize: 18 },
    };

    const variantStyles = {
      primary: { color: 'white' },
      secondary: { color: 'white' },
      outline: { color: disabled ? Colors.textSoft : Colors.primary },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <>
          {icon && (
            <Ionicons
              name={icon}
              size={size === 'small' ? 16 : size === 'medium' ? 18 : 20}
              color={getTextStyle().color}
              style={{ marginRight: Spacing.xs }}
            />
          )}
          <Text style={getTextStyle()}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

// Input Component
interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: any;
  multiline?: boolean;
  numberOfLines?: number;
  style?: any;
  [key: string]: any;
}

export const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  style,
  ...props
}: InputProps) => {
  return (
    <View style={styles.inputContainer}>
      {label && (
        <Text style={styles.inputLabel}>
          {label}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          error && styles.inputError,
          style,
        ]}
        placeholder={placeholder}
        placeholderTextColor={Colors.textSoft}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
      {error && (
        <Text style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
};

// Card Component
interface CardProps {
  children: React.ReactNode;
  style?: any;
  onPress?: () => void;
}

export const Card = ({ children, style, onPress }: CardProps) => {
  const cardStyle = [
    styles.card,
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={0.8}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

// Badge Component
interface BadgeProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'success' | 'error';
  style?: any;
}

export const Badge = ({ text, variant = 'primary', style }: BadgeProps) => {
  const getBadgeStyle = () => {
    const baseStyle = {
      paddingHorizontal: Spacing.sm,
      paddingVertical: Spacing.xs,
      borderRadius: BorderRadius.round,
    };

    const variantStyles = {
      primary: { backgroundColor: Colors.primary },
      secondary: { backgroundColor: Colors.primarySoft },
      success: { backgroundColor: Colors.success },
      error: { backgroundColor: Colors.error },
    };

    return {
      ...baseStyle,
      ...variantStyles[variant],
    };
  };

  return (
    <View style={[getBadgeStyle(), style]}>
      <Text style={styles.badgeText}>{text}</Text>
    </View>
  );
};

// Empty State Component
interface EmptyStateProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  message?: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState = ({
  icon,
  title,
  message,
  actionText,
  onAction,
}: EmptyStateProps) => {
  return (
    <View style={styles.emptyState}>
      <Ionicons name={icon} size={64} color={Colors.textSoft} />
      <Heading4 style={styles.emptyStateTitle}>{title}</Heading4>
      {message && (
        <BodyText2 style={styles.emptyStateMessage}>{message}</BodyText2>
      )}
      {actionText && onAction && (
        <Button
          title={actionText}
          onPress={onAction}
          variant="outline"
          style={{ marginTop: Spacing.lg }}
        />
      )}
    </View>
  );
};

// Loading Component
export const Loading = ({ size = 'large', color = Colors.primary }: any) => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: Spacing.md,
  },
  inputLabel: {
    ...Typography.body2,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
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
  inputError: {
    borderColor: Colors.error,
  },
  errorText: {
    ...Typography.caption,
    color: Colors.error,
    marginTop: Spacing.xs,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    ...Shadows.medium,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  emptyStateTitle: {
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  emptyStateMessage: {
    textAlign: 'center',
    color: Colors.textSoft,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 