import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { StyleSheet, View, Alert } from 'react-native'
import { Button, Input } from '@rneui/themed'
import { Session } from '@supabase/supabase-js'

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [website, setWebsite] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    if (session) getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string
    website: string
    avatar_url: string
  }) {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      }

      const { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          value={session?.user?.email}
          disabled
          leftIcon={{ type: 'font-awesome', name: 'envelope', color: '#517fa4', containerStyle: styles.icon }}
          inputStyle={styles.input}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="ユーザー名"
          value={username || ''}
          onChangeText={(text) => setUsername(text)}
          leftIcon={{ type: 'font-awesome', name: 'user', color: '#517fa4', containerStyle: styles.icon }}
          inputStyle={styles.input}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Webサイト"
          value={website || ''}
          onChangeText={(text) => setWebsite(text)}
          leftIcon={{ type: 'font-awesome', name: 'globe', color: '#517fa4', containerStyle: styles.icon }}
          inputStyle={styles.input}
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? '更新中' : '更新'}
          onPress={() => updateProfile({ username, website, avatar_url: avatarUrl })}
          disabled={loading}
          buttonStyle={styles.button}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Button
          title="サインアウト"
          onPress={() => supabase.auth.signOut()}
          buttonStyle={styles.button}
        />
      </View>
    </View>
  )
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