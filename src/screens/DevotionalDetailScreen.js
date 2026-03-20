import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows } from '../theme/colors';
import { Spacing, Radius } from '../theme/typography';

export default function DevotionalDetailScreen({ route, navigation }) {
  const { devotional } = route.params;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${devotional.title}\n\n${devotional.verseOfDay}\n\nPrayer Points:\n${devotional.prayerPoints.map((p, i) => `${i + 1}. ${p}`).join('\n')}\n\n— MFM Mega Region 2 App`,
      });
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      {/* Header */}
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
        <View style={styles.hero}>
          <View style={styles.heroGlow} />
          <Text style={styles.category}>
            {devotional.category.replace('_', ' ').toUpperCase()}
          </Text>
          <Text style={styles.title}>{devotional.title}</Text>
          <Text style={styles.date}>{devotional.date}</Text>
        </View>

        <View style={styles.content}>
          {/* Verse of the Day */}
          <View style={styles.verseCard}>
            <Ionicons name="book" size={20} color={Colors.purple} />
            <Text style={styles.verseLabel}>VERSE OF THE DAY</Text>
            <Text style={styles.verseText}>{devotional.verseOfDay}</Text>
            <Text style={styles.bibleReading}>Bible Reading: {devotional.bibleReading}</Text>
          </View>

          {/* Reflection */}
          <View style={styles.reflectionSection}>
            <Text style={styles.sectionTitle}>Reflection</Text>
            <Text style={styles.reflectionText}>{devotional.reflection}</Text>
          </View>

          {/* Prayer Points */}
          <View style={styles.prayerSection}>
            <View style={styles.prayerHeader}>
              <Ionicons name="flame" size={22} color={Colors.fire} />
              <Text style={styles.prayerTitle}>Prayer Points</Text>
            </View>
            <Text style={styles.prayerInstruction}>
              Pray each point with faith and authority in the name of Jesus.
            </Text>

            {devotional.prayerPoints.map((point, index) => (
              <View key={index} style={styles.prayerPoint}>
                <View style={styles.prayerNum}>
                  <Text style={styles.prayerNumText}>{index + 1}</Text>
                </View>
                <Text style={styles.prayerPointText}>{point}</Text>
              </View>
            ))}
          </View>

          {/* Declaration */}
          <View style={styles.declarationCard}>
            <Ionicons name="megaphone" size={20} color={Colors.gold} />
            <Text style={styles.declarationLabel}>2026 DECLARATION</Text>
            <Text style={styles.declarationText}>
              "My Year of Great Deliverance and Fresh Glory"
            </Text>
            <Text style={styles.declarationRef}>— Genesis 45:7</Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.offWhite },
  header: {
    backgroundColor: Colors.purpleDeep,
    paddingTop: 54, paddingBottom: 8, paddingHorizontal: Spacing.base,
    flexDirection: 'row', justifyContent: 'space-between',
  },
  backBtn: { padding: 4 },
  shareBtn: { padding: 4 },
  scroll: { flex: 1 },

  hero: {
    backgroundColor: Colors.purpleDeep,
    paddingHorizontal: Spacing.xl, paddingBottom: Spacing['2xl'],
    overflow: 'hidden',
  },
  heroGlow: {
    position: 'absolute', bottom: -40, right: -40,
    width: 160, height: 160, borderRadius: 80,
    backgroundColor: Colors.fire, opacity: 0.1,
  },
  category: {
    fontSize: 11, fontWeight: '800', color: Colors.fireLight,
    letterSpacing: 1.5, marginBottom: 8,
  },
  title: { fontSize: 28, fontWeight: '800', color: Colors.white, lineHeight: 34 },
  date: { fontSize: 13, color: Colors.purpleLight, marginTop: 6 },

  content: { padding: Spacing.base },

  // Verse Card
  verseCard: {
    backgroundColor: Colors.purpleSoft,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    borderLeftWidth: 4, borderLeftColor: Colors.purple,
  },
  verseLabel: {
    fontSize: 10, fontWeight: '800', color: Colors.purple,
    letterSpacing: 1.5, marginTop: 8, marginBottom: 6,
  },
  verseText: {
    fontSize: 16, color: Colors.gray700, fontStyle: 'italic', lineHeight: 24,
  },
  bibleReading: {
    fontSize: 13, color: Colors.purple, fontWeight: '600', marginTop: 10,
  },

  // Reflection
  reflectionSection: { marginBottom: Spacing.xl },
  sectionTitle: {
    fontSize: 18, fontWeight: '800', color: Colors.gray800, marginBottom: Spacing.sm,
  },
  reflectionText: { fontSize: 15, color: Colors.gray600, lineHeight: 24 },

  // Prayer Points
  prayerSection: {
    backgroundColor: Colors.white,
    borderRadius: Radius.xl, padding: Spacing.lg,
    marginBottom: Spacing.lg, ...Shadows.md,
    borderTopWidth: 3, borderTopColor: Colors.fire,
  },
  prayerHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  prayerTitle: { fontSize: 20, fontWeight: '800', color: Colors.gray800 },
  prayerInstruction: {
    fontSize: 13, color: Colors.gray500, fontStyle: 'italic', marginBottom: 16,
  },
  prayerPoint: {
    flexDirection: 'row', marginBottom: 14,
  },
  prayerNum: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: Colors.fire + '15',
    justifyContent: 'center', alignItems: 'center',
    marginRight: 12, marginTop: 2,
  },
  prayerNumText: { fontSize: 13, fontWeight: '800', color: Colors.fire },
  prayerPointText: { flex: 1, fontSize: 15, color: Colors.gray700, lineHeight: 22 },

  // Declaration
  declarationCard: {
    backgroundColor: Colors.purpleDeep,
    borderRadius: Radius.lg, padding: Spacing.lg,
    alignItems: 'center',
  },
  declarationLabel: {
    fontSize: 10, fontWeight: '800', color: Colors.goldLight,
    letterSpacing: 1.5, marginTop: 8,
  },
  declarationText: {
    fontSize: 17, fontWeight: '700', color: Colors.white,
    textAlign: 'center', marginTop: 6, fontStyle: 'italic',
  },
  declarationRef: { fontSize: 13, color: Colors.goldLight, marginTop: 4 },
});
