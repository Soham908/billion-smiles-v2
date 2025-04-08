import { IPost } from "@/types/typePost";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IPostStore {
    setUserPosts: (postData: IPost[]) => void,
    userPosts: IPost[]
}

export const usePostStore = create(persist<IPostStore>(
    (set) => ({
        setUserPosts: (postData) => set({ userPosts: postData }),
        userPosts: []
    }),
    {
        name: "billion-smiles-posts-v2",
        storage: createJSONStorage(() => AsyncStorage),
    }
))
