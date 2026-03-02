import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import { useEffect, useState } from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Audio } from 'expo-av'

type Ayat = {
  id: number
  ar: string
  tr: string
  idn: string
  audio: string
}

export default function SurahPage() {
  const params = useLocalSearchParams()
  const nomor = Array.isArray(params.nomor) ? params.nomor[0] : params.nomor

  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [sound, setSound] = useState<Audio.Sound | null>(null)
  const [playing, setPlaying] = useState<number | null>(null)
  const [bookmark, setBookmark] = useState<number[]>([])

  useEffect(() => {
    if (!nomor) return

    fetch(`https://quran-api.santrikoding.com/api/surah/${nomor}`)
      .then(res => res.json())
      .then(json => {
        setData(json)
        setLoading(false)
      })
      .catch(() => setLoading(false))

    return () => {
      if (sound) sound.unloadAsync()
    }
  }, [nomor])

  const putarFull = async () => {
    if (!data?.audio) return
    const { sound } = await Audio.Sound.createAsync({ uri: data.audio }, { shouldPlay: true })
    setSound(sound)
  }

  const putarAyat = async (url: string, idx: number) => {
    if (!url) return
    if (sound) await sound.unloadAsync()
    const { sound: baru } = await Audio.Sound.createAsync({ uri: url }, { shouldPlay: true })
    setSound(baru)
    setPlaying(idx)
  }

  const toggleBookmark = (idx: number) => {
    if (bookmark.includes(idx)) {
      setBookmark(bookmark.filter(i => i !== idx))
    } else {
      setBookmark([...bookmark, idx])
    }
  }

  if (loading || !data) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#6A8D87" />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#2c3e3e" />
          </TouchableOpacity>

          <View style={styles.headerText}>
            <Text style={styles.namaLatin}>{data.nama_latin}</Text>
            <Text style={styles.info}>
              {data.arti} • {data.jumlah_ayat} Ayat • {data.tempat_turun}
            </Text>
          </View>

          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color="#2c3e3e" />
          </TouchableOpacity>
        </View>

        {/* tombol putar full */}
        <TouchableOpacity style={styles.btnPutar} onPress={putarFull}>
          <Ionicons name="volume-medium" size={20} color="#FFF" />
          <Text style={styles.btnPutarText}> Putar Full Surah</Text>
        </TouchableOpacity>

        {/* daftar ayat */}
        {data?.ayat?.map((item: Ayat, idx: number) => (
          <View key={idx} style={styles.ayatBox}>
            <View style={styles.ayatHeader}>
              <View style={styles.nomorBox}>
                <Text style={styles.nomor}>{idx + 1}</Text>
              </View>

              <View style={styles.aksi}>
                <TouchableOpacity onPress={() => putarAyat(item.audio, idx)}>
                  <Ionicons
                    name={playing === idx ? 'pause' : 'play-outline'}
                    size={22}
                    color="#6A8D87"
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => toggleBookmark(idx)}>
                  <Ionicons
                    name={bookmark.includes(idx) ? 'bookmark' : 'bookmark-outline'}
                    size={20}
                    color="#6A8D87"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.arab}>{item.ar}</Text>
            <Text style={styles.arti}>{item.idn}</Text>

            <View style={styles.garis} />
          </View>
        ))}
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
  headerText: {
    alignItems: 'center',
  },
  namaLatin: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e3e',
  },
  info: {
    fontSize: 12,
    color: '#6A7A76',
    marginTop: 2,
  },

  btnPutar: {
    marginHorizontal: 20,
    backgroundColor: '#6B8F8D',
    paddingVertical: 16,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  btnPutarText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },

  ayatBox: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  ayatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  nomorBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#6B8F8D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nomor: {
    color: '#FFF',
    fontWeight: '600',
  },
  aksi: {
    flexDirection: 'row',
    gap: 16,
  },

  arab: {
    fontSize: 28,
    textAlign: 'right',
    lineHeight: 48,
    marginBottom: 14,
    color: '#1f2e2e',
  },
  arti: {
    fontSize: 15,
    color: '#4A5A54',
    lineHeight: 24,
  },

  garis: {
    height: 1,
    backgroundColor: '#e0d8cc',
    marginTop: 20,
  },
})