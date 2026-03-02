import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function Lainnya() {
  const router = useRouter()

  const menus = [
    { title: 'Al-Quran', icon: 'book-outline', route: '/quran' },
    { title: 'Doa Harian', icon: 'chatbubble-outline', route: '/doa' },
    { title: 'Dzikir Duha', icon: 'heart-outline', route: '/dzikir' },
    { title: 'Hadits', icon: 'document-text-outline', route: '/hadits' },
    { title: 'Arah Kiblat', icon: 'compass-outline', route: '/kiblat' },
    { title: 'Donasi', icon: 'cash-outline', route: '/donasi' },
    { title: 'Asmaul Husna', icon: 'book-outline', route: '/asmaul' },
  ]

  const lainnya = [
    {
      title: 'Kalender Hijriah',
      desc: 'Tanggal hijriah hari ini dan info singkat',
      icon: 'calendar-outline',
      route: '/hijriah',
    },
    {
      title: 'Zakat Calculator',
      desc: 'Hitung zakat mal dengan cepat',
      icon: 'calculator-outline',
      route: '/zakat',
    },
    {
      title: 'Kajian Online',
      desc: 'Kajian dari berbagai sumber',
      icon: 'play-circle-outline',
      route: '/kajian',
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#2c3e3e" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lainnya</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#2c3e3e" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* grid baris 1 */}
        <View style={styles.gridRow}>
          {menus.slice(0, 4).map((item, i) => (
            <TouchableOpacity key={i} style={styles.gridItem} onPress={() => router.push(item.route as any)}>
              <View style={styles.icon}>
                <Ionicons name={item.icon as any} size={24} color="#6A8D87" />
              </View>
              <Text style={styles.namaMenu}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* grid baris 2 */}
        <View style={styles.gridRow}>
          {menus.slice(4, 7).map((item, i) => (
            <TouchableOpacity key={i + 4} style={styles.gridItem} onPress={() => router.push(item.route as any)}>
              <View style={styles.icon}>
                <Ionicons name={item.icon as any} size={24} color="#6A8D87" />
              </View>
              <Text style={styles.namaMenu}>{item.title}</Text>
            </TouchableOpacity>
          ))}
          <View style={[styles.gridItem, { opacity: 0 }]}>
            <View style={styles.icon} />
            <Text style={styles.namaMenu}> </Text>
          </View>
        </View>

        {/* section title */}
        <Text style={styles.section}>LAINNYA</Text>

        {/* list lainnya */}
        {lainnya.map((item, i) => (
          <TouchableOpacity key={i} style={styles.card} onPress={() => router.push(item.route as any)}>
            <View style={styles.cardLeft}>
              <View style={styles.cardIcon}>
                <Ionicons name={item.icon as any} size={22} color="#6A8D87" />
              </View>
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDesc}>{item.desc}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9BAFA8" />
          </TouchableOpacity>
        ))}

        <View style={{ height: 40 }} />
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

  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 12,
    marginTop: 20,
  },
  gridItem: {
    alignItems: 'center',
    width: 70,
  },
  icon: {
    backgroundColor: '#F0F2E9',
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E0E6D8',
    shadowColor: '#6A8D87',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  namaMenu: {
    fontSize: 11,
    marginTop: 4,
    color: '#4A5A54',
    fontWeight: '500',
    textAlign: 'center',
    width: 70,
  },

  section: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E3E',
    marginLeft: 20,
    marginTop: 25,
    marginBottom: 12,
  },

  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 12,
    padding: 16,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0EADE',
    shadowColor: '#6A8D87',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F2E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: '#E0E6D8',
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: 16,
    color: '#2C3E3E',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 13,
    color: '#6A7A76',
    lineHeight: 18,
  },
})