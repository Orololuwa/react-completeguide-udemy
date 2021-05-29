import React, { useState, useEffect, useReducer, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from "../Input/Input";

import AuthContext from "../../store/auth-context";

const emailReducer = (state, action) => {
  if(action.type === "USER_INPUT"){
    return { value: action.val, isValid: action.val.includes("@") }
  }
  if (action.type === "INPUT_BLUR"){
    return { value:  state.value, isValid: state.value.includes("@") }
  }
  return {value: "", isValid: false}
}

const passwordStore = (state, action) => {
  if (action.type === "INPUT_PASSWORD"){
    return {value: action.val, isValid: action.val.trim().length > 6}
  }
  if (action.type === "INPUT_BLUR"){
    return {value: state.value, isValid: state.value.trim().length > 6}
  }
  return {value: "", isValid: false}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const ctx = React.useContext(AuthContext);

  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail ] = useReducer(emailReducer, {
    value: "",
    isValid: undefined
  });

  const [passwordState, dispatchPassword] = useReducer(passwordStore, {
    value: "",
    isValid: undefined
  });

  //Object destructuring to prevent further validation after email or password has been validated
  //this is for optimsation
  const {isValid: emailIsValid} = emailState;
  const {isValid: passwordIsValid} = passwordState;

  useEffect(() => {
    const timeoutHandler = setTimeout(()=>{
      console.log("Checking Form Validity")
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500)

    return () => {
      console.log("CLEAN UP")
      clearTimeout(timeoutHandler);
    }
  }, [emailIsValid, passwordIsValid])

  const emailChangeHandler = (event) => {
    //setEnteredEmail(event.target.value);
    dispatchEmail({type: "USER_INPUT", val: event.target.value});

    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    //setEnteredPassword(event.target.value);
    dispatchPassword({type: "INPUT_PASSWORD", val: event.target.value})

    // setFormIsValid(
    //   event.target.value.trim().length > 6 && emailState.isValid
    // );
  };

  const validateEmailHandler = () => {
    //setEmailIsValid(emailState.isValid);
    dispatchEmail({type: "INPUT_BLUR"})
  };

  const validatePasswordHandler = () => {
    //setPasswordIsValid(passwordState.value.trim().length > 6);
    dispatchPassword({type: "INPUT_BLUR"})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid){
      ctx.onLogin(emailState.value, passwordState.value);
    }else if(!emailIsValid){
      emailInputRef.current.activate();
    }else{
      passwordInputRef.current.activate();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
        type="email"
        id="email"
        label="E-mail"
        isValid={emailState.isValid}
        value={emailState.value}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}
        ref={emailInputRef}
        />
        <Input 
        type="password"
        id="password"
        label="Password"
        isValid={passwordState.isValid}
        value={passwordState.value}
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}
        ref={passwordInputRef}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
