import { useState, useReducer } from "react";

const initialInputState = {
    value: '',
    isTouched: false,
};
    

const inputStateReducer = (state, action) => {
    if (action.type === 'INPUT') {
        return { value: action.value }
    }

    if (action.type === 'BLUR') {
        return { isTouched: true, value: state.value }
    }
    
    if (action.type === 'RESET') {
        return { isTouched: false, value: '' }
    }
    return initialInputState;
}

const _useInput = (validateValue) => {
    const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState)

    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.isTouched;

    const valueChangeHandler = e => {
        dispatch({type : 'INPUT', value: e.target.value});
    }

    const inputBlurHandler = e => { 
        dispatch({type: 'BLUR'});
    }
    
    const reset = () => {
        dispatch({type: 'RESET'})
    }
    
    return {
        value: inputState.value,
        hasError,
        isValid: valueIsValid,
        valueChangeHandler,
        inputBlurHandler,
        reset
    };
}


const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const inputBlurHandler = (e) => {
    setIsTouched(true)
  }  

  const reset = () => {
      setEnteredValue("");
      setIsTouched(false);
  }
  
  return {
    value: enteredValue,
    hasError,
    isValid: valueIsValid,
    valueChangeHandler,
    inputBlurHandler,
    reset
  };
};

const useInputDefault = () => {
    const [inputVal, setInputVal] = useState("");
    const inputValHandler = e => {
        setInputVal(e.target.value);
    }
    return {
        inputVal, setInputHandler: inputValHandler 
    }
}
 
export { useInput, _useInput, useInputDefault }
