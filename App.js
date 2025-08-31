import "react-native-gesture-handler";
import { useState } from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Use a separate Home screen file (below)
import HomeScreen from "./src/screens/HomeScreen";

// Super-simple placeholder screens to avoid missing-file errors
function ChoresScreen({ onComplete }) {
  return (
    <View style={{ flex: 1, padding: 20, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>Chores</Text>
      <Button title="Complete ‘Vacuum’ (+10 XP)" onPress={() => onComplete(10)} />
    </View>
  );
}

function PrizesScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20 }}>Prizes (coming soon)</Text>
    </View>
  );
}

function RoomsScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20 }}>Rooms (coming soon)</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const [xp, setXp] = useState(0);

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home">
          {() => <HomeScreen xp={xp} setXp={setXp} />}
        </Tab.Screen>

        <Tab.Screen name="Chores">
          {() => <ChoresScreen onComplete={(gain) => setXp((v) => v + gain)} />}
        </Tab.Screen>

        <Tab.Screen name="Prizes" component={PrizesScreen} />
        <Tab.Screen name="Rooms" component={RoomsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
