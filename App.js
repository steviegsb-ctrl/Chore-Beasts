import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { XpProvider } from "./src/state/XpContext";
import ErrorBoundary from "./src/components/ErrorBoundary";

import HomeScreen from "./HomeScreen";
import ChoresScreen from "./ChoresScreen";
import EditRoomsScreen from "./EditRoomsScreen";    // use if this is your Rooms editor
import BeastsScreen from "./LeaderboardScreen";     // or replace with your actual Beasts screen file
import PrizesScreen from "./PrizesScreen";
import TasksScreen from "./TasksScreen";
import ViewHomeScreen from "./ViewHomeScreen";
import ChatScreen from "./ChatScreen";

// NEW
import QuestsScreen from "./QuestsScreen";

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
