import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/use-http";
import { useInputDefault } from "../../hooks/use-input";
import { authActions } from "../../store/auth-slice";
import { modalActions } from "../../store/modal-slice";
import Input from "../UI/Input";
import LoadingSpinner from "../UI/LoadingSpinner";
import Modal from "../UI/Modal";
import classes from "./Form.module.css";

const LoginForm = (props) => {
  const [userId, password] = [useInputDefault(), useInputDefault()];
  const [isLoading, setIsLoading] = useState(false);
  const authState = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const loginApi = async (requestData) => {
    let response;
    try {
    response = await axios.post(
      "http://localhost:8080/login",
      requestData,
      {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    )
    } catch (error) {
      throw new Error("로그인에 실패하였습니다.")
    }

    return response;
  };
  const { sendRequest, data, error, status } = useHttp(loginApi);
  const loginModalHandler = () => {
    dispatch(modalActions.loginModalTrigger());
  };
  const signupModalHandler = () => {
    dispatch(modalActions.SignupModalTrigger());
    dispatch(modalActions.loginModalTrigger());
  };
  const submissionHandler = async () => {
    await sendRequest({
      username: userId.inputVal,
      password: password.inputVal,
    });
    // dispatch(authActions.login(data.headers.authorization))
    // console.log(authState.token);
  };

  useEffect(() => {
    if (status === "completed" && error === null) {
      setIsLoading(false);
      dispatch(authActions.login(data.headers.authorization));
      dispatch(modalActions.loginModalTrigger());
    }
    if (status === "pending") {
      setIsLoading(true);
    }
    if (error) {
      setIsLoading(false)
      alert(error);
    }
  }, [status, authState.token]);

  return (
    <>
    { !isLoading && (
      <Modal onHideHandler={loginModalHandler}>
      <Fragment>
        <div className={classes.title}>로그인 페이지</div>
        <hr className={classes.line} />
        <div className={classes.wrapper}>
          <Input
            isInvalid={false}
            input={{
              type: "text",
              id: "아이디",
              value: userId.inputVal,
              onChange: userId.setInputHandler,
            }}
          />
          <Input
            isInvalid={false}
            input={{
              type: "password",
              id: "비밀번호",
              value: password.inputVal,
              onChange: password.setInputHandler,
            }}
          />
          <div className={classes.button}>
            <button onClick={submissionHandler}>로그인</button>

            <button onClick={signupModalHandler}>회원가입으로</button>
          </div>
        </div>
      </Fragment>
    </Modal>
    )}
    { isLoading && <LoadingSpinner/> }
    </>
  );
};

export default LoginForm;
