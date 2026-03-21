import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows } from '../theme/colors';
import { Spacing, Radius } from '../theme/typography';
import { useAppData } from '../services/DataProvider';

const MFM_LOGO = require('../../assets/mfm-logo.png');

export default function HomeScreen({ navigation }) {
  const {
    announcements, events, weeklyServices, todayDevotional, todayService, appConfig, loading,
  } = useAppData();

  if (loading) {
    return <View style={styles.loadingContainer}><ActivityIndicator size="large" color={Colors.purple} /></View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Image source={MFM_LOGO} style={styles.logo} />
          <View style={styles.headerText}>
            <Text style={styles.greeting}>Mountain of Fire & Miracles</Text>
            <Text style={styles.regionName}>Mega Region 2 USA</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Prophetic Banner */}
        <TouchableOpacity style={styles.propheticBanner} activeOpacity={0.85}>
          <View style={styles.propheticGlow} />
          <View style={styles.propheticContent}>
            <View style={styles.propheticBadge}>
              <Ionicons name="flame" size={14} color={Colors.fire} />
              <Text style={styles.propheticBadgeText}>{appConfig.yearTheme} DECLARATION</Text>
            </View>
            <Text style={styles.propheticTitle}>
              "{appConfig.yearDeclaration}"
            </Text>
            <Text style={styles.propheticVerse}>— {appConfig.yearVerse}</Text>
          </View>
        </TouchableOpacity>

        {/* Today's Service */}
        {todayService && (
          <TouchableOpacity style={styles.todayCard} activeOpacity={0.8} onPress={() => navigation.navigate('Events')}>
            <View style={[styles.todayDot, { backgroundColor: todayService.color }]} />
            <View style={styles.todayInfo}>
              <Text style={styles.todayLabel}>TODAY</Text>
              <Text style={styles.todayTitle}>{todayService.title}</Text>
              <Text style={styles.todayTime}>{todayService.time}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={Colors.gray400} />
          </TouchableOpacity>
        )}

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          {[
            { icon: 'videocam', label: 'Livestream', screen: 'Livestream', color: '#FF0000' },
            { icon: 'book', label: 'Devotional', screen: 'Devotionals', color: Colors.purple },
            { icon: 'hand-left', label: 'Pray', screen: 'PrayerRequests', color: Colors.fire },
            { icon: 'calendar', label: 'Events', screen: 'Events', color: Colors.gold },
          ].map((action) => (
            <TouchableOpacity key={action.label} style={styles.quickAction} onPress={() => navigation.navigate(action.screen)}>
              <View style={[styles.quickActionIcon, { backgroundColor: action.color + '15' }]}>
                <Ionicons name={action.icon} size={24} color={action.color} />
              </View>
              <Text style={styles.quickActionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Today's Devotional */}
        {todayDevotional && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Today's Devotional</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Devotionals')}>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.devotionalCard} activeOpacity={0.8} onPress={() => navigation.navigate('DevotionalDetail', { devotional: todayDevotional })}>
              <View style={styles.devotionalHeader}>
                <Ionicons name="flame" size={22} color={Colors.fire} />
                <Text style={styles.devotionalCategory}>{(todayDevotional.category || '').replace('_', ' ').toUpperCase()}</Text>
              </View>
              <Text style={styles.devotionalTitle}>{todayDevotional.title}</Text>
              <Text style={styles.devotionalVerse} numberOfLines={2}>{todayDevotional.verseOfDay}</Text>
              <View style={styles.devotionalFooter}>
                <Text style={styles.devotionalReading}>{todayDevotional.bibleReading}</Text>
                <Text style={styles.devotionalPoints}>{(todayDevotional.prayerPoints || []).length} prayer points</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Upcoming Events */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Events')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {events.slice(0, 4).map((event) => (
              <TouchableOpacity key={event.id} style={styles.eventCard} activeOpacity={0.8} onPress={() => navigation.navigate('EventDetail', { event })}>
                <View style={[styles.eventStrip, { backgroundColor: event.color }]} />
                <View style={styles.eventDateBadge}>
                  <Text style={styles.eventDateDay}>{new Date(event.date + 'T00:00:00').getDate()}</Text>
                  <Text style={styles.eventDateMonth}>{new Date(event.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}</Text>
                </View>
                <Text style={styles.eventTitle} numberOfLines={2}>{event.title}</Text>
                <Text style={styles.eventTime}>{event.time}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Announcements */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Announcements</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Announcements')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {announcements.slice(0, 3).map((item) => (
            <View key={item.id} style={styles.announcementCard}>
              <View style={[styles.priorityDot, { backgroundColor: item.priority === 'high' ? Colors.fire : Colors.gold }]} />
              <View style={styles.announcementContent}>
                <Text style={styles.announcementTitle}>{item.title}</Text>
                <Text style={styles.announcementBody} numberOfLines={2}>{item.body}</Text>
                <Text style={styles.announcementMeta}>{item.author}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Weekly Schedule */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Schedule</Text>
          <View style={styles.scheduleGrid}>
            {weeklyServices.map((service) => (
              <View key={service.id} style={styles.scheduleItem}>
                <View style={[styles.scheduleDot, { backgroundColor: service.color }]} />
                <View style={styles.scheduleInfo}>
                  <Text style={styles.scheduleDay}>{service.day}</Text>
                  <Text style={styles.scheduleName}>{service.title}</Text>
                  <Text style={styles.scheduleTime}>{service.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Image source={MFM_LOGO} style={styles.footerLogo} />
          <Text style={styles.footerMotto}>
            "A do-it-yourself Gospel ministry where your hands{'\n'}are trained to wage war and your fingers to do battle"
          </Text>
          <Text style={styles.footerRef}>— Psalm 144:1</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.offWhite },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.offWhite },
  header: { backgroundColor: Colors.purpleDeep, paddingTop: 50, paddingBottom: 14, paddingHorizontal: Spacing.base },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  logo: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: Colors.purpleLight },
  headerText: { flex: 1 },
  greeting: { fontSize: 11, color: Colors.purpleLight, fontWeight: '600', letterSpacing: 0.5 },
  regionName: { fontSize: 20, fontWeight: '800', color: Colors.white, letterSpacing: -0.3 },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 32 },
  propheticBanner: { marginHorizontal: Spacing.base, marginTop: Spacing.base, borderRadius: Radius.lg, backgroundColor: Colors.purpleDeep, overflow: 'hidden', ...Shadows.fire },
  propheticGlow: { position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: 60, backgroundColor: Colors.fire, opacity: 0.15 },
  propheticContent: { padding: Spacing.lg },
  propheticBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  propheticBadgeText: { fontSize: 10, fontWeight: '800', color: Colors.fireLight, letterSpacing: 1.5 },
  propheticTitle: { fontSize: 18, fontWeight: '700', color: Colors.white, lineHeight: 26, fontStyle: 'italic' },
  propheticVerse: { fontSize: 12, color: Colors.goldLight, marginTop: 6, fontWeight: '600' },
  todayCard: { marginHorizontal: Spacing.base, marginTop: Spacing.base, backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.base, flexDirection: 'row', alignItems: 'center', ...Shadows.sm },
  todayDot: { width: 10, height: 10, borderRadius: 5, marginRight: 12 },
  todayInfo: { flex: 1 },
  todayLabel: { fontSize: 9, fontWeight: '800', color: Colors.fire, letterSpacing: 1.5 },
  todayTitle: { fontSize: 15, fontWeight: '700', color: Colors.gray800, marginTop: 2 },
  todayTime: { fontSize: 12, color: Colors.gray500, marginTop: 2 },
  quickActions: { flexDirection: 'row', justifyContent: 'space-around', marginTop: Spacing.lg, marginHorizontal: Spacing.base },
  quickAction: { alignItems: 'center', width: 70 },
  quickActionIcon: { width: 52, height: 52, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  quickActionLabel: { fontSize: 11, fontWeight: '600', color: Colors.gray600 },
  section: { marginTop: Spacing.xl, paddingHorizontal: Spacing.base },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: Colors.gray800, letterSpacing: -0.3 },
  seeAll: { fontSize: 14, fontWeight: '600', color: Colors.purple },
  devotionalCard: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.base, ...Shadows.md, borderLeftWidth: 4, borderLeftColor: Colors.fire },
  devotionalHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  devotionalCategory: { fontSize: 10, fontWeight: '800', color: Colors.fire, letterSpacing: 1 },
  devotionalTitle: { fontSize: 17, fontWeight: '700', color: Colors.gray800, marginBottom: 6 },
  devotionalVerse: { fontSize: 13, color: Colors.gray600, fontStyle: 'italic', lineHeight: 20 },
  devotionalFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  devotionalReading: { fontSize: 12, color: Colors.gray500, fontWeight: '500' },
  devotionalPoints: { fontSize: 12, color: Colors.purple, fontWeight: '600' },
  eventCard: { width: 155, backgroundColor: Colors.white, borderRadius: Radius.lg, marginRight: Spacing.md, overflow: 'hidden', ...Shadows.sm },
  eventStrip: { height: 4 },
  eventDateBadge: { backgroundColor: Colors.purpleSoft, alignSelf: 'flex-start', margin: Spacing.md, marginBottom: 8, borderRadius: Radius.sm, paddingHorizontal: 10, paddingVertical: 4, alignItems: 'center' },
  eventDateDay: { fontSize: 18, fontWeight: '800', color: Colors.purple },
  eventDateMonth: { fontSize: 10, fontWeight: '700', color: Colors.purpleLight },
  eventTitle: { fontSize: 13, fontWeight: '700', color: Colors.gray800, paddingHorizontal: Spacing.md, lineHeight: 17 },
  eventTime: { fontSize: 11, color: Colors.gray500, paddingHorizontal: Spacing.md, marginTop: 4, marginBottom: Spacing.md },
  announcementCard: { flexDirection: 'row', backgroundColor: Colors.white, borderRadius: Radius.md, padding: Spacing.md, marginBottom: Spacing.sm, ...Shadows.sm },
  priorityDot: { width: 8, height: 8, borderRadius: 4, marginTop: 5, marginRight: 10 },
  announcementContent: { flex: 1 },
  announcementTitle: { fontSize: 14, fontWeight: '700', color: Colors.gray800 },
  announcementBody: { fontSize: 12, color: Colors.gray500, marginTop: 3, lineHeight: 17 },
  announcementMeta: { fontSize: 10, color: Colors.gray400, marginTop: 6 },
  scheduleGrid: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.base, marginTop: Spacing.sm, ...Shadows.sm },
  scheduleItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.gray100 },
  scheduleDot: { width: 8, height: 8, borderRadius: 4, marginRight: 12 },
  scheduleInfo: { flex: 1 },
  scheduleDay: { fontSize: 10, fontWeight: '700', color: Colors.gray500, textTransform: 'uppercase', letterSpacing: 0.5 },
  scheduleName: { fontSize: 14, fontWeight: '600', color: Colors.gray800, marginTop: 1 },
  scheduleTime: { fontSize: 12, color: Colors.gray400, marginTop: 1 },
  footer: { marginTop: 32, marginBottom: Spacing.xl, alignItems: 'center', paddingHorizontal: Spacing['2xl'] },
  footerLogo: { width: 56, height: 56, borderRadius: 28, marginBottom: 10, opacity: 0.7 },
  footerMotto: { fontSize: 12, color: Colors.gray400, textAlign: 'center', fontStyle: 'italic', lineHeight: 18 },
  footerRef: { fontSize: 11, color: Colors.purple, marginTop: 4, fontWeight: '600' },
});
