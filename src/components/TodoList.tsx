import map from 'lodash/map';
import React from 'react';
import {ListGroup} from 'react-bootstrap'
import TodoItem from './TodoItem';
import {Todo} from '../App.d';

const TodoList : React.FC < {
  items: Todo[]
} > = ({items}) => {
  return (
    <ListGroup
      style={{
      marginTop: '10px',
      width: '500px',
      marginLeft: '10px'
    }}>
      {map(items, (item : Todo, index: number) => (<TodoItem item={item} key={index}/>))}
    </ListGroup>
  );
};

export default TodoList;
