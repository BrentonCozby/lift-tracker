import {
    createProgram,
    db
} from '../../firebase.js'

const SAVE_NEW_PROGRAM_SUCCESS = 'SAVE_NEW_PROGRAM_SUCCESS'
const UPDATE_PROGRAM_SUCCESS = 'UPDATE_PROGRAM_SUCCESS'
const SET_PROGRAM_VALUE_SUCCESS = 'SET_PROGRAM_VALUE_SUCCESS'
const NULLIFY_CURRENT_PROGRAM_SUCCESS = 'NULLIFY_CURRENT_PROGRAM_SUCCESS'
const GET_PROGRAM_TITLES_SUCCESS = 'GET_PROGRAM_TITLES_SUCCESS'
const GET_ONE_PROGRAM_SUCCESS = 'GET_ONE_PROGRAM_SUCCESS'

export function saveNewProgram({programData}) {
    return (dispatch) => {
        return createProgram(programData).then(() => {
            dispatch({type: SAVE_NEW_PROGRAM_SUCCESS})
        })
    }
}

export function updateProgram({uid, programId, location, data}) {
    return (dispatch) => {
        return new Promise((resolve) => {
            if (!uid) {
                dispatch({ type: null })
                
                return resolve()
            }

            db.ref(`users/${uid}/programs/${programId}${(location) ? '/' + location : ''}`).update(data)

            dispatch({ type: UPDATE_PROGRAM_SUCCESS })

            resolve()
        })
    }
}

export function setProgramValue({uid, programId, location, value}) {
    return (dispatch) => {
        return new Promise((resolve) => {
            if (!uid) {
                dispatch({ type: null })

                return resolve()
            }

            db.ref(`users/${uid}/programs/${programId}/${location}`).set(value)

            dispatch({ type: SET_PROGRAM_VALUE_SUCCESS })

            resolve()
        })
    }
}

export function nullifyCurrentProgram() {
    return (dispatch) => {
        return new Promise((resolve) => {
            dispatch({ type: NULLIFY_CURRENT_PROGRAM_SUCCESS })

            resolve()
        })
    }
}

export function getProgramTitles() {
    return (dispatch) => {
        return new Promise((resolve) => {
            db.ref('programs').once('value', snapshot => {
                if (!snapshot || !snapshot.val()) {
                    dispatch({ type: null })
                } else {
                    dispatch({
                        type: GET_PROGRAM_TITLES_SUCCESS,
                        payload: { ...snapshot.val() }
                    })
                }

                resolve()
            })
        })
    }
}

function getProgramFromDB({programId}) {
    return new Promise((resolve) => {
        db.ref(`programs/${programId}`).once('value', snapshot => {
            resolve(snapshot.val())
        })
    })
}

function saveProgramToUser({uid, programId}) {
    return new Promise((resolve) => {
        db.ref(`users/${uid}/programs/${programId}`).once('value', snapshot => {
            if (!snapshot || !snapshot.val()) {
                getProgramFromDB({programId}).then((program) => {
                    db.ref(`users/${uid}/programs/${programId}`).set(program)

                    setCurrentProgram({uid, programId})

                    resolve(null)
                })
            } else {
                resolve(snapshot.val())
            }
        })
    })
}

export function setCurrentProgram({uid, programId}) {
    return (dispatch) => {
        return new Promise((resolve) => {
            if (!uid) {
                getProgramFromDB({programId}).then((program) => {
                    dispatch({
                        type: GET_ONE_PROGRAM_SUCCESS,
                        payload: { ...program, id: programId }
                    })

                    resolve()
                })

                return
            }

            saveProgramToUser({uid, programId}).then(program => {
                if (program) {
                    dispatch({
                        type: GET_ONE_PROGRAM_SUCCESS,
                        payload: { ...program, id: programId }
                    })

                    return resolve()
                }

                saveProgramToUser({uid, programId}).then(program => {
                    dispatch({
                        type: GET_ONE_PROGRAM_SUCCESS,
                        payload: { ...program, id: programId }
                    })

                    resolve()
                })
            })
        })
    }
}

export function listenForCurrentProgramEdit({uid, programId}) {
    return (dispatch) => {
        return new Promise((resolve) => {
            if (!uid) {
                dispatch({ type: null })

                return resolve()
            }

            db.ref(`users/${uid}/programs/${programId}`).on('value', snapshot => {
                if (!snapshot || !snapshot.val()) {
                    dispatch({ type: null })
                } else {
                    dispatch({
                        type: GET_ONE_PROGRAM_SUCCESS,
                        payload: { ...snapshot.val(), id: programId }
                    })
                }

                resolve()
            })
        })
    }
}

export function stopListeningToCurrentProgram({uid}) {
    return (dispatch) => {
        return new Promise((resolve) => {
            if (!uid) {
                dispatch({ type: null })

                return resolve()
            }

            db.ref(`users/${uid}/programs`).off()
            
            dispatch({ type: NULLIFY_CURRENT_PROGRAM_SUCCESS })

            resolve()
        })
    }
}
