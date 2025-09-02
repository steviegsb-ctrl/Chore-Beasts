import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { getOrCreateTodayQuests, setQuests } from "./src/features/quests/quests";
import { useXp } from "./src/state/XpContext";
import { useStreaks } from "./src/features/streaks/useStreaks";

export default function QuestsScreen(){
  const [quests, setLocal] = useState([]);
  const { addXp } = useXp();
  const { markProgressToday } = useStreaks();

  useEffect(() => { (async () => setLocal(await getOrCreateTodayQuests()))(); }, []);

  const complete = async (i) => {
    const q = quests[i]; if (!q || q.done) return;
    const updated = quests.map((it, idx) => idx === i ? { ...it, done: true } : it);
    setLocal(updated); await setQuests(updated);
    addXp(q.bonus, { reason:"quest", questId:q.id }); markProgressToday();
    Alert.alert("Quest complete!", `+${q.bonus} XP`);
  };

  return (
    <View style={{ flex:1, padding:16 }}>
      <Text style={{ fontSize:24, fontWeight:"700" }}>Daily Quests</Text>
      <Text style={{ opacity:0.6, marginBottom:12 }}>New set rolls every day.</Text>
      {quests.map((q,i)=>(
        <Pressable key={q.id} onPress={()=>complete(i)}
          style={{ padding:16, borderRadius:12, backgroundColor:"#fff", elevation:2,
                   marginBottom:12, flexDirection:"row", justifyContent:"space-between", alignItems:"center" }}>
          <View>
            <Text style={{ fontSize:16, fontWeight:"600" }}>{q.label}</Text>
            <Text style={{ opacity:0.6 }}>Bonus: {q.bonus} XP</Text>
          </View>
          <View style={{ paddingHorizontal:12, paddingVertical:6, borderRadius:8,
                         backgroundColor: q.done ? "#22c55e" : "#3b82f6" }}>
            <Text style={{ color:"#fff" }}>{q.done ? "DONE" : "TAP TO COMPLETE"}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
