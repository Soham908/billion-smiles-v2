import { IPost } from "@/types/typePost";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IPostStore {
    userPosts: IPost[],
    allPosts: IPost[],
    setUserPosts: (postData: IPost[]) => void,
    setAllPosts: (postData: IPost[]) => void,
}

export const usePostStore = create(persist<IPostStore>(
    (set) => ({
        userPosts: [],
        allPosts: [],
        setUserPosts: (postData) => set({ userPosts: postData }),
        setAllPosts: (postData) => set({ allPosts: postData }),
    }),
    {
        name: "billion-smiles-posts-v2",
        storage: createJSONStorage(() => AsyncStorage),
    }
))
