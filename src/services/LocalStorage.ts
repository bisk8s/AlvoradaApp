import { AsyncStorage } from "react-native";

// https://docs.expo.io/versions/latest/react-native/asyncstorage/
export default class LocalStorage {
  static PRODUCT_NAME = "InterAcademy";
  static async set(key: string, data: any) {
    try {
      await AsyncStorage.setItem(LocalStorage.getKey(key), JSON.stringify(data));
    } catch (error) {
      console.error("[STORE:SET]:", error);
    }
  }

  static async get(key: string) {
    try {
      const value = await AsyncStorage.getItem(LocalStorage.getKey(key));
      return JSON.parse(value);
    } catch (error) {
      console.error("[STORE:GET]:", error);
    }
  }

  static async merge(key: string, data: any) {
    try {
      await AsyncStorage.mergeItem(LocalStorage.getKey(key), JSON.stringify(data));
    } catch (error) {
      console.error("[STORE:MERGE]:", error);
    }
  }

  static async remove(key: string) {
    try {
      await AsyncStorage.removeItem(LocalStorage.getKey(key));
    } catch (error) {
      console.error("[STORE:REMOVE]:", error);
    }
  }

  static getKey(key: string) {
    return `@${LocalStorage.PRODUCT_NAME}:${key}`;
  }
}
