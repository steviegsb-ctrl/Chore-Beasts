import { View, Text } from "react-native";

export default function LeaderboardScreen() {
  return (
    <View className="flex-1 bg-gradient-to-br from-yellow-200 via-orange-100 to-red-200 p-6">
      <Text className="text-3xl font-extrabold text-yellow-800 mb-4">
        🏆 Leaderboard
      </Text>

      <View className="bg-white p-4 rounded-2xl shadow mb-3">
        <Text className="text-xl font-bold text-orange-600">Stevie</Text>
        <Text>42 XP</Text>
      </View>

      <View className="bg-white p-4 rounded-2xl shadow mb-3">
        <Text className="text-xl font-bold text-blue-600">Leo</Text>
        <Text>18 XP</Text>
      </View>

      <View className="bg-white p-4 rounded-2xl shadow mb-3">
        <Text className="text-xl font-bold text-green-600">Parker 🐶</Text>
        <Text>5 XP</Text>
      </View>
    </View>
  );
}
