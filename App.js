import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';

import PlacesNavigator from './navigation/PlacesNavigator';
import store from './store';

enableScreens();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function App() {
  return (
    <Provider store={store}>
        <PlacesNavigator />
        <StatusBar style="auto" />
    </Provider>
  );
}
