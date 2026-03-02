import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

const API_URL = 'https://open-api.my.id/api/doa'

export default function DoaPage() {
  const [data, setData] = useState<any[]>([])
  const [filtered, setFiltered] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [favorites, setFavorites] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState<'semua' | 'favorit'>('semua')

  const fetchData = () => {
    setLoading(true)
    fetch(API_URL)
      .then(res => res.json())
      .then(json => {
        setData(json)
        setFiltered(json)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    let result = data

    if (search) {
      result = result.filter(item =>
        item.judul.toLowerCase().includes(search.toLowerCase()) ||
        item.arti.toLowerCase().includes(search.toLowerCase()) ||
        item.latin.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (activeTab === 'favorit') {
      result = result.filter((_, index) =>
        favorites.includes(index)
      )
    }

    setFiltered(result)
  }, [search, activeTab, favorites, data])

  const toggleFavorite = (index: number) => {
    if (favorites.includes(index)) {
      setFavorites(favorites.filter(i => i !== index))
    } else {
      setFavorites([...favorites, index])
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#7F9692" />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View style={styles.header}>
          <Ionicons name="arrow-back" size={24} color="#5F6F65" />
          <Text style={styles.headerTitle}>Doa Harian</Text>
          <TouchableOpacity onPress={fetchData}>
            <Ionicons name="refresh" size={22} color="#5F6F65" />
          </TouchableOpacity>
        </View>

        {/* SEARCH */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#9A9A9A" />
          <TextInput
            placeholder="Cari judul, arti, latin..."
            placeholderTextColor="#9A9A9A"
            style={{ flex: 1, marginLeft: 10 }}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* TAB */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'semua' && styles.tabActive,
            ]}
            onPress={() => setActiveTab('semua')}
          >
            <Text
              style={
                activeTab === 'semua'
                  ? styles.tabTextActive
                  : styles.tabText
              }
            >
              Semua
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'favorit' && styles.tabActive,
            ]}
            onPress={() => setActiveTab('favorit')}
          >
            <Text
              style={
                activeTab === 'favorit'
                  ? styles.tabTextActive
                  : styles.tabText
              }
            >
              Favorit ({favorites.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* LIST DOA */}
        {filtered.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            activeOpacity={0.85}
            onPress={() =>
              router.push({
                pathname: '/detaildoa',
                params: {
                  judul: item.judul,
                  arab: item.arab,
                  arti: item.arti,
                  latin: item.latin,
                },
              })
            }
          >
            <View style={styles.cardHeader}>
              <Text style={styles.title}>{item.judul}</Text>

              <TouchableOpacity onPress={() => toggleFavorite(index)}>
                <Ionicons
                  name={favorites.includes(index) ? 'star' : 'star-outline'}
                  size={22}
                  color="#6E8B86"
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.arab}>{item.arab}</Text>

            <Text numberOfLines={2} style={styles.arti}>
              {item.arti}
            </Text>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>#{index + 1}</Text>
            </View>
          </TouchableOpacity>
        ))}

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3EEE6',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3EEE6',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 14,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2E2E2E',
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8E4DC',
    marginHorizontal: 18,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
  },

  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 18,
    marginBottom: 20,
  },

  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#E0DDD6',
    marginRight: 12,
  },

  tabActive: {
    backgroundColor: '#7F9692',
  },

  tabText: {
    color: '#5F5F5F',
  },

  tabTextActive: {
    color: '#FFF',
    fontWeight: '600',
  },

  card: {
    backgroundColor: '#ECE8E2',
    marginHorizontal: 18,
    marginBottom: 18,
    padding: 18,
    borderRadius: 20,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2E3440',
  },

  arab: {
    fontSize: 16,
    textAlign: 'right',
    marginTop: 6,
    marginBottom: 10,
    color: '#2F2F2F',
  },

  arti: {
    fontSize: 14,
    color: '#555',
  },

  badge: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#D6D3CE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },

  badgeText: {
    fontSize: 12,
    color: '#555',
  },
})