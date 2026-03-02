import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Share,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'

export default function HadistDetail() {
  const params = useLocalSearchParams()
  const [disimpan, setDisimpan] = useState(false)
  const [loading, setLoading] = useState(false)

  const { no, judul, arab, indo } = params

  const bagikan = async () => {
    try {
      await Share.share({
        message: `${judul}\n\n${arab}\n\n${indo}`,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const toggleSimpan = () => {
    setDisimpan(!disimpan)
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

        <Text style={styles.headerTitle} numberOfLines={1}>
          Hadits #{no}
        </Text>

        <View style={styles.headerRight}>
          <TouchableOpacity onPress={toggleSimpan} style={styles.btnHeader}>
            <Ionicons
              name={disimpan ? 'bookmark' : 'bookmark-outline'}
              size={22}
              color={disimpan ? '#6A8D87' : '#2c3e3e'}
            />
          </TouchableOpacity>
          
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* judul */}
        <View style={styles.titleContainer}>
          <Text style={styles.nomor}>Hadits #{no}</Text>
          <Text style={styles.judul}>{judul}</Text>
        </View>

        <View style={styles.garis} />

        {/* arab */}
        <View style={styles.arabBox}>
          <Text style={styles.arab}>{arab}</Text>
        </View>

        <View style={styles.garis} />

        {/* terjemahan */}
        <View style={styles.indoBox}>
          <Text style={styles.indoLabel}>Terjemahan:</Text>
          <Text style={styles.indo}>{indo}</Text>
        </View>

        {/* footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Sumber: Kitab Hadits Shahih</Text>
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
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  btnHeader: {
    padding: 4,
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  titleContainer: {
    marginTop: 24,
    marginBottom: 16,
  },
  nomor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9BAFA8',
    marginBottom: 8,
  },
  judul: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2C3E3E',
    lineHeight: 30,
  },

  garis: {
    height: 1,
    backgroundColor: '#e0d8cc',
    marginVertical: 20,
  },

  arabBox: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F0EADE',
    shadowColor: '#6A8D87',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  arab: {
    fontSize: 24,
    lineHeight: 45,
    fontWeight: '500',
    color: '#1f2e2e',
    textAlign: 'right',
    writingDirection: 'rtl',
  },

  indoBox: {
    marginBottom: 20,
  },
  indoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E3E',
    marginBottom: 12,
  },
  indo: {
    fontSize: 16,
    lineHeight: 26,
    color: '#4A5A54',
  },

  footer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0d8cc',
  },
  footerText: {
    fontSize: 13,
    color: '#9BAFA8',
    fontStyle: 'italic',
    textAlign: 'center',
  },
})