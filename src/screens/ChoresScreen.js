import { View, Text } from "react-native";

export default function HomeScreen({ xp }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 28, fontWeight: "800" }}>Chore Beasts 🐉</Text>
      <Text style={{ marginTop: 8, fontSize: 18 }}>XP: {xp}</Text>
    </View>
  );
}
