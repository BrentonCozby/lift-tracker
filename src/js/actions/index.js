export function getOneThing(thing) {
    return dispatch => {
        setTimeout(function() {
            dispatch({
                type: 'GET_ONE_THING',
                payload: thing
            })
        }, 100)
    }
}
