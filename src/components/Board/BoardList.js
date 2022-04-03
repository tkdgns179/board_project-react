import React, { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Card from "../UI/Card";
import classes from "./BoardList.module.css";

const BoardList = () => {
  return (
    <Fragment>
      <section className={`${classes["board-list"]}`}>
        <Card>hello</Card>
        <Card>hello</Card>
        <Card>hello</Card>
        <Card>hello</Card>
        <Card>hello</Card>
        <Card>hello</Card>
        <Card>hello</Card>
        <Card>hello</Card>
        <Card>hello</Card>
        <Card>hello</Card>
      </section>
      <Outlet />
    </Fragment>
  );
};

export default BoardList;
