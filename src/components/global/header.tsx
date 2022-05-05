import React from 'react';
import Link from 'next/link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignOut, faUser} from "@fortawesome/free-solid-svg-icons";
import {Auth} from "aws-amplify";
import {useRouter} from "next/router";
import {useUser} from "../../UserContext";

const Header = () => {

    const {user} = useUser();
    const router = useRouter();


    return (
        <div className="header">
            <h1>Payee.</h1>
            <div className="buttons">
                {user[0].type === 'unauthenticated' ?
                    <Link passHref={true} href="/login">
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
