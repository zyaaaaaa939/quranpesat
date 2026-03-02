import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Linking,
  TextInput,
} from 'react-native'
import { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

const RSS_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://republika.co.id/rss/khazanah'

export default function ArtikelPage() {
  const [articles, setArticles] = useState<any[]>([])
  const [filtered, setFiltered] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch(RSS_URL)
      .then(res => res.json())
      .then(json => {
        setArticles(json.items || [])
        setFiltered(json.items || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (search.trim() === '') {
      setFiltered(articles)
    } else {
      const hasil = articles.filter(item => 
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase())
      )
      setFiltered(hasil)
    }
  }, [search, articles])

  const bukaArtikel = (url: string) => {
    Linking.openURL(url)
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
          <Ionicons name="arrow-back" size={24} color="#2c3e3e" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Artikel</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#2c3e3e" />
        </TouchableOpacity>
      </View>

      {/* search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#9A9A9A" />
          <TextInput
            placeholder="Cari artikel..."
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

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* kategori */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.kategoriWrap}>
          {['Semua', 'Islam', 'Ramadhan', 'Ibadah', 'Kisah Nabi', 'Tafsir'].map((item, i) => (
            <Text key={i} style={[styles.kategori, i === 0 && styles.kategoriAktif]}>
              {item}
            </Text>
          ))}
        </ScrollView>

        {/* daftar artikel */}
        {filtered.length === 0 ? (
          <View style={styles.kosong}>
            <Ionicons name="search-outline" size={48} color="#ccc" />
            <Text style={styles.kosongText}>Tidak ada artikel ditemukan</Text>
          </View>
        ) : (
          filtered.map((item, i) => (
            <View key={i} style={styles.card}>
              <Image source={{ uri: item.thumbnail || item.enclosure?.link }} style={styles.gambar} />

              <View style={styles.konten}>
                <View style={styles.barisAtas}>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>Islam</Text>
                  </View>
                  <Text style={styles.tanggal}>
                    {new Date(item.pubDate).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </Text>
                </View>

                <Text style={styles.judul}>{item.title}</Text>
                <Text numberOfLines={3} style={styles.deskripsi}>
                  {item.description.replace(/<[^>]+>/g, '')}
                </Text>

                <View style={styles.barisBawah}>
                  <Text style={styles.penulis}>{item.author || 'Republika'}</Text>
                  <TouchableOpacity onPress={() => bukaArtikel(item.link)}>
                    <Text style={styles.baca}>Baca Selengkapnya ↗</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* nav bawah */}
      <View style={styles.navBawah}>
        <Ionicons name="home-outline" size={24} color="#A0A0A0" />
        <Ionicons name="book-outline" size={24} color="#A0A0A0" />
        <Ionicons name="newspaper" size={24} color="#7F9692" />
        <Ionicons name="settings-outline" size={24} color="#A0A0A0" />
      </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0d8cc',
    backgroundColor: '#F3EEE6',
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

  kategoriWrap: {
    paddingHorizontal: 18,
    marginTop: 8,
    marginBottom: 16,
  },
  kategori: {
    marginRight: 18,
    fontSize: 15,
    color: '#9A9A9A',
  },
  kategoriAktif: {
    color: '#7F9692',
    fontWeight: '600',
  },

  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 18,
    marginBottom: 24,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0d8cc',
  },
  gambar: {
    width: '100%',
    height: 200,
  },
  konten: {
    padding: 16,
  },

  barisAtas: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#E5E5E5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    color: '#666',
  },
  tanggal: {
    fontSize: 13,
    color: '#9A9A9A',
  },

  judul: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2E2E2E',
    marginBottom: 8,
  },
  deskripsi: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },

  barisBawah: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
    alignItems: 'center',
  },
  penulis: {
    fontSize: 13,
    color: '#9A9A9A',
  },
  baca: {
    fontSize: 14,
    color: '#7F9692',
    fontWeight: '600',
  },

  navBawah: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 14,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e0d8cc',
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