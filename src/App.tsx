import React, {
  Component,
  Fragment,
  useState,
  useReducer,
  createContext,
  useContext,
  useRef,
  useEffect
} from 'react';
import logo from './logo.svg';
import map from 'lodash/map'
import filter from 'lodash/filter'
import './App.css';

type Action = 'add' | 'delete' | 'init';

interface Todo {
  id : string;
  task : string;
}

interface TodoAction {
  type : Action;
  payload?: string;
}

const Header = () => {
  return (
    <div
      style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
    }}>
      <h1>Todo APP</h1>
      <br/>
      <br/>
    </div>

  )
}

const TodoItem = () => {
  return (
    <div
      style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
    }}>
      <label htmlFor='task'>Need to do:</label>

    </div>
  )
}

const TodoList = (state : any) => {
  const dispatch = useContext(Context)as any
  return (
    <div style={{
      marginTop: '10px',
    }}>
      <ol>
        {map(state.items, (item : Todo) => (
          <li key={item.id} style={{
            marginLeft: '5px'
          }}>
            {item.task}
            <button
              style={{
              marginLeft: '5px'
            }}
              onClick={() => dispatch({type: 'delete', payload: item.id})}>
              X</button>
          </li>
        ))
}
      </ol>
    </div>
  )
}

const reducer = (state : any, action : TodoAction) => {
  switch (action.type) {
    case 'add':
      return [
        ...state, {
          id: Date.now(),
          task: action.payload
        }
      ]
    case 'delete':
      return filter(state, item => item.id !== action.payload)
    default:
      return state;
      break;
  }
}

const AddTodo = () => {
  const dispatch = useContext(Context)as any;
  const [task, setTask] = useState('');
  const buttonAdd = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (buttonAdd && buttonAdd.current) {
      if (task.length === 0) {
      
      buttonAdd.current.disabled = true;
      buttonAdd.current.style.background = '#cccccc';
      } else {
        buttonAdd.current.disabled = false;
      buttonAdd.current.style.background = '#0099cc';
        
      }
    }
  },[task])


  const addTask = () => {
    dispatch({type: 'add', payload: task})
    if (inputRef && inputRef.current) {
      inputRef.current.value = ''
      setTask('');
    }
  }

  return (
    <div
      style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start'
    }}>

      <label style={{
        marginLeft: '5px'
      }} htmlFor='newTodo'>Need to do:</label>
      <input ref={inputRef}
        style={{
        marginLeft: '5px'
      }}
        onChange={(e) => setTask(e.target.value)}
        name='newTodo'/>
      <button ref={buttonAdd}
        style={{
        marginLeft: '5px'
      }}
        onClick={addTask}>Add
      </button>
    </div>
  )
}

const Context = React.createContext({});
const App = () => {
  const todos : Todo[] = [];
  const [state,
    dispatch] = useReducer(reducer, todos)
  return (
    <Context.Provider value={dispatch}>
      <div>
        <Header/>
        <AddTodo/>
        <TodoList items={state}/>
      </div>
    </Context.Provider>
  );
}

export default App;
