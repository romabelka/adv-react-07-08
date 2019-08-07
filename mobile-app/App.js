import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import EventsScreen from "./src/screens/events";

export default function App() {
  return (
    <View style={styles.container}>
      <EventsScreen/>
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
