import { TodoState } from "./todo.state.enum";

export interface Todo {
  Id: string;
  Title: string;
  Tags: string[];
  State: TodoState;
  Description: string;
}
