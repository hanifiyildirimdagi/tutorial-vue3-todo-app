import { GetterTree } from "vuex";
import { TodoGetter } from "./models/todo.getter";
import { TodoState } from "./models/todo.state";

export const getters: GetterTree<TodoState, TodoGetter> = {
  Items(state) {
    return state.items;
  },
  Tags(state) {
    return state.tags;
  },
  EditItemId(state) {
    return state.editItemId;
  },
  EditItem(state) {
    return state.items.find((x) => x.Id == state.editItemId);
  },
};
