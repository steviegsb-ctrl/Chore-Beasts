import { useState } from "react";
import { View, Text, FlatList, TextInput, Button } from "react-native";

export default function ChoresScreen({ rooms, chores, onComplete, onAdd, onReset }) {
  const [title, setTitle] = useState("");
  const [room, setRoom] = useState(rooms[0] || "");
  const [xpValue, setXpValue] = useState("10");

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 8 }}>Chores</Text>

      <FlatList
        data={chores}
        keyExtractor={(c) => c.id}
        ListEmptyComponent={<Text>No chores yet. Add one below.</Text>}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 8 }}>
            <Text>{item.title} • {item.room} • {item.xp} XP {item.done ? "✓" : ""}</Text>
            <Button
              title={item.done ? "Completed" : "Complete"}
              onPress={() => onComplete(item.id)}
              disabled={item.done}
            />
          </View>
        )}
      />

      <View style={{ height: 12 }} />

      <Text style={{ fontWeight: "600" }}>Add a chore</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        style={{ borderWidth: 1, padding: 8, borderRadius: 6, marginTop: 6 }}
      />
      <TextInput
        value={room}
        onChangeText={setRoom}
        placeholder="Room"
        style={{ borderWidth: 1, padding: 8, borderRadius: 6, marginTop: 6 }}
      />
      <TextInput
        value={xpValue}
        onChangeText={setXpValue}
        placeholder="XP (number)"
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8, borderRadius: 6, marginTop: 6 }}
      />
      <View style={{ height: 6 }} />
      <Button
        title="Add chore"
        onPress={() => {
          const xpNum = Number(xpValue) || 0;
          if (!title.trim()) return;
          onAdd(title.trim(), room.trim() || "General", xpNum);
          setTitle("");
          setXpValue("10");
        }}
      />

      <View style={{ height: 6 }} />
      <Button title="Reset all to not done" onPress={onReset} />
    </View>
  );
}
