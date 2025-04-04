// import { ICampaign } from "./campaignType";
import { IUser } from "./typeUser";

export interface IComment {
  userId: string;
  commentUsername?: string;
  commentText: string;
  createdAt: string;
}

export interface IPost {
  _id: string;
  userId: IUser;
  imageUrl: string;
  caption: string;
//   campaignId: ICampaign;
  tags: string[];
  likes: number;
  likedBy: [{ userId: string, likedUsername: string }];
  comments: IComment[];
  visibility: "public" | "private";
  shares: number;
  createdAt: string;
  updatedAt: string;
  companyLogoUrl: string;
}
