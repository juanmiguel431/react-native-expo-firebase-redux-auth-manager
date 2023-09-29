import { StatusBar } from 'expo-status-bar';
import { NativeModules, Platform, StyleSheet, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
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
// import firebase from 'firebase/compat';
import { useEffect, useState } from 'react';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import reducers from './src/reducers';
import { LoginForm } from './src/components/LoginForm';
import { RootStackParamList, SCREEN } from './src/models/screen';
import LoginScreen from './src/screens/LoginScreen';
import store from './src/reducers';
import { navigationRef } from './src/RootNavigation';
import SignupScreen from './src/screens/SignupScreen';

const { UIManager } = NativeModules;

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  // const [auth, setAuth] = useState<Auth | null>(null);

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

    // https://stackoverflow.com/questions/76914913/cannot-import-getreactnativepersistence-in-firebase10-1-0
    const auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });

    // auth.onAuthStateChanged((user) => {
    // const isLoggedIn = !!user;
    // setUser(user);
    // setLoggedIn(isLoggedIn);
    // });

    // setAuth(auth);

  }, []);

  return (
    <StoreProvider store={store}>
      <SafeAreaProvider>
        <StatusBar style="auto"/>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator initialRouteName={SCREEN.Signin}>
            <Stack.Screen name={SCREEN.Signin} component={LoginScreen} options={{ title: 'Login' }}/>
            <Stack.Screen name={SCREEN.Signup} component={SignupScreen} options={{ title: 'Signup' }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({});
