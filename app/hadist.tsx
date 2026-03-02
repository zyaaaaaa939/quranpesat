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

type Hadits = {
  no: string
  judul: string
  arab: string
  indo: string
}

export default function HaditsPage() {
  const [data, setData] = useState<Hadits[]>([])
  const [filtered, setFiltered] = useState<Hadits[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [saved, setSaved] = useState<string[]>([])

  useEffect(() => {
    fetch('https://muslim-api-three.vercel.app/v1/hadits')
      .then(res => res.json())
      .then(json => {
        setData(json.data)
        setFiltered(json.data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (search.trim() === '') {
      setFiltered(data)
    } else {
      const hasil = data.filter(item => 
        item.judul.toLowerCase().includes(search.toLowerCase())
      )
      setFiltered(hasil)
    }
  }, [search, data])

  const toggleSimpan = (no: string) => {
    if (saved.includes(no)) {
      setSaved(saved.filter(id => id !== no))
    } else {
      setSaved([...saved, no])
    }
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
        <Text style={styles.headerTitle}>Hadits</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#2c3e3e" />
        </TouchableOpacity>
      </View>

      {/* search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#9A9A9A" />
          <TextInput
            placeholder="Cari hadits..."
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
        {/* list hadits */}
        {filtered.length === 0 ? (
          <View style={styles.kosong}>
            <Ionicons name="search-outline" size={48} color="#ccc" />
            <Text style={styles.kosongText}>Tidak ada hadits ditemukan</Text>
          </View>
        ) : (
          filtered.map(item => (
            <TouchableOpacity
              key={item.no}
              style={styles.card}
              activeOpacity={0.7}
              onPress={() => router.push({
                pathname: '/haditsdetail',
                params: {
                  no: item.no,
                  judul: item.judul,
                  arab: item.arab,
                  indo: item.indo,
                },
              })}
            >
              <Text style={styles.nomor}>Hadits #{item.no}</Text>
              <Text style={styles.judul}>{item.judul}</Text>

              <Text style={styles.arab} numberOfLines={2}>
                {item.arab}
              </Text>

              <Text style={styles.indo} numberOfLines={2}>
                {item.indo}
              </Text>

              <TouchableOpacity style={styles.simpan} onPress={() => toggleSimpan(item.no)}>
                <Ionicons
                  name={saved.includes(item.no) ? 'bookmark' : 'bookmark-outline'}
                  size={22}
                  color={saved.includes(item.no) ? '#6A8D87' : '#9BAFA8'}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        )}

        <View style={{ height: 30 }} />
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

  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F0EADE',
    shadowColor: '#6A8D87',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },

  nomor: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9BAFA8',
    marginBottom: 6,
    marginRight: 30,
  },

  judul: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E3E',
    lineHeight: 22,
    marginBottom: 10,
    marginRight: 30,
  },

  arab: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '500',
    color: '#1f2e2e',
    textAlign: 'right',
    marginBottom: 8,
    writingDirection: 'rtl',
  },

  indo: {
    fontSize: 13,
    lineHeight: 18,
    color: '#4A5A54',
    marginBottom: 4,
  },

  simpan: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 4,
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