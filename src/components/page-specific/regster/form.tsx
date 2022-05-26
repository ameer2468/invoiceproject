import React from 'react';
import Link from "next/link";
import {useRegister} from "../../../hooks/useRegister";
import Loading from "../../global/loading";
import {anim} from "../../../framer";
import { motion } from 'framer-motion';

const RegisterForm = () => {

    const { registerHandler, registerLoading, registerForm, inputHandler, confirmHandler, step, formError } = useRegister();
    const form = {
        ...registerForm
    }
    const formCheck = () => {
        if (
            form.email.length === 0 ||
            form.password.length === 0 ||
            form.confirmPassword.length === 0 ||
            form.firstName.length === 0 ||
            form.lastName.length === 0
        ) {
            return "disabledButton";
        } else {
            return "";
        }
    }

    return (
        <>
        {step === 1 ?
            <motion.form
                initial={anim.initial}
                animate={anim.animate}
                transition={anim.transition}
                className="registerForm"
                onSubmit={registerHandler}>
                <div className="col"/>
                <div className="col">
                <h3>Sign up.</h3>
                <input required={true}
                       onChange={inputHandler}
                       value={registerForm.firstName}
                       name="firstName"
                       autoComplete="off"
                       placeholder="First name"
                       type="text"
                />
                <input required={true}
                       onChange={inputHandler}
                       value={registerForm.lastName}
                       name="lastName"
                       autoComplete="off"
                       placeholder="Last name"
                       type="text"
                />
                <input required={true}
                       onChange={inputHandler}
                       value={registerForm.email}
                       name="email"
                       autoComplete="off"
                       placeholder="Email address"
                       type="email"
                />
                <input required={true}
                       onChange={inputHandler}
                       value={registerForm.password}
                       name="password"
                       autoComplete="off"
                       placeholder="Password"
                       type="password"
                />
                <input required={true}
                       onChange={inputHandler}
                       value={registerForm.confirmPassword}
                       name="confirmPassword"
                       autoComplete="off"
                       placeholder="Confirm Password"
                       type="password"
                />
                {formError.length > 0 ? <p className="form-error">{formError}</p> : null}
                <button
                    disabled={
                        registerLoading ||
                        formCheck() === "disabledButton"
                    }
                    className={formCheck()}
                    type="submit">
                    {registerLoading ?
                        <Loading style="SyncLoader" color="white"/> : 'Register'}
                </button>
                <div className="links">
                    <Link passHref={true} href="/login">
                        Have an account? Login now
                    </Link>
                </div>
                </div>
            </motion.form> :
            step === 2 ?
                <form
                    onSubmit={confirmHandler}
                >
                    <h3>Code sent to email.</h3>
                    <input required={true} onChange={inputHandler} value={registerForm.code} name="code" autoComplete="off" placeholder="Enter code" type="text"/>
                    {formError.length > 0 ? <p className="form-error">{formError}</p> : null}
                    <button disabled={registerLoading} type="submit">{registerLoading ? <Loading style="SyncLoader" color="white"/>: 'Confirm'}</button>
                    <Link passHref={true} href="/login">
                        Have an account? Login now
                    </Link>
                </form>
                :
                <form>
                    <h3>Registration complete.</h3>
                    <Link passHref={true} href="/login">
                        <button>Go to login</button>
                    </Link>
                </form>
        }
        </>
    );
};

export default RegisterForm;
