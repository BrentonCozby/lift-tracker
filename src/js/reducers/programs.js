const INITAL_STATE = {
    titles: null,
    current: null
}

export default function(state = INITAL_STATE, action) {
    switch(action.type) {
        case 'GET_PROGRAM_TITLES':
            const titles = Object.keys(action.payload).map(id => {
                return {
                    title: action.payload[id].title,
                    id: id
                }
            })
            return {...state, titles: titles}
        case 'GET_ONE_PROGRAM':
            return {...state, current: action.payload}
        default:
            return state
    }
}
