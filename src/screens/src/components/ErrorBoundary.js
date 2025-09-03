// src/components/ErrorBoundary.js
import React from "react";
import { View, Text } from "react-native";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 8 }}>
            Something went wrong.
          </Text>
          <Text selectable style={{ opacity: 0.7, textAlign: "center" }}>
            {String(this.state.error || "")}
          </Text>
        </View>
      );
    }
    return this.props.children;
  }
}
