import {ChangeEvent, useState} from "react";
import {Auth} from "aws-amplify";
import {createUser} from "../services/user/user";


export const useRegister = () => {

    const [registerLoading, setRegisterLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [formError, setFormError] = useState('');
    const [registerForm, setRegisterForm] = useState({
        firstName: "",
        lastName: "",
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
            await Auth.confirmSignUp(registerForm.email, registerForm.code).then((res) => {
                setStep(prevState => prevState + 1);
            });
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
               'custom:firstname': registerForm.firstName,
               'custom:lastname': registerForm.lastName
           }
       }).then(async (res) => {
           await createUser({
               sub_id: res.userSub,
               email: registerForm.email,
               first_name: registerForm.firstName,
               last_name: registerForm.lastName
           });
           setRegisterLoading(false);
           setStep(prevState => prevState + 1);
       }).catch(err => {
           setRegisterLoading(false);
           setFormError(err);
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