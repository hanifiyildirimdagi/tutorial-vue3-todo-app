import { MutationTree } from "vuex";
import ApplicationState from "./models/application.state";
import { Component } from "vue";

export const mutations: MutationTree<ApplicationState> = {
  SetDrawer(state, value) {
    state.drawer = value;
  },
  SetTodoDialog(state, value: boolean) {
    state.todoDialog = value;
  },
  SetTagDialog(state, value: boolean) {
    state.tagDialog = value;
  },
  GlobalDrawer_SetActive(state, payload: boolean) {
    state.globalDrawer.active = payload;
  },
  GlobalDrawer_SetComponent(state, payload: Component) {
    state.globalDrawer.component = payload;
  },
};
