import { ITag } from '@screens/FeedPage/models/ITag';

export interface IPost {
  id: string;
  title: string;
  text: string;
  authorName: string;
  commentsCount: number;
  likesCount: number;
  disLikesCount: number;
  tags: ITag[];
  createdAt: string;
  postRating: number;
  avatar: string;
}

