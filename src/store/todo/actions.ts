import { ActionTree } from "vuex";
import { TodoState } from "./models/todo.state";
import { TodoGetter } from "./models/todo.getter";
import { Todo } from "./models/todo.model";

const TODO_STORAGE_KEY = "TODO_ITEMS";
const TAGS_STORAGE_KEY = "TAGS";

export const actions: ActionTree<TodoState, TodoGetter> = {
  async FetchTodo(context) {
    const str = localStorage.getItem(TODO_STORAGE_KEY) ?? "[]";
    const items = JSON.parse(str);
    context.commit("SetItem", items);
  },
  async AddNewTodo(context, payload: Todo) {
    await context.dispatch("FetchTodo");
    const items = context.getters["Items"] as Todo[];
    items.push(payload);
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(items));
    context.commit("SetItem", items);
  },
  async DeleteTodo(context, id: string) {
    let items = context.getters["Items"] as Todo[];
    items = items.filter((x) => x.Id != id);
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(items));
    context.commit("SetItem", items);
  },
  async UpdateTodo(context, payload: Todo) {
    let items = context.getters["Items"] as Todo[];
    const index = items.findIndex((x) => x.Id == payload.Id);
    items[index] = payload;
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(items));
    context.commit("SetItem", items);
  },
  async FetchTags(context) {
    const str = localStorage.getItem(TAGS_STORAGE_KEY) ?? "[]";
    const items = JSON.parse(str);
    context.commit("SetTags", items);
  },
  async AddNewTag(context, payload: string) {
    const tags = context.getters["Tags"] as string[];
    tags.push(payload);
    localStorage.setItem(TAGS_STORAGE_KEY, JSON.stringify(tags));
    context.commit("SetTags", tags);
  },
};
