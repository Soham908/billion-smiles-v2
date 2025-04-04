import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IUser } from "@/types/typeUser";

interface IUserStore {
  userData: IUser,
  isAuthenticated: boolean
  isUserCausePreferenceSet: boolean;
  setUserData: (userData: IUser) => void;
  logoutZustandState: () => void;
}

export const useUserStore = create(
  persist<IUserStore>(
    (set) => ({
      userData: {} as IUser,
      isAuthenticated: false,
      isUserCausePreferenceSet: false,
      setUserData: (userData) => set({ userData: userData, isAuthenticated: true, isUserCausePreferenceSet: true }),
      logoutZustandState: () => set({ isAuthenticated: false, userData: {} as IUser, isUserCausePreferenceSet: false }),
    
    }),
    {
      name: "billion-smiles-user-auth-v2",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
