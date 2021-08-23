import { IUserReactions } from '@screens/PostPage/models/IUserReactions';

export interface IUserProfile {
  id: string;
  fullName: string;
  avatar: string;
  postsQuantity: number;
  followersQuantity: number;
  rating: number;
  userReactions: IUserReactions[];
}