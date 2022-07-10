import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";

interface props {
  formError: string;
}

const ErrorButton = ({ formError }: props) => {
  return (
    <AnimatePresence>
      {formError.length > 1 ? (
        <motion.button
          exit={{ y: 0, opacity: 0 }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`purpleButton error`}
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
              icon={faClose}
            />
            <p style={{ marginLeft: "1rem" }}>{formError}</p>
          </div>
        </motion.button>
      ) : (
        ""
      )}
    </AnimatePresence>
  );
};

export default ErrorButton;
