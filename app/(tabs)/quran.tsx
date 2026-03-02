import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Image,
} from 'react-native'
import { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

type Surah = {
  nomor: number
  nama: string
  nama_latin: string
  jumlah_ayat: number
  arti: string
}

export default function QuranPage() {
  const [data, setData] = useState<Surah[]>([])
  const [filtered, setFiltered] = useState<Surah[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('https://quran-api.santrikoding.com/api/surah')
      .then(res => res.json())
      .then(json => {
        setData(json)
        setFiltered(json)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleSearch = (text: string) => {
    setSearch(text)
    const result = data.filter(
      item =>
        item.nama_latin.toLowerCase().includes(text.toLowerCase()) ||
        item.arti.toLowerCase().includes(text.toLowerCase()) ||
        item.nomor.toString().includes(text)
    )
    setFiltered(result)
  }

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
        <Text style={styles.headerTitle}>Al-Qur'an</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#2c3e3e" />
        </TouchableOpacity>
      </View>

      {/* search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#9A9A9A" />
          <TextInput
            placeholder="Cari surah..."
            placeholderTextColor="#9A9A9A"
            value={search}
            onChangeText={handleSearch}
            style={styles.searchInput}
          />
          {search !== '' && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={18} color="#9A9A9A" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* list surah */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.nomor.toString()}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => router.push({ pathname: '/surah', params: { nomor: item.nomor } })}
          >
            <View style={styles.numberWrapper}>
              <Image source={require('@/assets/images/ayat.png')} style={styles.ayatFrame} resizeMode="contain" />
              <Text style={styles.numberText}>{item.nomor}</Text>
            </View>

            <View style={styles.middle}>
              <Text style={styles.latin}>{item.nama_latin}</Text>
              <Text style={styles.arti}>{item.arti}</Text>
              <Text style={styles.ayat}>{item.jumlah_ayat} Ayat</Text>
            </View>

            <Text style={styles.arab}>{item.nama}</Text>
          </TouchableOpacity>
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

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e0d8cc',
  },

  numberWrapper: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  ayatFrame: {
    position: 'absolute',
    width: 42,
    height: 42,
  },
  numberText: {
    fontWeight: '700',
    color: '#6A8D87',
    fontSize: 13,
  },

  middle: {
    flex: 1,
  },
  latin: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1f2e2e',
  },
  arti: {
    fontSize: 12,
    color: '#777',
    marginVertical: 2,
  },
  ayat: {
    fontSize: 11,
    color: '#999',
  },

  arab: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2E7D32',
  },
})