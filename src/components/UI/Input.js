import React from "react";
import classes from "./Input.module.css";
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={`${classes.input} ${props.isInvalid ? classes.invalid : ""}`}>
      <label htmlFor={props.input.id}>{props.input.id}</label>
      <input
        ref={ref}
        {...props.input}
      />
    </div>
  );
});

export default Input;
