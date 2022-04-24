import React from 'react';
import RegisterForm from "./components/page-specific/regster/form";
import Link from "next/link";

const Register = () => {

    return (
        <div className="registerPage">
            <div className="container">
                <Link href="/"><h2>Payee.</h2></Link>
                <RegisterForm/>
            </div>
        </div>
    );
};

export default Register;
