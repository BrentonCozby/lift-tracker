import {
    createProgram,
    programsRef,
    getOneProgram
} from '../firebase.js'

export function saveNewProgram(programData) {
    return dispatch => createProgram(programData)
}

export function updatePlan(dbref, val) {
    return dispatch => {
        programsRef.child(dbref).set(val)
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
