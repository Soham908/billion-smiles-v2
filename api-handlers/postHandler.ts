import { usePostStore } from "@/store/postStore";
import { IApiResponse } from "@/types/typeApiResponse";
import { IPost } from "@/types/typePost"
import axios from "axios"

const url = process.env.EXPO_PUBLIC_API_URL + "/post";

interface IFetchAllPosts extends IApiResponse {
    allPosts?: IPost[]
}

export const fetchAllPostHandler = async (): Promise<IFetchAllPosts> => {
    try {
        const response = await axios.get(url + "/fetch-all-posts")
        const { success, message, allPosts } = response.data
        return { success: success, message: message, allPosts: allPosts }
    } catch (error) {
        console.log("error occured: " + error)
        return { success: false, message: "error: " + error }
    }
}


interface IFetchUserPosts extends IApiResponse {
  userPosts?: IPost[];
}
export const fetchUserPostsHandler = async (userId: string): Promise<IFetchUserPosts> => {
  try {
    const response = await axios.get(url + "/fetch-user-posts/" + userId);
    const { success, message, userPosts } = response.data
    const { setUserPosts } = usePostStore.getState()
    setUserPosts(userPosts)
    console.log(userPosts)
    return { success: success, message: message, userPosts: userPosts };
  } catch (error) {
    console.log("error occurred");
    return { success: false, message: "error: " + error };
  }
};


interface IPostResponse extends IApiResponse {
    postData?: IPost;
}
export const likePostHandler = async (userId: string, username: string, postId: string ): Promise<IPostResponse> => {
    try {
        const response = await axios.post(url + "/user-like-post", { userId, username, postId });
        const { success, message, postData } = response.data
        return { success: success, message: message, postData: postData };
    } catch (error) {
        console.log("error occurred");
        return { success: false, message: "error: " + error };
    }
};


export const uploadCommentHandler = async (userId: string, username: string, postId: string, commentText: string): Promise<IPostResponse> => {
  try {
    const response = await axios.post(url + "/upload-post-comment", { userId, username, postId, commentText });
    const { success, message, postData } = response.data

    return { success: success, message: message, postData: postData };
  } catch (error) {
    console.log("error occurred");
    return { success: false, message: "error: " + error };
  }
};
