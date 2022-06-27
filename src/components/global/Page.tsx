import React from "react";

interface props {
  children: React.ReactNode;
  pageName: string;
}

const Page = ({ children, pageName }: props) => {
  return (
    <div className={pageName}>
      <div className={"pageContainer"}>{children}</div>
    </div>
  );
};

export default Page;
