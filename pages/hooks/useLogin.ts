import {ChangeEvent, useState} from "react";
import {Auth} from "aws-amplify";
import {useRouter} from "next/router";

interface loginForm {
    email: string;
    password: string;
}

export const useLogin = () => {

    const [loginLoading, setLoginLoading] = useState<boolean>(false);
    const [formError, setFormError] = useState('');
    const router = useRouter();
    const [loginForm, setLoginForm] = useState<loginForm>({
        email: "",
        password: ""
    });

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        });
    };

    const loginHandler = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoginLoading(true);
        await Auth.signIn(loginForm.email, loginForm.password)
            .then(() => {
                setLoginLoading(false);
                router.replace('/dashboard/overview');
            })
            .catch((err) => {
                setLoginLoading(false);
                if (err.message.startsWith('User does not exist.')) {
                    setFormError('Invalid email or password');
                }
            });
    };

    return {
        loginForm,
        formError,
        loginLoading,
        inputHandler,
        loginHandler
    };

}
