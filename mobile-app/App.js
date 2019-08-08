import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EventsScreen from "./src/screens/events";
import AuthScreen from "./src/screens/auth";
import EventScreen from "./src/screens/event";

export default function App() {
  return (
    <View style={styles.container}>
      <EventScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
