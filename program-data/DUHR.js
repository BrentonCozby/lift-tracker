export default {
    title: 'Daily Undulating High Rep',
    oneRepMaxes: [
        {name: '', oneRepMax: 0},
        {name: '', oneRepMax: 0},
        {name: '', oneRepMax: 0}
    ],
    updates: {
        // index corresponds to day index
        diffs: [10, 15, 5],
        firstWeightFactors: [0.75, 0.83, 0.66]
    },
    plan: [
        // weeks
        [
            // days
            { sets: 4, reps: '7-9', rest: '1 min' },
            { sets: 4, reps: '4-6', rest: '3 min' },
            { sets: 4, reps: '11-13', rest: '2 min' }
        ]
    ]
}
