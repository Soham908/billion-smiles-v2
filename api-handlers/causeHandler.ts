import { IApiResponse } from "@/types/typeApiResponse";
import axios from "axios";
import { uploadImageToCloudinary } from "./uploadPostHandler";
import { ICause } from "@/types/typeCause";
const url = process.env.EXPO_PUBLIC_API_URL + "/cause";

interface ICauseResponse extends IApiResponse {
    causeData?: any;
}
export const createCauseHandler = async (causeDataSend: ICause): Promise<ICauseResponse> => {
    try {
        const imageUrl = await uploadImageToCloudinary(causeDataSend.imageUrl, 'billion_smiles_cause_images')
        causeDataSend.imageUrl = imageUrl

        const response = await axios.post(url + "/create-cause", causeDataSend);

        const { success, message, causeData } = response.data
        return { success: success, message: message, causeData: causeData };

    } catch (error) {
        console.log("error occurred");
        return { success: false, message: "error: " + error };
    }
};

interface IUserCauses extends IApiResponse {
    causeData?: ICause[];
}
export const fetchUserCausesHandler = async (userId: string): Promise<IUserCauses> => {
    try {
        const response = await axios.get(url + "/fetch-user-causes/" + userId);
        const { success, message, causeData } = response.data

        return { success: success, message: message, causeData: causeData };

    } catch (error) {
        console.log("error occurred");
        return { success: false, message: "error: " + error };
    }
};


interface IFetchCauses extends IApiResponse {
  causeData?: ICause[];
}
export const fetchCausesHandler = async (): Promise<IFetchCauses> => {
  try {
    const response = await axios.get(url + "/fetch-causes");
    const { success, message, causeData } = response.data

    return { success: success, message: message, causeData: causeData };

  } catch (error) {
    console.log("error occurred");
    return { success: false, message: "error: " + error };
  }
};
