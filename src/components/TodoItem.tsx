import React, { useContext, Fragment } from 'react';
import { ListGroup, Button, InputGroup, FormControl } from 'react-bootstrap'
import { Context } from '../App';
import { Todo } from '../App.d';

const TodoItem: React.FC<{item: Todo}> = ({item}) => {
  const dispatch = useContext(Context) as any;
  return (
    <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
    <div className="mb-3"
      key={item.id}
      style={{
        display: 'flex',
        flexGrow: 1,
        marginRight: '10px',
      }}
    >

    <InputGroup.Prepend>
      <InputGroup.Checkbox
       onClick={() => dispatch({ type: 'toggle_complete', payload: item.id })} />
    </InputGroup.Prepend>
    <FormControl defaultValue={item.task} style={{
      textDecoration: item.completed ? 'line-through' : 'none'
    }} />
  
   
    
    </div>
    <Button variant="info" className="mb-3"
  
    onClick={() => dispatch({ type: 'delete', payload: item.id })}
  >
    Clear
  </Button>
  </div>
  );
};

export default TodoItem;



 /* <InputGroup>
    <InputGroup.Prepend>
      <InputGroup.Checkbox  onClick={() => dispatch({ type: 'toggle_complete', payload: item.id })} />
      <FormControl  aria-label="Text input with checkbox" >{item.task}</FormControl>
  
   </InputGroup.Prepend>
   </InputGroup> */