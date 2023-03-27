import { createStore } from "vuex";
import { applicationStoreModule } from "./application/module";
import { todoModule } from "./todo/module";

export const store = createStore<any>({
  devtools: true,
  modules: {
    application: applicationStoreModule,
    todo: todoModule,
  },
});
