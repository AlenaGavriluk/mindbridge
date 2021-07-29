import React from 'react';
import styles from './styles.module.scss';
import Logo from '../Logo/Logo';


function Header(props) {
  return (
    <div className={styles.header_container}>
      <div className={styles.left}>
        <Logo width={99} height={44} />
        <div className={styles.header_menu}>
          <button className={styles.blue_button}> Home </button>
          <button className={styles.colorless_button}> Hot posts </button>
          <button className={styles.colorless_button}> Best posts </button>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.header_notification}>
          <svg width="21" height="19" viewBox="0 0 28 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.0156 25.95C9.97525 25.95 8.31563 24.2904 8.31563 22.25C8.31563 21.8636 8.62924 21.55 9.01562 21.55C9.40201 21.55 9.71562 21.8636 9.71562 22.25C9.71562 23.5187 10.7471 24.55 12.0156 24.55C13.2843 24.55 14.3156 23.5187 14.3156 22.25C14.3156 21.8636 14.6292 21.55 15.0156 21.55C15.402 21.55 15.7156 21.8636 15.7156 22.25C15.7156 24.2904 14.056 25.95 12.0156 25.95Z" fill="#353535" stroke="white" stroke-width="0.1" />
            <path d="M3.57343 21.0198L3.57324 21.02C3.53224 21.055 3.46563 21.1297 3.46563 21.2501C3.46563 21.4135 3.60209 21.55 3.76556 21.55H20.2656C20.4292 21.55 20.5657 21.4136 20.5657 21.2501C20.5657 21.1299 20.4991 21.0551 20.46 21.0219L20.4599 21.0218C18.6201 19.4663 17.5657 17.1942 17.5657 14.7881V11.9999C17.5657 8.93936 15.0763 6.45 12.0156 6.45C8.95499 6.45 6.46562 8.93937 6.46562 11.9999V14.7881C6.46562 17.1942 5.4112 19.4663 3.57343 21.0198ZM3.76556 22.95C2.82821 22.95 2.06563 22.1874 2.06563 21.2501C2.06563 20.7526 2.28219 20.2817 2.65989 19.9581C4.19212 18.6636 5.06562 16.7818 5.06562 14.7881V11.9999C5.06562 8.16769 8.18331 5.05 12.0156 5.05C15.848 5.05 18.9657 8.16769 18.9657 11.9999V14.7881C18.9657 16.7818 19.8392 18.6636 21.3614 19.9512C21.7492 20.2818 21.9657 20.7528 21.9657 21.2501C21.9657 22.1874 21.2031 22.95 20.2656 22.95H3.76556Z" fill="#353535" stroke="white" stroke-width="0.1" />
            <path d="M12.0156 6.45C11.6292 6.45 11.3156 6.13639 11.3156 5.75V2.75C11.3156 2.36361 11.6292 2.05 12.0156 2.05C12.402 2.05 12.7156 2.36361 12.7156 2.75V5.75C12.7156 6.13639 12.402 6.45 12.0156 6.45Z" fill="#353535" stroke="white" stroke-width="0.1" />
          </svg>
          <div className={props.notificationCount ? styles.notification_count : styles.invisible}>
            {props.notificationCount}
          </div>
        </div>
        <input className={styles.search_input} type="text" placeholder="Search..." />
        <button className={`${styles.dark_button} ${styles.create_post_button}`}>Create post</button>
      </div>
    </div>
  );
}

export default Header;
