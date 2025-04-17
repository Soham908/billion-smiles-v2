import { IApiResponse } from "@/types/typeApiResponse";
import { IPost } from "@/types/typePost";
import axios from "axios";

const url = process.env.EXPO_PUBLIC_API_URL + "/post";
const cloudinaryUrl = process.env.EXPO_PUBLIC_CLOUDINARY_URL

const uploadImageToCloudinary = async (uri: string) => {
    try {
        const formData = new FormData();
        formData.append('file', uri);
        formData.append('upload_preset', 'billion_smiles_upload_image');

        const response = await axios.post(
            cloudinaryUrl!,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        return response.data.secure_url;
    } catch (error: any) {
        console.error('Image upload failed:', error || error);
        throw error;
    }
};

interface IPostDetails {
    userId: string,
    imageUrl: string,
    caption: string,
}
interface ICreatePostResponse extends IApiResponse {
    postData?: IPost
}
export const createPostHandler = async (postDetails: IPostDetails, uri: string): Promise<ICreatePostResponse> => {
    try {
        console.log(postDetails)
        const imageUrl = await uploadImageToCloudinary(uri);
        postDetails.imageUrl = imageUrl
        const response = await axios.post(url + "/create-user-post", postDetails)
        return { success: true, message: "post created", postData: response.data }
    } catch (error) {
        console.log(error);
        return { success: false, message: "post not created" }
    }
}
