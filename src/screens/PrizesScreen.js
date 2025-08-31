import { View, Text, FlatList, Button } from "react-native";

export default function PrizesScreen({ xp, setXp, prizes, setPrizes }) {
  return (
    <View style={{ flex:1, padding:16 }}>
      <Text style={{ fontSize:22, fontWeight:"700" }}>Prize Board</Text>
      <Text style={{ marginBottom:10 }}>XP: {xp}</Text>
      <FlatList
        data={prizes}
        keyExtractor={(p) => p.id}
        renderItem={({ item }) => (
          <View style={{ paddingVertical:8 }}>
            <Text>{item.title} • {item.cost} XP</Text>
            <Button
              title={item.claimed ? "Claimed" : "Claim"}
              onPress={() => {
                if (item.claimed || xp < item.cost) return;
                setXp(v => v - item.cost);
                setPrizes(prev => prev.map(p => p.id === item.id ? { ...p, claimed:true } : p));
              }}
              disabled={item.claimed || xp < item.cost}
            />
          </View>
        )}
      />
    </View>
  );
}
