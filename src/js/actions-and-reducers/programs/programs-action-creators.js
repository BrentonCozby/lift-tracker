import {
    createProgram,
    db
} from '../../firebase.js'

export function saveNewProgram({programData}) {
    return (dispatch) => {
        return createProgram(programData).then(() => {
            dispatch({type: 'SAVE_NEW_PROGRAM_SUCCESS'})
        })
    }
}

export function updateProgram({userId, programId, location, data}) {
    return (dispatch) => {
        return new Promise((resolve) => {
            if (!userId) {
                dispatch({ type: null })
                
                return resolve()
            }

            db.ref(`users/${userId}/programs/${programId}${(location) ? '/' + location : ''}`).update(data)

            dispatch({ type: 'UPDATE_PROGRAM_SUCCESS' })

            resolve()
        })
    }
}

export function setProgramValue({userId, programId, location, value}) {
    return (dispatch) => {
        return new Promise((resolve) => {
            if (!userId) {
                dispatch({ type: null })

                return resolve()
            }

            db.ref(`users/${userId}/programs/${programId}/${location}`).set(value)

            dispatch({ type: 'SET_PROGRAM_VALUE_SUCCESS' })

            resolve()
        })
    }
}

export function nullifyCurrentProgram() {
    return (dispatch) => {
        return new Promise((resolve) => {
            dispatch({ type: 'NULLIFY_CURRENT_PROGRAM_SUCCESS' })

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
                        type: 'GET_PROGRAM_TITLES_SUCCESS',
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

function saveProgramToUser({userId, programId}) {
    return new Promise((resolve) => {
        db.ref(`users/${userId}/programs/${programId}`).once('value', snapshot => {
            if (!snapshot || !snapshot.val()) {
                getProgramFromDB({programId}).then((program) => {
                    db.ref(`users/${userId}/programs/${programId}`).set(program)

                    setCurrentProgram({userId, programId})

                    resolve(null)
                })
            } else {
                resolve(snapshot.val())
            }
        })
    })
}

export function setCurrentProgram({userId, programId}) {
    return (dispatch) => {
        return new Promise((resolve) => {
            if (!userId) {
                getProgramFromDB({programId}).then((program) => {
                    dispatch({
                        type: 'GET_ONE_PROGRAM_SUCCESS',
                        payload: { ...program, id: programId }
                    })

                    resolve()
                })

                return
            }

            saveProgramToUser({userId, programId}).then(program => {
                if (program) {
                    dispatch({
                        type: 'GET_ONE_PROGRAM_SUCCESS',
                        payload: { ...program, id: programId }
                    })

                    return resolve()
                }

                saveProgramToUser({userId, programId}).then(program => {
                    dispatch({
                        type: 'GET_ONE_PROGRAM_SUCCESS',
                        payload: { ...program, id: programId }
                    })

                    resolve()
                })
            })
        })
    }
}

export function listenForCurrentProgramEdit({userId, programId}) {
    return (dispatch) => {
        return new Promise((resolve) => {
            if (!userId) {
                dispatch({ type: null })

                return resolve()
            }

            db.ref(`users/${userId}/programs/${programId}`).on('value', snapshot => {
                if (!snapshot || !snapshot.val()) {
                    dispatch({ type: null })
                } else {
                    dispatch({
                        type: 'GET_ONE_PROGRAM_SUCCESS',
                        payload: { ...snapshot.val(), id: programId }
                    })
                }

                resolve()
            })
        })
    }
}

export function stopListeningToCurrentProgram({userId}) {
    return (dispatch) => {
        return new Promise((resolve) => {
            db.ref(`users/${userId}/programs`).off()

            dispatch({ type: 'STOP_LISTENING_TO_CURRENT_PROGRAM_SUCCESS' })

            resolve()
        })
    }
}
