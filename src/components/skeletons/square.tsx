import React from 'react';
import ContentLoader from 'react-content-loader';

interface props {
  width: number | string;
  height: number | string;
}
//@ts-ignore
const SquareSkeleton = ({ width, height }: props) => {
  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <ContentLoader
        speed={2}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        backgroundColor="#383838FF"
        foregroundColor="#565656"
      >
        <rect x="0" y="0" width={width} height={height} />
      </ContentLoader>
    </div>
  );
};

export default SquareSkeleton;
