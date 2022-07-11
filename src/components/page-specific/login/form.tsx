import React from 'react';
import Link from 'next/link';
import { useLogin } from '../../../hooks/useLogin';
import Loading from '../../global/loading';
import { motion } from 'framer-motion';
import { anim } from '../../../framer';
import ErrorButton from './errorButton';
import SuccessButton from './successButton';

const LoginForm = () => {
  const {
    loginForm,
    inputHandler,
    loginHandler,
    formError,
    loginLoading,
    user,
  } = useLogin();
  const formLength = {
    ...loginForm,
  };

  return (
    <motion.form
      initial={anim.initial}
      animate={anim.animate}
      className={'loginForm'}
      transition={anim.transition}
      onSubmit={loginHandler}
    >
      <div className="col" />
      <div className="col">
        <h3>Login.</h3>
        <input
          autoComplete="off"
          required={true}
          onChange={inputHandler}
          name="email"
          value={loginForm.email}
          placeholder="Email address"
          type="email"
        />
        <input
          autoComplete="off"
          required={true}
          onChange={inputHandler}
          name="password"
          value={loginForm.password}
          placeholder="Password"
          type="password"
        />
        {formError.length > 1 ? (
          <ErrorButton formError={formError} />
        ) : user.type === 'authenticated' ? (
          <SuccessButton />
        ) : (
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`purpleButton ${
              (loginLoading ||
                formLength.email.length < 5 ||
                formLength.password.length < 5) &&
              'disabledButton'
            }`}
            disabled={
              loginLoading ||
              (formLength.email.length < 5 && formLength.password.length < 5)
            }
          >
            {loginLoading ? (
              <Loading style={'SyncLoader'} color="white" />
            ) : (
              'Login'
            )}
          </motion.button>
        )}
        <div className="links">
          <Link passHref={true} href="/register">
            No account? Register now
          </Link>
          <Link passHref={true} href="/forgot">
            Forgot password?
          </Link>
        </div>
      </div>
    </motion.form>
  );
};

export default LoginForm;
