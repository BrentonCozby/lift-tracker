const INITAL_STATE = {
    titles: [],
    current: {}
}

export default function programsReducer(state = INITAL_STATE, action) {
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
        case 'NULLIFY_CURRENT_PROGRAM_SUCCESS': {
            return {...state, current: null}
        }
        default:
            return state
    }
}
