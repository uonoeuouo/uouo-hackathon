import { useState, useEffect } from 'react'
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { supabase } from '../lib/supabase'
import Auth from '../components/Auth'
import Account from '../components/Account'
import { View } from 'react-native'
import { Session } from '@supabase/supabase-js'
import Test from '@/components/Test'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <GluestackUIProvider
      mode="light"><View>
                {session && session.user ? <Test /> : <Auth />}
                {/* {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />} */}
              </View></GluestackUIProvider>
  );
}