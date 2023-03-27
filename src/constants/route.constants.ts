import { RouteRecordRaw } from "vue-router";
import TodoList from "../components/page/todo-list.vue";
import TodoDetail from "../components/page/todo-detail.vue";

export const RouteConstants: RouteRecordRaw[] = [
  {
    path: "/",
    component: TodoList,
    name: "TODO LIST",
  },
  {
    path: "/detail",
    component: TodoDetail,
    name: "Todo Detail",
  },
];
