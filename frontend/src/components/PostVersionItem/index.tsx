/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import { IPostVersion } from '@screens/PostVersions/models/IPostVersion';
import { Image } from 'semantic-ui-react';
import DividerSvg from '@components/FeedSvgComponents/dividerSvg';
import { Link, useHistory } from 'react-router-dom';

export interface IPostVersionItemProps {
  postVersion: IPostVersion;
}

const PostVersionItem: FunctionComponent<IPostVersionItemProps> = ({ postVersion }) => {
  const history = useHistory();

  const goToVersion = () => {
    history.push(`/post/version/${postVersion.id}`);
    history.go();
  };

  const handleClick = e => {
    e.stopPropagation();
  };

  return (
    <div className={styles.versionItem} onClick={goToVersion}>
      <Link onClick={e => handleClick(e)} to={`/user/${postVersion.author?.id}`} className={styles.userName}>
        <Image
          src={postVersion.author?.avatar ?? 'https://i.imgur.com/LaWyPZF.png'}
          avatar
          size="small"
        />
        {postVersion.author?.nickname}
      </Link>
      <DividerSvg />
      <span className={styles.postHeaderInfo}>{postVersion.createdAt}</span>
    </div>
  );
};

export default PostVersionItem;
