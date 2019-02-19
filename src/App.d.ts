export type Action = 'add' | 'delete' | 'toggle_complete';

export interface Todo {
  id: string;
  task: string;
  completed: boolean;
}

export interface TodoAction {
  type: Action;
  payload?: string;
}