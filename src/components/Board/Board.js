import React, { useState } from "react";
import classes from "./Board.module.css";
import { useEffect } from "react";
import useHttp from "../../hooks/use-http";
import axios from "axios";
import { API_URL } from "../../variables";
import parse from "html-react-parser"
import CommentsUI from "./CommentsUI";

const Board = (props) => {
// console.log(props.boardId);
const [title, setTitle] = useState("");
const [content, setContent] = useState("");
const [comments, setComments] = useState([]);
const [info, setInfo] = useState([]);
const [pageVO, setPageVO] = useState([]);
const getOneBoardDetail = async (boardId) => {
  const response = axios.post(`${API_URL}/api/getOneBoardDetail/${boardId}`,
    {
      pageNum : 2,
      amount  : 10
    }
  )
  return response;

}
const { sendRequest, data, status, error } = useHttp(getOneBoardDetail);
useEffect(() => {
  sendRequest(props.boardId);
}, [])

useEffect(() => {
  if (status === 'completed') {
    const response = data.data.data;
    // console.log(response)
    let loadedInfo = {
      writer: response.board.user.username,
      create_date: response.board.createDate
    }
    const loadedComments = [];
    for (const key in response.comments) {
      loadedComments.push({

      })
    }
    setTitle(response.board.title);
    setContent(response.board.content);
    setComments(response.comments);
    setInfo(loadedInfo);
    setPageVO(response.pageVO);
  }

}, [data])

  return (
    <section className={`${classes["board"]} ${classes["board-box"]}`}>
      <div className={classes.title}>
          <h1>{title}</h1>
      </div>
      <hr/>
      <div className={classes.writer}>
        <ul>
          <li>작성일 : {info.create_date}</li>
          <li>작성자 : {info.writer}</li>
        </ul>
      </div>
      <div className={classes.content}>{parse(content)}</div>
      <div className={classes.comments}>
      { comments.length > 0 && <CommentsUI comments={comments}/>}
      </div>
    </section>
  );
};

export default Board;
