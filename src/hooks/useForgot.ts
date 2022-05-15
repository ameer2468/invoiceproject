import {ChangeEvent, useState} from "react";
import {Auth} from "aws-amplify";

interface forgotForm {
    email: string;
    code: string;
    password: string
}

export const useForgot = () => {

    const [forgotLoading, setForgotLoading] = useState<boolean>(false);
    const [formError, setFormError] = useState('');
    const [step, setStep] = useState(0);
    const [forgotForm, setForgotForm] = useState<forgotForm>({
        email: "",
        code: "",
        password: ""
    });

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setForgotForm({
            ...forgotForm,
            [e.target.name]: e.target.value
        });
    };

    const forgotHandler = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setForgotLoading(true);
        await Auth.forgotPassword(forgotForm.email)
            .then(() => {
                setForgotLoading(false);
                setStep(prevState => prevState + 1);
            })
            .catch((err) => {
                setForgotLoading(false);
                if (err.message.startsWith('User does not exist.')) {
                    setFormError('Invalid email or password');
                }
                setFormError(err.message)
            });
    };

    const confirmHandler = async(e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setForgotLoading(true)
        await Auth.forgotPasswordSubmit(
            forgotForm.email,
            forgotForm.code,
            forgotForm.password
        ).then(() => {
            setForgotLoading(false)
            setStep(prevState => prevState + 1);
        }).catch((err) => {
            setForgotLoading(false);
            setFormError(err.message)
        })
    }

    return {
        forgotForm,
        formError,
        step,
        forgotHandler,
        forgotLoading,
        confirmHandler,
        setStep,
        inputHandler,
    };

}
