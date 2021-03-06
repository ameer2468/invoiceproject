import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { UserContext } from '../UserContext';
import { useModal } from '../ModalContext';

interface loginForm {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();
  const { modalContext } = useModal();
  const { setModalId } = modalContext;
  const [loginForm, setLoginForm] = useState<loginForm>({
    email: '',
    password: '',
  });

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const signoutHandler = async () => {
    setModalId('logout');
    await Auth.signOut().then(() => {
      router.push('/').then(() => {
        setUser({ type: 'unauthenticated' });
        setModalId(null);
      });
    });
  };

  const loginHandler = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginLoading(true);
    await Auth.signIn(loginForm.email, loginForm.password)
      .then((res) => {
        setUser({ ...res, type: 'authenticated' });
      })
      .catch((err) => {
        setUser({ type: 'unauthenticated' });
        if (
          err.message.startsWith('User does not exist.') ||
          err.message.startsWith('Incorrect username or password.')
        ) {
          setFormError('Invalid email or password');
        }
      })
      .finally(() => {
        setLoginLoading(false);
      });
  };

  /* When the login form errors out,
   clear the error message after 2 seconds */

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (formError.length > 1) {
      timeout = setTimeout(() => {
        setFormError('');
      }, 2000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [formError]);

  return {
    loginForm,
    formError,
    loginLoading,
    signoutHandler,
    user,
    inputHandler,
    loginHandler,
  };
};
