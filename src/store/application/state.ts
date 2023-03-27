import ApplicationState from "./models/application.state";

export const state: ApplicationState = {
  drawer: false,
  todoDialog: false,
  tagDialog: false,
  globalDrawer: {
    active: false,
    component: undefined,
  },
};
