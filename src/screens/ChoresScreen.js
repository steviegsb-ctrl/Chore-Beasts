import { View, Text, FlatList, Button } from "react-native";

export default function ChoresScreen({ chores, setChores, xp, setXp }) {
  return (
    <View style={{ flex:1, padding:16 }}>
      <Text style={{ fontSize:22, fontWeight:"700", marginBottom:8 }}>Chores</Text>
      <FlatList
        data={chores}
        keyExtractor={(c) => c.id}
        renderItem={({ item }) => (
          <View style={{ paddingVertical:8 }}>
            <Text>{item.title} • {item.room} • {item.xp} XP</Text>
            <Button
              title={item.done ? "Completed" : "Complete"}
              onPress={() => {
                if (item.done) return;
                setChores(prev => prev.map(c => c.id === item.id ? { ...c, done:true } : c));
                setXp(v => v + item.xp);
              }}
            />
          </View>
        )}
      />
    </View>
  );
}
