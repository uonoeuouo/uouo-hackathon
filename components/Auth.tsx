import React, { useState } from 'react'
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Alert, StyleSheet, View, AppState } from 'react-native'
import { supabase } from '../lib/supabase'
import { Button, Input } from '@rneui/themed'

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }

  return (
    <GluestackUIProvider
      mode="light"
      mode="light"
      mode="light"
      mode="light"
      mode="light"
      mode="light"
      mode="light"
      mode="light"
      mode="light"
      mode="light"
      mode="light"
      mode="light"
      mode="light"
      mode="light"
      mode="light"
      mode="light"><View style={styles.container}>
                <View style={[styles.verticallySpaced, styles.mt20]}>
                  <Input
                    label="Email"
                    leftIcon={{ type: 'font-awesome', name: 'envelope', color: '#517fa4', containerStyle: styles.icon }}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    placeholder="email@address.com"
                    autoCapitalize={'none'}
                    inputStyle={styles.input}
                  />
                </View>
                <View style={styles.verticallySpaced}>
                  <Input
                    label="パスワード"
                    leftIcon={{ type: 'font-awesome', name: 'lock', color: '#517fa4', containerStyle: styles.icon }}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    placeholder="Password"
                    autoCapitalize={'none'}
                    inputStyle={styles.input}
                  />
                </View>
                <View style={[styles.verticallySpaced, styles.mt20]}>
                  <Button
                    title="ログイン"
                    disabled={loading}
                    onPress={() => signInWithEmail()}
                    buttonStyle={styles.button}
                  />
                </View>
                <View style={styles.verticallySpaced}>
                  <Button
                    title="サインアップ"
                    disabled={loading}
                    onPress={() => signUpWithEmail()}
                    buttonStyle={styles.button}
                  />
                </View>
              </View></GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    color: '#333',
  },
  button: {
    backgroundColor: '#517fa4',
    borderRadius: 5,
  },
  icon: {
    marginRight: 10,
  },
})