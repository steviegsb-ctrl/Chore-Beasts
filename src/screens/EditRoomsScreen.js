import { useState } from "react";
import { View, Text, TextInput, FlatList, Pressable } from "react-native";

export default function EditRoomsScreen() {
  const [rooms, setRooms] = useState(["Living room", "Kitchen", "Game room"]);
  const [name, setName] = useState("");

  function addRoom() {
    const n = name.trim();
    if (!n) return;
    setRooms((r) => [...r, n]);
    setName("");
  }

  function removeRoom(index) {
    setRooms((r) => r.filter((_, i) => i !== index));
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>Edit Rooms</Text>

      <FlatList
        style={{ marginVertical: 12 }}
        data={rooms}
        keyExtractor={(r, i) => `${r}-${i}`}
        ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
        renderItem={({ item, index }) => (
          <View
            style={{
              padding: 10,
              borderWidth: 1,
              borderRadius: 8,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text>• {item}</Text>
            <Pressable
              onPress={() => removeRoom(index)}
              style={{ paddingVertical: 6, paddingHorizontal: 10, borderWidth: 1, borderRadius: 6 }}
            >
              <Text>Remove</Text>
            </Pressable>
          </View>
        )}
      />

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Add a room"
        style={{ borderWidth: 1, padding: 10, borderRadius: 8 }}
      />

      <Pressable
        onPress={addRoom}
        style={{ marginTop: 10, padding: 12, borderWidth: 1, borderRadius: 8, alignItems: "center" }}
      >
        <Text>Add</Text>
      </Pressable>
    </View>
  );
}
