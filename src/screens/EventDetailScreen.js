import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Share, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows } from '../theme/colors';
import { Spacing, Radius } from '../theme/typography';

export default function EventDetailScreen({ route, navigation }) {
  const { event } = route.params;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${event.title}\n\nDate: ${event.date}\nTime: ${event.time}\nLocation: ${event.location}\n\n${event.description}\n\n— MFM Mega Region 2`,
      });
    } catch (e) {}
  };

  const handleAddCalendar = () => {
    Alert.alert('Add to Calendar', 'Calendar integration coming in the next update!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare} style={styles.shareBtn}>
          <Ionicons name="share-outline" size={22} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={[styles.hero, { backgroundColor: event.color || Colors.purple }]}>
          <View style={styles.heroGlow} />
          {event.isGlobal && (
            <View style={styles.globalBadge}>
              <Ionicons name="globe" size={12} color={Colors.white} />
              <Text style={styles.globalText}>Global Event — All Branches</Text>
            </View>
          )}
          <Text style={styles.heroTitle}>{event.title}</Text>
          <View style={styles.heroMeta}>
            <View style={styles.heroDateBox}>
              <Text style={styles.heroDateDay}>
                {new Date(event.date + 'T00:00:00').getDate()}
              </Text>
              <Text style={styles.heroDateMonth}>
                {new Date(event.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
              </Text>
            </View>
            <View style={styles.heroDetails}>
              <View style={styles.heroRow}>
                <Ionicons name="calendar-outline" size={16} color="rgba(255,255,255,0.8)" />
                <Text style={styles.heroRowText}>
                  {new Date(event.date + 'T00:00:00').toLocaleDateString('en-US', {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </Text>
              </View>
              <View style={styles.heroRow}>
                <Ionicons name="time-outline" size={16} color="rgba(255,255,255,0.8)" />
                <Text style={styles.heroRowText}>{event.time}</Text>
              </View>
              <View style={styles.heroRow}>
                <Ionicons name="location-outline" size={16} color="rgba(255,255,255,0.8)" />
                <Text style={styles.heroRowText}>{event.location}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          {/* Description */}
          <View style={styles.descSection}>
            <Text style={styles.sectionTitle}>About This Event</Text>
            <Text style={styles.descText}>{event.description}</Text>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionPrimary} onPress={handleAddCalendar}>
              <Ionicons name="calendar" size={20} color={Colors.white} />
              <Text style={styles.actionPrimaryText}>Add to Calendar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionSecondary} onPress={handleShare}>
              <Ionicons name="share-social" size={20} color={Colors.purple} />
              <Text style={styles.actionSecondaryText}>Share</Text>
            </TouchableOpacity>
          </View>

          {/* Recurring Info */}
          {event.recurring && (
            <View style={styles.recurringCard}>
              <Ionicons name="repeat" size={20} color={Colors.purple} />
              <View style={styles.recurringInfo}>
                <Text style={styles.recurringTitle}>Recurring Event</Text>
                <Text style={styles.recurringNote}>
                  {event.recurring === 'first_saturday'
                    ? 'This event occurs on the first Saturday of every month.'
                    : 'This is an annual event.'}
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.offWhite },
  header: {
    position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
    paddingTop: 54, paddingBottom: 8, paddingHorizontal: Spacing.base,
    flexDirection: 'row', justifyContent: 'space-between',
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center',
  },
  shareBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center',
  },
  scroll: { flex: 1 },

  // Hero
  hero: { paddingTop: 100, paddingBottom: Spacing['2xl'], paddingHorizontal: Spacing.xl, overflow: 'hidden' },
  heroGlow: {
    position: 'absolute', top: -50, right: -50,
    width: 200, height: 200, borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  globalBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(255,255,255,0.2)', alignSelf: 'flex-start',
    paddingHorizontal: 12, paddingVertical: 4, borderRadius: Radius.full, marginBottom: 10,
  },
  globalText: { fontSize: 12, fontWeight: '600', color: Colors.white },
  heroTitle: { fontSize: 28, fontWeight: '800', color: Colors.white, lineHeight: 34 },
  heroMeta: { flexDirection: 'row', marginTop: 16 },
  heroDateBox: {
    backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: Radius.md,
    paddingHorizontal: 14, paddingVertical: 8, alignItems: 'center', marginRight: 14,
  },
  heroDateDay: { fontSize: 26, fontWeight: '800', color: Colors.white },
  heroDateMonth: { fontSize: 11, fontWeight: '700', color: 'rgba(255,255,255,0.8)' },
  heroDetails: { flex: 1, justifyContent: 'center', gap: 6 },
  heroRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  heroRowText: { fontSize: 14, color: 'rgba(255,255,255,0.9)', fontWeight: '500' },

  content: { padding: Spacing.base },

  descSection: { marginBottom: Spacing.xl },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: Colors.gray800, marginBottom: 8 },
  descText: { fontSize: 15, color: Colors.gray600, lineHeight: 24 },

  // Actions
  actions: { flexDirection: 'row', gap: 12, marginBottom: Spacing.xl },
  actionPrimary: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, backgroundColor: Colors.purple, borderRadius: Radius.md, paddingVertical: 14,
  },
  actionPrimaryText: { fontSize: 15, fontWeight: '700', color: Colors.white },
  actionSecondary: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, backgroundColor: Colors.purpleSoft, borderRadius: Radius.md, paddingVertical: 14,
  },
  actionSecondaryText: { fontSize: 15, fontWeight: '700', color: Colors.purple },

  // Recurring
  recurringCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.purpleSoft, borderRadius: Radius.lg,
    padding: Spacing.base, gap: 12,
  },
  recurringInfo: { flex: 1 },
  recurringTitle: { fontSize: 14, fontWeight: '700', color: Colors.purple },
  recurringNote: { fontSize: 13, color: Colors.gray500, marginTop: 2 },
});
