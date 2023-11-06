import axios from "../config/axios";
import { IResponseGetAllPostByType, typePostCategory } from "../types/post";

export const UsePostService = () => {
  const getAllPostsByType = async (type: typePostCategory) => {
    const response = await axios.get<IResponseGetAllPostByType>(`/post/get-all?type=${type}`);

    return response.data;
  };
  return { getAllPostsByType };
};
