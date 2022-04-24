import React from 'react';
import Image from "next/image";
import Link from "next/link";
import profile from './profile.png';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBook,
    faCog,
    faUser,
    faFile,
    faSignOutAlt,
    faHome}
    from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/router";
import {Auth} from "aws-amplify";

interface props {
    children?: JSX.Element;
}

const Sidebar = ({children}: props) => {

    const router = useRouter();
    const pathCheck = (path: string) => {
        return router.pathname === path ? 'active' : '';
    };
    const navLinks = [
        {name: 'Overview', href: '/dashboard/overview', icon: faHome},
        {name: 'Invoices', href: '/dashboard/invoices', icon: faFile},
        {name: 'Reports', href: '/dashboard/reports',   icon: faBook},
        {name: 'Accounts', href: '/dashboard/accounts', icon: faUser},
        {name: 'Settings', href: '/dashboard/settings', icon: faCog},
    ]
    const signoutHandler = () => {
        Auth.signOut().then(() => {
            router.push('/');
        })
    }

    return (
        <div className="sidebar">
            <div className="container">
                <h3>Payee.</h3>
                <div className="profile">
                    <Image
                        height={140}
                        width={140}
                        layout="fixed"
                        src={profile}
                    />
                    <div className="info">
                        <h4>John Doe</h4>
                        <p>Freelancer</p>
                    </div>
                    <div className="navlinks">
                        {navLinks.map((link, index) => (
                            <div key={index.toString()}
                                 className={`link ${pathCheck(link.href)}`}>
                            <FontAwesomeIcon
                                style={{
                                    color: router.pathname === link.href ? '#71AAFFFF' : 'white',
                                    width: "4rem"
                                }}
                                icon={link.icon}

                            />
                            <Link href={link.href} key={index.toString()}>
                                <p>{link.name}</p>
                            </Link>
                            </div>
                        ))}
                    </div>
                </div>
                <div onClick={signoutHandler} className="logout">
                    <FontAwesomeIcon
                        className="icon"
                        icon={faSignOutAlt}
                    />
                </div>
            </div>
            {children}
        </div>
    );
};

export default Sidebar;
