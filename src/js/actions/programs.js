import {
    createProgram,
    programsRef,
    getOneProgram
} from '../firebase.js'

export function saveNewProgram(programData) {
    return dispatch => createProgram(programData)
}

export function updateProgram(dbref, data) {
    return dispatch => {
        programsRef.child(dbref).update(data)
    }
}

export function setProgramValue(dbref, value) {
    return dispatch => {
        programsRef.child(dbref).set(value)
    }
}

export function listenForProgramsEdit() {
    return dispatch => {
        programsRef.on('value', snapshot => {
            if(!snapshot.val()) return false
            dispatch({
                type: 'GET_PROGRAM_TITLES',
                payload: snapshot.val()
            })
        })
    }
}

export function listenForCurrentProgramEdit(id) {
    return dispatch => {
        programsRef.child(id).on('value', snapshot => {
            if(!snapshot.val()) return false
            dispatch({
                type: 'GET_ONE_PROGRAM',
                payload: snapshot.val()
            })
        })
    }
}

export function stopListeningCurrentProgramEdit(id) {
    return dispatch => {
        programsRef.child(id).off('value')
    }
}
