import { create } from "zustand";

interface ISheetStore {
    isCommentsOpen: boolean,
    openCommentSheet: () => void,
    closeCommentSheet: () => void
}

export const useSheetStore = create<ISheetStore>(
    (set) => ({
        isCommentsOpen: false,
        openCommentSheet: () => set({ isCommentsOpen: true }),
        closeCommentSheet: () => set({ isCommentsOpen: false })
    })
)