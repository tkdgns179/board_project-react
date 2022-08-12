import { useCallback, useReducer } from 'react';

const httpReducer = (state, action) => {
    if (action.type === 'SEND') {
        return {
            data: null,
            error: null,
            status: 'pending',
        };
    }

    if (action.type === "SUCCESS") {
        return {
            data: action.responseData,
            error: null,
            status: 'completed',
        }
    } 

    if (action.type === 'ERROR') {
        return {
            data: null,
            error: action.errorMessage,
            status: 'completed'
        }
    }

    return state;
}

function useHttp(requestFunction, startWithPending = false) {
    const [httpState, dispatch] = useReducer(httpReducer , {
        data: null,
        error: null,
        status: startWithPending ? 'pending' : null,
    })

    const sendRequest = useCallback(
        async function (requestData) {
            dispatch({ type: "SEND"});
            try {
                const responseData = await requestFunction(requestData)
                dispatch({ type: 'SUCCESS', responseData })
                // console.log("여기까지 찍히나")
            } catch (error) {
                // console.log("에러진입")
                // console.log(error.message)
                dispatch({
                    type: 'ERROR',
                    errorMessage: error.message || 'Something went wrong!',
                })
            }
        },
        [requestFunction]
    );

    return {
        sendRequest,
        ...httpState,
    }
}

export default useHttp;

