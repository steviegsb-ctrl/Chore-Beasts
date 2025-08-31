import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./HomeScreen";
import ChoresScreen from "./ChoresScreen";
import EditRoomsScreen from "./EditRoomsScreen";
import PrizesScreen from "./PrizesScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Chores" component={ChoresScreen} />
        <Tab.Screen name="Edit Rooms" component={EditRoomsScreen} />
        <Tab.Screen name="Prizes" component={PrizesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
