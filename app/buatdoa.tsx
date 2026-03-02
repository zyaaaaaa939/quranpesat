import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'

export default function BuatDoa() {
  const [nama, setNama] = useState('')
  const [judul, setJudul] = useState('')
  const [isi, setIsi] = useState('')
  const [anonim, setAnonim] = useState(false)

  const kirimDoa = () => {
    if (!judul || !isi) {
      Alert.alert('Perhatian', 'Judul dan Isi Doa harus diisi!')
      return
    }

    const doaBaru = {
      id: Math.floor(Math.random() * 10000),
      name: anonim ? 'Anonim' : (nama || 'Anonim'),
      title: judul,
      desc: isi,
      time: 'Baru saja',
      count: 0,
    }

    console.log('Doa baru:', doaBaru)
    Alert.alert('✨ Doa Terkirim', 'Doa Anda akan segera muncul di halaman utama.', [
      { text: 'Aamiin', onPress: () => router.back() },
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        {/* header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#2c3e3e" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Buat Doa</Text>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color="#2c3e3e" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {/* card form */}
          <View style={styles.card}>
            {/* nama */}
            <View style={styles.field}>
              <Text style={styles.label}>Nama Pengirim</Text>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.input}
                  placeholder="Masukkan nama Anda (opsional)"
                  placeholderTextColor="#9BAFA8"
                  value={nama}
                  onChangeText={setNama}
                />
              </View>
            </View>

            {/* toggle anonim */}
            <TouchableOpacity style={styles.toggle} onPress={() => setAnonim(!anonim)}>
              <Ionicons name={anonim ? 'checkbox' : 'square-outline'} size={20} color="#6A8D87" />
              <Text style={styles.toggleText}>{anonim ? 'Dikirim sebagai Anonim' : 'Kirim sebagai Anonim'}</Text>
            </TouchableOpacity>

            {/* judul */}
            <View style={styles.field}>
              <Text style={styles.label}>
                Judul Doa <Text style={styles.bintang}>*</Text>
              </Text>
              <View style={styles.inputBox}>
                <TextInput
                  style={styles.input}
                  placeholder="Contoh: Doa Kesembuhan"
                  placeholderTextColor="#9BAFA8"
                  value={judul}
                  onChangeText={setJudul}
                />
              </View>
            </View>

            {/* isi doa */}
            <View style={styles.field}>
              <Text style={styles.label}>
                Isi Doa <Text style={styles.bintang}>*</Text>
              </Text>
              <View style={[styles.inputBox, styles.textareaBox]}>
                <TextInput
                  style={styles.textarea}
                  placeholder="Tulis doa Anda di sini..."
                  placeholderTextColor="#9BAFA8"
                  value={isi}
                  onChangeText={setIsi}
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                />
              </View>
              <Text style={styles.hitung}>{isi.length} karakter</Text>
            </View>

            {/* tombol kirim */}
            <TouchableOpacity style={styles.btnKirim} onPress={kirimDoa} activeOpacity={0.7}>
              <Text style={styles.btnText}>Kirim Doa</Text>
            </TouchableOpacity>

            {/* catatan */}
            <View style={styles.catatan}>
              <Ionicons name="information-circle-outline" size={16} color="#9BAFA8" />
              <Text style={styles.catatanText}>Doa yang dikirim akan muncul di halaman utama</Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },

  card: {
    backgroundColor: '#f1ede5',
    borderRadius: 18,
    padding: 16,
  },

  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#2f3a3a',
  },
  bintang: {
    color: '#FF6B6B',
  },

  inputBox: {
    backgroundColor: '#e4ded2',
    borderRadius: 12,
  },
  input: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#2f3a3a',
  },

  textareaBox: {
    minHeight: 120,
  },
  textarea: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#2f3a3a',
    minHeight: 120,
  },

  hitung: {
    fontSize: 11,
    color: '#7c8a8a',
    textAlign: 'right',
    marginTop: 4,
  },

  toggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    paddingVertical: 4,
  },
  toggleText: {
    fontSize: 14,
    color: '#4A5A54',
  },

  btnKirim: {
    backgroundColor: '#6B8F8D',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },

  catatan: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#e4ded2',
    padding: 12,
    borderRadius: 12,
  },
  catatanText: {
    fontSize: 12,
    color: '#4A5A54',
    flex: 1,
    lineHeight: 16,
  },
})