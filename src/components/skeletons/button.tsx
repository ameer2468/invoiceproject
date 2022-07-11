import React from 'react';
import ContentLoader from 'react-content-loader';

const ButtonSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={300}
      height={40}
      viewBox="0 0 300 40"
      backgroundColor="#383838FF"
      foregroundColor="#565656"
    >
      <rect rx="10" ry="10" x="0" y="0" width="300" height="40" />
    </ContentLoader>
  );
};

export default ButtonSkeleton;
