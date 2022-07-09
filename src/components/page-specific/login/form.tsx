import React from "react";
import Link from "next/link";
import { useLogin } from "../../../hooks/useLogin";
import Loading from "../../global/loading";
import { motion } from "framer-motion";
import { anim } from "../../../framer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const LoginForm = () => {
  const { loginForm, inputHandler, loginHandler, formError, loginLoading, user } =
    useLogin();
  const formLength = {
    ...loginForm,
  };

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
          className={`purpleButton ${
            formLength.email.length < 5 || formLength.password.length < 5 || loginLoading
              ? "disabledButton"
              : user.type === "authenticated" && "success"
          }`}
          disabled={
            loginLoading ||
            (formLength.email.length < 5 && formLength.password.length < 5)
          }
        >
          {loginLoading ? (
            <Loading style={"SyncLoader"} color="white" />
          ) : "Login" ? (
            user.type === "authenticated" ? (
              <FontAwesomeIcon
                style={{ color: "white", fontSize: "1.7rem" }}
                icon={faCheck}
              />
            ) : (
              "Login"
            )
          ) : (
            ""
          )}
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
