import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  Dimensions,
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

const { width } = Dimensions.get('window')

type Prayer = {
  name: string
  time: string
  icon: keyof typeof Ionicons.glyphMap
}

export default function Home() {
  const [waktu, setWaktu] = useState('')
  const [tanggal, setTanggal] = useState('')
  const [nextSholat, setNextSholat] = useState<Prayer | null>(null)
  const [hitungMundur, setHitungMundur] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setWaktu(
        now.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
        })
      )
      setTanggal(
        now.toLocaleDateString('id-ID', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      )
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      let next: Prayer | null = null
      let diff = 0

      for (const p of jadwalSholat) {
        const [h, m] = p.time.split(':').map(Number)
        const t = new Date()
        t.setHours(h, m, 0, 0)

        if (t > now) {
          next = p
          diff = t.getTime() - now.getTime()
          break
        }
      }

      if (!next) {
        const [h, m] = jadwalSholat[0].time.split(':').map(Number)
        const besok = new Date()
        besok.setDate(besok.getDate() + 1)
        besok.setHours(h, m, 0, 0)
        next = jadwalSholat[0]
        diff = besok.getTime() - now.getTime()
      }

      const jam = Math.floor(diff / 1000 / 60 / 60)
      const menit = Math.floor((diff / 1000 / 60) % 60)
      const detik = Math.floor((diff / 1000) % 60)

      setNextSholat(next)
      setHitungMundur(
        `${jam.toString().padStart(2, '0')}:${menit
          .toString()
          .padStart(2, '0')}:${detik.toString().padStart(2, '0')}`
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* header atas */}
        <ImageBackground
          source={require('@/assets/images/element.png')}
          style={styles.header}
          imageStyle={styles.headerImage}
        >
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.hijri}>{tanggal}</Text>
              <Text style={styles.lokasi}>Bogor, Indonesia</Text>
            </View>

            <TouchableOpacity style={styles.notif} onPress={() => router.push('/notifikasi')}>
              <Ionicons name="notifications-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.waktuBox}>
            <Text style={styles.waktuBesar}>{waktu}</Text>

            {nextSholat && (
              <View style={styles.nextBox}>
                <Text style={styles.menuju}>Menuju {nextSholat.name}</Text>
                <Text style={styles.hitung}>{hitungMundur}</Text>
              </View>
            )}
          </View>

          {/* baris jadwal sholat */}
          <View style={styles.sholatRow}>
            {jadwalSholat.map(item => (
              <View key={item.name} style={styles.sholatItem}>
                <Ionicons name={item.icon} size={18} color="#fff" />
                <Text style={styles.sholatNama}>{item.name}</Text>
                <Text style={styles.sholatWaktu}>{item.time}</Text>
              </View>
            ))}
          </View>
        </ImageBackground>

        {/* search */}
        <TouchableOpacity style={styles.searchBox} activeOpacity={0.7} onPress={() => router.push('/doa')}>
          <Ionicons name="search-outline" size={20} color="#9BAFA8" />
          <Text style={styles.searchPlaceholder}>Cari surat, doa, artikel, hadits ...</Text>
        </TouchableOpacity>

        {/* menu grid */}
        <View style={styles.menuContainer}>
          {menuList.map(item => (
            <TouchableOpacity
              key={item.title}
              style={styles.menuItem}
              activeOpacity={0.7}
              onPress={() => {
                if (item.title === 'Al-Quran') router.push('/(tabs)/quran')
                if (item.title === 'Doa Harian') router.push('/doa')
                if (item.title === 'Dzikir') router.push('/dzikir')
                if (item.title === 'Hadits') router.push('/hadist')
                if (item.title === 'Arah Kiblat') router.push('/qiblat')
                if (item.title === 'Donasi') router.push('/donasi')
                if (item.title === 'Asmaul Husna') router.push('/asmaulhusna')
                if (item.title === 'Lainnya') router.push('/lainnya')
              }}
            >
              <View style={styles.menuIcon}>
                <Ionicons name={item.icon as any} size={24} color="#6A8D87" />
              </View>
              <Text style={styles.menuText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* banner ramadhan */}
        <LinearGradient
          colors={['#9BAFA8', '#7A9A92']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.ramadanCard}
        >
          <View style={styles.ramadanLeft}>
            <Text style={styles.ramadanEmoji}>🌙</Text>
          </View>
          <View style={styles.ramadanRight}>
            <Text style={styles.ramadanTitle}>Ramadhan Mubarak!</Text>
            <Text style={styles.ramadanDesc}>Selamat menjalankan ibadah puasa</Text>
          </View>
        </LinearGradient>

        {/* section doa */}
        <View style={styles.doaHeader}>
          <View>
            <Text style={styles.doaTitle}>Aminkan doa saudaramu</Text>
            <Text style={styles.doaSubtitle}>Doa terbaru dari pengguna</Text>
          </View>
          <TouchableOpacity style={styles.buatDoaButton} onPress={() => router.push('/buatdoa')}>
            <Text style={styles.buatDoa}>+ Buat doa</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.doaScroll}>
          {doaList.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.doaCard}
              activeOpacity={0.7}
              onPress={() => router.push({ pathname: '/buatdoa', params: { id: item.id } })}
            >
              <View style={styles.doaCardHeader}>
                <View style={styles.doaAvatar}>
                  <Text style={styles.doaAvatarText}>{item.name.charAt(0)}</Text>
                </View>
                <View>
                  <Text style={styles.doaNama}>{item.name}</Text>
                  <Text style={styles.doaWaktu}>{item.time}</Text>
                </View>
              </View>
              <Text style={styles.doaJudul}>{item.title}</Text>
              <Text numberOfLines={2} style={styles.doaIsi}>
                {item.desc}
              </Text>
              <View style={styles.doaFooter}>
                <Ionicons name="heart-outline" size={16} color="#9BAFA8" />
                <Text style={styles.doaFooterText}>Aminkan</Text>
              </View>
            </TouchableOpacity>
          ))}

          {/* tombol tambah doa */}
          <TouchableOpacity style={styles.tambahDoaCard} onPress={() => router.push('/buatdoa')}>
            <Ionicons name="add-circle-outline" size={40} color="#9BAFA8" />
            <Text style={styles.tambahDoaText}>Buat Doa Baru</Text>
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>
    </View>
  )
}

