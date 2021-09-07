/* eslint-disable max-len */
import React, { FunctionComponent, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { getHowLong } from '@helpers/date.helper';
import LoaderWrapper from '@components/LoaderWrapper';
import RatingSvg from '@screens/ProfilePage/components/svg/ratingSvg';
import { Link } from 'react-router-dom';
import CommentSvg from '@screens/ProfilePage/components/svg/commentSvg';
import FollowersSvg from '@screens/ProfilePage/components/svg/followersSvg';
import PostsSvg from '@screens/ProfilePage/components/svg/posts';
import ContributorsSvg from '@screens/ProfilePage/components/svg/contributorsSvg';
import { IUser } from '@screens/ProfilePage/models/IUser';
import { ICurrentUser } from '@screens/Login/models/ICurrentUser';
import { IBindingCallback1 } from '@models/Callbacks';
import Image from '@components/Image';
import { defaultAvatar } from '@images/defaultImages';
import DarkButton from '@components/buttons/DarcButton';
import DarkBorderButton from '@components/buttons/DarcBorderButton';

interface IPublicProfileCardProps {
  user: IUser;
  isUserLoaded: boolean;
  currentUser: ICurrentUser;
  toggleFollowUser: IBindingCallback1<object>;
  isToggleFollowLoading?: boolean;
}
const PublicProfileCard: FunctionComponent<IPublicProfileCardProps> = (
  { user, isUserLoaded, currentUser, toggleFollowUser, isToggleFollowLoading }
) => {
  const [userData, setUserData] = useState(user);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  const handleFollowUser = () => {
    toggleFollowUser({ followerId: currentUser.id, followedId: userData.id });
  };

  const renderFollowButton = () => {
    if (currentUser.id === userData.id) {
      return null;
    }
    if (userData.followed) {
      return (
        <DarkBorderButton
          content="Unfollow"
          loading={isToggleFollowLoading}
          onClick={handleFollowUser}
        />
      );
    }
    return (
      <DarkButton
        content="Follow"
        className={styles.followBtn}
        loading={isToggleFollowLoading}
        onClick={handleFollowUser}
      />
    );
  };

  return (
    <div className={styles.viewCard}>
      {isUserLoaded ? (
        <div className={styles.contentWrp}>
          <div className={styles.avatarWrp}>
            <div className={styles.imgContainer}>
              { (userData.avatar === '' || userData.avatar === null) ? (
                <Image
                  className={styles.avatar}
                  src={defaultAvatar}
                  alt="avatar"
                />
              ) : (
                <Image
                  className={styles.avatar}
                  src={userData.avatar}
                  alt="avatar"
                />
              )}
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.header}>
              <div className={styles.inputWrp}>
                <div className={styles.headerTextWrp}>
                  <span className={styles.name}>
                    {userData.firstName}
                    {' '}
                    {userData.lastName}
                  </span>
                  { userData.nickname !== null && (
                  <span className={styles.nickname}>
                    {`@${userData.nickname}`}
                  </span>
                  ) }
                  <span className={styles.period}>
                    {getHowLong(userData.createdAt)}
                  </span>
                </div>
                {renderFollowButton()}
              </div>
            </div>
            <div className={styles.statWrp}>
              <div className={styles.statCell}>
                <RatingSvg />
                <div className={styles.statInfo}>
                  <span className={styles.statNumber}>
                    {userData.rating}
                  </span>
                  <span>
                    rating
                  </span>
                </div>
              </div>
              <div className={styles.statCell}>
                <FollowersSvg />
                <div className={styles.statInfo}>
                  <span className={styles.statNumber}>
                    {userData.followersQuantity}
                  </span>
                  <span>
                    followers
                  </span>
                </div>
              </div>
              <div className={styles.statCell}>
                <CommentSvg />
                <div className={styles.statInfo}>
                  <span className={styles.statNumber}>
                    {userData.commentsQuantity}
                  </span>
                  <span>
                    comments
                  </span>
                </div>
              </div>
              <div className={styles.statCell}>
                <PostsSvg />
                <div className={styles.statInfo}>
                  <span className={styles.statNumber}>
                    {userData.postsQuantity}
                  </span>
                  <span>
                    posts
                  </span>
                </div>
              </div>
              <div className={styles.statCell}>
                <ContributorsSvg />
                <div className={styles.statInfo}>
                  <span className={styles.statNumber}>
                    {userData.contributionsQuantity}
                  </span>
                  <span>
                    contribution
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.articlesWrp} />
            <span className={styles.subTitle}>
              {`Articles by ${userData.firstName}`}
            </span>
            <div>
              {userData.lastArticleTitles.map(postTitle => (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <Link className={styles.articleTitle} to={`/post/${postTitle.id}`}>
                  {postTitle.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )
        : <LoaderWrapper className={styles.buttonLoader} loading={isUserLoaded} />}
    </div>
  );
};

export default PublicProfileCard;
