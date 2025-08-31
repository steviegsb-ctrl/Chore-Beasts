import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Load a value from AsyncStorage.
 * If nothing is stored or an error happens, return the fallback.
 */
export async function load(key, fallback) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (e) {
    console.warn("Failed to load", key, e);
    return fallback;
  }
}

/**
 * Save a value to AsyncStorage.
 */
export async function save(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn("Failed to save", key, e);
  }
}
