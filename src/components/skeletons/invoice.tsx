import React from 'react';
import ContentLoader from 'react-content-loader';

const InvoiceSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={320}
      height={330}
      viewBox="0 0 320 330"
      backgroundColor="#383838FF"
      foregroundColor="#565656"
    >
      <rect x="0" y="0" width="320" height="330" />
    </ContentLoader>
  );
};

export default InvoiceSkeleton;
