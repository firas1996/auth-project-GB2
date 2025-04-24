import { useContext, useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/AuthContext";

const emailReducer = (prevState, actions) => {
  switch (actions.name) {
    case "USER_TYPING":
      return { value: actions.payload, isValid: actions.payload.includes("@") };
    case "user nzel el barra":
      return { value: prevState.value, isValid: prevState.value.includes("@") };
    default:
      return { value: "", isValid: null };
  }
};

const passwordReducer = (prevState, actions) => {
  switch (actions.name) {
    case "USER_TYPING":
      return {
        value: actions.payload,
        isValid: actions.payload.trim().length > 6,
      };
    case "user nzel el barra":
      return {
        value: prevState.value,
        isValid: prevState.value.trim().length > 6,
      };
    default:
      return { value: "", isValid: null };
  }
};

const Login = () => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [email, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [password, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = email;
  const { isValid: passwordIsValid } = password;

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("effect");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 1000);
    return () => {
      console.log("cleanUp");
      clearTimeout(timer);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ name: "USER_TYPING", payload: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ name: "USER_TYPING", payload: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ name: "user nzel el barra" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ name: "user nzel el barra" });
  };
  const { loginHandler } = useContext(AuthContext);

  const submitHandler = (event) => {
    event.preventDefault();
    loginHandler(email.value, password.value);
  };

  return (
    <AuthContext.Provider
      value={{
        email: email.value,
        password: password.value,
      }}
    >
      <Card className={classes.login}>
        <form onSubmit={submitHandler}>
          <div
            className={`${classes.control} ${
              emailIsValid === false ? classes.invalid : ""
            }`}
          >
            <label htmlFor="email">E-Mail</label>
            <input
              type="email"
              id="email"
              value={email.value}
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler}
            />
          </div>
          <div
            className={`${classes.control} ${
              passwordIsValid === false ? classes.invalid : ""
            }`}
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password.value}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            />
          </div>
          <div className={classes.actions}>
            <Button
              type="submit"
              className={classes.btn}
              disabled={!formIsValid}
            >
              Login
            </Button>
          </div>
        </form>
      </Card>
    </AuthContext.Provider>
  );
};

export default Login;
