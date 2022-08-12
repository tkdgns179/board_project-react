import React from "react";
import classes from "./BoardItem.module.css";
import Card from "../UI/Card";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";

const BoardItem = (props) => {
  const navigate = useNavigate();
  console.log(props.id)
  return (
    <Card>
      <div
        onClick={() => {
            navigate(`/boardDetail/${props.id}`)
        }}
      >
        <h3 className={classes.title}>{props.title}</h3>
        <hr></hr>
        <div className={classes.content}>{parse(props.content)}</div>
      </div>
    </Card>
  );
};

export default BoardItem;
