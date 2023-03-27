import { MutationTree } from "vuex";
import { TodoState } from "./models/todo.state";
import { Todo } from "./models/todo.model";

export const mutations: MutationTree<TodoState> = {
  SetItem(state: TodoState, payload: Todo[]) {
    state.items = payload;
  },
  SetTags(state: TodoState, payload: string[]) {
    state.tags = payload;
  },
  SetEditItemId(state: TodoState, payload?: string) {
    state.editItemId = payload;
  },
};
