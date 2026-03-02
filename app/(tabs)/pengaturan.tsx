import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Image,
} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function Pengaturan() {
  const router = useRouter()

  const [darkMode, setDarkMode] = useState(false)
  const [notif, setNotif] = useState(true)
  const [fontArab, setFontArab] = useState('Sedang')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const Item = ({ icon, title, subtitle, onPress, right }: any) => (
    <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.itemLeft}>
        <View style={styles.iconCircle}>
          <Ionicons name={icon} size={20} color="#6b7c7c" />
        </View>
        <View>
          <Text style={styles.itemTitle}>{title}</Text>
          {subtitle && <Text style={styles.itemSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {right ? right : <Ionicons name="chevron-forward" size={20} color="#9ca3af" />}
    </TouchableOpacity>
  )

  const Section = ({ title, children }: any) => (
    <View style={{ marginTop: 24 }}>
      {title && <Text style={styles.sectionTitle}>{title}</Text>}
      <View style={styles.card}>{children}</View>
    </View>
  )

  const handleLogin = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false)
    } else {
      router.push('/login')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#2c3e3e" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pengaturan</Text>
        
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* profile */}
        <Section>
          {isLoggedIn ? (
            <>
              <View style={styles.profileContainer}>
                <View style={styles.profileImageContainer}>
                  <Image
                    source={{ uri: 'https://ui-avatars.com/api/?name=User&background=6B8F8D&color=fff&size=100' }}
                    style={styles.profileImage}
                  />
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>Ahmad Fauzi</Text>
                  <Text style={styles.profileEmail}>ahmad.fauzi@email.com</Text>
                </View>
              </View>

              <Item icon="person-outline" title="Edit Profile" subtitle="Ubah informasi pribadi" />
              <Item icon="lock-closed-outline" title="Ubah Password" subtitle="Ganti kata sandi" />
              <Item icon="log-out-outline" title="Keluar" subtitle="Logout dari aplikasi" onPress={handleLogin} />
            </>
          ) : (
            <TouchableOpacity style={styles.loginCard} onPress={handleLogin} activeOpacity={0.7}>
              <View style={styles.loginContent}>
                <View>
                  <Text style={styles.loginTitle}>Masuk Akun</Text>
                  <Text style={styles.loginSubtitle}>Sync bookmark & progress</Text>
                  <View style={styles.developBadge}>
                    <Text style={styles.developBadgeText}>DEVELOP</Text>
                  </View>
                </View>
                <View style={styles.loginArrowContainer}>
                  <Text style={styles.loginArrow}>→</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        </Section>

        {/* notifikasi */}
        <Section title="NOTIFIKASI">
          <Item
            icon="notifications-outline"
            title="Notifikasi"
            subtitle="Pengingat ibadah & update"
            right={
              <Switch
                value={notif}
                onValueChange={setNotif}
                trackColor={{ false: '#D1D5DB', true: '#6B8F8D' }}
                thumbColor="#FFFFFF"
              />
            }
          />
        </Section>

        {/* tampilan */}
        <Section title="TAMPILAN">
          <Item
            icon="moon-outline"
            title="Mode Gelap"
            subtitle="Aktifkan tema gelap"
            right={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#D1D5DB', true: '#6B8F8D' }}
                thumbColor="#FFFFFF"
              />
            }
          />

          <Item
            icon="text-outline"
            title="Ukuran Font Arab"
            subtitle={fontArab}
            onPress={() => {
              if (fontArab === 'Kecil') setFontArab('Sedang')
              else if (fontArab === 'Sedang') setFontArab('Besar')
              else setFontArab('Kecil')
            }}
          />
        </Section>

        {/* dukungan */}
        <Section title="DUKUNGAN">
          <Item icon="heart-outline" title="Dukung Developer" subtitle="Kontribusi untuk maintenance" onPress={() => router.push('/donasi')} />
          <Item icon="star-outline" title="Beri Rating" subtitle="Bantu kami dengan rating" />
          <Item icon="share-social-outline" title="Bagikan Aplikasi" subtitle="Ajak teman menggunakan aplikasi" />
          <Item icon="mail-outline" title="Kirim Feedback" subtitle="Sampaikan saran" />
        </Section>

        {/* tentang */}
        <Section title="TENTANG">
          <Item icon="information-circle-outline" title="Tentang Aplikasi" subtitle="Versi 1.0.0" />
          <Item icon="shield-outline" title="Kebijakan Privasi" />
          <Item icon="help-circle-outline" title="Bantuan & FAQ" subtitle="Butuh bantuan?" />
        </Section>

        {/* footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Quran Pesat v1.0.0</Text>
          <Text style={styles.footerText}>Made for Muslims</Text>
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
    textAlign: 'center',
    flex: 1,
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#7c8a8a',
    marginBottom: 8,
    marginLeft: 4,
  },

  card: {
    backgroundColor: '#f1ede5',
    borderRadius: 18,
    paddingVertical: 6,
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e4ded2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2f3a3a',
  },
  itemSubtitle: {
    fontSize: 13,
    color: '#7c8a8a',
    marginTop: 2,
  },

  loginCard: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  loginContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loginTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2f3a3a',
    marginBottom: 2,
  },
  loginSubtitle: {
    fontSize: 13,
    color: '#7c8a8a',
    marginBottom: 6,
  },
  developBadge: {
    backgroundColor: '#E8E4DC',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  developBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#6b7c7c',
    letterSpacing: 0.5,
  },
  loginArrowContainer: {
    backgroundColor: '#6B8F8D',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginArrow: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },

  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0d8cc',
    marginBottom: 6,
  },
  profileImageContainer: {
    marginRight: 16,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#6B8F8D',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2f3a3a',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 13,
    color: '#7c8a8a',
  },

  footer: {
    alignItems: 'center',
    marginTop: 40,
  },
  footerText: {
    color: '#8a948c',
    fontSize: 13,
    marginTop: 4,
  },
})