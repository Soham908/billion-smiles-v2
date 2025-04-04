import { IApiResponse } from "@/types/typeApiResponse";
import axios from "axios";
const url = process.env.EXPO_PUBLIC_API_URL + "/auth";

interface IUserAuth extends IApiResponse {
  userData?: any;
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
