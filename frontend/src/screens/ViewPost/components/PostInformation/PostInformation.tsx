import React, { FunctionComponent } from 'react';
import styles from './styles.module.scss';
import DividerSvg from '@screens/ViewPost/components/svgs/SvgComponents/dividerSvg';
import FollowBtn from '@screens/ViewPost/components/Button/FollowBtn/FollowBtn';
import { timeToLocal } from '@helpers/dataTimeToLocalData';
import { Link } from 'react-router-dom';
import DraftLabel from '@components/DraftLabel';
import Image from '@components/Image';
import {defaultAvatar} from "@images/defaultImages";

interface IPostInformationProps {
  id: string;
  date: string;
  nickname: string;
  avatar: string;
  readTime: string;
  draft: boolean;
}

const PostInformation: FunctionComponent<IPostInformationProps> = (
  { id,
    nickname,
    date,
    avatar,
    draft,
    readTime
  }
) => (
  <div className={styles.postHeaderInfo}>
    <Link to={`/user/${id}`}>
      <div className={styles.userBlock}>
        <Image src={avatar ?? defaultAvatar} />
        <div className={styles.userName}>
          { nickname }
        </div>
      </div>
    </Link>
    <FollowBtn />
    <DividerSvg />
    <span className={styles.additionalInformation}>
      { timeToLocal(date) }
    </span>
    <DividerSvg />
    <span className={styles.additionalInformation}>
      {readTime}
    </span>
    {draft && [
      <DividerSvg />,
      <DraftLabel />
    ]}
  </div>
);

export default PostInformation;
