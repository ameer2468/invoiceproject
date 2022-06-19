import React from "react";

interface props {
  name: string;
  color: string;
}

const Avatar = (props: props) => {
  const getInitialStrings = (name: string) => {
    const nameArray = name.split(" ");
    const firstName = nameArray[0];
    const firstInitial = firstName.charAt(0);
    return `${firstInitial}`.toUpperCase();
  };

  return (
    <div
      style={{
        background: props.color,
        width: "15rem",
        height: "15rem",
        border: "2px solid #252525",
        borderRadius: "300rem",
        fontSize: "4rem",
        fontWeight: "bold",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="user-avatar"
    >
      {getInitialStrings(props.name)}
    </div>
  );
};

export default Avatar;
