export interface IPost {
  title: string;
  text: string;
  img: string;
  views: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  type: typePostCategory;
  сity: string;
  initiator: string;
  _id: string;
}

export type typePostCategory = "civil" | "criminal" | "administrative" | "other";

export enum Categories {
  CIVIL = "civil",
  CRIMINAL = "criminal",
  ADMINISTRATIVE = "administrative",
  OTHER = "other",
}

export interface IResponseGetAllPostByType {
  message: string;
  data: IPost[];
  success: boolean;
}
