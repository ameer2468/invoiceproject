import React from "react";
import Logout from "./Logout";
import { useModal } from "../../ModalContext";

const ModalManager = () => {
  const { modalContext } = useModal();
  const { modalId } = modalContext;

  switch (modalId) {
    case "logout":
      return <Logout />;
    case null:
      return null;
  }
};

export default ModalManager;
