import React, { Fragment, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import classes from "./BoardList.module.css";
import { API_URL } from "../../variables";
import useHttp from "../../hooks/use-http";
import axios from "axios";
import BoardItem from "./BoardItem";
import Paging from '../UI/Paging'

const getAllBoard = async (page = 0) => {
  const response = axios.get(`${API_URL}/api/getAllBoard?page=${page}&size=8`);

  return response;
}

const BoardList = () => {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([]);
  const { sendRequest, data, status, error } = useHttp(getAllBoard);
  const [size, setSize] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    sendRequest();
  }, [])

  useEffect(() => {
    if (status === 'completed') {
      const content = data.data.data.content;
      const loadedBoards = [];
      for (const key in content) {
        loadedBoards.push({
          title : content[key].title,
          content : content[key].content,
          id : content[key].id
        })
      }
      setSize(data.data.data.size);
      setTotalElements(data.data.data.totalElements);
      setBoards(loadedBoards);
      console.log(data.data.data)
    }

  }, [data])

  const boardList = boards.map((board, index) => (
    <BoardItem key={index} id={board.id} title={board.title} content={board.content} size={size} totalElements={totalElements} />
  ))

  

  return (
    
    <Fragment>
      <section className={`${classes["board-list"]}`}>
      {boardList}
      </section>
      <Paging pageReload={sendRequest} size={size} totalElements={totalElements} />
      <Outlet />
    </Fragment>
  );
};

export default BoardList;
