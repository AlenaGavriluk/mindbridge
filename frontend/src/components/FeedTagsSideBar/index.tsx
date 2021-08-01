import React, { FunctionComponent } from 'react';
import TagsMenu from '@components/TagsMenu';
import styles from './styles.module.scss';
import { Button } from 'semantic-ui-react';

const FeedTagsSideBar: FunctionComponent = () => {
  const tags = ['IT', 'Code', 'Humor', 'Work', 'Tech', 'API', 'React', 'Sport', 'Books', 'Self', 'Fitness'];
  return (
    <div className={styles.tagsSideBar}>
      <div className={styles.title}>
        Search by tags
      </div>
      <div className={styles.searchInput}>
        <input type="text" placeholder="Search..." />
        <button>
          <svg className={styles.svgSearch} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.4">
              <path
                d="M14.7188 13.4906L10.7812 9.5283C10.5938 9.33962 10.3125 9.24528 10.0312 9.24528C10.7812 8.30189 11.25 6.98113 11.25 5.66038C11.25 2.54717 8.71875 0 5.625 0C2.53125 0 0 2.54717 0 5.66038C0 8.77359 2.53125 11.3208 5.625 11.3208C6.9375 11.3208 8.25 10.8491 9.1875 10C9.1875 10.283 9.1875 10.566 9.46875 10.7547L13.4062 14.717C13.5938 14.9057 13.875 15 14.0625 15C14.25 15 14.5312 14.9057 14.7188 14.717C15.0938 14.434 15.0938 13.8679 14.7188 13.4906ZM5.625 9.90566C3.28125 9.90566 1.40625 8.01887 1.40625 5.66038C1.40625 3.30189 3.28125 1.41509 5.625 1.41509C7.96875 1.41509 9.84375 3.30189 9.84375 5.66038C9.84375 8.01887 7.96875 9.90566 5.625 9.90566Z"
                fill="#14253F"
              />
            </g>
          </svg>
        </button>
      </div>
      <div className={styles.btnWrapper}>
        <div className={styles.tag}>
          {tags.map(tag => (
            <Button content={tag} primary />
          ))}
        </div>
      </div>
      <button className={`${styles.dark_button} ${styles.searchBtn}`}>Search</button>
    </div>
  );
};

export default FeedTagsSideBar;
