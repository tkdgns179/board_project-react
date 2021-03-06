import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useHttp from "../../hooks/use-http";
import { useInput } from "../../hooks/use-input";
import { modalActions } from "../../store/modal-slice";
import Input from "../UI/Input";
import LoadingSpinner from "../UI/LoadingSpinner";
import Modal from "../UI/Modal";
import classes from "./Form.module.css";

const SignupForm = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  
  const signupApi = async (requestData) => {
    const response = await axios.post("http://localhost:8080/api/signup", requestData, {
      headers: {
        "Content-type": "application/json",
      },
      withCredentials: true
    });

    return response;
  };
  const { sendRequest, error, status } = useHttp(signupApi);

  const loginModalHandler = () => {
    dispatch(modalActions.loginModalTrigger());
    dispatch(modalActions.SignupModalTrigger());
  };
  const signupModalHandler = () => {
    dispatch(modalActions.SignupModalTrigger());
  };

  const [username, password, email] = [
    useInput((value) => value.trim() !== "" && value.trim().length >= 3),
    useInput((value) => value.trim() !== ""),
    useInput((value) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(value)),
  ];
  const checkPassword = useInput(
    (value) => value.trim() === password.value.trim()
  );

  const formHasError =
    !username.isValid ||
    !password.isValid ||
    !email.isValid ||
    !checkPassword.isValid;

  const submissionHandler = async () => {
    username.inputBlurHandler();
    password.inputBlurHandler();
    email.inputBlurHandler();
    checkPassword.inputBlurHandler();

    if (formHasError) return false;

    await sendRequest({
      username: username.value,
      password: password.value,
      email: email.value,
    });

  };

  useEffect(() => {
    if ( status === 'completed' ) {
      setIsLoading(false);
      dispatch(modalActions.SignupModalTrigger());
    }
    if ( status === 'pending') {
      setIsLoading(true);
    }
  }, [status])

  return (
    <>
    { !isLoading && (
      <Modal onHideHandler={signupModalHandler}>
      <div className={classes.title}>???????????? ?????????</div>
      <hr className={classes.line} />

      <div className={classes.wrapper}>
        <Input
          input={{
            type: "text",
            id: "?????????",
            onChange: username.valueChangeHandler,
            value: username.value,
            onBlur: username.inputBlurHandler,
          }}
          isInvalid={username.hasError? true : false}
        />
        {username.hasError && <p>???????????? ??????????????? 3?????? ??????????????? ?????????.</p>}
        <div className={classes.group}>
          <Input
            input={{
              type: "password",
              id: "????????????",
              onChange: password.valueChangeHandler,
              value: password.value,
              onBlur: password.inputBlurHandler,
            }}
            isInvalid={password.hasError? true : false}
          />
          <Input
            input={{
              type: "password",
              id: "???????????? ??????",
              onChange: checkPassword.valueChangeHandler,
              value: checkPassword.value,
              onBlur: checkPassword.inputBlurHandler,
            }}
            isInvalid={checkPassword.hasError? true : false}
          />
        </div>
        {checkPassword.hasError && <p>??????????????? ???????????? ????????????.</p>}
        <Input
          input={{
            type: "text",
            id: "?????????",
            onChange: email.valueChangeHandler,
            value: email.value,
            onBlur: email.inputBlurHandler,
          }}
          isInvalid={email.hasError? true : false}
        />
        {email.hasError && <p>????????? ????????? ????????? ??????????????????</p>}
        <div className={classes.button}>
          <button disabled={formHasError} onClick={submissionHandler}>
            ????????????
          </button>
          <button onClick={loginModalHandler}>???????????????</button>
        </div>
      </div>
    </Modal>
    ) }
    { isLoading && <LoadingSpinner />}
    </>
  );
};

export default SignupForm;
