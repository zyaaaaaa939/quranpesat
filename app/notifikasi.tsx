import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function Notifikasi() {
  const router = useRouter()

  const [sholat, setSholat] = useState(true)
  const [ayat, setAyat] = useState(true)
  const [tadarus, setTadarus] = useState(false)

  const Item = ({ icon, title, subtitle, value, onValueChange }: any) => (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.icon}>
          <Ionicons name={icon} size={20} color="#6b7c7c" />
        </View>
        <View>
          <Text style={styles.judul}>{title}</Text>
          <Text style={styles.desc}>{subtitle}</Text>
        </View>
      </View>
      <Switch value={value} onValueChange={onValueChange} />
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#2c3e3e" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifikasi</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#2c3e3e" />
        </TouchableOpacity>
      </View>

      {/* content */}
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Item
            icon="time-outline"
            title="Waktu Sholat"
            subtitle="Pengingat adzan setiap waktu sholat"
            value={sholat}
            onValueChange={setSholat}
          />
          <Item
            icon="book-outline"
            title="Ayat Harian"
            subtitle="Notifikasi ayat Al-Quran setiap hari"
            value={ayat}
            onValueChange={setAyat}
          />
          <Item
            icon="moon-outline"
            title="Pengingat Tadarus"
            subtitle="Pengingat membaca Al-Quran"
            value={tadarus}
            onValueChange={setTadarus}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F2',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0d8cc',
    backgroundColor: '#FAF7F2',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e3e',
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  card: {
    backgroundColor: '#f1ede5',
    borderRadius: 18,
    paddingVertical: 6,
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e4ded2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  judul: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2f3a3a',
    marginBottom: 2,
  },
  desc: {
    fontSize: 13,
    color: '#6A7A76',
  },
})