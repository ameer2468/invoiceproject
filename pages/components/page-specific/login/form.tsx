import React from 'react';
import Link from "next/link";
import {useLogin} from "../../../hooks/useLogin";
import Loading from "../../global/loading";

const LoginForm = () => {

    const {loginForm, inputHandler, loginHandler, formError, loginLoading} = useLogin();
    const formLength = {
        email: loginForm.email.length,
        password: loginForm.password.length
    };

    return (
        <form onSubmit={loginHandler}>
            <h3>Login.</h3>
            <input
                autoComplete="off"
                required={true}
                onChange={inputHandler}
                name="email"
                value={loginForm.email}
                placeholder="Email address"
                type="email"/>
            <input
                autoComplete="off"
                required={true}
                onChange={inputHandler}
                name="password"
                value={loginForm.password}
                placeholder="Password"
                type="password"/>
            {formError.length > 0 ? <p className="form-error">{formError}</p> : null}
            <button
                disabled={loginLoading || formLength.email === 0 || formLength.password === 0}
                className={loginLoading || formLength.email < 5 || formLength.password < 5 ? "disabledButton" : ""}
            >
                {loginLoading ? <Loading/> : 'Login'}
            </button>
            <Link href="/register">
                No account? Register now
            </Link>
        </form>
    );
};

export default LoginForm;
