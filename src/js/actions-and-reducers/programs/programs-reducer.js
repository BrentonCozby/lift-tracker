const INITAL_STATE = {
    titles: [],
    current: {}
}

export default function(state = INITAL_STATE, action) {
    switch(action.type) {
        case 'GET_PROGRAM_TITLES_SUCCESS': {
            const titles = Object.keys(action.payload).map(id => {
                return {
                    title: action.payload[id].title,
                    id: id
                }
            })
            
            return { ...state, titles: titles }
        }    
        case 'GET_ONE_PROGRAM_SUCCESS': {
            if (!action.payload) {
                return { ...state, current: { ...state.current } }
            }

            return { ...state, current: action.payload }
        }
        case 'SET_ONE_REP_MAX': {
            return { ...state, current: { ...state.current } }
        }
        case 'SET_EXERCISE_NAME': {
            return { ...state, current: { ...state.current } }
        }
        case 'STOP_LISTENING_TO_CURRENT_PROGRAM_SUCCESS': {
            return { ...state, current: null }
        }
        case 'NULLIFY_CURRENT_PROGRAM_SUCCESS': {
            return {...state, current: null}
        }
        default:
            return state
    }
}
