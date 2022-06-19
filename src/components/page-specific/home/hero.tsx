import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGauge, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../../UserContext";
import Image from "next/image";
import product from "../../../images/prod-pic.png";
import { motion } from "framer-motion";
import { fadeAnim } from "../../../framer";

const Hero = () => {
  const { user } = useUser();

  return (
    <div className="hero">
      <motion.div {...fadeAnim} className="bg" />
      <motion.h1 {...fadeAnim}>
        Worry less about invoices and{" "}
        <span className="pink">get paid faster</span>.
      </motion.h1>
      {user[0].type !== "unauthenticated" ? (
        <Link passHref={true} href={"/dashboard/overview"}>
          <motion.button {...fadeAnim} className="dbButton">
            <FontAwesomeIcon style={{ marginRight: "0.8rem" }} icon={faGauge} />
            Dashboard
          </motion.button>
        </Link>
      ) : (
        <Link passHref={true} href="/register">
          <motion.button {...fadeAnim}>
            <FontAwesomeIcon
              style={{ marginRight: "0.8rem" }}
              icon={faAngleDoubleRight}
            />
            Sign up
          </motion.button>
        </Link>
      )}
      <motion.div
        {...fadeAnim}
        transition={{ transition: "easeInOut", delay: 0.5 }}
        className="imageWrap"
      >
        <Image placeholder="blur" src={product} width={1300} height={700} />
      </motion.div>
    </div>
  );
};

export default Hero;
