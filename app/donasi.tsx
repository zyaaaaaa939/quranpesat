import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  Share,
} from 'react-native'

import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function Donasi() {
  const progress = 0
  const target = 50000000

  const bukaSaweria = () => {
    Linking.openURL('https://saweria.co/usernamekamu')
  }

  const bagikan = async () => {
    try {
      await Share.share({
        message: 'Dukung developer Quran Pesat ❤️\nhttps://saweria.co/usernamekamu',
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#2c3e3e" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dukung Developer</Text>
        <TouchableOpacity onPress={bagikan}>
          <Ionicons name="share-social-outline" size={22} color="#2c3e3e" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* milestone */}
        <Text style={styles.judulSection}>Milestone Dukungan</Text>
        <Text style={styles.deskripsi}>
          Quran Pesat adalah aplikasi gratis tanpa iklan yang dibuat dengan penuh cinta
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Bayar server dan akomodasi</Text>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(progress / target) * 100}%` }]} />
            </View>
          </View>

          <Text style={styles.progressText}>
            Rp{progress.toLocaleString('id-ID')} / Rp{target.toLocaleString('id-ID')}
          </Text>
        </View>

        {/* saweria */}
        <Text style={styles.labelSection}>DUKUNGAN VIA SAWERIA</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Scan QR atau buka Saweria</Text>
          <Text style={styles.cardDesc}>Semua dukungan akan masuk langsung ke halaman Saweria.</Text>

          <View style={styles.qrContainer}>
            <View style={styles.qrBox}>
              <Image source={require('@/assets/images/sawer.png')} style={styles.qr} resizeMode="contain" />
            </View>
          </View>

          <TouchableOpacity style={styles.btn} onPress={bukaSaweria}>
            <Text style={styles.btnText}>Buka Saweria</Text>
          </TouchableOpacity>
        </View>

        {/* catatan */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Catatan Development & Transparansi</Text>

          <View style={styles.catatanItem}>
            <Text style={styles.bullet}>1.</Text>
            <Text style={styles.catatanText}>Ini dukungan untuk developer, bukan penggalangan donasi lembaga.</Text>
          </View>

          <View style={styles.catatanItem}>
            <Text style={styles.bullet}>2.</Text>
            <Text style={styles.catatanText}>Penyaluran ke pihak lain sepenuhnya keputusan pribadi developer.</Text>
          </View>
        </View>

        {/* leaderboard */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Leaderboard Dukungan</Text>
          <Text style={styles.cardDesc}>Terima kasih untuk para pendukung teratas.</Text>

         
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },

  judulSection: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2C3E3E',
    marginBottom: 6,
  },
  labelSection: {
    fontSize: 13,
    fontWeight: '600',
    color: '#7c8a8a',
    marginBottom: 8,
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  deskripsi: {
    fontSize: 14,
    color: '#6A7A76',
    marginBottom: 20,
    lineHeight: 20,
  },

  card: {
    backgroundColor: '#f1ede5',
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2f3a3a',
    marginBottom: 10,
  },
  cardDesc: {
    fontSize: 14,
    color: '#6A7A76',
    marginBottom: 16,
    lineHeight: 20,
  },

  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e4ded2',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6B8F8D',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2f3a3a',
  },

  qrContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  qrBox: {
    width: 200,
    height: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0d8cc',
  },
  qr: {
    width: 180,
    height: 180,
  },

  btn: {
    backgroundColor: '#6B8F8D',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  catatanItem: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 8,
  },
  bullet: {
    fontSize: 14,
    color: '#6A7A76',
    width: 20,
  },
  catatanText: {
    fontSize: 14,
    color: '#6A7A76',
    flex: 1,
    lineHeight: 20,
  },

  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0d8cc',
  },
  rank: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B8F8D',
    width: 30,
  },
  nama: {
    fontSize: 14,
    color: '#2f3a3a',
    flex: 1,
  },
  nominal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2f3a3a',
  },
})