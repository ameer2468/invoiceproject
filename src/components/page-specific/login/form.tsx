import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLogin } from "../../../hooks/useLogin";
import Loading from "../../global/loading";
import { motion } from "framer-motion";
import { anim } from "../../../framer";

const LoginForm = () => {
  const { loginForm, inputHandler, loginHandler, formError, loginLoading } = useLogin();
  const formLength = {
    ...loginForm,
  };
  const [loginBar, setLoginBar] = useState(0);
  const loginBarWidth = useMemo(() => {
    if (formLength.email.length > 5 && formLength.password.length > 5) {
      setLoginBar(100);
    } else if (formLength.email.length > 5 || formLength.password.length > 5) {
      setLoginBar(50);
    } else {
      setLoginBar(0);
    }
    return loginBar;
  }, [formLength.email, formLength.password, loginBar]);

  return (
    <motion.form
      initial={anim.initial}
      animate={anim.animate}
      className={"loginForm"}
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
        {formError.length > 0 ? <p className="form-error">{formError}</p> : null}
        <button
          style={{ position: "relative" }}
          className={`${
            formLength.email.length < 5 || formLength.password.length < 5
              ? "disabledButton"
              : loginLoading && "disabledButton"
          }`}
          disabled={
            loginLoading ||
            (formLength.email.length < 5 && formLength.password.length < 5)
          }
        >
          {!loginLoading ? (
            <div
              className="loginBar"
              style={{
                width: `${loginBarWidth}%`,
              }}
            />
          ) : (
            ""
          )}
          <div style={{ fontSize: "1.4rem" }} className="absoluteCenter">
            {loginLoading ? <Loading style={"SyncLoader"} color="white" /> : "Login"}
          </div>
        </button>
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
