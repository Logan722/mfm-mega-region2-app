import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { Colors, Shadows } from '../theme/colors';
import { Spacing, Radius } from '../theme/typography';
import { weeklyServices, specialEvents } from '../data/mockData';

const TABS = ['Upcoming', 'Weekly', 'PMCH'];

export default function EventsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Upcoming');

  return (
    <View style={styles.container}>
      <Header title="Events & Services" subtitle="Mega Region 2 Schedule" />

      {/* Tabs */}
      <View style={styles.tabBar}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'Upcoming' && (
          <View style={styles.section}>
            {specialEvents.map((event) => (
              <TouchableOpacity
                key={event.id}
                style={styles.eventCard}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('EventDetail', { event })}
              >
                <View style={[styles.eventColorBar, { backgroundColor: event.color }]} />
                <View style={styles.eventDateCol}>
                  <Text style={styles.eventDay}>
                    {new Date(event.date + 'T00:00:00').getDate()}
                  </Text>
                  <Text style={styles.eventMonth}>
                    {new Date(event.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.eventInfo}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <View style={styles.eventMeta}>
                    <Ionicons name="time-outline" size={13} color={Colors.gray400} />
                    <Text style={styles.eventMetaText}>{event.time}</Text>
                  </View>
                  <View style={styles.eventMeta}>
                    <Ionicons name="location-outline" size={13} color={Colors.gray400} />
                    <Text style={styles.eventMetaText}>{event.location}</Text>
                  </View>
                  {event.isGlobal && (
                    <View style={styles.globalTag}>
                      <Ionicons name="globe-outline" size={11} color={Colors.purple} />
                      <Text style={styles.globalTagText}>All Branches</Text>
                    </View>
                  )}
                </View>
                <Ionicons name="chevron-forward" size={18} color={Colors.gray300} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {activeTab === 'Weekly' && (
          <View style={styles.section}>
            {weeklyServices.map((service) => (
              <View key={service.id} style={styles.weeklyCard}>
                <View style={styles.weeklyLeft}>
                  <View style={[styles.weeklyIcon, { backgroundColor: service.color + '18' }]}>
                    <Ionicons name={service.icon} size={22} color={service.color} />
                  </View>
                </View>
                <View style={styles.weeklyInfo}>
                  <Text style={styles.weeklyDay}>{service.day}</Text>
                  <Text style={styles.weeklyTitle}>{service.title}</Text>
                  <Text style={styles.weeklyTime}>{service.time}</Text>
                  <Text style={styles.weeklyDesc} numberOfLines={2}>{service.description}</Text>
                  {service.note && (
                    <Text style={styles.weeklyNote}>
                      <Ionicons name="information-circle" size={12} color={Colors.gold} /> {service.note}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'PMCH' && (
          <View style={styles.section}>
            <View style={styles.pmchHero}>
              <View style={styles.pmchGlow} />
              <Ionicons name="flame" size={40} color={Colors.fire} />
              <Text style={styles.pmchTitle}>Power Must Change Hands</Text>
              <Text style={styles.pmchSubtitle}>Every First Saturday of the Month</Text>
              <Text style={styles.pmchTime}>8:00 AM — 12:00 PM</Text>
              <View style={styles.pmchDivider} />
              <Text style={styles.pmchDesc}>
                Join the global MFM family as Dr. D.K. Olukoya leads targeted spiritual warfare prayers against stubborn situations. Bring your prayer points and bottles of anointing oil.
              </Text>
            </View>

            <Text style={styles.upcomingLabel}>UPCOMING PMCH DATES</Text>
            {['2026-04-04', '2026-05-02', '2026-06-06', '2026-07-04', '2026-08-01', '2026-09-05'].map((date) => (
              <View key={date} style={styles.pmchDateRow}>
                <Ionicons name="calendar" size={16} color={Colors.purple} />
                <Text style={styles.pmchDateText}>
                  {new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </Text>
              </View>
            ))}
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.offWhite },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  tab: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    backgroundColor: Colors.gray50,
  },
  tabActive: { backgroundColor: Colors.purple },
  tabText: { fontSize: 14, fontWeight: '600', color: Colors.gray500 },
  tabTextActive: { color: Colors.white },
  content: { flex: 1 },
  section: { padding: Spacing.base },

  // Event Card
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    marginBottom: Spacing.md,
    padding: Spacing.base,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  eventColorBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    borderTopLeftRadius: Radius.lg,
    borderBottomLeftRadius: Radius.lg,
  },
  eventDateCol: {
    backgroundColor: Colors.purpleSoft,
    borderRadius: Radius.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    marginRight: 14,
    marginLeft: 4,
  },
  eventDay: { fontSize: 22, fontWeight: '800', color: Colors.purple },
  eventMonth: { fontSize: 10, fontWeight: '700', color: Colors.purpleLight },
  eventInfo: { flex: 1 },
  eventTitle: { fontSize: 16, fontWeight: '700', color: Colors.gray800 },
  eventMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  eventMetaText: { fontSize: 12, color: Colors.gray500 },
  globalTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.purpleSoft,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.full,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  globalTagText: { fontSize: 10, fontWeight: '600', color: Colors.purple },

  // Weekly Card
  weeklyCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  weeklyLeft: { marginRight: 14 },
  weeklyIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weeklyInfo: { flex: 1 },
  weeklyDay: { fontSize: 11, fontWeight: '800', color: Colors.purple, textTransform: 'uppercase', letterSpacing: 1 },
  weeklyTitle: { fontSize: 16, fontWeight: '700', color: Colors.gray800, marginTop: 2 },
  weeklyTime: { fontSize: 13, color: Colors.gray500, marginTop: 2 },
  weeklyDesc: { fontSize: 13, color: Colors.gray400, marginTop: 4, lineHeight: 18 },
  weeklyNote: { fontSize: 12, color: Colors.gold, marginTop: 4, fontWeight: '500' },

  // PMCH
  pmchHero: {
    backgroundColor: Colors.purpleDeep,
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    marginBottom: Spacing.xl,
    overflow: 'hidden',
  },
  pmchGlow: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Colors.fire,
    opacity: 0.12,
  },
  pmchTitle: { fontSize: 22, fontWeight: '800', color: Colors.white, marginTop: 12, textAlign: 'center' },
  pmchSubtitle: { fontSize: 14, color: Colors.purpleLight, marginTop: 4 },
  pmchTime: { fontSize: 16, fontWeight: '700', color: Colors.goldLight, marginTop: 8 },
  pmchDivider: { width: 40, height: 2, backgroundColor: Colors.fire, marginVertical: 16, borderRadius: 1 },
  pmchDesc: { fontSize: 14, color: Colors.gray300, textAlign: 'center', lineHeight: 22 },
  upcomingLabel: {
    fontSize: 12, fontWeight: '800', color: Colors.gray500, letterSpacing: 1.5,
    marginBottom: Spacing.md,
  },
  pmchDateRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: Colors.gray100,
  },
  pmchDateText: { fontSize: 15, color: Colors.gray700, fontWeight: '500' },
});
