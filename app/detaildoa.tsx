import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function DetailDoa() {
  const { id, judul, arab, arti, latin } = useLocalSearchParams<{
    id: string
    judul: string
    arab: string
    arti: string
    latin: string
  }>()

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#2c3e3e" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detail Doa</Text>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color="#2c3e3e" />
          </TouchableOpacity>
        </View>

        {/* card doa */}
        <View style={styles.card}>
          <Text style={styles.judul}>{judul}</Text>

          {arab && (
            <View style={styles.boxArab}>
              <Text style={styles.arab}>{arab}</Text>
            </View>
          )}

          {latin && (
            <View style={styles.boxLatin}>
              <Text style={styles.latin}>{latin}</Text>
            </View>
          )}

          {arti && (
            <View style={styles.boxArti}>
              <Text style={styles.arti}>{arti}</Text>
            </View>
          )}
        </View>

        {/* actions */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="heart-outline" size={20} color="#6A8D87" />
            <Text style={styles.actionText}>Aamiin</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="share-social-outline" size={20} color="#6A8D87" />
            <Text style={styles.actionText}>Bagikan</Text>
          </TouchableOpacity>
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
  content: {
    paddingBottom: 40,
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

  card: {
    backgroundColor: '#f1ede5',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 18,
    padding: 18,
  },
  judul: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2f3a3a',
    marginBottom: 16,
  },

  boxArab: {
    backgroundColor: '#e4ded2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  arab: {
    fontSize: 28,
    textAlign: 'right',
    lineHeight: 42,
    color: '#1f2e2e',
  },

  boxLatin: {
    backgroundColor: '#d9d0c0',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  latin: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#4A5A54',
    lineHeight: 22,
  },

  boxArti: {
    backgroundColor: '#e4ded2',
    borderRadius: 12,
    padding: 14,
  },
  arti: {
    fontSize: 15,
    lineHeight: 22,
    color: '#2f3a3a',
  },

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 24,
    marginHorizontal: 20,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#F0EADE',
    shadowColor: '#6A8D87',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    gap: 8,
  },
  actionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6A8D87',
  },
})