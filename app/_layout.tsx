import { Stack } from "expo-router";
import { SafeAreaView, StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={"dark-content"} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/signup" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/preferences" options={{ headerShown: false }} />

        <Stack.Screen name="(screens)/create-post" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
}
