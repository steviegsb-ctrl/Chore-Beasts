import React from "react";
import { View, Text } from "react-native";
import { useStreaks } from "../features/streaks/useStreaks";

export default function StreakBadge(){
  const { streak, best } = useStreaks();
  return (
    <View style={{ alignSelf:"center", paddingHorizontal:12, paddingVertical:6,
                   borderRadius:999, backgroundColor:"#fde68a", marginVertical:6 }}>
      <Text>🔥 Streak: {streak}  •  Best: {best}</Text>
    </View>
  );
}
