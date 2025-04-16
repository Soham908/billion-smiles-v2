import { IComment } from "@/types/typePost";
import { create } from "zustand";

interface ISheetStore {
    isCommentsOpen: boolean,
    postId: string,
    comments: IComment[],
    setComments: (comments: IComment[]) => void
    openCommentSheet: (postId: string) => void,
    closeCommentSheet: () => void
}

export const useSheetStore = create<ISheetStore>(
    (set) => ({
        isCommentsOpen: false,
        postId: '',
        comments: [],
        setComments: (comments) => set({ comments: comments }),
        openCommentSheet: (postId) => set({ isCommentsOpen: true, postId: postId }),
        closeCommentSheet: () => set({ isCommentsOpen: false })
    })
)
