import { GetterTree } from "vuex";
import { ApplicationGetter } from "./models/application.getter";
import ApplicationState from "./models/application.state";

export const getters = {
  Drawer(state) {
    return state.drawer;
  },
  TodoDialog(state) {
    return state.todoDialog;
  },
  TagDialog(state) {
    return state.tagDialog;
  },
  GlobalDrawer(state) {
    return state.globalDrawer;
  },
} as GetterTree<ApplicationState, ApplicationGetter>;
