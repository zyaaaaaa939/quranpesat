import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native'
import { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

const API_URL = 'https://asmaul-husna-api.vercel.app/api/all'

type AsmaulHusna = {
  urutan: number
  latin: string
  arab: string
  arti: string
}

export default function AsmaulHusnaPage() {
  const [data, setData] = useState<AsmaulHusna[]>([])
  const [filtered, setFiltered] = useState<AsmaulHusna[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [favorites, setFavorites] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState<'semua' | 'favorit'>('semua')

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(json => {
        setData(json.data)
        setFiltered(json.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    let result = data

    if (search) {
      result = result.filter(item =>
        item.latin.toLowerCase().includes(search.toLowerCase()) ||
        item.arti.toLowerCase().includes(search.toLowerCase()) ||
        item.arab.includes(search)
      )
    }

    if (activeTab === 'favorit') {
      result = result.filter(item => favorites.includes(item.urutan))
    }

    setFiltered(result)
  }, [search, activeTab, favorites, data])

  const toggleFavorite = (urutan: number) => {
    if (favorites.includes(urutan)) {
      setFavorites(favorites.filter(n => n !== urutan))
    } else {
      setFavorites([...favorites, urutan])
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
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#2c3e3e" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Asmaul Husna</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={22} color="#2c3e3e" />
        </TouchableOpacity>
      </View>

      {/* search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#9A9A9A" />
          <TextInput
            placeholder="Cari Asmaul Husna..."
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
        <TouchableOpacity
          style={[styles.tab, activeTab === 'semua' && styles.tabAktif]}
          onPress={() => setActiveTab('semua')}
        >
          <Text style={[styles.tabText, activeTab === 'semua' && styles.tabTextAktif]}>
            Semua
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'favorit' && styles.tabAktif]}
          onPress={() => setActiveTab('favorit')}
        >
          <Text style={[styles.tabText, activeTab === 'favorit' && styles.tabTextAktif]}>
            Favorit ({favorites.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* grid */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.urutan.toString()}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.gridContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity style={styles.favoriteBtn} onPress={() => toggleFavorite(item.urutan)}>
              <Ionicons
                name={favorites.includes(item.urutan) ? 'star' : 'star-outline'}
                size={20}
                color="#6E8B86"
              />
            </TouchableOpacity>

            <Text style={styles.arab}>{item.arab}</Text>
            <Text style={styles.latin}>{item.latin}</Text>
            <Text style={styles.arti}>{item.arti}</Text>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>#{item.urutan}</Text>
            </View>
          </View>
        )}
      />
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
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: '#E0DDD6',
    marginRight: 12,
  },
  tabAktif: {
    backgroundColor: '#7F9692',
  },
  tabText: {
    color: '#5F5F5F',
  },
  tabTextAktif: {
    color: '#FFF',
    fontWeight: '600',
  },

  gridContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  gridRow: {
    justifyContent: 'space-between',
  },

  card: {
    backgroundColor: '#ECE8E2',
    width: '48%',
    marginBottom: 18,
    padding: 14,
    borderRadius: 18,
    position: 'relative',
  },

  favoriteBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },

  arab: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
    lineHeight: 36,
    color: '#1f2e2e',
  },
  latin: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    color: '#2f3a3a',
  },
  arti: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginTop: 4,
  },

  badge: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    backgroundColor: '#D6D3CE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    color: '#555',
  },
})