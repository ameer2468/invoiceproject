import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { navLinks } from '../../../constants';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { anim } from '../../../framer';
import { useClickOutside } from '../../../hooks/useClickOutside';

const HiddenMenu = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  useClickOutside(navRef, () => setIsOpen(false));
  const pathCheck = (path: string) => {
    return router.pathname === path ? 'active' : '';
  };
  return (
    <>
      <div onClick={() => setIsOpen(!isOpen)} className="hidden-menu">
        <FontAwesomeIcon className="icon" icon={faBars} />
      </div>
      {isOpen && (
        <motion.div
          ref={navRef}
          initial={anim.initial}
          animate={anim.animate}
          className="hidden-navlinks"
        >
          {navLinks.map((link, index) => (
            <div
              key={index.toString()}
              className={`link ${pathCheck(link.href)}`}
            >
              <FontAwesomeIcon
                style={{
                  color: router.pathname === link.href ? '#5f62ff' : 'white',
                  width: '4rem',
                }}
                icon={link.icon}
              />
              <Link passHref={true} href={link.href} key={index.toString()}>
                <p
                  onClick={() => setIsOpen(false)}
                  className={`${router.pathname === link.href && 'active'}`}
                >
                  {link.name}
                </p>
              </Link>
            </div>
          ))}
        </motion.div>
      )}
    </>
  );
};

export default HiddenMenu;
