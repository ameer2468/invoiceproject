import {ChangeEvent, useState} from "react";
import {Auth} from "aws-amplify";


export const useRegister = () => {

    const [registerLoading, setRegisterLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [formError, setFormError] = useState('');
    const [registerForm, setRegisterForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        code: ""
    })

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setRegisterForm({
            ...registerForm,
            [e.target.name]: e.target.value
        });
    };

    const confirmHandler = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setRegisterLoading(true);
        try {
            await Auth.confirmSignUp(registerForm.email, registerForm.code);
            await Auth.signIn(registerForm.email, registerForm.password);
            setStep(prevState => prevState + 1);
        } catch (err: any) {
            setFormError(err.message);
        }
        setRegisterLoading(false);
    };

    const registerHandler = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setRegisterLoading(true);
       await Auth.signUp({
           username: registerForm.email,
           password: registerForm.password,
           attributes: {
               'custom:name': registerForm.name
           }
       }).then(() => {
           setRegisterLoading(false);
           setStep(prevState => prevState + 1);
       }).catch(err => {
           setRegisterLoading(false);
           setFormError(err.message);
       });
    };

    return {
        registerForm,
        registerLoading,
        inputHandler,
        formError,
        step,
        registerHandler,
        confirmHandler
    }

}
