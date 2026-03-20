import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Platform } from 'react-native';
import { Colors } from '../theme/colors';

import HomeScreen from '../screens/HomeScreen';
import EventsScreen from '../screens/EventsScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import DevotionalsScreen from '../screens/DevotionalsScreen';
import DevotionalDetailScreen from '../screens/DevotionalDetailScreen';
import PrayerRequestsScreen from '../screens/PrayerRequestsScreen';
import DirectoryScreen from '../screens/DirectoryScreen';
import AnnouncementsScreen from '../screens/AnnouncementsScreen';
import LivestreamScreen from '../screens/LivestreamScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  HomeTab: { active: 'home', inactive: 'home-outline' },
  LiveTab: { active: 'videocam', inactive: 'videocam-outline' },
  PrayTab: { active: 'flame', inactive: 'flame-outline' },
  DirectoryTab: { active: 'people', inactive: 'people-outline' },
  EventsTab: { active: 'calendar', inactive: 'calendar-outline' },
};

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color }) => {
          const icons = TAB_ICONS[route.name];
          const iconName = focused ? icons.active : icons.inactive;
          return (
            <View style={focused ? {
              backgroundColor: Colors.purple + '15',
              borderRadius: 12, padding: 6, marginTop: 2,
            } : { marginTop: 2, padding: 6 }}>
              <Ionicons name={iconName} size={22} color={color} />
            </View>
          );
        },
        tabBarActiveTintColor: Colors.purple,
        tabBarInactiveTintColor: Colors.gray400,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopWidth: 1,
          borderTopColor: Colors.gray100,
          paddingBottom: Platform.OS === 'ios' ? 24 : 8,
          paddingTop: 4,
          height: Platform.OS === 'ios' ? 88 : 64,
          elevation: 8,
          shadowColor: Colors.purpleDeep,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600', marginTop: -2 },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="LiveTab" component={LivestreamScreen} options={{ tabBarLabel: 'Live' }} />
      <Tab.Screen name="PrayTab" component={PrayerRequestsScreen} options={{ tabBarLabel: 'Pray' }} />
      <Tab.Screen name="DirectoryTab" component={DirectoryScreen} options={{ tabBarLabel: 'Directory' }} />
      <Tab.Screen name="EventsTab" component={EventsScreen} options={{ tabBarLabel: 'Events' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={HomeTabs} />
        <Stack.Screen name="Events" component={EventsScreen} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="EventDetail" component={EventDetailScreen} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="Devotionals" component={DevotionalsScreen} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="DevotionalDetail" component={DevotionalDetailScreen} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="PrayerRequests" component={PrayerRequestsScreen} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="Directory" component={DirectoryScreen} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="Announcements" component={AnnouncementsScreen} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="Livestream" component={LivestreamScreen} options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{ animation: 'slide_from_bottom' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
