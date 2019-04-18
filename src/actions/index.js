import todos from '../apis/todos';
import history from '../history';
import {SIGN_IN, SIGN_OUT, CREATE_TODO, FETCH_TODOS, FETCH_TODO, DELETE_TODO, UNDO_DELETE_TODO, EDIT_TODO, FILTER_TODOS, UPDATE_TODO_STATUS} from './types';
export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const createTodo = formValues => async (dispatch, getState) => {
   const response = await todos.post('/to_dos', {"to_do": { ...formValues }});
   dispatch({type: CREATE_TODO, payload: response.data });
   history.push('/');
};

export const fetchTodos = () => async dispatch => {
    const response = await todos.get('/to_dos');
    dispatch({type: FETCH_TODOS, payload: response.data });        
 };

 export const fetchTodosByTag = (formValues, tag_name="" ) => async dispatch => {
    const response = await todos.get(`/tags/todos?tag_name=${tag_name}`);
    dispatch({type: FILTER_TODOS, payload: response.data });
 };

 export const fetchTodo = (id) => async dispatch => {
    const response = await todos.get(`/to_dos/${id}`);
 
    dispatch({type: FETCH_TODO, payload: response.data });
 };

 export const editTodo = (id, formValues) => async dispatch => {
     const response = await todos.patch(`/to_dos/${id}`, formValues);
     dispatch({type: EDIT_TODO, payload: response.data});
     history.push('/');
 };

 export const deleteTodo = (id) => async dispatch => {
    await todos.delete(`/to_dos/${id}`);
    dispatch({type: DELETE_TODO, payload: id});
    history.push('/');
 };

 export const undoDeleteTodo = (id) => async dispatch => {
    const response = await todos.put(`/to_dos/${id}/is_deleted`);
    dispatch({type: UNDO_DELETE_TODO, payload: response.data});
    history.push('/');
 };

 export const updateTodoStatus = (id, status) => async dispatch => {
    const response = await todos.put(`/to_dos/${id}/status`, {"status": status});
    dispatch({type: UPDATE_TODO_STATUS, payload: response.data});
    history.push('/');
};

export const attachTagToTodo = (id, tag_name) => async dispatch => {
    const response = await todos.put(`/to_dos/${id}/attach_tag`, { "tag": {"name": tag_name}});
    dispatch({type: UPDATE_TODO_STATUS, payload: response.data});
    history.push('/');
};

