import React from "react";
import classes from "./Board.module.css";

const Board = () => {
  
  return (
    <section className={`${classes["board"]} ${classes["board-box"]}`}>
      <div className={classes.title}>
          <h1>제목이 들어갑니다</h1>
      </div>
      <div className={classes.content}>내용</div>
      <div className={classes.comments}>댓글란</div>
    </section>
  );
};

export default Board;
