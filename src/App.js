import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from "./store/auth-slice";
import BoardList from "./components/Board/BoardList";
import Layout from "./components/Layout/Layout";
import AllBoard from "./pages/AllBoard";
import BoardDetail from "./pages/BoardDetail";
import PostingForm from './components/Form/PostingForm'
import useHttp from "./hooks/use-http";
import axios from "axios";

function App() {
  const authState = useSelector(state => state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUser = async () => {
    const response = axios.get("http://localhost:8080/api/getUser", {
      headers: {
        'Authorization' : authState.token
      }
    });
    return response;
  }
  const { sendRequest, data, status, error } = useHttp(getUser);
  

  useEffect(() => {
    if ( !authState.isLoggedIn ) navigate('/')
    if ( authState.isLoggedIn && authState.userInfo === null ) {
      sendRequest()
    }
    if ( data !== null ) {
      dispatch(authActions.setUserInfo(data.data.data))
    }
  }, [authState.isLoggedIn, authState.userInfo, data])
  
  return (
    <Layout>
        <Routes>
            <Route path="*" element={<BoardList />} />
            <Route path="/boardDetail/:id" element={<BoardDetail />} />
            <Route path="/allBoard" element={<AllBoard />} />
            <Route path="/posting" element={<PostingForm />} />
        </Routes>
    </Layout>
  );
}

export default App;
