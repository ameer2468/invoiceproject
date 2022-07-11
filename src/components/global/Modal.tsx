import { motion } from 'framer-motion';
import React from 'react';
import { fadeAnim } from '../../framer';

interface props {
  children: React.ReactNode;
  title: string;
}

const Modal = (props: props) => {
  return (
    <motion.div {...fadeAnim} className="ModalWrap">
      <div className="Modal">
        <h1>{props.title}</h1>
        {props.children}
      </div>
    </motion.div>
  );
};

export default Modal;
