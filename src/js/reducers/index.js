import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "../constants/action-types"

const initialState = {
    todos: []
};

function rootReducer(state = initialState, action) {
    if(action.type === ADD_TODO) {
        return Object.assign({}, state, {
            todos: state.todos.concat(action.payload)
        });
    } else if(action.type === REMOVE_TODO) {
        return Object.assign({}, state, {
            todos: state.todos.filter((item) => item.id !== action.payload.id)
        });
    } else if(action.type === UPDATE_TODO) {
        const todo = state.todos.filter((item) => item.id === action.payload.id)
        todo.description = action.payload.description
        todo.complete = action.payload.complete

        return Object.assign({}, state, {
            todos: [...state.todos]
        });
    }
    return state;
}

export default rootReducer;