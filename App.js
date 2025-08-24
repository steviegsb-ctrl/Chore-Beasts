import { Text, View, ScrollView } from 'react-native';

export default function App() {
  return (
    <ScrollView className="flex-1 bg-gradient-to-br from-orange-200 via-yellow-100 to-pink-200 p-6">
      <Text className="text-4xl font-extrabold text-orange-800 mb-4">
        🐉 Chore Beasts
      </Text>
      <Text className="text-lg text-gray-800 mb-6">
        Unleash your inner chore beast! Track chores, earn XP, and level up.
      </Text>

      {/* Rooms */}
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

      {/* Leaderboard */}
      <View className="bg-white p-4 rounded-2xl shadow">
        <Text className="font-bold text-yellow-600 text-xl mb-2">Leaderboard 🏆</Text>
        <Text>Stevie — 42 XP</Text>
        <Text>Leo — 18 XP</Text>
        <Text>Parker 🐶 — 5 XP</Text>
      </View>
    </ScrollView>
  );
}
