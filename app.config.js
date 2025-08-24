/** Expo app config for Chore Beasts */
module.exports = {
  expo: {
    name: "Chore Beasts",
    slug: "chore-beasts",
    version: "1.0.0",
    orientation: "portrait",

    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },

    assetBundlePatterns: ["**/*"],

    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.stevie.chorebeasts"
    },

    android: {
      package: "com.stevie.chorebeasts",
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        backgroundColor: "#ffffff"
      }
    },

    web: {
      favicon: "./assets/icon.png"
    },

    experiments: {
      tsconfigPaths: false
    }
  }
};
