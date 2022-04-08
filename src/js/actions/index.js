import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "../constants/action-types"

export function addTodo(payload) {
    return {type: ADD_TODO, payload}
}

export function removeTodo(payload) {
    return {type: REMOVE_TODO, payload}
}

export function updateTodo(payload) {
    return {type: UPDATE_TODO, payload}
}