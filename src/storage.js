import AsyncStorage from "@react-native-async-storage/async-storage";

export async function load(key, fallback) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (e) {
    console.warn("Failed to load", key, e);
    return fallback;
  }
}

export async function save(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn("Failed to save", key, e);
  }
}
