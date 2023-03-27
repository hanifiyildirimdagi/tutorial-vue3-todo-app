import { Todo } from "./todo.model";
import { TodoState } from "./todo.state";

export interface TodoGetter {
  Items(state: TodoState): Todo[];
  Item(state: TodoState): (id: string) => Todo;
  Tags(state: TodoState): string[];
  EditItemId(state: TodoState): string | undefined;
  EditItem(state: TodoState): Todo | undefined;
}
