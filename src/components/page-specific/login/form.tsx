import React from 'react';
import Link from "next/link";
import {useLogin} from "../../../hooks/useLogin";
import Loading from "../../global/loading";
import { motion } from 'framer-motion';
import {anim} from "../../../framer";

const LoginForm = () => {

    const {loginForm, inputHandler, loginHandler, formError, loginLoading} = useLogin();
    const formLength = {
        ...loginForm
    };
    const formCheck = () => {
        if (
            formLength.email.length === 0 ||
            formLength.password.length === 0 ||
            loginLoading
        ) {
            return "disabledButton"
        } else {
            return ""
        }
    }

    return (
        <motion.form
            initial={anim.initial}
            animate={anim.animate}
            className={"loginForm"}
            transition={anim.transition}
            onSubmit={loginHandler}>
            <div className="col"/>
           <div className="col">
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
                   {loginLoading ? <Loading style={"SyncLoader"} color="white"/> : 'Login'}
               </button>
               <div className="links">
                   <Link passHref={true} href="/register">
                       No account? Register now
                   </Link>
                   <Link passHref={true} href="/forgot">
                       Forgot password?
                   </Link>
               </div>
           </div>
        </motion.form>
    );
};

export default LoginForm;
