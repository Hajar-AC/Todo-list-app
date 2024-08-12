import { createStore } from "vuex";
import { Todo } from "../models/Todo";

interface State {
  todos: Todo[];
  nextTodoId: number;
}

export default createStore<State>({
  state: {
    todos: [],
    nextTodoId: 1,
  },
  getters: {
    allTodos: (state): Todo[] => state.todos,
  },
  mutations: {
    ADD_TODO(state, todo: Todo) {
      state.todos.push({
        id: state.nextTodoId,
        text: todo.text,
        completed: todo.completed,
        editing: false,
      });
      state.nextTodoId++;
    },
    REMOVE_TODO(state, id: number) {
      state.todos = state.todos.filter((todo) => todo.id !== id);
    },
    TOGGLE_TODO(state, id: number) {
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    UPDATE_TODO(state, updatedTodo: Todo) {
      const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id);
      if (index !== -1) {
        state.todos.splice(index, 1, updatedTodo);
      }
    },
  },
  actions: {
    addTodo({ commit }, todo: { text: string; completed: boolean }) {
      commit("ADD_TODO", todo);
    },
    removeTodo({ commit }, id: number) {
      commit("REMOVE_TODO", id);
    },
    toggleTodo({ commit }, id: number) {
      commit("TOGGLE_TODO", id);
    },
    updateTodo({ commit }, updatedTodo: Todo) {
      commit("UPDATE_TODO", updatedTodo);
    },
  },
});


