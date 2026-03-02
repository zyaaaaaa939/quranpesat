import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Linking,
  TextInput,
} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function Kajian() {
  const router = useRouter()
  const [search, setSearch] = useState('')

  const kajianList = [
    {
      id: '1',
      title: 'Makna Ikhlas dalam Kehidupan',
      channel: 'Adi Hidayat Official',
      url: 'https://youtube.com/watch?v=dLhEfB38XCM',
    },
    {
      id: '2',
      title: 'Keutamaan Sholat Subuh',
      channel: 'Yufid TV',
      url: 'https://youtube.com/watch?v=0TkdUUmK_28',
    },
    {
      id: '3',
      title: 'Cara Agar Hati Tenang',
      channel: 'Rodja TV',
      url: 'https://youtube.com/watch?v=7VfXWq9U3Jc',
    },
    {
      id: '4',
      title: 'Tafsir Surat Al-Fatihah',
      channel: 'Adi Hidayat Official',
      url: 'https://youtube.com/watch?v=abc123',
    },
    {
      id: '5',
      title: 'Kisah Nabi Musa AS',
      channel: 'Yufid TV',
      url: 'https://youtube.com/watch?v=def456',
    },
    {
      id: '6',
      title: 'Keutamaan Sedekah',
      channel: 'Rodja TV',
      url: 'https://youtube.com/watch?v=ghi789',
    },
  ]

  const filtered = kajianList.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.channel.toLowerCase().includes(search.toLowerCase())
  )

  const openVideo = (url: string) => {
    Linking.openURL(url)
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#2c3e3e" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kajian Online</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#2c3e3e" />
        </TouchableOpacity>
      </View>

      {/* search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#9A9A9A" />
          <TextInput
            placeholder="Cari kajian..."
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

      {/* list */}
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.kosong}>
            <Ionicons name="search-outline" size={48} color="#ccc" />
            <Text style={styles.kosongText}>Tidak ada kajian ditemukan</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => openVideo(item.url)} activeOpacity={0.7}>
            <View style={styles.cardLeft}>
              <View style={styles.iconBox}>
                <Ionicons name="play-circle" size={28} color="#6B8F8D" />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.title} numberOfLines={2}>
                  {item.title}
                </Text>
                <View style={styles.channelBox}>
                  <Ionicons name="person-outline" size={12} color="#9BAFA8" />
                  <Text style={styles.channel}>{item.channel}</Text>
                </View>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9BAFA8" />
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

  list: {
    padding: 16,
    paddingBottom: 30,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#F0EADE',
    shadowColor: '#6A8D87',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F2E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: '#E0E6D8',
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2f3a3a',
    marginBottom: 4,
  },
  channelBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  channel: {
    fontSize: 12,
    color: '#6A7A76',
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