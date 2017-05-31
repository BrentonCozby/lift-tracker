export default {
    title: 'Daily Undulating High Rep',
    oneRepMaxes: [
        {name: 'Overhead Press', oneRepMax: 0},
        {name: 'Chest Press', oneRepMax: 0},
        {name: 'Bent Over Row', oneRepMax: 0}
    ],
    plan: [
        [
            {
                sets: 4,
                reps: '7-9',
                rest: '1 min',
                firstWeightFactor: 0.75,
                exercises: [
                    {name: 'Overhead Press', weight: 0, difficulty: 'difficult', diff: 10},
                    {name: 'Chest Press', weight: 0, difficulty: 'difficult', diff: 10},
                    {name: 'Bent Over Row', weight: 0, difficulty: 'ok', diff: 10}
                ]
            },
            {
                sets: 4,
                reps: '4-6',
                rest: '3 min',
                firstWeightFactor: 0.83,
                exercises: [
                    {name: 'Overhead Press', weight: 0, difficulty: 'difficult', diff: 15},
                    {name: 'Chest Press', weight: 0, difficulty: 'difficult', diff: 15},
                    {name: 'Bent Over Row', weight: 0, difficulty: 'ok', diff: 15}
                ]
            },
            {
                sets: 4,
                reps: '11-13',
                rest: '2 min',
                firstWeightFactor: 0.66,
                exercises: [
                    {name: 'Overhead Press', weight: 0, difficulty: 'difficult', diff: 5},
                    {name: 'Chest Press', weight: 0, difficulty: 'difficult', diff: 5},
                    {name: 'Bent Over Row', weight: 0, difficulty: 'difficult', diff: 5}
                ]
            }
        ]
    ]
}
