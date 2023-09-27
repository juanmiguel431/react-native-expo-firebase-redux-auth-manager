import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text } from 'react-native';
import { legacy_createStore as createStore } from 'redux';
import { Provider as StoreProvider } from 'react-redux';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import reducers from './src/reducers';

export default function App() {
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
