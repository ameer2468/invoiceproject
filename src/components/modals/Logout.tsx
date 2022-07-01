import React from "react";
import Modal from "../global/Modal";
import Loading from "../global/loading";

const Logout = () => {
  return (
    <Modal title="Logging out...">
      <Loading style="PulseLoader" color="white" />
    </Modal>
  );
};

export default Logout;
