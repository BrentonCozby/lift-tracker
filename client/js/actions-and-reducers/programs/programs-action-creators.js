import {
    createProgram,
    db,
} from '../../firebase.js'

const SAVE_NEW_PROGRAM_SUCCESS = 'SAVE_NEW_PROGRAM_SUCCESS'
const UPDATE_PROGRAM_SUCCESS = 'UPDATE_PROGRAM_SUCCESS'
const UPDATE_PROGRAM_ERROR = 'UPDATE_PROGRAM_ERROR'
const NULLIFY_CURRENT_PROGRAM_SUCCESS = 'NULLIFY_CURRENT_PROGRAM_SUCCESS'
const NULLIFY_CURRENT_PROGRAM_ERROR = 'NULLIFY_CURRENT_PROGRAM_ERROR'
const GET_PROGRAM_TITLES_SUCCESS = 'GET_PROGRAM_TITLES_SUCCESS'
const GET_PROGRAM_TITLES_ERROR = 'GET_PROGRAM_TITLES_ERROR'
const SET_CURRENT_PROGRAM_SUCCESS = 'SET_CURRENT_PROGRAM_SUCCESS'
const LISTEN_FOR_CURRENT_PROGRAM_EDIT_ERROR = 'LISTEN_FOR_CURRENT_PROGRAM_EDIT_ERROR'
const LISTEN_FOR_CURRENT_PROGRAM_EDIT_SUCCESS = 'LISTEN_FOR_CURRENT_PROGRAM_EDIT_SUCCESS'

function saveNewProgram({programData}) {
    return (dispatch) => {
        return createProgram(programData).then(() => {
            dispatch({type: SAVE_NEW_PROGRAM_SUCCESS})
        })
    }
}

function updateProgram({uid, programId, location, data}) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            if (!uid) {
                dispatch({ type: UPDATE_PROGRAM_ERROR })
                
                return reject(Error('Can\'t updateProgram if no uid provided.'))
            }
            
            if (!data || typeof data !== 'object') {
                dispatch({ type: UPDATE_PROGRAM_ERROR })
                
                return reject(Error('Can\'t updateProgram if no data object is provided. Data: ' + data))
            }

            db.ref(`users/${uid}/programs/${programId}${(location) ? '/' + location : ''}`).update(data)

            dispatch({ type: UPDATE_PROGRAM_SUCCESS })

            resolve()
        })
    }
}

function nullifyCurrentProgram() {
    return (dispatch) => {
        return new Promise((resolve) => {
            dispatch({ type: NULLIFY_CURRENT_PROGRAM_SUCCESS })

            resolve()
        })
    }
}

function getProgramTitles() {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            db.ref('programs').once('value', snapshot => {
                if (!snapshot || !snapshot.val()) {
                    dispatch({ type: GET_PROGRAM_TITLES_ERROR })

                    return reject(Error('No program titles found.'))
                }

                dispatch({ type: GET_PROGRAM_TITLES_SUCCESS, payload: { ...snapshot.val() } })

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

function setCurrentProgram({uid, programId}) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            if (!uid) {
                getProgramFromDB({programId}).then((program) => {
                    dispatch({
                        type: SET_CURRENT_PROGRAM_SUCCESS,
                        payload: { ...program, id: programId },
                    })

                    reject(Error('Can\'t setCurrentProgram if no uid provided.'))
                })

                return
            }

            saveProgramToUser({uid, programId}).then(program => {
                if (program) {
                    dispatch({
                        type: SET_CURRENT_PROGRAM_SUCCESS,
                        payload: { ...program, id: programId },
                    })

                    return resolve()
                }

                saveProgramToUser({uid, programId}).then(program => {
                    dispatch({
                        type: SET_CURRENT_PROGRAM_SUCCESS,
                        payload: { ...program, id: programId },
                    })

                    resolve()
                })
            })
        })
    }
}

function listenForCurrentProgramEdit({uid, programId}) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            if (!uid) {
                dispatch({ type: LISTEN_FOR_CURRENT_PROGRAM_EDIT_ERROR })

                return reject(Error('Can\'t listenForCurrentProgramEdit program if no uid provided.'))
            }

            db.ref(`users/${uid}/programs/${programId}`).on('value', snapshot => {
                if (!snapshot || !snapshot.val()) {
                    dispatch({ type: LISTEN_FOR_CURRENT_PROGRAM_EDIT_ERROR })

                    return reject(Error('Failed to find program data.'))
                }

                dispatch({
                    type: LISTEN_FOR_CURRENT_PROGRAM_EDIT_SUCCESS,
                    payload: { ...snapshot.val(), id: programId },
                })

                resolve()
            })
        })
    }
}

function stopListeningToCurrentProgram({uid}) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            if (!uid) {
                dispatch({ type: NULLIFY_CURRENT_PROGRAM_ERROR })

                return reject(Error('Can\'t stopListeningToCurrentProgram if no uid provided.'))
            }

            db.ref(`users/${uid}/programs`).off()
            
            dispatch({ type: NULLIFY_CURRENT_PROGRAM_SUCCESS })

            resolve()
        })
    }
}

export {
    saveNewProgram,
    updateProgram,
    nullifyCurrentProgram,
    getProgramTitles,
    setCurrentProgram,
    listenForCurrentProgramEdit,
    stopListeningToCurrentProgram,
}