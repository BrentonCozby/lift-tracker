import {
    createProgram,
    db
} from '../firebase.js'

export function saveNewProgram(programData) {
    return () => createProgram(programData)
}

export function updateProgram(userId, programId, location, data) {
    if (!userId) {
        return { type: null }
    }

    db.ref(`users/${userId}/programs/${programId}${(location) ? '/' + location : ''}`).update(data)
    
    return { type: 'UPDATE_PROGRAM' }
}

export function setProgramValue(userId, programId, location, value) {
    if (!userId) {
        return { type: null }
    }

    db.ref(`users/${userId}/programs/${programId}/${location}`).set(value)
    
    return {type: 'SET_PROGRAM_VALUE'}
}

export function nullifyCurrentProgram() {
    return dispatch => {
        dispatch({type: 'NULLIFY_CURRENT_PROGRAM'})
    }
}

function getProgramFromDB(programId) {
    return new Promise((resolve) => {
        db.ref(`programs/${programId}`).once('value', snapshot => {
            resolve(snapshot.val())
        })
    })
}

function saveProgramToUser(userId, programId) {
    return new Promise((resolve) => {
        db.ref(`users/${userId}/programs/${programId}`).once('value', snapshot => {
            if(!snapshot.val()) {
                getProgramFromDB(snapshot => {
                    db.ref(`users/${userId}/programs/${programId}`).set(snapshot.val())
                    setCurrentProgram(userId, programId)
                })
                resolve(null)
            }
            else {
                resolve(snapshot.val())
            }
        })
    })
}

export function getProgramTitles() {
    return dispatch => {
        db.ref('programs').once('value', snapshot => {
            if (!snapshot) {
                dispatch({ type: null })
            }
            
            dispatch({
                type: 'GET_PROGRAM_TITLES',
                payload: {...snapshot.val()}
            })
        })
    }
}


export function setCurrentProgram(userId, programId) {
    if (!userId) {
        return dispatch => {
            getProgramFromDB(programId).then(program => {
                dispatch({
                    type: 'GET_ONE_PROGRAM',
                    payload: { ...program, programId }
                })
            })
        }
    }

    const getProgram = saveProgramToUser(userId, programId)

    return dispatch => {
        getProgram.then(program => {
            if(program) {
                dispatch({
                    type: 'GET_ONE_PROGRAM',
                    payload: {...program, id: programId}
                })
            }
            else {
                saveProgramToUser(userId, programId).then(program => {
                    dispatch({
                        type: 'GET_ONE_PROGRAM',
                        payload: {...program, id: programId}
                    })
                })
            }
        })
    }
}

export function listenForCurrentProgramEdit(userId, programId) {
    if (!userId) {
        return dispatch => {
            dispatch({ type: null })
        }
    }

    return dispatch => {
        db.ref(`users/${userId}/programs/${programId}`).on('value', snapshot => {
            if (!snapshot) {
                dispatch({ type: null })
            }

            dispatch({
                type: 'GET_ONE_PROGRAM',
                payload: {...snapshot.val(), id: programId}
            })
        })
    }
}

export function stopListeningToCurrentProgram(userId) {
    db.ref(`users/${userId}/programs`).off()

    return { type: 'STOP_LISTENING_TO_CURRENT_PROGRAM' }
}
