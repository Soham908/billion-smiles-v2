import { IApiResponse } from "@/types/typeApiResponse";
import { IPost } from "@/types/typePost";
import { IUser } from "@/types/typeUser";
import axios from "axios";
const url = process.env.EXPO_PUBLIC_API_URL + "/auth";

interface IUserAuth extends IApiResponse {
    userData?: IUser;
    userPosts?: IPost[];
}

export const userLoginHandler = async (username: string, password: string): Promise<IUserAuth> => {
    try {
        const response = await axios.post(url + "/user-login", { username, password });
        return { success: response.data.success, message: response.data.message, userData: response.data.userData };
    } catch (error) {
        console.log("error occurred");
        return { success: false, message: "error: " + error };
    }
};


export const userSignupHandler = async (username: string, password: string, email: string): Promise<IUserAuth> => {
    try {
        const response = await axios.post(url + "/user-signup", { username, password, email });
        return { success: response.data.success, message: response.data.message, userData: response.data.userData };
    } catch (error) {
        console.log("error occurred");
        return { success: false, message: "error: " + error };
    }
};


export const ngoSignupHandler = async (username: string, password: string, email: string, organizationName: string, registrationId: string): Promise<IUserAuth> => {
    try {
        const response = await axios.post(url + "/ngo-signup", { username, password, email, organizationName, registrationId });
        return { success: response.data.success, message: response.data.message, userData: response.data.userData };
    } catch (error) {
        console.log("error occurred");
        return { success: false, message: "error: " + error };
    }
};


export const fetchUserDataHandler = async (userId: string): Promise<IUserAuth> => {
    try {
        const response = await axios.get(url + "/fetch-user-data/" + userId);
        const { success, message, userData, userPosts } = response.data
        return { success: success, message: message, userData: userData, userPosts: userPosts };
    } catch (error) {
        console.log("error occurred");
        return { success: false, message: "error: " + error };
    }
};
