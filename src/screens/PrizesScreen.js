import { useState } from "react";
import { View, Text, FlatList, TextInput, Button } from "react-native";

export default function PrizesScreen({ xp, prizes, onClaim, onAdd, onReset }) {
  const [title, setTitle] = useState("");
  const [cost, setCost] = useState("30");

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>Prize Board</Text>
      <Text style={{ marginBottom: 10 }}>XP: {xp}</Text>

      <FlatList
        data={prizes}
        keyExtractor={(p) => p.id}
        ListEmptyComponent={<Text>No prizes yet. Add one below.</Text>}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 8 }}>
            <Text>{item.title} • {item.cost} XP {item.claimed ? "(claimed)" : ""}</Text>
            <Button title={item.claimed ? "Claimed" : "Claim"} onPress={() => onClaim(item.id)} disabled={item.claimed || xp < item.cost}/>
          </View>
        )}
      />

      <View style={{ height: 12 }} />
      <Text style={{ fontWeight: "600" }}>Add a prize</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Prize title"
        style={{ borderWidth: 1, padding: 8, borderRadius: 6, marginTop: 6 }}
      />
      <TextInput
        value={cost}
        onChangeText={setCost}
        placeholder="Cost (XP)"
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8, borderRadius: 6, marginTop: 6 }}
      />
      <View style={{ height: 6 }} />
      <Button
        title="Add prize"
        onPress={() => {
          const n = Number(cost) || 0;
          if (!title.trim() || n <= 0) return;
          onAdd(title.trim(), n);
          setTitle("");
          setCost("30");
        }}
      />

      <View style={{ height: 6 }} />
      <Button title="Reset all claimed" onPress={onReset} />
    </View>
  );
}
