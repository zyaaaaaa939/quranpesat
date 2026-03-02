import React, { useState, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function AsistenAI() {
  const router = useRouter()
  const inputRef = useRef<TextInput>(null)

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Assalamualaikum! Saya siap bantu pertanyaan seputar Islam: Al-Quran, hadits, fiqih, doa, dan sejarah Islam.',
    },
  ])

  const [input, setInput] = useState('')

  const contoh = [
    'Apa amalan terbaik setelah shalat wajib?',
    'Jelaskan perbedaan zakat fitrah dan zakat maal',
    'Doa ketika merasa gelisah',
  ]

  const sendMessage = (text?: string) => {
    const msg = text || input
    if (!msg.trim()) return

    setMessages([...messages, { role: 'user', content: msg }])
    setInput('')

    // nanti diisi logika AI
  }

  const renderMessage = ({ item }: any) => {
    const isAI = item.role === 'assistant'

    return (
      <View style={[styles.messageRow, isAI ? styles.left : styles.right]}>
        {isAI && (
          <View style={styles.aiIcon}>
            <Ionicons name="sparkles" size={16} color="#fff" />
          </View>
        )}

        <View style={[styles.bubble, isAI ? styles.aiBubble : styles.userBubble]}>
          {isAI && <Text style={styles.aiLabel}>Asisten AI</Text>}
          <Text style={[styles.messageText, !isAI && { color: '#fff' }]}>
            {item.content}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#2c3e3e" />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <View style={styles.logo}>
              <Ionicons name="sparkles" size={18} color="#fff" />
            </View>
            <View>
              <Text style={styles.headerTitle}>Asisten Islami AI</Text>
              <Text style={styles.headerSubtitle}>Fokus tanya jawab seputar Islam</Text>
            </View>
          </View>

          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color="#2c3e3e" />
          </TouchableOpacity>
        </View>

        {/* chat */}
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(_, i) => i.toString()}
          contentContainerStyle={styles.chatContainer}
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={
            <View style={styles.contohContainer}>
              <Text style={styles.contohLabel}>Contoh pertanyaan:</Text>
              {contoh.map((item, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.contohItem}
                  onPress={() => sendMessage(item)}
                >
                  <Text style={styles.contohText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          }
        />

        {/* input */}
        <View style={styles.inputContainer}>
          <View style={styles.inputBox}>
            <TextInput
              ref={inputRef}
              value={input}
              onChangeText={setInput}
              placeholder="Tanyakan seputar Islam..."
              placeholderTextColor="#9A9A9A"
              style={styles.input}
              returnKeyType="send"
              onSubmitEditing={() => sendMessage()}
            />
            <TouchableOpacity style={styles.sendButton} onPress={() => sendMessage()}>
              <Ionicons name="send" size={18} color="#fff" />
            </TouchableOpacity>
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
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#6A8D87',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e3e',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6A7A76',
  },

  chatContainer: {
    padding: 16,
    paddingBottom: 80,
  },

  contohContainer: {
    marginBottom: 16,
  },
  contohLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6A7A76',
    marginBottom: 8,
  },
  contohItem: {
    backgroundColor: '#f1ede5',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  contohText: {
    fontSize: 13,
    color: '#4A5A54',
  },

  messageRow: {
    flexDirection: 'row',
    marginTop: 12,
  },
  left: {
    justifyContent: 'flex-start',
  },
  right: {
    justifyContent: 'flex-end',
  },

  aiIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#6A8D87',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },

  bubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
  },
  aiBubble: {
    backgroundColor: '#f1ede5',
  },
  userBubble: {
    backgroundColor: '#6A8D87',
  },

  aiLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
    color: '#6A7A76',
  },
  messageText: {
    fontSize: 14,
    color: '#2c3e3e',
    lineHeight: 20,
  },

  inputContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#e0d8cc',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#2c3e3e',
    paddingVertical: 12,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6A8D87',
    justifyContent: 'center',
    alignItems: 'center',
  },
})