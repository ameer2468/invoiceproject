import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { useLogin } from '../../../hooks/useLogin';
import Avatar from '../../global/Avatar';
import { useUser } from '../../../UserContext';
import { navLinks } from '../../../constants';

interface props {
  children?: JSX.Element;
}

const Sidebar = ({ children }: props) => {
  const router = useRouter();
  const pathCheck = (path: string) => {
    return router.pathname === path ? 'active' : '';
  };
  const { user } = useUser();
  const { signoutHandler } = useLogin();

  return (
    <div className="sidebar">
      <div className="container">
        <Link passHref={true} href={'/'}>
          <h3>Payee.</h3>
        </Link>
        <div className="profile">
          {user && (
            <Avatar
              name={user.user.attributes['custom:firstname']}
              color={'#121212'}
            />
          )}
          <div className="info">
            <h4>{user.user.attributes['custom:firstname']}</h4>
          </div>
          <div className="navlinks">
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
                  <p>{link.name}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div onClick={signoutHandler} className="logout">
          <FontAwesomeIcon className="icon" icon={faSignOutAlt} />
        </div>
      </div>
      {children}
    </div>
  );
};

export default Sidebar;
