import { View, Text, Button } from "react-native";

export default function HomeScreen({ xp = 0, setXp = () => {} }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 12 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold" }}>Chore Beasts 🧹</Text>
      <Text style={{ fontSize: 18, marginTop: 6 }}>XP: {xp}</Text>
      <View style={{ height: 12 }} />
      <Button title="+10 XP" onPress={() => setXp(xp + 10)} />
      <View style={{ height: 8 }} />
      <Button title="Reset XP" onPress={() => setXp(0)} />
    </View>
  );
}
