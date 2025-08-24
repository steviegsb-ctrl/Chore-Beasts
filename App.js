import "react-native-gesture-handler";
import { useState } from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./src/screens/HomeScreen";
import ChatScreen from "./src/screens/ChatScreen";
import TasksScreen from "./src/screens/TasksScreen";
import LeaderboardScreen from "./src/screens/LeaderboardScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  // --- Shared XP state (edit names as you like)
  const [players, setPlayers] = useState([
    { id: "stevie", name: "Stevie", xp: 42 },
    { id: "leo", name: "Leo", xp: 18 },
    { id: "parker", name: "Parker 🐶", xp: 5 },
  ]);

  // Add (or subtract) XP for a player by id
  const addXp = (playerId, amount) => {
    setPlayers(prev =>
      prev.map(p => (p.id === playerId ? { ...p, xp: Math.max(0, p.xp + amount) } : p))
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: "#fff", paddingBottom: 5, height: 60 },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ tabBarLabel: "Home", tabBarIcon: () => <Text>🏠</Text> }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{ tabBarLabel: "Chat", tabBarIcon: () => <Text>💬</Text> }}
        />
        {/* Pass XP functions/state into Tasks + Leaderboard */}
        <Tab.Screen
          name="Tasks"
          children={() => (
            <TasksScreen
              players={players}
              addXp={addXp}
              xpPerTask={5} // change value to tune reward
            />
          )}
          options={{ tabBarLabel: "Tasks", tabBarIcon: () => <Text>✅</Text> }}
        />
        <Tab.Screen
          name="Leaderboard"
          children={() => <LeaderboardScreen players={players} />}
          options={{ tabBarLabel: "XP", tabBarIcon: () => <Text>🏆</Text> }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
