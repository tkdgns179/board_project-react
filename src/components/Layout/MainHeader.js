import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../../Icons/search.svg";
import { modalActions } from "../../store/modal-slice";
import { authActions } from "../../store/auth-slice";
import classes from "./MainHeader.module.css";

const MainHeader = (props) => {
  const [showInput, setShowInput] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const authState = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchIconHandler = () => {
    if (showInput) {
      props.handlers.searchHandler(searchVal);
      // let _searchVal = searchVal;
      setSearchVal("");
      setShowInput(false);
      navigate("/get/board");
    } else {
      setShowInput(true);
    }
  };

  const searchEnterHandler = (e) => {
    if (e.key === "Enter") searchIconHandler();
  };
  const setSerchValHandler = (e) => {
    setSearchVal(e.target.value);
  };

  const loginModalHandler = () => {
    dispatch(modalActions.loginModalTrigger());
  };
  const signupModalHandler = () => {
    dispatch(modalActions.SignupModalTrigger());
  };
  const logoutHandler = () => {
    dispatch(authActions.logout())
  }

  return (
    <Fragment>
      <header className={classes["header"]}>
        <h1 className={classes.logo} onClick={() => navigate("/")}>자유 게시판</h1>

        <div className={classes["links"]}>
          <ul className={classes["icon-list"]}>
            <li>
              <div
                style={{ height: "100%" }}
                className={`${classes["search-box"]} ${
                  !showInput ? classes.hideColor : ""
                }`}
              >
                {showInput && (
                  <input
                    type="text"
                    value={searchVal}
                    onChange={setSerchValHandler}
                    onKeyPress={searchEnterHandler}
                    placeholder="게시물 검색"
                  />
                )}
                <SearchIcon
                  fill={showInput ? "#54BAB9" : "#F7ECDE"}
                  width="20"
                  height="100%"
                  onClick={searchIconHandler}
                />
              </div>
            </li>

            { !authState.isLoggedIn && (
              <>
                <li className={classes.navigation} onClick={loginModalHandler}><span>로그인</span></li>

                <li className={classes.navigation} onClick={signupModalHandler}><span>회원가입</span></li>
              </>
            )}
            { authState.isLoggedIn && (
              <>
                <li className={classes.navigation} onClick={logoutHandler}><span>로그아웃</span></li>
                <li className={classes.navigation} onClick={() => navigate('/posting')}><span>게시물 작성</span></li>
              </>
            )
            }
          </ul>
        </div>
      </header>
    </Fragment>
  );
};

export default MainHeader;
