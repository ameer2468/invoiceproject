import { ChangeEvent, useState } from 'react';
import { Auth } from 'aws-amplify';
import { createUser } from '../services/user/user';

/*This hook is used for the registeration page -
 * contains confirmation code handler, input handlers, and sign up*/

export const useRegister = () => {
  const [registerLoading, setRegisterLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formError, setFormError] = useState('');
  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    code: '',
  });

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const confirmHandler = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRegisterLoading(true);
    try {
      await Auth.confirmSignUp(registerForm.email, registerForm.code).then(
        (res) => {
          setStep((prevState) => prevState + 1);
        }
      );
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
        'custom:lastname': registerForm.lastName,
      },
    })
      .then(async (res) => {
        await createUser({
          sub_id: res.userSub,
          email: registerForm.email,
          first_name: registerForm.firstName,
          last_name: registerForm.lastName,
        });
        setStep((prevState) => prevState + 1);
      })
      .catch((err) => {
        setFormError(err);
      })
      .finally(() => {
        setRegisterLoading(false);
      });
  };

  return {
    registerForm,
    registerLoading,
    inputHandler,
    formError,
    step,
    registerHandler,
    confirmHandler,
  };
};
