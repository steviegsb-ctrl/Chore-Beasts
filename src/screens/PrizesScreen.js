import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Alert, FlatList } from "react-native";
import { getJSON, setJSON } from "./src/storage";
import { useXp } from "./src/state/XpContext";

const KEY = "cb:prizes";

export default function PrizesScreen(){
  const [prizes, setPrizes] = useState([]);
  const { xp, spendXp } = useXp();

  useEffect(() => { (async () => {
    const initial = await getJSON(KEY, [
      { id:"p1", title:"Movie Night", cost:50, claimed:false },
      { id:"p2", title:"Extra Screen Time (30m)", cost:30, claimed:false },
      { id:"p3", title:"£5 Treat", cost:100, claimed:false }
    ]);
    setPrizes(initial);
  })(); }, []);

  useEffect(() => { setJSON(KEY, prizes); }, [prizes]);

  const claim = (id) => {
    setPrizes(list => list.map(p => {
      if (p.id !== id || p.claimed) return p;
      const ok = spendXp(p.cost);
      if (!ok) { Alert.alert("Not enough XP", `You need ${p.cost - xp} more XP.`); return p; }
      return { ...p, claimed:true };
    }));
  };

  const renderItem = ({ item }) => (
    <View style={{ padding:16, borderRadius:12, backgroundColor:"#fff", elevation:2,
                   marginBottom:12, flexDirection:"row", justifyContent:"space-between", alignItems:"center" }}>
      <View>
        <Text style={{ fontSize:16, fontWeight:"600" }}>{item.title}</Text>
        <Text style={{ opacity:0.6 }}>{item.cost} XP</Text>
      </View>
      <Pressable onPress={() => claim(item.id)} disabled={item.claimed}
        style={{ paddingHorizontal:12, paddingVertical:6, borderRadius:8,
                 backgroundColor: item.claimed ? "#22c55e" : "#3b82f6" }}>
        <Text style={{ color:"#fff" }}>{item.claimed ? "CLAIMED" : "CLAIM"}</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={{ flex:1, padding:16 }}>
      <Text style={{ fontSize:24, fontWeight:"700", marginBottom:8 }}>Prizes</Text>
      <FlatList
        data={prizes}
        keyExtractor={it => it.id}
        renderItem={renderItem}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={5}
        removeClippedSubviews
      />
    </View>
  );
}
