import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import { Colors, Shadows } from '../theme/colors';
import { Spacing, Radius } from '../theme/typography';
import { useAppData } from '../services/DataProvider';
import { departments } from '../data/mockData';

const TABS = ['Branches', 'Departments'];

export default function DirectoryScreen({ navigation }) {
  const { branches } = useAppData();
  const [activeTab, setActiveTab] = useState('Branches');
  const [search, setSearch] = useState('');

  const filteredBranches = useMemo(() => {
    if (!search) return branches;
    return branches.filter(b =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.city.toLowerCase().includes(search.toLowerCase()) ||
      b.address.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, branches]);

  const stateGroups = useMemo(() => {
    const groups = {};
    filteredBranches.forEach(b => { if (!groups[b.state]) groups[b.state] = []; groups[b.state].push(b); });
    return groups;
  }, [filteredBranches]);

  const handleCall = (phone) => Linking.openURL(`tel:${phone.replace(/[^\d+]/g, '')}`);
  const handleEmail = (email) => Linking.openURL(`mailto:${email}`);
  const handleMap = (address) => Linking.openURL(`https://maps.google.com/?q=${encodeURIComponent(address)}`);

  return (
    <View style={styles.container}>
      <Header title="Directory" subtitle="Branches & Departments" />
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color={Colors.gray400} />
          <TextInput style={styles.searchInput} placeholder="Search branches, cities..." placeholderTextColor={Colors.gray400} value={search} onChangeText={setSearch} />
          {search ? <TouchableOpacity onPress={() => setSearch('')}><Ionicons name="close-circle" size={18} color={Colors.gray400} /></TouchableOpacity> : null}
        </View>
      </View>
      <View style={styles.tabBar}>
        {TABS.map((tab) => (
          <TouchableOpacity key={tab} style={[styles.tab, activeTab === tab && styles.tabActive]} onPress={() => setActiveTab(tab)}>
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'Branches' && (
          <View>
            {Object.keys(stateGroups).length === 0 && (
              <View style={styles.emptyState}><Ionicons name="search" size={40} color={Colors.gray300} /><Text style={styles.emptyText}>No branches found</Text></View>
            )}
            {Object.entries(stateGroups).map(([state, stateBranches]) => (
              <View key={state}>
                <Text style={styles.stateHeader}>{state === 'TX' ? 'TEXAS' : 'FLORIDA'} ({stateBranches.length})</Text>
                {stateBranches.map((branch) => (
                  <View key={branch.id} style={styles.branchCard}>
                    <View style={styles.branchHeader}>
                      <View style={[styles.branchDot, branch.isHQ && { backgroundColor: Colors.fire }]} />
                      <Text style={styles.branchName}>{branch.name}</Text>
                      {branch.isHQ && <View style={styles.hqBadge}><Text style={styles.hqText}>HQ</Text></View>}
                    </View>
                    <TouchableOpacity style={styles.branchRow} onPress={() => handleMap(branch.address)}>
                      <Ionicons name="location-outline" size={16} color={Colors.gray400} />
                      <Text style={styles.branchAddress}>{branch.address}</Text>
                      <Ionicons name="navigate-outline" size={14} color={Colors.purpleLight} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.branchRow} onPress={() => handleCall(branch.phone)}>
                      <Ionicons name="call-outline" size={16} color={Colors.gray400} />
                      <Text style={styles.branchPhone}>{branch.phone}</Text>
                    </TouchableOpacity>
                    {branch.email ? (
                      <TouchableOpacity style={styles.branchRow} onPress={() => handleEmail(branch.email)}>
                        <Ionicons name="mail-outline" size={16} color={Colors.gray400} />
                        <Text style={styles.branchEmail}>{branch.email}</Text>
                      </TouchableOpacity>
                    ) : null}
                    <View style={styles.branchActions}>
                      <TouchableOpacity style={styles.actionBtn} onPress={() => handleCall(branch.phone)}><Ionicons name="call" size={16} color={Colors.purple} /><Text style={styles.actionText}>Call</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.actionBtn} onPress={() => handleMap(branch.address)}><Ionicons name="navigate" size={16} color={Colors.purple} /><Text style={styles.actionText}>Directions</Text></TouchableOpacity>
                      {branch.email ? <TouchableOpacity style={styles.actionBtn} onPress={() => handleEmail(branch.email)}><Ionicons name="mail" size={16} color={Colors.purple} /><Text style={styles.actionText}>Email</Text></TouchableOpacity> : null}
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
        )}
        {activeTab === 'Departments' && (
          <View style={styles.deptGrid}>
            {departments.map((dept) => (
              <View key={dept.id} style={styles.deptCard}>
                <View style={styles.deptIcon}><Ionicons name={dept.icon} size={24} color={Colors.purple} /></View>
                <Text style={styles.deptName}>{dept.name}</Text>
                <Text style={styles.deptDesc}>{dept.description}</Text>
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
  searchRow: { paddingHorizontal: Spacing.base, paddingVertical: Spacing.sm, backgroundColor: Colors.white },
  searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.gray50, borderRadius: Radius.md, paddingHorizontal: Spacing.md, height: 42, borderWidth: 1, borderColor: Colors.gray200 },
  searchInput: { flex: 1, fontSize: 14, color: Colors.gray800, marginLeft: 8 },
  tabBar: { flexDirection: 'row', backgroundColor: Colors.white, paddingHorizontal: Spacing.base, paddingBottom: Spacing.sm, gap: 8, borderBottomWidth: 1, borderBottomColor: Colors.gray100 },
  tab: { paddingHorizontal: Spacing.base, paddingVertical: Spacing.sm, borderRadius: Radius.full, backgroundColor: Colors.gray50 },
  tabActive: { backgroundColor: Colors.purple },
  tabText: { fontSize: 14, fontWeight: '600', color: Colors.gray500 },
  tabTextActive: { color: Colors.white },
  content: { flex: 1, padding: Spacing.base },
  stateHeader: { fontSize: 12, fontWeight: '800', color: Colors.gray500, letterSpacing: 1.5, marginTop: Spacing.base, marginBottom: Spacing.sm },
  branchCard: { backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.base, marginBottom: Spacing.md, ...Shadows.sm },
  branchHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  branchDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: Colors.purple, marginRight: 10 },
  branchName: { fontSize: 16, fontWeight: '700', color: Colors.gray800, flex: 1 },
  hqBadge: { backgroundColor: Colors.fire + '18', paddingHorizontal: 8, paddingVertical: 2, borderRadius: Radius.full },
  hqText: { fontSize: 9, fontWeight: '800', color: Colors.fire, letterSpacing: 1 },
  branchRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 4 },
  branchAddress: { fontSize: 13, color: Colors.gray600, flex: 1 },
  branchPhone: { fontSize: 13, color: Colors.gray600 },
  branchEmail: { fontSize: 13, color: Colors.purple, fontWeight: '500' },
  branchActions: { flexDirection: 'row', gap: 8, marginTop: 12, paddingTop: 10, borderTopWidth: 1, borderTopColor: Colors.gray100 },
  actionBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: Colors.purpleSoft, paddingHorizontal: 12, paddingVertical: 8, borderRadius: Radius.full },
  actionText: { fontSize: 12, fontWeight: '600', color: Colors.purple },
  emptyState: { alignItems: 'center', paddingVertical: 40 },
  emptyText: { fontSize: 15, color: Colors.gray400, marginTop: 10 },
  deptGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  deptCard: { width: '47%', backgroundColor: Colors.white, borderRadius: Radius.lg, padding: Spacing.base, ...Shadows.sm },
  deptIcon: { width: 44, height: 44, borderRadius: 14, backgroundColor: Colors.purpleSoft, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  deptName: { fontSize: 14, fontWeight: '700', color: Colors.gray800 },
  deptDesc: { fontSize: 12, color: Colors.gray500, marginTop: 2 },
});
