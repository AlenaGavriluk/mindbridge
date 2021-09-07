import React, { FunctionComponent } from 'react';
import { IUser } from '@screens/ViewPost/models/IUser';
import styles from './styles.module.scss';
import BasicComment from '@components/BasicCommentCard/components/BasicComment';
import { IBindingCallback1 } from '@models/Callbacks';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import { IMentionsUser } from '@screens/ViewPost/models/IMentionsUser';

interface ICommentProps {
  createdAt: string;
  text: string;
  author: IUser;
  sendCommentPR: IBindingCallback1<object>;
  userInfo: ICurrentUser;
  prCommentId: string;
  editPrComment: IBindingCallback1<object>;
  updatedAt: string;
  users: IMentionsUser[];
  searchUsersByNickname: any;
}

const Reply: FunctionComponent<ICommentProps> = ({
  author,
  createdAt,
  text,
  prCommentId,
  editPrComment,
  updatedAt,
  users,
  searchUsersByNickname
}) => (
  <div className={styles.comment}>
    <BasicComment
      createdAt={createdAt}
      text={text}
      author={author}
      prCommentId={prCommentId}
      editPrComment={editPrComment}
      updatedAt={updatedAt}
      users={users}
      searchUsersByNickname={searchUsersByNickname}
    />
  </div>
);

export default Reply;
