import AsyncStorage from "@react-native-async-storage/async-storage";

export const getJSON = async (key, fallback = null) => {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const setJSON = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {}
};
