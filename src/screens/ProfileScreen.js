import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert, Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Shadows } from '../theme/colors';
import { Spacing, Radius } from '../theme/typography';
import { branches } from '../data/mockData';

export default function ProfileScreen({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [pmchReminder, setPmchReminder] = useState(true);
  const [devotionalReminder, setDevotionalReminder] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState('b1');
  const [showBranchPicker, setShowBranchPicker] = useState(false);

  const currentBranch = branches.find(b => b.id === selectedBranch);

  const settingSections = [
    {
      title: 'NOTIFICATIONS',
      items: [
        {
          icon: 'notifications',
          label: 'Push Notifications',
          type: 'switch',
          value: notificationsEnabled,
          onToggle: setNotificationsEnabled,
        },
        {
          icon: 'flame',
          label: 'PMCH Reminders',
          subtitle: 'First Saturday of each month',
          type: 'switch',
          value: pmchReminder,
          onToggle: setPmchReminder,
        },
        {
          icon: 'book',
          label: 'Daily Devotional',
          subtitle: 'Morning prayer point reminders',
          type: 'switch',
          value: devotionalReminder,
          onToggle: setDevotionalReminder,
        },
      ],
    },
    {
      title: 'SUPPORT',
      items: [
        {
          icon: 'globe',
          label: 'MFM Website',
          type: 'link',
          onPress: () => Linking.openURL('https://www.mountainoffire.org'),
        },
        {
          icon: 'logo-youtube',
          label: 'MFM YouTube',
          type: 'link',
          onPress: () => Linking.openURL('https://www.youtube.com/@MFMtv'),
        },
        {
          icon: 'logo-facebook',
          label: 'Mega Region 2 Facebook',
          type: 'link',
          onPress: () => Linking.openURL('https://www.facebook.com/p/MFM-Mega-Region-2-USA-61556716678081/'),
        },
        {
          icon: 'call',
          label: 'Contact Mega Region 2',
          subtitle: '(346) 414-5880',
          type: 'link',
          onPress: () => Linking.openURL('tel:+13464145880'),
        },
      ],
    },
    {
      title: 'ABOUT',
      items: [
        {
          icon: 'information-circle',
          label: 'About This App',
          type: 'link',
          onPress: () => Alert.alert(
            'MFM Mega Region 2',
            'Version 1.0.0\n\nBuilt for the glory of God and the edification of MFM Mega Region 2 USA.\n\nMountain of Fire and Miracles Ministries\n"A do-it-yourself Gospel ministry"\n\nGeneral Overseer: Dr. D.K. Olukoya\nPRO Mega Region 2: Pastor Olumide Oni',
          ),
        },
        {
          icon: 'document-text',
          label: 'Privacy Policy',
          type: 'link',
          onPress: () => {},
        },
        {
          icon: 'shield-checkmark',
          label: 'Terms of Service',
          type: 'link',
          onPress: () => {},
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={36} color={Colors.purple} />
          </View>
          <Text style={styles.profileName}>Member</Text>
          <Text style={styles.profileEmail}>Set up your profile</Text>

          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => Alert.alert('Coming Soon', 'Profile editing will be available when user accounts are enabled.')}
          >
            <Ionicons name="create-outline" size={16} color={Colors.purple} />
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Branch Selection */}
        <View style={styles.branchSection}>
          <Text style={styles.sectionLabel}>MY BRANCH</Text>
          <TouchableOpacity
            style={styles.branchSelector}
            onPress={() => setShowBranchPicker(!showBranchPicker)}
          >
            <View style={styles.branchInfo}>
              <Ionicons name="location" size={20} color={Colors.purple} />
              <View style={styles.branchText}>
                <Text style={styles.branchName}>{currentBranch?.name}</Text>
                <Text style={styles.branchCity}>{currentBranch?.city}, {currentBranch?.state}</Text>
              </View>
            </View>
            <Ionicons
              name={showBranchPicker ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={Colors.gray400}
            />
          </TouchableOpacity>

          {showBranchPicker && (
            <View style={styles.branchList}>
              {branches.map((branch) => (
                <TouchableOpacity
                  key={branch.id}
                  style={[
                    styles.branchOption,
                    selectedBranch === branch.id && styles.branchOptionActive,
                  ]}
                  onPress={() => {
                    setSelectedBranch(branch.id);
                    setShowBranchPicker(false);
                  }}
                >
                  <Text style={[
                    styles.branchOptionText,
                    selectedBranch === branch.id && styles.branchOptionTextActive,
                  ]}>
                    {branch.name}
                  </Text>
                  <Text style={styles.branchOptionCity}>
                    {branch.city}, {branch.state}
                  </Text>
                  {selectedBranch === branch.id && (
                    <Ionicons name="checkmark-circle" size={20} color={Colors.purple} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Membership Status */}
        <View style={styles.membershipCard}>
          <View style={styles.membershipIcon}>
            <Ionicons name="ribbon" size={24} color={Colors.gold} />
          </View>
          <View style={styles.membershipInfo}>
            <Text style={styles.membershipTitle}>Membership Status</Text>
            <Text style={styles.membershipStatus}>New Member</Text>
            <Text style={styles.membershipNote}>
              Complete your Foundational Class to become a certified member
            </Text>
          </View>
        </View>

        {/* Settings Sections */}
        {settingSections.map((section) => (
          <View key={section.title} style={styles.settingsSection}>
            <Text style={styles.sectionLabel}>{section.title}</Text>
            <View style={styles.settingsCard}>
              {section.items.map((item, index) => (
                <TouchableOpacity
                  key={item.label}
                  style={[
                    styles.settingRow,
                    index < section.items.length - 1 && styles.settingRowBorder,
                  ]}
                  onPress={item.type === 'link' ? item.onPress : undefined}
                  activeOpacity={item.type === 'link' ? 0.7 : 1}
                >
                  <View style={styles.settingLeft}>
                    <Ionicons name={item.icon} size={20} color={Colors.purple} />
                    <View style={styles.settingText}>
                      <Text style={styles.settingLabel}>{item.label}</Text>
                      {item.subtitle && (
                        <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                      )}
                    </View>
                  </View>
                  {item.type === 'switch' ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onToggle}
                      trackColor={{ false: Colors.gray200, true: Colors.purpleLight }}
                      thumbColor={item.value ? Colors.purple : Colors.gray300}
                    />
                  ) : (
                    <Ionicons name="chevron-forward" size={18} color={Colors.gray300} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>MFM Mega Region 2 USA</Text>
          <Text style={styles.footerVersion}>Version 1.0.0</Text>
          <Text style={styles.footerMotto}>
            "To God be the glory, great things He has done"
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.offWhite },
  header: {
    backgroundColor: Colors.purpleDeep,
    paddingTop: 54, paddingBottom: 16, paddingHorizontal: Spacing.base,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: Colors.white },
  content: { flex: 1 },

  // Profile Card
  profileCard: {
    backgroundColor: Colors.purpleDeep, alignItems: 'center',
    paddingBottom: Spacing['2xl'], paddingTop: Spacing.base,
  },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: Colors.purpleSoft, justifyContent: 'center', alignItems: 'center',
    marginBottom: 12, borderWidth: 3, borderColor: Colors.purpleLight,
  },
  profileName: { fontSize: 22, fontWeight: '800', color: Colors.white },
  profileEmail: { fontSize: 14, color: Colors.purpleLight, marginTop: 2 },
  editBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: Colors.purpleSoft + '30', paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: Radius.full, marginTop: 12,
  },
  editBtnText: { fontSize: 14, fontWeight: '600', color: Colors.purpleLight },

  // Branch Section
  branchSection: { paddingHorizontal: Spacing.base, marginTop: Spacing.lg },
  sectionLabel: {
    fontSize: 11, fontWeight: '800', color: Colors.gray500,
    letterSpacing: 1.5, marginBottom: 8,
  },
  branchSelector: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: Colors.white, borderRadius: Radius.lg,
    padding: Spacing.base, ...Shadows.sm,
  },
  branchInfo: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  branchText: {},
  branchName: { fontSize: 15, fontWeight: '700', color: Colors.gray800 },
  branchCity: { fontSize: 12, color: Colors.gray500 },
  branchList: {
    backgroundColor: Colors.white, borderRadius: Radius.lg,
    marginTop: 8, ...Shadows.sm, maxHeight: 300,
  },
  branchOption: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: Spacing.base, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: Colors.gray100,
  },
  branchOptionActive: { backgroundColor: Colors.purpleSoft },
  branchOptionText: { fontSize: 14, fontWeight: '600', color: Colors.gray700, flex: 1 },
  branchOptionTextActive: { color: Colors.purple },
  branchOptionCity: { fontSize: 12, color: Colors.gray400, marginRight: 8 },

  // Membership Card
  membershipCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.goldSoft, borderRadius: Radius.lg,
    padding: Spacing.base, marginHorizontal: Spacing.base, marginTop: Spacing.lg,
    borderWidth: 1, borderColor: Colors.goldLight,
  },
  membershipIcon: {
    width: 48, height: 48, borderRadius: 14,
    backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center',
    marginRight: 12,
  },
  membershipInfo: { flex: 1 },
  membershipTitle: { fontSize: 12, fontWeight: '700', color: Colors.gray500, textTransform: 'uppercase' },
  membershipStatus: { fontSize: 16, fontWeight: '800', color: Colors.gold, marginTop: 2 },
  membershipNote: { fontSize: 12, color: Colors.gray500, marginTop: 2, lineHeight: 16 },

  // Settings
  settingsSection: { paddingHorizontal: Spacing.base, marginTop: Spacing.xl },
  settingsCard: {
    backgroundColor: Colors.white, borderRadius: Radius.lg, ...Shadows.sm,
  },
  settingRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.base, paddingVertical: 14,
  },
  settingRowBorder: { borderBottomWidth: 1, borderBottomColor: Colors.gray100 },
  settingLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 12 },
  settingText: { flex: 1 },
  settingLabel: { fontSize: 15, fontWeight: '500', color: Colors.gray800 },
  settingSubtitle: { fontSize: 12, color: Colors.gray400, marginTop: 1 },

  // Footer
  footer: {
    alignItems: 'center', paddingVertical: Spacing['3xl'],
    paddingHorizontal: Spacing.xl,
  },
  footerText: { fontSize: 14, fontWeight: '700', color: Colors.gray400 },
  footerVersion: { fontSize: 12, color: Colors.gray300, marginTop: 2 },
  footerMotto: {
    fontSize: 13, color: Colors.gray400, fontStyle: 'italic',
    textAlign: 'center', marginTop: 8,
  },
});
