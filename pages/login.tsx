import React from 'react';
import {NextPage} from "next";
import LoginForm from "./components/page-specific/login/form";
import Link from 'next/link';

const Login: NextPage = () => {

    return (
        <div className="loginPage">
            <div className="container">
                <Link href="/"><h2>Payee.</h2></Link>
                <LoginForm/>
            </div>
        </div>
    );
};

export default Login;
