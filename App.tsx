import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';
import { legacy_createStore as createStore } from 'redux';
import { Provider as StoreProvider } from 'react-redux';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getReactNativePersistence,
  signOut,
  AuthError, User
} from 'firebase/auth';
import type { Auth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import reducers from './src/reducers';

export default function App() {
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    const app = initializeApp({
      apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
      measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
    });

    //https://stackoverflow.com/questions/76914913/cannot-import-getreactnativepersistence-in-firebase10-1-0
    const auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });

    auth.onAuthStateChanged((user) => {
      // const isLoggedIn = !!user;
      // setUser(user);
      // setLoggedIn(isLoggedIn);
    });

    setAuth(auth);

  }, []);


  return (
    <StoreProvider store={createStore(reducers)}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar style="auto"/>
          <Text>Open up App.tsx to start working on your app!</Text>
        </SafeAreaView>
      </SafeAreaProvider>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
