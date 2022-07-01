import React from "react";

interface props {
  children: React.ReactNode;
  title: string;
}

const Modal = (props: props) => {
  return (
    <div className="ModalWrap">
      <h1>{props.title}</h1>
      <div className="Modal">{props.children}</div>
    </div>
  );
};

export default Modal;
