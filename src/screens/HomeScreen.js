import { View, Text, ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-gradient-to-br from-orange-200 via-yellow-100 to-pink-200 p-6">
      <Text className="text-4xl font-extrabold text-orange-800 mb-4">
        🐉 Chore Beasts
      </Text>
      <Text className="text-lg text-gray-800 mb-6">
        Welcome to your home base! Pick a room, smash some chores, and earn XP.
      </Text>

      {/* Example Room Cards */}
      <View className="bg-white p-4 rounded-2xl shadow mb-4">
        <Text className="font-bold text-orange-600 text-xl">Kitchen 🍳</Text>
        <Text>- Wash dishes</Text>
        <Text>- Take out trash</Text>
      </View>

      <View className="bg-white p-4 rounded-2xl shadow mb-4">
        <Text className="font-bold text-purple-600 text-xl">Living Room 🛋</Text>
        <Text>- Vacuum floor</Text>
        <Text>- Dust shelves</Text>
      </View>
    </ScrollView>
  );
}
