import React from 'react';
import { NextPage } from 'next';
import LoginForm from '../src/components/page-specific/login/form';

const Login: NextPage = () => {
  return (
    <>
      <div className="loginPage">
        <div className="container">
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default Login;
