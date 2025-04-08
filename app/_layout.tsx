import { fetchUserDataHandler } from "@/api-handlers/authHandler";
import { usePostStore } from "@/store/postStore";
import { useUserStore } from "@/store/userStore";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView, StatusBar } from "react-native";

export default function RootLayout() {
  const { userData } = useUserStore()
  const { setUserPosts } = usePostStore()

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetchUserDataHandler(userData._id)
      console.log(response)
      response.userPosts && setUserPosts(response.userPosts)
    }
    fetchUserData()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={"dark-content"} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/signup" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)/preferences" options={{ headerShown: false }} />

        <Stack.Screen name="(screens)/create-post" options={{ headerShown: false }} />
        <Stack.Screen name="(screens)/settings" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
}
