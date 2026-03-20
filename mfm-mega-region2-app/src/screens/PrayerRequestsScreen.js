import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Alert, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { Colors, Shadows } from '../theme/colors';
import { Spacing, Radius } from '../theme/typography';
import { samplePrayerRequests, prayerCategories } from '../data/mockData';

export default function PrayerRequestsScreen({ navigation }) {
  const [showForm, setShowForm] = useState(false);
  const [request, setRequest] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [requests, setRequests] = useState(samplePrayerRequests);

  const handleSubmit = () => {
    if (!request.trim()) {
      Alert.alert('Required', 'Please enter your prayer request.');
      return;
    }
    const newReq = {
      id: 'pr' + Date.now(),
      request: request.trim(),
      date: new Date().toISOString().split('T')[0],
      prayerCount: 0,
      category: selectedCategory || 'general',
    };
    setRequests([newReq, ...requests]);
    setRequest('');
    setSelectedCategory(null);
    setShowForm(false);
    Alert.alert('Submitted!', 'Your prayer request has been shared anonymously. The body of Christ is praying with you.');
  };

  const handlePray = (id) => {
    setRequests(prev =>
      prev.map(r => r.id === id ? { ...r, prayerCount: r.prayerCount + 1 } : r)
    );
  };

  return (
    <View style={styles.container}>
      <Header
        title="Prayer Wall"
        subtitle="Bear one another's burdens — Gal 6:2"
        rightIcon={showForm ? 'close' : 'add'}
        onRightPress={() => setShowForm(!showForm)}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Anonymous Notice */}
          <View style={styles.anonNotice}>
            <Ionicons name="shield-checkmark" size={16} color={Colors.purple} />
            <Text style={styles.anonNoticeText}>
              All prayer requests are submitted anonymously. Your identity is never shared.
            </Text>
          </View>

          {/* Submit Form */}
          {showForm && (
            <View style={styles.formCard}>
              <Text style={styles.formTitle}>Submit Prayer Request</Text>
              <Text style={styles.formSubtitle}>Your request will be shared anonymously</Text>

              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Pour out your heart to God and let the brethren pray with you..."
                placeholderTextColor={Colors.gray400}
                value={request}
                onChangeText={setRequest}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />

              {/* Category Selection */}
              <Text style={styles.catLabel}>CATEGORY (optional)</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
                {prayerCategories.map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    style={[
                      styles.catChip,
                      selectedCategory === cat.name && { backgroundColor: cat.color + '20', borderColor: cat.color },
                    ]}
                    onPress={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
                  >
                    <Ionicons name={cat.icon} size={14} color={selectedCategory === cat.name ? cat.color : Colors.gray500} />
                    <Text style={[styles.catChipText, selectedCategory === cat.name && { color: cat.color }]}>{cat.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                <Ionicons name="send" size={18} color={Colors.white} />
                <Text style={styles.submitBtnText}>Submit Anonymously</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Prayer Wall */}
          <View style={styles.wallHeader}>
            <Ionicons name="flame" size={20} color={Colors.fire} />
            <Text style={styles.wallTitle}>Prayer Wall</Text>
            <Text style={styles.wallCount}>{requests.length} requests</Text>
          </View>

          {requests.map((item) => (
            <View key={item.id} style={styles.requestCard}>
              <View style={styles.requestHeader}>
                <View style={styles.requestAvatar}>
                  <Ionicons name="shield-checkmark" size={18} color={Colors.purple} />
                </View>
                <View style={styles.requestMeta}>
                  <Text style={styles.requestName}>Anonymous Prayer Request</Text>
                  <Text style={styles.requestDate}>{item.date}</Text>
                </View>
                {item.category && item.category !== 'general' && (
                  <View style={styles.requestCatBadge}>
                    <Text style={styles.requestCatText}>{item.category}</Text>
                  </View>
                )}
              </View>
              <Text style={styles.requestText}>{item.request}</Text>
              <View style={styles.requestFooter}>
                <TouchableOpacity
                  style={styles.prayBtn}
                  onPress={() => handlePray(item.id)}
                >
                  <Ionicons name="hand-left" size={16} color={Colors.purple} />
                  <Text style={styles.prayBtnText}>I'm Praying</Text>
                </TouchableOpacity>
                <Text style={styles.prayCount}>
                  {item.prayerCount} praying
                </Text>
              </View>
            </View>
          ))}

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.offWhite },
  content: { flex: 1, padding: Spacing.base },

  // Anonymous Notice
  anonNotice: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: Colors.purpleSoft, borderRadius: Radius.md,
    padding: Spacing.md, marginBottom: Spacing.md,
  },
  anonNoticeText: { flex: 1, fontSize: 12, color: Colors.purple, fontWeight: '500', lineHeight: 16 },

  // Form
  formCard: {
    backgroundColor: Colors.white, borderRadius: Radius.xl,
    padding: Spacing.lg, marginBottom: Spacing.xl,
    ...Shadows.md, borderTopWidth: 3, borderTopColor: Colors.purple,
  },
  formTitle: { fontSize: 18, fontWeight: '800', color: Colors.gray800 },
  formSubtitle: { fontSize: 13, color: Colors.gray500, marginBottom: Spacing.md, marginTop: 2 },
  input: {
    backgroundColor: Colors.gray50, borderRadius: Radius.md,
    padding: Spacing.md, fontSize: 15, color: Colors.gray800,
    borderWidth: 1, borderColor: Colors.gray200, marginBottom: Spacing.md,
  },
  textArea: { height: 110, textAlignVertical: 'top' },
  catLabel: { fontSize: 11, fontWeight: '800', color: Colors.gray500, letterSpacing: 1.5, marginBottom: 8 },
  catScroll: { marginBottom: Spacing.base },
  catChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    borderWidth: 1, borderColor: Colors.gray200, borderRadius: Radius.full,
    paddingHorizontal: 12, paddingVertical: 6, marginRight: 8,
  },
  catChipText: { fontSize: 12, fontWeight: '600', color: Colors.gray500 },
  submitBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, backgroundColor: Colors.purple, borderRadius: Radius.md, paddingVertical: 14,
  },
  submitBtnText: { fontSize: 16, fontWeight: '700', color: Colors.white },

  // Wall
  wallHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: Spacing.md },
  wallTitle: { fontSize: 18, fontWeight: '800', color: Colors.gray800, flex: 1 },
  wallCount: { fontSize: 13, color: Colors.gray400 },

  // Request Card
  requestCard: {
    backgroundColor: Colors.white, borderRadius: Radius.lg,
    padding: Spacing.base, marginBottom: Spacing.md, ...Shadows.sm,
  },
  requestHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  requestAvatar: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.purpleSoft, justifyContent: 'center', alignItems: 'center',
    marginRight: 10,
  },
  requestMeta: { flex: 1 },
  requestName: { fontSize: 13, fontWeight: '600', color: Colors.purple },
  requestDate: { fontSize: 11, color: Colors.gray400 },
  requestCatBadge: {
    backgroundColor: Colors.purpleSoft, borderRadius: Radius.full,
    paddingHorizontal: 8, paddingVertical: 2,
  },
  requestCatText: { fontSize: 10, fontWeight: '700', color: Colors.purple, textTransform: 'capitalize' },
  requestText: { fontSize: 15, color: Colors.gray600, lineHeight: 22 },
  requestFooter: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginTop: 12, paddingTop: 10, borderTopWidth: 1, borderTopColor: Colors.gray100,
  },
  prayBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: Colors.purpleSoft, paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: Radius.full,
  },
  prayBtnText: { fontSize: 13, fontWeight: '700', color: Colors.purple },
  prayCount: { fontSize: 12, color: Colors.gray400 },
});
