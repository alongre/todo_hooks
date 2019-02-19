import './App.css';

import filter from 'lodash/filter';
import map from 'lodash/map';
import React, { useReducer } from 'react';

import { Todo, TodoAction } from './App.d';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Header from './components/Header';




type State = Todo[];

const reducer = (state: any[], action: TodoAction) => {
  switch (action.type) {
    case 'add':
      return [
        ...state,
        {
          id: Date.now(),
          task: action.payload,
          completed: false
        }
      ];
    case 'delete':
      return filter(state, item => item.id !== action.payload);
    case 'toggle_complete':
      return map(state, (item: Todo) => {
        return item.id === action.payload ? { ...item, completed: !item.completed } : item;
      });
    default:
      return state;
  }
};

export const Context = React.createContext({});
const App = () => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <Context.Provider value={dispatch}>
      <div>
        <Header />
        <AddTodo />
        <TodoList items={state} />
      </div>
    </Context.Provider>
  );
};

export default App;


