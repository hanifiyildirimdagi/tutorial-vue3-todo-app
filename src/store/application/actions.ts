import { ActionTree } from "vuex";
import { ApplicationGetter } from "./models/application.getter";
import ApplicationState from "./models/application.state";
import { Component } from "vue";

export const actions: ActionTree<ApplicationState, ApplicationGetter> = {
  OpenGlobalDrawer(context, component: Component) {
    context.commit("GlobalDrawer_SetActive", true);
    context.commit("GlobalDrawer_SetComponent", component);
  },
};
