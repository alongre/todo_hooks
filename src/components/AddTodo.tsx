import React, { useState, useContext, useRef, useEffect } from 'react';
import { Form, Button, FormControl } from 'react-bootstrap';
import { Context } from '../App';

const AddTodo = () => {
  const dispatch = useContext(Context) as any;
  const [task, setTask] = useState('');
  const buttonAdd = useRef<any>(null);
  const inputRef = useRef<any>(null);
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
  }, [task]);

  const addTask = (event: any) => {
    event.preventDefault();
    dispatch({ type: 'add', payload: task });
    inputRef!.current!.value = '';
    setTask('');
  };

  return (

<Form style={{
  width: '500px',
  marginLeft: '10px'
}}>
  <Form.Group controlId="formTodo">
    <Form.Label>Add a new Task</Form.Label>
    <Form.Control ref={inputRef} onChange={(e: any) => setTask(e.target.value)} type="text" placeholder="Enter your task" />
    <Form.Text className="text-muted">
      try to complete your tasks.
    </Form.Text>
  </Form.Group>
  <Button ref={buttonAdd} onClick={addTask} variant="primary" type="submit">
    Add
  </Button>
</Form>
  );
};

//     <div
//       style={{
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'flex-start'
//       }}
//     >
//       <label
//         style={{
//           marginLeft: '5px'
//         }}
//         htmlFor="newTodo"
//       >
//         Need to do:
//       </label>
//       <input
//         ref={inputRef}
//         style={{
//           marginLeft: '5px',
//           flexGrow: 0.7
//         }}
//         onChange={e => setTask(e.target.value)}
//         name="newTodo"
//       />
//       <button
//         ref={buttonAdd}
//         style={{
//           marginLeft: '5px'
//         }}
//         onClick={addTask}
//       >
//         Add
//       </button>
//     </div>
//   );
// };

export default AddTodo;
