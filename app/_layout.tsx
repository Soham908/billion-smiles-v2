import { fetchUserDataHandler } from "@/api-handlers/authHandler";
import { usePostStore } from "@/store/postStore";
import { useUserStore } from "@/store/userStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "@/utils/dayjs"

export default function RootLayout() {
    const { userData, setUserData } = useUserStore()
    const { setUserPosts } = usePostStore()

    const fetchUserData = async () => {
        const response = await fetchUserDataHandler(userData._id)
        console.log(response)
        if (response.success && response.userData && response.userPosts) {
            setUserData(response.userData)
            setUserPosts(response.userPosts)
        }
    }

    const checkUserAuth = async () => {
        const storedData = await AsyncStorage.getItem("billion-smiles-user-data-v2");
        const userData = storedData ? JSON.parse(storedData) : null;
        if (userData && userData.state?.isAuthenticated) {
            fetchUserData();
        }
    };

    useEffect(() => {
        checkUserAuth()
    }, [])

    return (
        <GestureHandlerRootView style={{ flex: 1 }} >
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
        </GestureHandlerRootView>
    );
}
