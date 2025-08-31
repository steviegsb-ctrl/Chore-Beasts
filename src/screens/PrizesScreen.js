import { useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";

export default function PrizesScreen() {
  const [xp, setXp] = useState(50);
  const [prizes, setPrizes] = useState([
    { id: "1", title: "Ice cream", cost: 30, claimed: false },
    { id: "2", title: "30m Screen Time", cost: 40, claimed: false },
  ]);

  function claimPrize(id) {
    setPrizes((prev) =>
      prev.map((p) => (p.id === id ? { ...p, claimed: true } : p))
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>Prize Board</Text>
      <Text style={{ marginBottom: 10 }}>XP: {xp}</Text>

      <FlatList
        data={prizes}
        keyExtractor={(p) => p.id}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item }) => {
          const canClaim = xp >= item.cost && !item.claimed;
          return (
            <View style={{ padding: 12, borderWidth: 1, borderRadius: 8 }}>
              <Text style={{ fontWeight: "600" }}>{item.title}</Text>
              <Text style={{ marginVertical: 4 }}>{item.cost} XP</Text>
              <Pressable
                onPress={() => {
                  if (!canClaim) return;
                  setXp((v) => v - item.cost);
                  claimPrize(item.id);
                }}
                disabled={!canClaim}
                style={{
                  paddingVertical: 8,
                  alignItems: "center",
                  backgroundColor: canClaim ? "#eee" : "#ddd",
                  borderRadius: 6,
                }}
              >
                <Text>{item.claimed ? "Claimed" : "Claim"}</Text>
              </Pressable>
            </View>
          );
        }}
      />
    </View>
  );
}
