// App.js
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

// ✅ Import screens
import HomeScreen from "./src/screens/HomeScreen";
import ChoresScreen from "./src/screens/ChoresScreen";
import EditRoomsScreen from "./src/screens/EditRoomsScreen";
import PrizesScreen from "./src/screens/PrizesScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider
        initialMetrics={{
          frame: { x: 0, y: 0, width: 0, height: 0 },
          insets: { top: 0, left: 0, right: 0, bottom: 0 },
        }}
      >
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ color, size }) => {
                let iconName;
                if (route.name === "Home") iconName = "home";
                else if (route.name === "Chores") iconName = "list";
                else if (route.name === "Edit Rooms") iconName = "bed";
                else if (route.name === "Prizes") iconName = "gift";
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: "#2c7be5",
              tabBarInactiveTintColor: "gray",
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Chores" component={ChoresScreen} />
            <Tab.Screen name="Edit Rooms" component={EditRoomsScreen} />
            <Tab.Screen name="Prizes" component={PrizesScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
