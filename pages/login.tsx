import React from 'react';
import {NextPage} from "next";
import LoginForm from "../src/components/page-specific/login/form";
import Link from 'next/link';

const Login: NextPage = () => {


    return (
        <>
                <div className="loginPage">
                <div className="container">
                <Link passHref={true} href="/"><h2>Payee.</h2></Link>
                <LoginForm/>
                </div>
                </div>

        </>
    );
};

export default Login;
