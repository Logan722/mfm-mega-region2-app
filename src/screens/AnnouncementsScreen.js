import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { Colors, Shadows } from '../theme/colors';
import { Spacing, Radius } from '../theme/typography';
import { announcements } from '../data/mockData';

const priorityConfig = {
  high: { color: Colors.fire, icon: 'alert-circle', label: 'Important' },
  medium: { color: Colors.gold, icon: 'information-circle', label: 'Update' },
  low: { color: Colors.gray400, icon: 'chatbubble', label: 'Info' },
};

export default function AnnouncementsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header title="Announcements" subtitle="Stay Updated" />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {announcements.map((item) => {
          const pConfig = priorityConfig[item.priority] || priorityConfig.low;
          return (
            <TouchableOpacity key={item.id} style={styles.card} activeOpacity={0.8}>
              <View style={[styles.priorityBar, { backgroundColor: pConfig.color }]} />
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <View style={[styles.priorityBadge, { backgroundColor: pConfig.color + '15' }]}>
                    <Ionicons name={pConfig.icon} size={14} color={pConfig.color} />
                    <Text style={[styles.priorityText, { color: pConfig.color }]}>{pConfig.label}</Text>
                  </View>
                  <Text style={styles.date}>{item.date}</Text>
                </View>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.body}>{item.body}</Text>
                <View style={styles.footer}>
                  <Ionicons name="person-outline" size={13} color={Colors.gray400} />
                  <Text style={styles.author}>{item.author}</Text>
                </View>
              </View>
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
  card: {
    backgroundColor: Colors.white, borderRadius: Radius.lg,
    marginBottom: Spacing.md, overflow: 'hidden', ...Shadows.sm,
  },
  priorityBar: { height: 3 },
  cardContent: { padding: Spacing.base },
  cardHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 8,
  },
  priorityBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: 10, paddingVertical: 3, borderRadius: Radius.full,
  },
  priorityText: { fontSize: 11, fontWeight: '700' },
  date: { fontSize: 12, color: Colors.gray400 },
  title: { fontSize: 17, fontWeight: '700', color: Colors.gray800, marginBottom: 6 },
  body: { fontSize: 14, color: Colors.gray600, lineHeight: 22 },
  footer: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    marginTop: 12, paddingTop: 10, borderTopWidth: 1, borderTopColor: Colors.gray100,
  },
  author: { fontSize: 12, color: Colors.gray400 },
});
