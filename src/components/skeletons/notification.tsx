import React from "react";
import ContentLoader from "react-content-loader";

const NotificationSkeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={250}
      height={90}
      viewBox="0 0 250 90"
      backgroundColor="#383838FF"
      foregroundColor="#565656"
    >
      <rect rx="10" ry="10" x="0" y="0" width="250" height="90" />
    </ContentLoader>
  );
};

export default NotificationSkeleton;
