import { IPost } from "@/types/typePost"
import axios from "axios"

const url = process.env.EXPO_PUBLIC_API_URL + "/post";

interface IFetchAllPosts {
    success: boolean,
    message: string,
    allPosts: IPost[]
}

export const fetchAllPostHandler = async (): Promise<IFetchAllPosts> => {
    const response = await axios.get(url + "/fetch-all-posts")
    const { success, message, allPosts } = response.data
    return { success: success, message: message, allPosts: allPosts }
}
