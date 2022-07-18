import React from 'react';
import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className="absoluteCenter textCenter">
      <h1>Page not found :(</h1>
      <Link passHref={true} href="/dashboard/overview">
        <button className="purpleButton marginTop">Back to Dashboard</button>
      </Link>
    </div>
  );
};

export default Custom404;
