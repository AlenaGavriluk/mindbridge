import React, { FunctionComponent } from 'react';
import styles from '@components/PostCard/styles.module.scss';

const ViewsSvg: FunctionComponent = () => (
  <svg
    className={styles.views}
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.8856 8.64989C17.7248 8.42992 13.8934 3.26373 8.99991 3.26373C4.10647 3.26373 0.274852 8.42992 0.114223
    8.64968C-0.0380743 8.85837 -0.0380743 9.14141 0.114223 9.3501C0.274852 9.57007 4.10647 14.7363 8.99991
    14.7363C13.8934 14.7363 17.7248 9.57004 17.8856 9.35028C18.0381 9.14162 18.0381 8.85837 17.8856 8.64989ZM8.99991
    13.5495C5.39537 13.5495 2.27345 10.1206 1.3493 8.99959C2.27226 7.87765 5.38764 4.45054 8.99991 4.45054C12.6043
    4.45054 15.726 7.87884 16.6505 9.0004C15.7276 10.1223 12.6122 13.5495 8.99991 13.5495Z"
      fill="#66B9FF"
    />
    <path
      d="M8.99991 5.43954C7.03671 5.43954 5.43945 7.0368 5.43945 9C5.43945 10.9632 7.03671 12.5605 8.99991
    12.5605C10.9631 12.5605 12.5604 10.9632 12.5604 9C12.5604 7.0368 10.9631 5.43954 8.99991 5.43954ZM8.99991
    11.3736C7.69104 11.3736 6.62629 10.3088 6.62629 9C6.62629 7.69117 7.69107 6.62639 8.99991 6.62639C10.3087
    6.62639 11.3735 7.69117 11.3735 9C11.3735 10.3088 10.3088 11.3736 8.99991 11.3736Z"
      fill="#66B9FF"
    />
  </svg>
);

export default ViewsSvg;