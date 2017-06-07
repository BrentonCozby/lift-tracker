import {
    createProgram,
    db,
    getOneProgram
} from '../firebase.js'

export function saveNewProgram(programData) {
    return dispatch => createProgram(programData)
}

export function updateProgram(userId, programId, location, data) {
    db.ref(`users/${userId}/programs/${programId}${(location) ? '/' + location : ''}`).update(data)
    return {type: null}
}

export function setProgramValue(userId, programId, location, value) {
    db.ref(`users/${userId}/programs/${programId}/${location}`).set(value)
    return {type: null}
}

export function nullifyCurrentProgram() {
    return dispatch => {
        dispatch({type: 'NULLIFY_CURRENT_PROGRAM'})
    }
}

function saveProgramToUser(userId, programId) {
    return new Promise((resolve, reject) => {
        db.ref(`users/${userId}/programs/${programId}`).once('value', snapshot => {
            if(!snapshot.val()) {
                db.ref(`programs/${programId}`).once('value', program => {
                    db.ref(`users/${userId}/programs/${programId}`).set(program.val())
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
        db.ref(`programs`).once('value', snapshot => {
            if(!snapshot) return false
            dispatch({
                type: 'GET_PROGRAM_TITLES',
                payload: {...snapshot.val()}
            })
        })
    }
}


export function setCurrentProgram(userId, programId) {
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
    return dispatch => {
        db.ref(`users/${userId}/programs/${programId}`).on('value', snapshot => {
            if(!snapshot) return false
            dispatch({
                type: 'GET_ONE_PROGRAM',
                payload: {...snapshot.val(), id: programId}
            })
        })
    }
}

export function stopListeningToCurrentProgram(userId) {
    db.ref(`users/${userId}/programs`).off()
    return {type: null}
}
