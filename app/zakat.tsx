import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function Zakat() {
  const router = useRouter()
  const [harta, setHarta] = useState('')
  const [hasil, setHasil] = useState<number | null>(null)

  const formatRp = (angka: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(angka)
  }

  const hitung = () => {
    const bersih = parseFloat(harta.replace(/\./g, '').replace(/,/g, '.'))
    if (!bersih || bersih <= 0) {
      setHasil(null)
      return
    }
    setHasil(bersih * 0.025)
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#2c3e3e" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Zakat Calculator</Text>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color="#2c3e3e" />
          </TouchableOpacity>
        </View>

        {/* content */}
        <View style={styles.content}>
          <View style={styles.card}>
            <Ionicons name="calculator-outline" size={36} color="#6b7c7c" style={{ marginBottom: 12 }} />

            <Text style={styles.label}>Masukkan total harta (Rp)</Text>

            <TextInput
              value={harta}
              onChangeText={setHarta}
              keyboardType="numeric"
              placeholder="Contoh: 10000000"
              placeholderTextColor="#9BAFA8"
              style={styles.input}
            />

            <TouchableOpacity style={styles.btn} onPress={hitung}>
              <Text style={styles.btnText}>Hitung Zakat</Text>
            </TouchableOpacity>

            {hasil !== null && (
              <View style={styles.hasilBox}>
                <Text style={styles.hasilLabel}>Zakat yang harus dibayar:</Text>
                <Text style={styles.hasil}>{formatRp(hasil)}</Text>
              </View>
            )}
          </View>

          <View style={styles.info}>
            <Text style={styles.infoTitle}>Tentang Zakat Mal</Text>
            <Text style={styles.infoText}>
              Zakat mal adalah zakat atas harta yang telah mencapai nisab dan haul.
              Besar zakat mal adalah 2.5% dari total harta yang dimiliki selama satu tahun.
            </Text>
          </View>
        </View>
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
  },

  card: {
    backgroundColor: '#f1ede5',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#4A5A54',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    marginBottom: 16,
    fontSize: 15,
    color: '#2c3e3e',
    borderWidth: 1,
    borderColor: '#e0d8cc',
  },
  btn: {
    backgroundColor: '#6B8F8D',
    height: 48,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

  hasilBox: {
    marginTop: 20,
    backgroundColor: '#e4ded2',
    padding: 16,
    borderRadius: 14,
  },
  hasilLabel: {
    fontSize: 13,
    color: '#4A5A54',
    marginBottom: 4,
  },
  hasil: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2f3a3a',
  },

  info: {
    backgroundColor: '#f1ede5',
    borderRadius: 18,
    padding: 18,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2f3a3a',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#4A5A54',
    lineHeight: 22,
  },
})