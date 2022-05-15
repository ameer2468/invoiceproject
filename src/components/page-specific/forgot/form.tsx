import React from 'react';
import Link from "next/link";
import Loading from "../../global/loading";
import { motion } from 'framer-motion';
import {anim} from "../../../framer";
import {useForgot} from "../../../hooks/useForgot";

const ForgotForm = () => {

    const {
        step,
        formError,
        forgotForm,
        forgotLoading,
        confirmHandler,
        inputHandler,
        forgotHandler
    } = useForgot();
    const formLength = {
        ...forgotForm
    };

    return (
        <>
        {step === 0 ?
            <motion.form
                initial={anim.initial}
                animate={anim.animate}
                transition={anim.transition}
                onSubmit={forgotHandler}>
                <h3>Forgot Password.</h3>
                <input
                    autoComplete="off"
                    required={true}
                    onChange={inputHandler}
                    name="email"
                    value={formLength.email}
                    placeholder="Email address"
                    type="email"/>
                {formError.length > 0 ? <p className="form-error">{formError}</p> : null}
                <button
                    className={forgotForm.email.length < 5 && forgotForm.password.length < 6 ? 'disabledButton' : ''}
                    disabled={forgotLoading}
                >
                    {forgotLoading ? <Loading/> : 'Confirm'}
                </button>
                <Link passHref={true} href="/register">
                    No account? Register now
                </Link>
            </motion.form>
            :
            step === 1 ?
                <motion.form
                    initial={anim.initial}
                    animate={anim.animate}
                    transition={anim.transition}
                    onSubmit={confirmHandler}>
                    <h3>Code sent to email.</h3>
                    <input
                        autoComplete="off"
                        required={true}
                        onChange={inputHandler}
                        name="password"
                        value={formLength.password}
                        placeholder="New password"
                        type="password"/>
                    <input
                        autoComplete="off"
                        required={true}
                        onChange={inputHandler}
                        name="code"
                        value={formLength.code}
                        maxLength={6}
                        placeholder="Confirmation code"
                        type="text"/>
                    {formError.length > 0 ? <p className="form-error">{formError}</p> : null}
                    <button
                        className={forgotForm.code.length !== 6 ? 'disabledButton' : ''}
                        disabled={forgotLoading || forgotForm.code.length !== 6 }
                    >
                        {forgotLoading ? <Loading/> : 'Confirm'}
                    </button>
                </motion.form>
                :
                <>
                    <form>
                        <h3>Reset Successful.</h3>
                        <Link passHref={true} href='/login'>
                            <button className='button'>
                                Login now
                            </button>
                        </Link>
                    </form>
                </>

        }
        </>
    );
};

export default ForgotForm;
