import React, { useRef, useState } from 'react';
import { IComments } from '@screens/ViewPost/models/IComments';
import { IUser } from '@screens/ViewPost/models/IUser';
import styles from './styles.module.scss';
import AdvancedComment from '@components/AdvancedCommentCard/AdvancedComment';

interface ICommentProps {
  text: string;
  author: IUser;
  replies: IComments[];
  createdAt: string;
  commentRating: number;
  shouldRenderUpToParent: boolean;
  shouldRenderArrowCloseComment: boolean;
  sendComment: any;
  userId: string;
  postId: string;
  commentId: string;
  sendReply: any;
  isAuthorized: boolean;
}

const Reply: React.FC<ICommentProps> = (
  {
    commentId,
    userId,
    postId,
    text,
    sendComment,
    author,
    replies,
    createdAt,
    commentRating,
    shouldRenderUpToParent,
    shouldRenderArrowCloseComment,
    sendReply,
    isAuthorized
  }
) => {
  const closeCommentRef = useRef(true);
  const [isOpened, setIsOpened] = useState(closeCommentRef.current);

  const handle = () => {
    setIsOpened(!isOpened);
  };

  return (
    <div className={styles.comment}>
      <AdvancedComment
        createdAt={createdAt}
        text={text}
        author={author}
        commentRating={commentRating}
        setShouldRender={shouldRenderUpToParent}
        ref={closeCommentRef}
        handle={handle}
        shouldRenderArrowCloseComment={shouldRenderArrowCloseComment}
        sendReply={sendReply}
        userId={userId}
        postId={postId}
        commentId={commentId}
        isAuthorized={isAuthorized}
      />
      {replies.length > 0 && (
        <div>
          { isOpened && (
            <div className="comments">
              {replies.map(comment => (
                <Reply
                  replies={comment.comments}
                  author={comment.author}
                  createdAt={comment.createdAt}
                  text={comment.text}
                  commentRating={comment.rating}
                  shouldRenderUpToParent={!(replies.length === 0)}
                  shouldRenderArrowCloseComment={(replies.length === 0)}
                  userId={userId}
                  postId={postId}
                  sendComment={sendComment}
                  commentId={comment.id}
                  sendReply={sendReply}
                  isAuthorized={isAuthorized}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Reply;