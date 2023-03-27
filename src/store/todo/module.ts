import { Module } from "vuex";
import { TodoState } from "./models/todo.state";
import { TodoGetter } from "./models/todo.getter";
import { actions } from "./actions";
import { state } from "./state";
import { mutations } from "./mutations";
import { getters } from "./getters";

export const todoModule: Module<TodoState, TodoGetter> = {
  namespaced: true,
  state: state,
  mutations: mutations,
  getters: getters,
  actions: actions,
};
