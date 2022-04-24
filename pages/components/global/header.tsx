import React from 'react';
import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignOut, faUser, faGauge} from "@fortawesome/free-solid-svg-icons";
import {useUser} from "../../hooks/useUser";
import {Auth} from "aws-amplify";
import {useRouter} from "next/router";

const Header = () => {

    const {user} = useUser();
    const router = useRouter();

    return (
        <div className="header">
            <h1>Payee.</h1>
            <div className="buttons">
                {!user ?
                    <Link href="/login">
                    <button className="loginButton">
                        <FontAwesomeIcon
                            style={{ marginRight: "0.8rem" }}
                            icon={faUser}
                        />
                        Login
                    </button>
                </Link>
                    :
                    <>
                        <button onClick={() => {
                            Auth.signOut().then(() => {
                                router.reload();
                            });
                        }} style={{marginLeft: "5rem"}} className="loginButton">
                            <FontAwesomeIcon
                                style={{ marginRight: "0.8rem" }}
                                icon={faSignOut}
                            />
                            Logout
                        </button>
                    </>
                }
            </div>
        </div>
    );
};

export default Header;
