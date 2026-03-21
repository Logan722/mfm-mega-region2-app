import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';
import { Radius, Spacing } from '../theme/typography';

export function Badge({ label, color = Colors.purple, small = false }) {
  return (
    <View style={[styles.badge, { backgroundColor: color + '18' }, small && styles.badgeSmall]}>
      <Text style={[styles.badgeText, { color }, small && styles.badgeTextSmall]}>{label}</Text>
    </View>
  );
}

export function PriorityDot({ priority }) {
  const dotColors = {
    high: Colors.fire,
    medium: Colors.gold,
    low: Colors.gray400,
  };
  return <View style={[styles.dot, { backgroundColor: dotColors[priority] || Colors.gray400 }]} />;
}

export function CountBadge({ count }) {
  return (
    <View style={styles.countBadge}>
      <Text style={styles.countText}>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.full,
    alignSelf: 'flex-start',
  },
  badgeSmall: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  badgeTextSmall: {
    fontSize: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  countBadge: {
    backgroundColor: Colors.fire,
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  countText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '800',
  },
});
