import React from 'react';
import Link from "next/link";
import {useRegister} from "../../../hooks/useRegister";
import Loading from "../../global/loading";

const RegisterForm = () => {

    const { registerHandler, registerLoading, registerForm, inputHandler, confirmHandler, step, formError } = useRegister();

    return (
        <>
        {step === 1 ?
            <form onSubmit={registerHandler}>
                <h3>Sign up.</h3>
                <input required={true} onChange={inputHandler} value={registerForm.name} name="name" autoComplete="off" placeholder="Full name" type="text"/>
                <input required={true} onChange={inputHandler} value={registerForm.email} name="email" autoComplete="off" placeholder="Email address" type="email"/>
                <input required={true} onChange={inputHandler} value={registerForm.password} name="password" autoComplete="off" placeholder="Password" type="password"/>
                <input required={true} onChange={inputHandler} value={registerForm.confirmPassword} name="confirmPassword" autoComplete="off" placeholder="Confirm Password" type="password"/>
                {formError.length > 0 ? <p className="form-error">{formError}</p> : null}
                <button disabled={registerLoading} type="submit">{registerLoading ? <Loading/> : 'Register'}</button>
                <Link href="/login">
                    Have an account? Login now
                </Link>
            </form> :
            step === 2 ?
                <form onSubmit={confirmHandler}>
                    <h3>Code sent to email.</h3>
                    <input required={true} onChange={inputHandler} value={registerForm.code} name="code" autoComplete="off" placeholder="Enter code" type="text"/>
                    {formError.length > 0 ? <p className="form-error">{formError}</p> : null}
                    <button disabled={registerLoading} type="submit">{registerLoading ? <Loading/> : 'Confirm'}</button>
                    <Link href="/login">
                        Have an account? Login now
                    </Link>
                </form>
                :
                <form>
                    <h3>Registration complete.</h3>
                    <Link href="/login">
                        <button>Go to login</button>
                    </Link>
                </form>
        }
        </>
    );
};

export default RegisterForm;
