export const addTodo = (text) => ({
  type: "ADD_TODO",
  payload: text,
});

export const moveTodo = (text) => ({
  type: "MOVE_TODO",
  payload: text,
});

export const editTodo = (text) => ({
  type: "EDIT_TODO",
  payload: text,
});

export const deleteTodo = (text) => ({
  type: "DELETE_TODO",
  payload: text,
});
