import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme/colors';
import { Spacing } from '../theme/typography';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 50 : StatusBar.currentHeight || 24;

export default function Header({ title, subtitle, showBack, onBack, rightIcon, onRightPress }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.purpleDeep} />
      <View style={styles.content}>
        <View style={styles.left}>
          {showBack && (
            <TouchableOpacity onPress={onBack} style={styles.backBtn}>
              <Ionicons name="chevron-back" size={24} color={Colors.white} />
            </TouchableOpacity>
          )}
          <View>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        </View>
        {rightIcon && (
          <TouchableOpacity onPress={onRightPress} style={styles.rightBtn}>
            <Ionicons name={rightIcon} size={24} color={Colors.white} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.purpleDeep,
    paddingTop: STATUS_BAR_HEIGHT,
    paddingBottom: Spacing.md,
    paddingHorizontal: Spacing.base,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backBtn: {
    marginRight: Spacing.sm,
    padding: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.purpleLight,
    marginTop: 2,
  },
  rightBtn: {
    padding: 4,
  },
});
