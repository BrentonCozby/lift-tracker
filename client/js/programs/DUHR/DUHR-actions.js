import { db } from '../../firebase.js'

export function getCurrentDay({ location }) {
    return new Promise(resolve => {
        db.ref(location).once('value', snapshot => {
            resolve(snapshot.val())
        })
    })
}

export function updateDateCompleted({ uid, programId, location }) {
    if (!location) {
        return { type: 'UPDATE_DATE_COMPLETED_ERROR', message: 'Invalid day location provided' }
    }

    const dayRef = db.ref(`users/${uid}/programs/${programId}/${location}`)

    return dispatch => {
        dayRef.once('value', snapshot => {
            const day = snapshot.val()

            if (!day) {
                return dispatch({ type: 'UPDATE_DATE_COMPLETED_ERROR', message: 'No snapshot of day from firebase found' })
            }

            if (day.exercises.some(e => !e.difficulty)) {
                dayRef.update({ dateCompleted: null })

                return dispatch({ type: null })
            }

            if (day.dateCompleted) {
                return dispatch({ type: null })
            }

            dayRef.update({ dateCompleted: new Date() })

            dispatch({ type: 'UPDATE_DATE_COMPLETED_SUCCESS' })
        })
    }
}

export function calcNextWeights(uid, programId, plan) {
    if (!uid || !programId || !plan) {
        return { type: 'CALC_NEXT_WEIGHTS_ERROR' }
    }

    let newPlan = {}

    // calculate the next weeks' weights from the previous week
    plan.forEach((week, weekIndex) => {
        week.forEach((day, dayIndex) => {
            if(!day.exercises) {
                return false
            }

            // skip creating next day and delete it if exists if day is not complete
            if (day.exercises.some(e => !e.difficulty)) {
                const dbref = `${weekIndex + 1}/${dayIndex}`
                newPlan[dbref] = null
                return false
            }

            const nextDay = {...day}
            nextDay.exercises = []

            // create the next day, with calculated weights from same day last week
            day.exercises.forEach((currentExercise) => {
                const newNextExercise = {
                    diff: currentExercise.diff,
                    name: currentExercise.name,
                    difficulty: undefined,
                }

                // if it is first week and only week
                if(weekIndex === 0 && plan.length === 1) {
                    newNextExercise.difficulty = ''
                }
                // if the next day exists
                else if(plan[weekIndex + 1] && plan[weekIndex + 1][dayIndex]) {
                    plan[weekIndex + 1][dayIndex].exercises.forEach(nextExercise => {
                        if(nextExercise.name === currentExercise.name) {
                            newNextExercise.difficulty = nextExercise.difficulty
                        }
                    })
                    if(newNextExercise.difficulty === undefined) {
                        newNextExercise.difficulty = ''
                    }
                }
                else {
                    newNextExercise.difficulty = ''
                }


                newNextExercise.weight = (() => {
                    switch(currentExercise.difficulty) {
                        case 'easy':
                            return +currentExercise.weight + +currentExercise.diff
                        case 'ok':
                            return +currentExercise.weight
                        case 'difficult':
                            return +currentExercise.weight - +currentExercise.diff
                    }
                })()

                nextDay.exercises.push(newNextExercise)
            })

            // rotate exercises
            const temp = nextDay.exercises.shift()
            nextDay.exercises.push(temp)

            // add nextDay to newPlan object
            const dbref = `${weekIndex + 1}/${dayIndex}`
            newPlan[dbref] = nextDay
        })
    })

    // update database
    db.ref(`users/${uid}/programs/${programId}/plan/`).update(newPlan)

    return { type: 'CALC_NEXT_WEIGHTS_SUCCESS' }
}

export function setOneRepMax({ uid, programId, currentProgram, newMax, location }) {
    if (!uid || !programId || !currentProgram || !newMax || !location) {
        return { type: 'SET_ONE_REP_MAX_ERROR' }
    }

    const updatedProgram = {...currentProgram}

    // set first week weights from one-rep-maxes
    currentProgram.plan[0].forEach((day, dayIndex) => {
        day.exercises.forEach((exercise, exerciseIndex) => {
            currentProgram.oneRepMaxes.forEach((max, maxIndex) => {
                if(max.name === exercise.name && +location === +maxIndex) {
                    const firstWeight = Math.round(+newMax * +day.firstWeightFactor)
                    updatedProgram.oneRepMaxes[maxIndex].oneRepMax = (+newMax === 0) ? '' : +newMax
                    updatedProgram.plan[0][dayIndex].exercises[exerciseIndex].weight = firstWeight
                }
            })
        })
    })

    db.ref(`users/${uid}/programs/${programId}`).update(updatedProgram)

    return { type: 'SET_ONE_REP_MAX_SUCCESS' }
}

export function setExerciseName({ uid, programId, currentProgram, newName, location }) {
    if (!uid || !programId || !currentProgram || !newName || !location) {
        return { type: 'SET_EXERCISE_NAME_ERROR' }
    }

    const updatedProgram = {...currentProgram}

    updatedProgram.oneRepMaxes[location].name = newName

    // set first week weights from one-rep-maxes
    currentProgram.plan.forEach((week, weekIndex) => {
        week.forEach((day, dayIndex) => {
            day.exercises.forEach((exercise, exerciseIndex) => {
                if(location === exerciseIndex) {
                    updatedProgram.plan[weekIndex][dayIndex].exercises[exerciseIndex].name = newName
                }
            })
        })
    })

    db.ref(`users/${uid}/programs/${programId}`).update(updatedProgram)

    return { type: 'SET_EXERCISE_NAME_SUCCESS' }
}

export function setExerciseWeight({ uid, programId, location, newWeight }) {
    if (!uid || !programId || !location || !newWeight) {
        return { type: 'EDIT_WEIGHT_AMOUNT_ERROR' }
    }

    const exerciseRef = db.ref(`users/${uid}/programs/${programId}/${location}`)

    exerciseRef.update({ weight: newWeight })

    return { type: 'EDIT_WEIGHT_AMOUNT_SUCCESS' }
}
