import { useState } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from "react-native";

export default function EditRoomsScreen({ rooms, onAdd, onRemove }) {
  const [name, setName] = useState("");

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 8 }}>Edit Rooms</Text>

      <FlatList
        data={rooms}
        keyExtractor={(r) => r}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 6 }}>
            <Text>• {item}</Text>
            <TouchableOpacity onPress={() => onRemove(item)}>
              <Text style={{ color: "red" }}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Add a room"
        style={{ borderWidth: 1, padding: 8, borderRadius: 6, marginVertical: 10 }}
      />
      <Button
        title="Add"
        onPress={() => {
          const v = name.trim();
          if (v) onAdd(v);
          setName("");
        }}
      />
    </View>
  );
}
