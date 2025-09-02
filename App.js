// App.js
import 'react-native-gesture-handler';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { XpProvider } from "./src/state/XpContext";
import ErrorBoundary from "./src/components/ErrorBoundary";

// SCREENS (all live in src/screens)
import HomeScreen from "./src/screens/HomeScreen";
import ChoresScreen from "./src/screens/ChoresScreen";
import EditRoomsScreen from "./src/screens/EditRoomsScreen";
import BeastsScreen from "./src/screens/LeaderboardScreen";
import PrizesScreen from "./src/screens/PrizesScreen";
import TasksScreen from "./src/screens/TasksScreen";
import ViewHomeScreen from "./src/screens/ViewHomeScreen";
import ChatScreen from "./src/screens/ChatScreen";
import QuestsScreen from "./src/screens/QuestsScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <XpProvider>
      <ErrorBoundary>
        <NavigationContainer>
          <Tab.Navigator screenOptions={{ headerShown: true }}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Chores" component={ChoresScreen} />
            <Tab.Screen name="Rooms" component={EditRoomsScreen} />
            <Tab.Screen name="Beasts" component={BeastsScreen} />
            <Tab.Screen name="Prizes" component={PrizesScreen} />
            <Tab.Screen name="Tasks" component={TasksScreen} />
            <Tab.Screen name="Quests" component={QuestsScreen} />
            <Tab.Screen name="ViewHome" component={ViewHomeScreen} />
            <Tab.Screen name="Chat" component={ChatScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </ErrorBoundary>
    </XpProvider>
  );
}