/* ================= DATA ================= */

const jadwalSholat: Prayer[] = [
  { name: 'Subuh', time: '04:43', icon: 'sunny-outline' },
  { name: 'Dzuhur', time: '12:09', icon: 'sunny-outline' },
  { name: 'Ashar', time: '15:12', icon: 'partly-sunny-outline' },
  { name: 'Maghrib', time: '18:15', icon: 'cloud-outline' },
  { name: 'Isya', time: '19:24', icon: 'moon-outline' },
]

const menuList = [
  { title: 'Al-Quran', icon: 'book-outline' },
  { title: 'Doa Harian', icon: 'chatbubble-outline' },
  { title: 'Dzikir', icon: 'heart-outline' },
  { title: 'Hadits', icon: 'document-text-outline' },
  { title: 'Arah Kiblat', icon: 'compass-outline' },
  { title: 'Donasi', icon: 'cash-outline' },
  { title: 'Asmaul Husna', icon: 'library-outline' },
  { title: 'Lainnya', icon: 'grid-outline' },
]

const doaList = [
  {
    id: 1,
    name: 'Ahmad Fauzi',
    time: '2 jam lalu',
    title: 'Doa Kesembuhan',
    desc: 'Semoga Allah memberikan kesembuhan terbaik untuk orang tua saya.',
  },
  {
    id: 2,
    name: 'Fatimah Zahra',
    time: '5 jam lalu',
    title: 'Doa Ujian',
    desc: 'Semoga diberikan kemudahan dan kelancaran dalam menghadapi ujian.',
  },
  {
    id: 3,
    name: 'Abdullah',
    time: '1 hari lalu',
    title: 'Doa Rezeki',
    desc: 'Semoga dilapangkan rezeki dan dimudahkan segala urusan.',
  },
]

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F2',
  },

  header: {
    height: 340,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 24) + 8 : 40,
    justifyContent: 'space-between',
  },
  headerImage: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hijri: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.9,
  },
  lokasi: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
    marginTop: 2,
  },

  notif: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },

  waktuBox: {
    alignItems: 'center',
    marginTop: 10,
  },
  waktuBesar: {
    color: '#fff',
    fontSize: 56,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 5,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  nextBox: {
    alignItems: 'center',
    gap: 6,
  },
  menuju: {
    color: '#fff',
    fontSize: 15,
    opacity: 0.9,
    letterSpacing: 0.5,
  },
  hitung: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 1,
  },

  sholatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  sholatItem: {
    alignItems: 'center',
    flex: 1,
  },
  sholatNama: {
    color: '#E0E0E0',
    fontSize: 12,
    marginTop: 6,
    fontWeight: '500',
  },
  sholatWaktu: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
    marginTop: 2,
  },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: -22,
    marginBottom: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#F0EADE',
  },
  searchPlaceholder: {
    marginLeft: 12,
    fontSize: 15,
    color: '#9BAFA8',
    fontWeight: '500',
  },

  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  menuItem: {
    width: width / 4 - 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  menuIcon: {
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
  menuText: {
    fontSize: 11,
    marginTop: 4,
    color: '#4A5A54',
    fontWeight: '500',
    textAlign: 'center',
    width: 70,
  },

  ramadanCard: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#6A8D87',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  ramadanLeft: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  ramadanEmoji: {
    fontSize: 30,
  },
  ramadanRight: {
    flex: 1,
  },
  ramadanTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  ramadanDesc: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },

  doaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
    marginTop: 8,
  },
  doaTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C3E3E',
  },
  doaSubtitle: {
    fontSize: 13,
    color: '#9BAFA8',
    marginTop: 2,
  },
  buatDoaButton: {
    backgroundColor: '#F0F2E9',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D0DAC8',
  },
  buatDoa: {
    color: '#6A8D87',
    fontSize: 13,
    fontWeight: '600',
  },

  doaScroll: {
    paddingLeft: 20,
    paddingRight: 12,
    paddingBottom: 8,
  },

  doaCard: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 16,
    marginRight: 12,
    shadowColor: '#6A8D87',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#F0EADE',
  },

  doaCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  doaAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#9BAFA8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  doaAvatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  doaNama: {
    fontWeight: '600',
    fontSize: 14,
    color: '#2C3E3E',
    marginBottom: 2,
  },
  doaWaktu: {
    fontSize: 11,
    color: '#9BAFA8',
  },
  doaJudul: {
    fontWeight: '700',
    fontSize: 16,
    color: '#2C3E3E',
    marginBottom: 6,
  },
  doaIsi: {
    fontSize: 13,
    color: '#6A7A76',
    lineHeight: 18,
    marginBottom: 12,
  },
  doaFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  doaFooterText: {
    fontSize: 12,
    color: '#9BAFA8',
    fontWeight: '500',
  },

  tambahDoaCard: {
    width: 120,
    backgroundColor: '#F8F9F5',
    borderRadius: 24,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E6D8',
    borderStyle: 'dashed',
  },
  tambahDoaText: {
    fontSize: 12,
    color: '#9BAFA8',
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '500',
  },
})