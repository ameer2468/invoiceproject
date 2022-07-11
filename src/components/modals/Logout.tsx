import React from 'react';
import Modal from '../global/Modal';
import Loading from '../global/loading';

const Logout = () => {
  return (
    <Modal title="Logging out...">
      <div className="loading">
        <Loading style="PulseLoader" color="white" />
      </div>
    </Modal>
  );
};

export default Logout;
