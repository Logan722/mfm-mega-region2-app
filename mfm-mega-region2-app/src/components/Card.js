import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Shadows } from '../theme/colors';
import { Radius, Spacing } from '../theme/typography';

export default function Card({ children, style, onPress, variant = 'default' }) {
  const Wrapper = onPress ? TouchableOpacity : View;
  const variantStyles = {
    default: styles.cardDefault,
    elevated: styles.cardElevated,
    outlined: styles.cardOutlined,
    dark: styles.cardDark,
  };

  return (
    <Wrapper
      style={[styles.card, variantStyles[variant], style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {children}
    </Wrapper>
  );
}

export function CardHeader({ title, subtitle, right }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerText}>
        <Text style={styles.headerTitle}>{title}</Text>
        {subtitle && <Text style={styles.headerSubtitle}>{subtitle}</Text>}
      </View>
      {right && <View>{right}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
    padding: Spacing.base,
    marginBottom: Spacing.md,
  },
  cardDefault: {
    backgroundColor: Colors.white,
    ...Shadows.sm,
  },
  cardElevated: {
    backgroundColor: Colors.white,
    ...Shadows.md,
  },
  cardOutlined: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray200,
  },
  cardDark: {
    backgroundColor: Colors.purpleDeep,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.gray800,
  },
  headerSubtitle: {
    fontSize: 13,
    color: Colors.gray500,
    marginTop: 2,
  },
});
