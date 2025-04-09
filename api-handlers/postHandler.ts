import { IApiResponse } from "@/types/typeApiResponse";
import { IPost } from "@/types/typePost"
import axios from "axios"

const url = process.env.EXPO_PUBLIC_API_URL + "/post";

interface IFetchAllPosts extends IApiResponse {
    allPosts: IPost[]
}

export const fetchAllPostHandler = async (): Promise<IFetchAllPosts> => {
    const response = await axios.get(url + "/fetch-all-posts")
    const { success, message, allPosts } = response.data
    return { success: success, message: message, allPosts: allPosts }
}

interface IUserLikePost extends IApiResponse {
    postData?: any;
}
export const likePostHandler = async (userId: string, username: string, postId: string ): Promise<IUserLikePost> => {
    try {
        const response = await axios.post(url + "/user-like-post", { userId, username, postId });
        const { success, message, postData } = response.data
        return { success: success, message: message, postData: postData };
    } catch (error) {
        console.log("error occurred");
        return { success: false, message: "error: " + error };
    }
};
