import Test from '@/components/Test';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';
import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import Auth from '../components/Auth';
import { supabase } from '../lib/supabase';
import React = require('react');

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <GluestackUIProvider mode="light">
      <View>
        {session && session.user ? <Test /> : <Auth />}
        {/* {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />} */}
      </View>
    </GluestackUIProvider>
  );
}
