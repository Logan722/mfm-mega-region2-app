import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { Colors, Shadows } from '../theme/colors';
import { Spacing, Radius } from '../theme/typography';
import { useAppData } from '../services/DataProvider';

const categoryColors = { deliverance: Colors.fire, spiritual_warfare: Colors.purple, destiny: Colors.gold, healing: Colors.success, family: Colors.purpleDark };

export default function DevotionalsScreen({ navigation }) {
  const { devotionals, todayDevotional } = useAppData();

  return (
    <View style={styles.container}>
      <Header title="Devotionals" subtitle="Daily Prayer Points & Reflections" />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {todayDevotional && (
          <TouchableOpacity style={styles.todayCard} activeOpacity={0.8} onPress={() => navigation.navigate('DevotionalDetail', { devotional: todayDevotional })}>
            <View style={styles.todayGlow} />
            <View style={styles.todayBadge}><Ionicons name="flame" size={14} color={Colors.fire} /><Text style={styles.todayBadgeText}>TODAY'S DEVOTIONAL</Text></View>
            <Text style={styles.todayTitle}>{todayDevotional.title}</Text>
            <Text style={styles.todayVerse} numberOfLines={2}>{todayDevotional.verseOfDay}</Text>
            <View style={styles.todayFooter}>
              <Text style={styles.todayReading}>{todayDevotional.bibleReading}</Text>
              <View style={styles.todayBtn}><Text style={styles.todayBtnText}>Read</Text><Ionicons name="arrow-forward" size={14} color={Colors.white} /></View>
            </View>
          </TouchableOpacity>
        )}
        <Text style={styles.pastLabel}>RECENT DEVOTIONALS</Text>
        {devotionals.filter(d => todayDevotional ? d.id !== todayDevotional.id : true).map((item) => {
          const catColor = categoryColors[item.category] || Colors.purple;
          return (
            <TouchableOpacity key={item.id} style={styles.devCard} activeOpacity={0.7} onPress={() => navigation.navigate('DevotionalDetail', { devotional: item })}>
              <View style={[styles.devStripe, { backgroundColor: catColor }]} />
              <View style={styles.devContent}>
                <View style={styles.devHeader}>
                  <Text style={[styles.devCategory, { color: catColor }]}>{(item.category || '').replace('_', ' ').toUpperCase()}</Text>
                  <Text style={styles.devDate}>{item.date}</Text>
                </View>
                <Text style={styles.devTitle}>{item.title}</Text>
                <Text style={styles.devVerse} numberOfLines={1}>{item.bibleReading}</Text>
                <Text style={styles.devPoints}>{(item.prayerPoints || []).length} prayer points</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={Colors.gray300} />
            </TouchableOpacity>
          );
        })}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.offWhite },
  content: { flex: 1, padding: Spacing.base },
  todayCard: { backgroundColor: Colors.purpleDeep, borderRadius: Radius.xl, padding: Spacing.xl, marginBottom: Spacing.xl, overflow: 'hidden', ...Shadows.fire },
  todayGlow: { position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: 70, backgroundColor: Colors.fire, opacity: 0.12 },
  todayBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 },
  todayBadgeText: { fontSize: 11, fontWeight: '800', color: Colors.fireLight, letterSpacing: 1.5 },
  todayTitle: { fontSize: 22, fontWeight: '700', color: Colors.white, lineHeight: 28 },
  todayVerse: { fontSize: 14, color: Colors.gray300, fontStyle: 'italic', lineHeight: 20, marginTop: 8 },
  todayFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 },
  todayReading: { fontSize: 13, color: Colors.purpleLight, fontWeight: '500' },
  todayBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.fire, paddingHorizontal: 16, paddingVertical: 8, borderRadius: Radius.full },
  todayBtnText: { fontSize: 14, fontWeight: '700', color: Colors.white },
  pastLabel: { fontSize: 12, fontWeight: '800', color: Colors.gray500, letterSpacing: 1.5, marginBottom: Spacing.md },
  devCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.white, borderRadius: Radius.lg, marginBottom: Spacing.sm, padding: Spacing.base, overflow: 'hidden', ...Shadows.sm },
  devStripe: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 4 },
  devContent: { flex: 1, marginLeft: 4 },
  devHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  devCategory: { fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  devDate: { fontSize: 11, color: Colors.gray400 },
  devTitle: { fontSize: 16, fontWeight: '700', color: Colors.gray800, marginTop: 4 },
  devVerse: { fontSize: 13, color: Colors.gray500, marginTop: 2 },
  devPoints: { fontSize: 12, color: Colors.purple, fontWeight: '600', marginTop: 4 },
});
