// import { ICampaign } from "./campaignType";
import { ICause } from "./typeCause";
import { IUser } from "./typeUser";

export interface IComment {
  _id: string,
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
  causeId: ICause;
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
