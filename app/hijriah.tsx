import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function Hijriah() {
  const router = useRouter()
  const today = new Date()

  const bulanHijri = [
    'Muharram', 'Safar', 'Rabiul Awal', 'Rabiul Akhir',
    'Jumadil Awal', 'Jumadil Akhir', 'Rajab', 'Sya\'ban',
    'Ramadhan', 'Syawal', 'Dzulqa\'dah', 'Dzulhijjah'
  ]

  const namaHari = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

  const [bulan, setBulan] = useState(8) // Ramadhan
  const [tahun, setTahun] = useState(1445)

  const hijri = new Intl.DateTimeFormat('id-TN-u-ca-islamic', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const masehi = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const hijriDate = hijri.format(today)
  const masehiDate = masehi.format(today)

  const generateCalendar = () => {
    const days = []
    const firstDay = 3
    const daysInMonth = 30

    for (let i = 0; i < firstDay; i++) {
      days.push({ day: '', empty: true })
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isToday: i === 15,
      })
    }

    return days
  }

  const calendarData = generateCalendar()

  const changeMonth = (dir: 'prev' | 'next') => {
    if (dir === 'prev') {
      if (bulan === 0) {
        setBulan(11)
        setTahun(tahun - 1)
      } else {
        setBulan(bulan - 1)
      }
    } else {
      if (bulan === 11) {
        setBulan(0)
        setTahun(tahun + 1)
      } else {
        setBulan(bulan + 1)
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#2c3e3e" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kalender Hijriah</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#2c3e3e" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* hari ini */}
        <View style={styles.todayCard}>
          <View style={styles.todayLeft}>
            <Ionicons name="calendar" size={28} color="#6A8D87" />
            <View>
              <Text style={styles.todayLabel}>Hari Ini</Text>
              <Text style={styles.todayDate}>{masehiDate}</Text>
            </View>
          </View>
        </View>

        {/* kalender */}
        <View style={styles.calendarCard}>
          {/* header bulan */}
          <View style={styles.monthHeader}>
            <TouchableOpacity onPress={() => changeMonth('prev')}>
              <Ionicons name="chevron-back" size={24} color="#6A8D87" />
            </TouchableOpacity>
            <Text style={styles.monthTitle}>
              {bulanHijri[bulan]} {tahun} H
            </Text>
            <TouchableOpacity onPress={() => changeMonth('next')}>
              <Ionicons name="chevron-forward" size={24} color="#6A8D87" />
            </TouchableOpacity>
          </View>

          {/* hari */}
          <View style={styles.weekDays}>
            {namaHari.map((item, i) => (
              <Text key={i} style={styles.weekDayText}>
                {item}
              </Text>
            ))}
          </View>

          {/* tanggal */}
          <FlatList
            data={calendarData}
            numColumns={7}
            keyExtractor={(_, i) => i.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.dayCell}>
                {!item.empty && (
                  <View style={[styles.dayBox, item.isToday && styles.todayBox]}>
                    <Text style={[styles.dayText, item.isToday && styles.todayText]}>
                      {item.day}
                    </Text>
                  </View>
                )}
              </View>
            )}
          />
        </View>

        {/* info */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Tentang Kalender Hijriah</Text>
          <Text style={styles.infoText}>
            Kalender Hijriah adalah kalender Islam yang berdasarkan peredaran bulan.
            Satu tahun terdiri dari 12 bulan.
          </Text>

          <View style={styles.bulanGrid}>
            {bulanHijri.map((item, i) => (
              <View key={i} style={styles.bulanRow}>
                <Text style={[styles.bulanNumber, i === bulan && styles.bulanAktif]}>
                  {i + 1}.
                </Text>
                <Text style={[styles.bulanName, i === bulan && styles.bulanAktif]}>
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },

  todayCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0EADE',
  },
  todayLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  todayLabel: {
    fontSize: 12,
    color: '#9BAFA8',
  },
  todayDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2f3a3a',
  },
  todayRight: {
    backgroundColor: '#F0F2E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  hijriDate: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6A8D87',
  },

  calendarCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0EADE',
  },
  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2f3a3a',
  },

  weekDays: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  weekDayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: '#9BAFA8',
  },

  dayCell: {
    flex: 1,
    aspectRatio: 1,
    padding: 2,
  },
  dayBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  todayBox: {
    backgroundColor: '#6A8D87',
  },
  dayText: {
    fontSize: 14,
    color: '#2f3a3a',
  },
  todayText: {
    color: '#fff',
    fontWeight: '600',
  },

  infoCard: {
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
    marginBottom: 16,
  },
  bulanGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  bulanRow: {
    flexDirection: 'row',
    width: '50%',
    marginBottom: 6,
  },
  bulanNumber: {
    width: 25,
    fontSize: 13,
    color: '#6A7A76',
  },
  bulanName: {
    fontSize: 13,
    color: '#4A5A54',
  },
  bulanAktif: {
    color: '#6A8D87',
    fontWeight: '600',
  },
})