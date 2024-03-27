import List from '@mui/material/List';

import { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

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

  const [todos, setTodos] =  useState(getInitialData);
  const [filter, setFilter] = useState("all");

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

  const handleFilter = (event) => {
    setFilter(event.target.value);
  }

  const filteredTodos = todos.filter(todo => {
    if(filter == "all") return true;
    if(filter == "completed") return todo.isCompleted;
    if(filter == "incomplete") return !todo.isCompleted;
    return true;
  })
  return(
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <h1>Todos</h1>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={filter}
          displayEmpty
          onChange={handleFilter}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value={"all"}><em>All</em></MenuItem>
          <MenuItem value={"completed"}>Completed</MenuItem>
          <MenuItem value={"incomplete"}>Incomplete</MenuItem>
        </Select>
      </FormControl>

      {filteredTodos.map((todo) => (
        <TodoItem 
          todo={todo} 
          key={todo.id} 
          removeTodo={() => removeTodo(todo.id)} 
          toggle={() => toggleTodo(todo.id)}
          />
      ))}
      <TodoForm addTodo={addTodo}/>
      
    </List>
  );
}
