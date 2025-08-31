// Must be the very first imports
import "react-native-gesture-handler";
import "react-native-url-polyfill/auto";

import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { load, save } from "./src/storage";

// screens
import HomeScreen from "./src/screens/HomeScreen";
import ChoresScreen from "./src/screens/ChoresScreen";
import EditRoomsScreen from "./src/screens/EditRoomsScreen";
import PrizesScreen from "./src/screens/PrizesScreen";

const Tab = createBottomTabNavigator();

// sample data if nothing stored yet
const initialRooms = ["Living room", "Kitchen", "Game room"];
const initialChores = [
  { id: "1", title: "Vacuum", room: "Living room", xp: 10, done: false },
  { id: "2", title: "Dishes", room: "Kitchen", xp: 20, done: false }
];
const initialPrizes = [
  { id: "1", title: "Ice cream", cost: 30, claimed: false },
  { id: "2", title: "30m Screen Time", cost: 40, claimed: false }
];

export default function App() {
  // ----- global app state -----
  const [xp, setXp] = useState(0);
  const [rooms, setRooms] = useState(initialRooms);
  const [chores, setChores] = useState(initialChores);
  const [prizes, setPrizes] = useState(initialPrizes);

  // ----- load once on startup -----
  useEffect(() => {
    (async () => {
      setXp(await load("xp", 0));
      setRooms(await load("rooms", initialRooms));
      setChores(await load("chores", initialChores));
      setPrizes(await load("prizes", initialPrizes));
    })();
  }, []);

  // ----- persist on change -----
  useEffect(() => { save("xp", xp); }, [xp]);
  useEffect(() => { save("rooms", rooms); }, [rooms]);
  useEffect(() => { save("chores", chores); }, [chores]);
  useEffect(() => { save("prizes", prizes); }, [prizes]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider initialMetrics={{
        frame: { x: 0, y: 0, width: 0, height: 0 },
        insets: { top: 0, left: 0, right: 0, bottom: 0 },
      }}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ color, size }) => {
                const icon =
                  route.name === "Home" ? "home" :
                  route.name === "Chores" ? "list" :
                  route.name === "Edit Rooms" ? "bed" : "gift";
                return <Ionicons name={icon} size={size} color={color} />;
              },
              tabBarActiveTintColor: "#2c7be5",
              tabBarInactiveTintColor: "gray",
            })}
          >
            <Tab.Screen name="Home">
              {() => <HomeScreen xp={xp} />}
            </Tab.Screen>

            <Tab.Screen name="Chores">
              {() => (
                <ChoresScreen
                  rooms={rooms}
                  chores={chores}
                  onComplete={(id) => {
                    setChores(prev =>
                      prev.map(c => c.id === id ? { ...c, done: true } : c)
                    );
                    const add = (chores.find(c => c.id === id) || { xp: 0 }).xp;
                    setXp(v => v + add);
                  }}
                  onAdd={(title, room, xpValue) => {
                    const id = String(Date.now());
                    setChores(prev => [...prev, { id, title, room, xp: xpValue, done: false }]);
                  }}
                  onReset={() => setChores(prev => prev.map(c => ({ ...c, done: false })))}
                />
              )}
            </Tab.Screen>

            <Tab.Screen name="Edit Rooms">
              {() => (
                <EditRoomsScreen
                  rooms={rooms}
                  onAdd={(name) => {
                    const v = name.trim();
                    if (v && !rooms.includes(v)) setRooms(r => [...r, v]);
                  }}
                  onRemove={(name) => setRooms(r => r.filter(x => x !== name))}
                />
              )}
            </Tab.Screen>

            <Tab.Screen name="Prizes">
              {() => (
                <PrizesScreen
                  xp={xp}
                  prizes={prizes}
                  onClaim={(id) => {
                    const p = prizes.find(pr => pr.id === id);
                    if (!p || p.claimed || xp < p.cost) return;
                    setXp(v => v - p.cost);
                    setPrizes(prev => prev.map(pr => pr.id === id ? { ...pr, claimed: true } : pr));
                  }}
                  onAdd={(title, cost) => {
                    const id = String(Date.now());
                    setPrizes(prev => [...prev, { id, title, cost, claimed: false }]);
                  }}
                  onReset={() => setPrizes(prev => prev.map(p => ({ ...p, claimed: false })))}
                />
              )}
            </Tab.Screen>
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
