import { db } from '../firebase.js'

export function calcNextWeights(userId, programId, plan) {
    let newPlan = {}

    // calculate the next weeks' weights from the previous week
    plan.forEach((week, weekIndex) => {
        week.forEach((day, dayIndex) => {
            if(!day.exercises) {
                console.log(`No exercises exist yet for this day: ${dayIndex}, week: ${weekIndex}`)
                return false
            }

            if(day.exercises.some(e => !e.difficulty)) {
                // skip creating next day and delete it if exists
                const dbref = `${weekIndex + 1}/${dayIndex}`
                newPlan[dbref] = null
                return false
            }

            const nextDay = {...day}
            nextDay.exercises = []

            // create the next day, with calculated weights from same day last week
            day.exercises.forEach((currentExercise, exerciseIndex) => {
                const newNextExercise = {
                    diff: currentExercise.diff,
                    name: currentExercise.name,
                    difficulty: undefined
                }

                if(weekIndex === plan.length - 2) {
                    newNextExercise.difficulty = ''
                }
                else if(plan[weekIndex + 1][dayIndex]) {
                    plan[weekIndex + 1][dayIndex].exercises.forEach(nextExercise => {
                        if(nextExercise.name === currentExercise.name) {
                            newNextExercise.difficulty = nextExercise.difficulty
                        }
                    })
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
    db.ref(`users/${userId}/programs/${programId}/plan/`).update(newPlan)

    return {type: null}
}
