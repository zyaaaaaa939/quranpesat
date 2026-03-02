import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

type Dzikir = {
  type: string
  arab: string
  indo: string
  ulang: string
}

export default function DzikirPage() {
  const [data, setData] = useState<Dzikir[]>([])
  const [filtered, setFiltered] = useState<Dzikir[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('Semua')
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('https://muslim-api-three.vercel.app/v1/dzikir')
      .then(res => res.json())
      .then(json => {
        setData(json.data)
        setFiltered(json.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    let hasil = data

    if (tab === 'Pagi') {
      hasil = hasil.filter(item => item.type === 'pagi')
    } else if (tab === 'Sore') {
      hasil = hasil.filter(item => item.type === 'sore')
    } else if (tab === 'Solat') {
      hasil = hasil.filter(item => item.type === 'sholat')
    }

    if (search.trim() !== '') {
      hasil = hasil.filter(item => 
        item.arab.includes(search) || 
        item.indo.toLowerCase().includes(search.toLowerCase())
      )
    }

    setFiltered(hasil)
  }, [tab, data, search])

  const tabs = ['Semua', 'Pagi', 'Sore', 'Solat']

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#6A8D87" />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#2c3e3e" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dzikir</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#2c3e3e" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* search */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color="#9A9A9A" />
            <TextInput
              placeholder="Cari dzikir..."
              placeholderTextColor="#9A9A9A"
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
            />
            {search !== '' && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Ionicons name="close-circle" size={18} color="#9A9A9A" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* tab */}
        <View style={styles.tabContainer}>
          {tabs.map(item => (
            <TouchableOpacity
              key={item}
              style={[styles.tab, tab === item && styles.tabAktif]}
              onPress={() => setTab(item)}
            >
              <Text style={[styles.tabText, tab === item && styles.tabTextAktif]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* garis */}
        <View style={styles.garis} />

        {/* list dzikir */}
        {filtered.length === 0 ? (
          <View style={styles.kosong}>
            <Ionicons name="search-outline" size={48} color="#ccc" />
            <Text style={styles.kosongText}>Tidak ada dzikir ditemukan</Text>
          </View>
        ) : (
          filtered.map((item, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.nomor}>Dzikir #{index + 1}</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {item.type === 'pagi' ? 'Pagi' : 
                     item.type === 'sore' ? 'Sore' : 
                     item.type === 'sholat' ? 'Solat' : item.type}
                  </Text>
                </View>
              </View>

              <Text style={styles.arab}>{item.arab}</Text>
              <Text style={styles.indo}>{item.indo}</Text>

              {item.ulang && item.ulang !== '1x' && (
                <Text style={styles.ulang}>{item.ulang}</Text>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F2',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8E4DC',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: '#2c3e3e',
    padding: 0,
  },

  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  tab: {
    marginHorizontal: 10,
    paddingBottom: 8,
  },
  tabAktif: {
    borderBottomWidth: 2,
    borderBottomColor: '#6A8D87',
  },
  tabText: {
    fontSize: 15,
    color: '#8a9b9b',
    fontWeight: '500',
  },
  tabTextAktif: {
    color: '#1f2e2e',
    fontWeight: '600',
  },

  garis: {
    height: 1,
    backgroundColor: '#d9d0c0',
    marginHorizontal: 16,
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e0d8cc',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  nomor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4a5b5b',
  },
  badge: {
    backgroundColor: '#e5ddd0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#4a5b5b',
  },

  arab: {
    fontSize: 22,
    lineHeight: 38,
    fontWeight: '500',
    color: '#1f2e2e',
    textAlign: 'right',
    marginBottom: 12,
    writingDirection: 'rtl',
  },
  indo: {
    fontSize: 14,
    lineHeight: 20,
    color: '#4a5b5b',
    marginBottom: 8,
  },
  ulang: {
    fontSize: 12,
    color: '#6A8D87',
    fontWeight: '500',
    marginTop: 4,
  },

  kosong: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  kosongText: {
    fontSize: 16,
    color: '#999',
    marginTop: 12,
  },
})