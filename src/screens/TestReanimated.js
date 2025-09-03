import React from "react";
import { View, StyleSheet, Button } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

export default function TestReanimated() {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value * 100 }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, animatedStyles]} />
      <Button
        title="Move Box"
        onPress={() => {
          offset.value = offset.value === 0 ? 1 : 0;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 80,
    height: 80,
    backgroundColor: "skyblue",
    borderRadius: 12,
  },
});
