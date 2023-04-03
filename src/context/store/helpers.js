export const implementPendingWithAction = (dispatch, type) => {
    dispatch({
        type,
        payload: true
    })
}

export const implementErrorWithAction = (dispatch, type, error) => {
    dispatch({
        type,
        payload: error
    })
    
}


export const implementSuccessWithAction = (dispatch, type, payload) => {
    dispatch({
        type,
        payload
    })
}