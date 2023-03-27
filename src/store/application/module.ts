import { Module, Store } from "vuex";
import ApplicationState from "./models/application.state";
import { ApplicationGetter } from "./models/application.getter";

import { state } from "./state";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { InjectionKey } from "vue";
import { actions } from "./actions";

export const applicationStoreModule: Module<
  ApplicationState,
  ApplicationGetter
> = {
  namespaced: true,
  getters: getters,
  mutations: mutations,
  state: state,
  actions: actions,
};
