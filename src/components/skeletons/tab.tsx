import React from "react";
import ContentLoader from "react-content-loader";

const TabSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={350}
      height={270}
      viewBox="0 0 350 270"
      backgroundColor="#383838FF"
      foregroundColor="#565656"
    >
      <rect rx="10" ry="10" x="0" y="0" width="350" height="270" />
    </ContentLoader>
  );
};

export default TabSkeleton;
