import List from '@mui/material/List';

import { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

//const initialTodos = [
//   {id:1, text:"Check cinc.py and API calls", isCompleted:false},
//   {id:2, text:"Plan the investements", isCompleted:false},
//   {id:3, text:"Read a book", isCompleted:true},
//   {id:4, text:"Do the art", isCompleted:false},
//   {id:5, text:"Finish the webdev bootcamp", isCompleted:false},
// ]

const getInitialData = () => {
  const data = JSON.parse(localStorage.getItem("todos"));
  if(!data) return [];
  else return data
}

export default function TodoList() {
  const [todos, setTodos] =  useState(getInitialData)

  useEffect(() =>{
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  const removeTodo = (id) => {
    setTodos(prevTodos => {
      return prevTodos.filter((t) => t.id !== id)
    })
  }

  const toggleTodo = (id) => {
    setTodos(prevTodos => {
      return prevTodos.map(todo =>{
        if(todo.id === id) {
          return {...todo, isCompleted:!todo.isCompleted}
        } else{
          return todo
        }
      })
    })
  }

  const addTodo = (text) => {
    setTodos((prevTodos) => {
      return[...prevTodos, {id:crypto.randomUUID(), text:text, isCompleted:false}]
    })
  }

  return(
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <h1>Todos</h1>
      {todos.map((todo) => (
        <TodoItem 
          todo={todo} 
          key={todo.id} 
          removeTodo={() => removeTodo(todo.id)} 
          toggle={() => toggleTodo(todo.id)}/>
      ))}
      <TodoForm addTodo={addTodo}/>
    </List>
  );
}
