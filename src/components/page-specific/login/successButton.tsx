import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";

const SuccessButton = () => {
  return (
    <AnimatePresence>
      <motion.button
        exit={{ y: 0, opacity: 0 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`purpleButton success`}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <FontAwesomeIcon
            style={{ color: "white", fontSize: "1.7rem" }}
            icon={faCheck}
          />
        </div>
      </motion.button>
    </AnimatePresence>
  );
};

export default SuccessButton;
