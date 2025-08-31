import { useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";

export default function ChoresScreen() {
  const [chores, setChores] = useState([
    { id: "1", title: "Vacuum", room: "Living room", xp: 10, done: false },
    { id: "2", title: "Dishes", room: "Kitchen", xp: 20, done: false },
  ]);

  function complete(id) {
    setChores((prev) =>
      prev.map((c) => (c.id === id ? { ...c, done: true } : c))
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>Chores</Text>

      <FlatList
        data={chores}
        keyExtractor={(c) => c.id}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderWidth: 1, borderRadius: 8 }}>
            <Text style={{ fontWeight: "600" }}>
              {item.title} • {item.room}
            </Text>
            <Text style={{ marginVertical: 4 }}>{item.xp} XP</Text>
            <Pressable
              onPress={() => complete(item.id)}
              disabled={item.done}
              style={{
                paddingVertical: 8,
                alignItems: "center",
                backgroundColor: item.done ? "#ddd" : "#eee",
                borderRadius: 6,
              }}
            >
              <Text>{item.done ? "Completed" : "Complete"}</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}
