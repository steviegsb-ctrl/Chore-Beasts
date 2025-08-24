import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

const initial = [
  { id: 1, room: "Kitchen", title: "Wash dishes", done: false },
  { id: 2, room: "Kitchen", title: "Take out bins", done: false },
  { id: 3, room: "Living Room", title: "Vacuum floor", done: true },
];

export default function TasksScreen() {
  const [tasks, setTasks] = useState(initial);

  const toggle = (id) =>
    setTasks((list) =>
      list.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );

  return (
    <ScrollView className="flex-1 bg-gradient-to-br from-teal-200 via-sky-100 to-indigo-200 p-6">
      <Text className="text-3xl font-extrabold text-teal-800 mb-4">✅ Tasks</Text>

      {tasks.map((t) => (
        <View key={t.id} className="bg-white p-4 rounded-2xl shadow mb-3">
          <Text className="text-xs text-gray-500">{t.room}</Text>
          <Text className="text-lg font-bold mb-2">{t.title}</Text>
          <TouchableOpacity
            onPress={() => toggle(t.id)}
            className={`px-4 py-2 rounded-xl ${
              t.done ? "bg-green-500" : "bg-gray-800"
            }`}
          >
            <Text className="text-white">
              {t.done ? "Marked Done ✅" : "Mark Done"}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}
