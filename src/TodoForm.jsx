import { ListItem, TextField } from "@mui/material"
import { useState } from "react"
import { Create } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";


export default function TodoForm({addTodo}){
  const [text, setText] = useState("");
  const changeText = (evt) => {
    setText(evt.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(text);
    setText("");
  }
  return(
    <ListItem >
      <form onSubmit={handleSubmit}>
      <TextField 
        id="outlined-basic" 
        label="Add Todo" 
        variant="outlined" 
        onChange={changeText}
        value={text}
        InputProps={{
          endAdornment:(
            <InputAdornment position="end">
            <IconButton
              aria-label="create todo"
              edge="end"
              type="submit"
            >
            <Create />
            </IconButton>
          </InputAdornment>
          )
        }}
        />
        </form>
    </ListItem>
    
  )
}