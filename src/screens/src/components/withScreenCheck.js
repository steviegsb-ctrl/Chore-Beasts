import React from "react";
import { View, Text } from "react-native";

export default function withScreenCheck(Component, name) {
  if (typeof Component !== "function") {
    console.error(`🚨 Screen "${name}" is invalid or undefined!`);
    return function InvalidScreen() {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 18, color: "red", textAlign: "center" }}>
            Screen "{name}" failed to load.{"\n"}
            Check its export.
          </Text>
        </View>
      );
    };
  }
  return Component;
}
