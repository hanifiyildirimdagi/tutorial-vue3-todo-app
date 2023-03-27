import ApplicationState from "./application.state";

export interface ApplicationGetter {
  Drawer(state: ApplicationState): boolean;
  TodoDialog(state: ApplicationState): boolean;
  TagDialog(state: ApplicationState): boolean;
}
