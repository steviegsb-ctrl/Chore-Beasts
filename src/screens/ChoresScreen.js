import React, { useEffect, useState } from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import { getJSON, setJSON } from "./src/storage";
import { useXp } from "./src/state/XpContext";
import { useStreaks } from "./src/features/streaks/useStreaks";

const KEY = "cb:chores";

export default function ChoresScreen(){
  const [chores, setChores] = useState([]);
  const { addXp } = useXp();
  const { markProgressToday } = useStreaks();

  useEffect(() => { (async () => {
    const initial = await getJSON(KEY, [
      { id:"c1", title:"Make bed", room:"Bedroom", xp:5, done:false },
      { id:"c2", title:"Dishes", room:"Kitchen", xp:10, done:false },
      { id:"c3", title:"Vacuum", room:"Living room", xp:15, done:false }
    ]);
    setChores(initial);
  })(); }, []);

  useEffect(() => { setJSON(KEY, chores); }, [chores]);

  const complete = (id) => {
    setChores(list => list.map(c => {
      if (c.id !== id || c.done) return c;
      addXp(c.xp, { reason:"chore", choreId:c.id });
      markProgressToday();
      return { ...c, done:true };
    }));
  };

  const renderItem = ({ item }) => (
    <View style={{ padding:16, borderRadius:12, backgroundColor:"#fff", elevation:2,
                   marginBottom:12, flexDirection:"row", justifyContent:"space-between", alignItems:"center" }}>
      <View>
        <Text style={{ fontSize:16, fontWeight:"600" }}>{item.title}</Text>
        <Text style={{ opacity:0.6 }}>{item.room} • {item.xp} XP</Text>
      </View>
      <Pressable onPress={() => complete(item.id)} disabled={item.done}
        style={{ paddingHorizontal:12, paddingVertical:6, borderRadius:8,
                 backgroundColor: item.done ? "#22c55e" : "#3b82f6" }}>
        <Text style={{ color:"#fff" }}>{item.done ? "DONE" : "COMPLETE"}</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={{ flex:1, padding:16 }}>
      <Text style={{ fontSize:24, fontWeight:"700", marginBottom:8 }}>Chores</Text>
      <FlatList
        data={chores}
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
