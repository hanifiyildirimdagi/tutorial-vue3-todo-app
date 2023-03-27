import { Component } from "vue";

export default interface ApplicationState {
  drawer: boolean;
  todoDialog: boolean;
  tagDialog: boolean;
  globalDrawer: GlobalDrawer
}
export interface GlobalDrawer {
  active: boolean;
  component?: Component;
}
