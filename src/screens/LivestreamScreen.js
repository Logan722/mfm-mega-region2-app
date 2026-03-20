import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Image, Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { Colors, Shadows } from '../theme/colors';
import { Spacing, Radius } from '../theme/typography';
import { livestreamSources, livestreamSchedule, YOUTUBE_CHANNEL_URL } from '../data/mockData';

export default function LivestreamScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('Channels');

  const openYouTube = (url) => {
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Could not open YouTube. Please check the app is installed.');
    });
  };

  const typeColors = {
    regional: Colors.fire,
    global: Colors.purple,
    national: Colors.gold,
    branch: Colors.purpleLight,
  };

  const typeLabels = {
    regional: 'MEGA REGION 2',
    global: 'GLOBAL HQ',
    national: 'USA HQ',
    branch: 'BRANCH',
  };

  return (
    <View style={styles.container}>
      <Header title="Livestream" subtitle="Watch Services Live" />

      {/* Hero — Watch Now CTA */}
      <TouchableOpacity
        style={styles.hero}
        activeOpacity={0.85}
        onPress={() => openYouTube(YOUTUBE_CHANNEL_URL)}
      >
        <View style={styles.heroGlow} />
        <View style={styles.heroGlow2} />
        <View style={styles.playCircle}>
          <Ionicons name="play" size={32} color={Colors.white} style={{ marginLeft: 3 }} />
        </View>
        <Text style={styles.heroTitle}>MFM Mega Region 2 USA</Text>
        <Text style={styles.heroSubtitle}>Watch Live on YouTube</Text>
        <View style={styles.heroBtn}>
          <Ionicons name="logo-youtube" size={18} color={Colors.white} />
          <Text style={styles.heroBtnText}>Open YouTube Channel</Text>
        </View>
      </TouchableOpacity>

      {/* Tabs */}
      <View style={styles.tabBar}>
        {['Channels', 'Schedule'].map((tab) => (
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
        {activeTab === 'Channels' && (
          <View>
            <Text style={styles.sectionLabel}>MFM YOUTUBE CHANNELS</Text>
            {livestreamSources.map((source) => (
              <TouchableOpacity
                key={source.id}
                style={styles.channelCard}
                activeOpacity={0.7}
                onPress={() => openYouTube(source.youtubeUrl)}
              >
                <View style={styles.channelLeft}>
                  <View style={[styles.channelIcon, { backgroundColor: (typeColors[source.type] || Colors.purple) + '18' }]}>
                    <Ionicons
                      name={source.isPrimary ? 'videocam' : 'logo-youtube'}
                      size={22}
                      color={typeColors[source.type] || Colors.purple}
                    />
                  </View>
                </View>
                <View style={styles.channelInfo}>
                  <View style={styles.channelHeader}>
                    <Text style={styles.channelName}>{source.name}</Text>
                    {source.isPrimary && (
                      <View style={styles.primaryBadge}>
                        <Ionicons name="star" size={10} color={Colors.fire} />
                        <Text style={styles.primaryText}>PRIMARY</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.channelDesc}>{source.description}</Text>
                  <View style={[styles.typeBadge, { backgroundColor: (typeColors[source.type] || Colors.purple) + '15' }]}>
                    <Text style={[styles.typeText, { color: typeColors[source.type] || Colors.purple }]}>
                      {typeLabels[source.type] || source.type}
                    </Text>
                  </View>
                </View>
                <Ionicons name="open-outline" size={18} color={Colors.gray300} />
              </TouchableOpacity>
            ))}

            {/* Quick Links */}
            <Text style={[styles.sectionLabel, { marginTop: Spacing.xl }]}>QUICK LINKS</Text>
            <View style={styles.quickGrid}>
              {[
                { icon: 'logo-youtube', label: 'YouTube', url: YOUTUBE_CHANNEL_URL, color: '#FF0000' },
                { icon: 'logo-facebook', label: 'Facebook', url: 'https://www.facebook.com/p/MFM-Mega-Region-2-USA-61556716678081/', color: '#1877F2' },
                { icon: 'logo-instagram', label: 'Instagram', url: 'https://www.instagram.com/mfmmegaregion2yc/', color: '#E4405F' },
                { icon: 'radio', label: 'MFM Radio', url: 'https://mfmonlineradio.mixlr.com', color: Colors.purple },
              ].map((link) => (
                <TouchableOpacity
                  key={link.label}
                  style={styles.quickLink}
                  onPress={() => Linking.openURL(link.url)}
                >
                  <Ionicons name={link.icon} size={24} color={link.color} />
                  <Text style={styles.quickLinkText}>{link.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {activeTab === 'Schedule' && (
          <View>
            <Text style={styles.sectionLabel}>LIVESTREAM SCHEDULE</Text>
            <Text style={styles.scheduleNote}>
              Times shown in Central Standard Time (CST). HQ services stream from Lagos, Nigeria.
            </Text>
            {livestreamSchedule.map((item, i) => (
              <View key={i} style={styles.scheduleCard}>
                <View style={styles.scheduleDay}>
                  <Text style={styles.scheduleDayText}>{item.day}</Text>
                </View>
                <View style={styles.scheduleInfo}>
                  <Text style={styles.scheduleProgram}>{item.program}</Text>
                  <Text style={styles.scheduleTime}>{item.time}</Text>
                  <Text style={styles.scheduleSource}>{item.source}</Text>
                </View>
                <TouchableOpacity
                  style={styles.schedulePlayBtn}
                  onPress={() => openYouTube(YOUTUBE_CHANNEL_URL)}
                >
                  <Ionicons name="play-circle" size={28} color={Colors.purple} />
                </TouchableOpacity>
              </View>
            ))}

            {/* Info Card */}
            <View style={styles.infoCard}>
              <Ionicons name="information-circle" size={20} color={Colors.purple} />
              <Text style={styles.infoText}>
                Services are broadcast live on the MFM Mega Region 2 USA YouTube channel. Some HQ services from Lagos are simulcast. Check the channel for current live status.
              </Text>
            </View>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.offWhite },

  // Hero
  hero: {
    backgroundColor: Colors.purpleDeep,
    margin: Spacing.base, marginTop: Spacing.sm,
    borderRadius: Radius.xl, padding: Spacing.xl,
    alignItems: 'center', overflow: 'hidden',
    ...Shadows.fire,
  },
  heroGlow: {
    position: 'absolute', top: -30, left: -30,
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: Colors.fire, opacity: 0.12,
  },
  heroGlow2: {
    position: 'absolute', bottom: -20, right: -20,
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: Colors.purple, opacity: 0.2,
  },
  playCircle: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: Colors.fire, justifyContent: 'center', alignItems: 'center',
    marginBottom: 12, ...Shadows.fire,
  },
  heroTitle: { fontSize: 20, fontWeight: '800', color: Colors.white, textAlign: 'center' },
  heroSubtitle: { fontSize: 13, color: Colors.purpleLight, marginTop: 4 },
  heroBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: '#FF0000', paddingHorizontal: 20, paddingVertical: 10,
    borderRadius: Radius.full, marginTop: 14,
  },
  heroBtnText: { fontSize: 14, fontWeight: '700', color: Colors.white },

  // Tabs
  tabBar: {
    flexDirection: 'row', paddingHorizontal: Spacing.base, gap: 8, marginBottom: 4,
  },
  tab: {
    paddingHorizontal: Spacing.base, paddingVertical: Spacing.sm,
    borderRadius: Radius.full, backgroundColor: Colors.gray50,
  },
  tabActive: { backgroundColor: Colors.purple },
  tabText: { fontSize: 14, fontWeight: '600', color: Colors.gray500 },
  tabTextActive: { color: Colors.white },

  content: { flex: 1, padding: Spacing.base },
  sectionLabel: {
    fontSize: 11, fontWeight: '800', color: Colors.gray500,
    letterSpacing: 1.5, marginBottom: Spacing.md,
  },

  // Channel Card
  channelCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.white, borderRadius: Radius.lg,
    padding: Spacing.base, marginBottom: Spacing.sm, ...Shadows.sm,
  },
  channelLeft: { marginRight: 12 },
  channelIcon: {
    width: 48, height: 48, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center',
  },
  channelInfo: { flex: 1 },
  channelHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  channelName: { fontSize: 15, fontWeight: '700', color: Colors.gray800 },
  primaryBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: Colors.fire + '15', paddingHorizontal: 6, paddingVertical: 2,
    borderRadius: Radius.full,
  },
  primaryText: { fontSize: 8, fontWeight: '800', color: Colors.fire, letterSpacing: 0.5 },
  channelDesc: { fontSize: 12, color: Colors.gray500, marginTop: 3, lineHeight: 16 },
  typeBadge: {
    alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2,
    borderRadius: Radius.full, marginTop: 6,
  },
  typeText: { fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },

  // Quick Links
  quickGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 12,
  },
  quickLink: {
    width: '47%', backgroundColor: Colors.white, borderRadius: Radius.lg,
    padding: Spacing.base, alignItems: 'center', gap: 8, ...Shadows.sm,
  },
  quickLinkText: { fontSize: 13, fontWeight: '600', color: Colors.gray700 },

  // Schedule
  scheduleNote: {
    fontSize: 12, color: Colors.gray500, fontStyle: 'italic',
    marginBottom: Spacing.md, lineHeight: 18,
  },
  scheduleCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.white, borderRadius: Radius.lg,
    padding: Spacing.base, marginBottom: Spacing.sm, ...Shadows.sm,
  },
  scheduleDay: {
    backgroundColor: Colors.purpleSoft, borderRadius: Radius.md,
    paddingHorizontal: 10, paddingVertical: 8, marginRight: 12,
    minWidth: 70, alignItems: 'center',
  },
  scheduleDayText: { fontSize: 11, fontWeight: '800', color: Colors.purple, textAlign: 'center' },
  scheduleInfo: { flex: 1 },
  scheduleProgram: { fontSize: 14, fontWeight: '700', color: Colors.gray800 },
  scheduleTime: { fontSize: 12, color: Colors.gray500, marginTop: 2 },
  scheduleSource: { fontSize: 11, color: Colors.purpleLight, marginTop: 2, fontWeight: '500' },
  schedulePlayBtn: { padding: 4 },

  // Info Card
  infoCard: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 10,
    backgroundColor: Colors.purpleSoft, borderRadius: Radius.lg,
    padding: Spacing.base, marginTop: Spacing.md,
  },
  infoText: { flex: 1, fontSize: 13, color: Colors.gray600, lineHeight: 18 },
});
