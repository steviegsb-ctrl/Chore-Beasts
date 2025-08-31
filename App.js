import "react-native-gesture-handler";
import { useState } from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

function HomeScreen({ xp, setXp }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 12 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold" }}>Chore Beasts 🧹</Text>
      <Text style={{ fontSize: 18 }}>XP: {xp}</Text>
      <View style={{ height: 8 }} />
      <Button title="+10 XP (test)" onPress={() => setXp(xp + 10)} />
      <View style={{ height: 8 }} />
      <Button title="Reset XP" onPress={() => setXp(0)} />
    </View>
  );
}

function ChoresScreen({ chores, onComplete }) {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>Chores</Text>
      {chores.map((c) => (
        <View key={c.id} style={{ marginBottom: 12 }}>
          <Text style={{ fontSize: 16 }}>
            {c.title} ({c.xp} XP) {c.done ? "✓" : ""}
          </Text>
          <Button title={c.done ? "Completed" : "Complete"} onPress={() => onComplete(c.id)} disabled={c.done} />
        </View>
      ))}
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const [xp, setXp] = useState(0);
  const [chores, setChores] = useState([
    { id: "1", title: "Vacuum", xp: 10, done: false },
    { id: "2", title: "Dishes", xp: 20, done: false },
  ]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              const icon = route.name === "Home" ? "home" : "list";
              return <Ionicons name={icon} size={size} color={color} />;
            },
            tabBarLabelStyle: { fontSize: 12 },
          })}
        >
          <Tab.Screen name="Home">
            {() => <HomeScreen xp={xp} setXp={setXp} />}
          </Tab.Screen>
          <Tab.Screen name="Chores">
            {() => (
              <ChoresScreen
                chores={chores}
                onComplete={(id) => {
                  setChores((prev) => prev.map((c) => (c.id === id ? { ...c, done: true } : c)));
                  const add = (chores.find((c) => c.id === id) || { xp: 0 }).xp;
                  setXp((v) => v + add);
                }}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
