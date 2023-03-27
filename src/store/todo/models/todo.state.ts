import { Todo } from "./todo.model";

export interface TodoState {
  items: Todo[];
  tags: string[];
  editItemId?:string;
}
