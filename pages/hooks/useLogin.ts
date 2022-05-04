import {ChangeEvent, useContext, useState} from "react";
import {Auth} from "aws-amplify";
import {useRouter} from "next/router";
import {UserContext} from "../../src/UserContext";

interface loginForm {
    email: string;
    password: string;
}

export const useLogin = () => {

    const [loginLoading, setLoginLoading] = useState<boolean>(false);
    const [formError, setFormError] = useState('');
    const [user, setUser] = useContext(UserContext);
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

    const signoutHandler = async () => {
           await Auth.signOut().then(() => {
               router.push('/').then(() => {
                   setUser({type: "unauthenticated"})
               });
           })
    }


    const loginHandler = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoginLoading(true);
        await Auth.signIn(loginForm.email, loginForm.password)
            .then((res) => {
                setLoginLoading(false);
                router.push('/dashboard/overview').then(() => {
                    setUser({...res, type: "authenticated"})
                });
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
        signoutHandler,
        inputHandler,
        loginHandler
    };

}
