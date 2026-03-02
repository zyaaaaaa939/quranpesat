import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Perhatian', 'Email dan password harus diisi!')
      return
    }

    // Logika login sederhana (nanti bisa diganti dengan API)
    if (email === 'user@example.com' && password === 'password') {
      Alert.alert('Sukses', 'Login berhasil!', [
        { text: 'OK', onPress: () => router.back() }
      ])
    } else {
      Alert.alert('Error', 'Email atau password salah')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#2c3e3e" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Masuk</Text>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color="#2c3e3e" />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* icon & title */}
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Ionicons name="person-outline" size={40} color="#6A8D87" />
            </View>
            <Text style={styles.welcome}>Selamat Datang</Text>
            <Text style={styles.subtitle}>Masuk untuk melanjutkan</Text>
          </View>

          {/* form card */}
          <View style={styles.card}>
            {/* email */}
            <View style={styles.field}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputBox}>
                <Ionicons name="mail-outline" size={18} color="#9BAFA8" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Masukkan email"
                  placeholderTextColor="#9BAFA8"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* password */}
            <View style={styles.field}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputBox}>
                <Ionicons name="lock-closed-outline" size={18} color="#9BAFA8" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Masukkan password"
                  placeholderTextColor="#9BAFA8"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={18}
                    color="#9BAFA8"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* lupa password */}
            <TouchableOpacity style={styles.lupaContainer}>
              <Text style={styles.lupaText}>Lupa password?</Text>
            </TouchableOpacity>

            {/* tombol login */}
            <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
              <Text style={styles.btnLoginText}>Masuk</Text>
            </TouchableOpacity>

            {/* atau */}
            <View style={styles.orContainer}>
              <View style={styles.orLine} />
              <Text style={styles.orText}>atau</Text>
              <View style={styles.orLine} />
            </View>

            {/* login dengan google */}
            <TouchableOpacity style={styles.btnGoogle}>
              <Ionicons name="logo-google" size={18} color="#DB4437" />
              <Text style={styles.btnGoogleText}>Masuk dengan Google</Text>
            </TouchableOpacity>
          </View>

          {/* daftar */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Belum punya akun? </Text>
            <TouchableOpacity >
              <Text style={styles.registerLink}>Daftar</Text>
            </TouchableOpacity>
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
    paddingBottom: 40,
  },

  iconContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0F2E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E6D8',
  },
  welcome: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2f3a3a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6A7A76',
  },

  card: {
    backgroundColor: '#f1ede5',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
  },

  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2f3a3a',
    marginBottom: 6,
  },

  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    borderWidth: 1,
    borderColor: '#e0d8cc',
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#2c3e3e',
    padding: 0,
  },

  lupaContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  lupaText: {
    fontSize: 13,
    color: '#6A8D87',
    fontWeight: '500',
  },

  btnLogin: {
    backgroundColor: '#6B8F8D',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  btnLoginText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0d8cc',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 13,
    color: '#6A7A76',
  },

  btnGoogle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#e0d8cc',
    gap: 8,
  },
  btnGoogleText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#2f3a3a',
  },

  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  registerText: {
    fontSize: 14,
    color: '#6A7A76',
  },
  registerLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6A8D87',
  },
})