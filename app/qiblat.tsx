import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const { width, height } = Dimensions.get('window')

export default function Qiblat() {
  const router = useRouter()

  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#2c3e3e" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Arah Kiblat</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#2c3e3e" />
        </TouchableOpacity>
      </View>

      {/* content */}
      <ImageBackground
        source={require('@/assets/images/kabah.png')}
        style={styles.background}
        resizeMode="cover"
      >
        {/* lokasi */}
        <View style={styles.lokasi}>
          <Text style={styles.lokasiText}>Bogor, Indonesia</Text>
        </View>

        {/* kompas */}
        <Image source={require('@/assets/images/compass.png')} style={styles.kompas} />

        {/* tombol */}
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Tentukan Kiblat Pakai Kamera</Text>
        </TouchableOpacity>
      </ImageBackground>
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

  background: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width,
    height: height - 100,
  },

  lokasi: {
    marginTop: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  lokasiText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },

  kompas: {
    width: width * 0.5,
    height: width * 0.5,
    marginTop: 50,
    resizeMode: 'contain',
  },

  btn: {
    backgroundColor: '#6B8F8D',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 40,
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
})