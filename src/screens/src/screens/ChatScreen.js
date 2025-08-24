import { View, Text, TextInput, ScrollView } from "react-native";

export default function ChatScreen() {
  return (
    <View className="flex-1 bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200 p-6">
      <Text className="text-3xl font-extrabold text-purple-800 mb-4">
        💬 House Chat
      </Text>

      {/* Messages */}
      <ScrollView className="flex-1 bg-white p-4 rounded-2xl shadow mb-4">
        <Text><Text className="font-bold text-pink-500">Stevie:</Text> Don’t forget bins night! 🗑️</Text>
        <Text><Text className="font-bold text-blue-500">Leo:</Text> Can I swap dishes for vacuuming?</Text>
        <Text><Text className="font-bold text-green-500">Parker 🐶:</Text> *chewed mop again*</Text>
      </ScrollView>

      {/* Input */}
      <TextInput
        placeholder="Type a message..."
        className="bg-white rounded-xl p-3 border border-gray-300"
      />
    </View>
  );
}
