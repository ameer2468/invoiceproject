import React from 'react';
import Link from "next/link";
import {useLogin} from "../../../hooks/useLogin";
import Loading from "../../global/loading";

const LoginForm = () => {

    const {loginForm, inputHandler, loginHandler, formError, loginLoading} = useLogin();
    const formLength = {
        ...loginForm
    };
    const formCheck = () => {
        if (
            formLength.email.length === 0 ||
            formLength.password.length === 0
        ) {
            return "disabledButton"
        } else {
            return ""
        }
    }

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
                disabled={loginLoading || formCheck() === "disabledButton"}
                className={formCheck()}
            >
                {loginLoading ? <Loading/> : 'Login'}
            </button>
            <Link passHref={true} href="/register">
                No account? Register now
            </Link>
        </form>
    );
};

export default LoginForm;
