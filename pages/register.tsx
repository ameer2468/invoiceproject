import React from 'react';
import RegisterForm from "../src/components/page-specific/regster/form";
import Link from "next/link";

const Register = () => {

    return (
        <div className="registerPage">
            <div className="container">
                <Link passHref={true} href="/"><h2>Payee.</h2></Link>
                <RegisterForm/>
            </div>
        </div>
    );
};

export default Register;
