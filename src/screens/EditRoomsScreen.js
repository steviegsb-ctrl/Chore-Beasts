import { useState } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";

export default function EditRoomsScreen({ rooms, setRooms }) {
  const [name, setName] = useState("");
  return (
    <View style={{ flex:1, padding:16 }}>
      <Text style={{ fontSize:22, fontWeight:"700", marginBottom:8 }}>Edit Rooms</Text>
      <FlatList data={rooms} renderItem={({ item }) => <Text>• {item}</Text>} />
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Add a room"
        style={{ borderWidth:1, padding:8, marginVertical:10, borderRadius:6 }}
      />
      <Button
        title="Add"
        onPress={() => {
          const v = name.trim();
          if (v) setRooms(r => [...r, v]);
          setName("");
        }}
      />
    </View>
  );
}
