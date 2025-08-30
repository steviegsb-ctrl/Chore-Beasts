import React, { useState } from 'react';
import { StatusBar, StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chore Beasts</Text>
      <Text>Button pressed: {count} times</Text>
      <View style={{ height: 12 }} />
      <Button title="Press me" onPress={() => setCount(c => c + 1)} />
      <StatusBar barStyle="dark-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: '600', marginBottom: 8 },
});
