import React, { useCallback, useEffect, useRef, useState } from "react";
import classes from "./PostingForm.module.css";
import useHttp from "../../hooks/use-http";
import { useSelector } from "react-redux";
import Editor, { getDataFromCKEditor as ImageData } from "./Editor";
import axios from "axios";

const PostingForm = () => {
  const titleRef = useRef();
  const contentRef = useRef();
  const token = useSelector((state) => state.auth.token);
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([])

  const postApi = async (requestData) => {
    const response = await axios.post(
      "http://localhost:8080/api/user/board/post",
      requestData,
      {
        "Content-type": "application/json",
        headers: {
          Authorization: token,
        },
      }
    );
    console.log("api 진입");

    return response;
  };
  const { sendRequest, data, error, status } = useHttp(postApi);

  const submissionHandler = async () => {
    console.log(titleRef.current.value);
    await sendRequest({
      title: titleRef.current.value,
      content,
      files,
    });
    console.log("진입");
  };

  const onChange = (data) => {
    setContent(data);  
    let loadedFiles = content.match(/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b\.(jpg|gif|jpeg|)/g)
    setFiles(loadedFiles)
  }

  useEffect(() => {
    console.log(content)
  }, [content])
  
  return (
    <section className={classes["board-box"]}>
      <div className={classes.title}>
        <input
          ref={titleRef}
          id="title"
          type="text"
          name="title"
          placeholder="제목을 입력하세요"
        />
      </div>
      <hr />
      <div className={classes.content}>
        <Editor value={content} onChange={onChange}></Editor>                
      </div>
      <div className={classes["button-box"]}>
       <button onClick={submissionHandler}>게시물 등록</button>
      </div>
    </section>
  );
};

export default PostingForm;
