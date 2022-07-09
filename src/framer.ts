export const anim = {
  initial: { opacity: 0, y: 0 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

export const fadeAnim = {
  initial: { opacity: 0, y: -5 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

export const staggerParent = {
  variants: {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.1 },
    },
  },
};

export const staggerChildren = {
  variants: {
    open: {
      opacity: 1,
    },
    closed: {
      opacity: 0,
    },
  },
};
