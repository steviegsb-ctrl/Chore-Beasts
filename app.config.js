export default {
  expo: {
    name: "Chore Beasts",
    slug: "chore-beasts",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.steviegsb.chorebeasts"
    },
    android: {
      package: "com.steviegsb.chorebeasts",
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      favicon: "./assets/icon.png"
    },
    extra: {
      eas: {
        projectId: "fdc24d96-fd42-4a2f-9648-1490d3f1d92f"
      }
    }
  }
};
