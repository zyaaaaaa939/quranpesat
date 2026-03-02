import { Tabs } from 'expo-router'
import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'

import { HapticTab } from '@/components/haptic-tab'
import { IconSymbol } from '@/components/ui/icon-symbol'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: route.name === 'ai' ? { display: 'none' } : styles.tabBar,
        tabBarActiveTintColor: '#4A7A6C',
        tabBarInactiveTintColor: '#A0B2AA',
        tabBarLabelStyle: styles.label,
        tabBarShowLabel: true,
      })}
    >
      {/* beranda */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Beranda',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrapper, focused && styles.iconActive]}>
              <IconSymbol
                name={focused ? 'house.fill' : 'house'}
                size={focused ? 24 : 22}
                color={focused ? '#4A7A6C' : color}
              />
            </View>
          ),
        }}
      />

      {/* quran */}
      <Tabs.Screen
        name="quran"
        options={{
          title: 'Al-Qur\'an',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrapper, focused && styles.iconActive]}>
              <IconSymbol
                name={focused ? 'book.fill' : 'book'}
                size={focused ? 24 : 22}
                color={focused ? '#4A7A6C' : color}
              />
            </View>
          ),
        }}
      />

      {/* ai */}
      <Tabs.Screen
        name="ai"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.aiWrapper, focused && styles.aiActive]}>
              <IconSymbol name="sparkles" size={32} color="#FFF" />
              {focused && (
                <View style={styles.aiBadge}>
                  <Text style={styles.aiBadgeText}>AI</Text>
                </View>
              )}
            </View>
          ),
          tabBarLabel: () => null,
        }}
      />

      {/* artikel */}
      <Tabs.Screen
        name="artikel"
        options={{
          title: 'Artikel',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrapper, focused && styles.iconActive]}>
              <IconSymbol
                name={focused ? 'newspaper.fill' : 'newspaper'}
                size={focused ? 24 : 22}
                color={focused ? '#4A7A6C' : color}
              />
            </View>
          ),
        }}
      />

      {/* pengaturan */}
      <Tabs.Screen
        name="pengaturan"
        options={{
          title: 'Setting',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrapper, focused && styles.iconActive]}>
              <IconSymbol
                name={focused ? 'gearshape.fill' : 'gearshape'}
                size={focused ? 24 : 22}
                color={focused ? '#4A7A6C' : color}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    height: 72,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderWidth: 1,
    borderColor: '#E8E1D4',
    borderBottomWidth: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    shadowColor: '#2C3E4E',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
  },

  label: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2,
    letterSpacing: 0.3,
  },

  iconWrapper: {
    padding: 6,
    borderRadius: 12,
  },

  iconActive: {
    backgroundColor: 'rgba(74, 122, 108, 0.1)',
    transform: [{ scale: 1.1 }],
  },

  aiWrapper: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#6B8F8D',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Platform.OS === 'ios' ? 36 : 30,
    borderWidth: 2,
    borderColor: '#FFF',
    shadowColor: '#2C3E4E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 12,
  },

  aiActive: {
    backgroundColor: '#4A7A6C',
    transform: [{ scale: 1.05 }],
    shadowOpacity: 0.35,
    shadowRadius: 14,
  },

  aiBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF6B6B',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1.5,
    borderColor: '#FFF',
  },

  aiBadgeText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '700',
  },
})