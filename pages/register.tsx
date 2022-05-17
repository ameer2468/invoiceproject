import React from 'react';
import RegisterForm from "../src/components/page-specific/regster/form";
import Link from "next/link";

const Register = () => {

    return (
        <div className="registerPage">
            <div className="container">
                <RegisterForm/>
            </div>
        </div>
    );
};

export default Register;
