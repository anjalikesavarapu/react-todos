import { ListItem, TextField } from "@mui/material"
import { useState } from "react"
import { Create } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Alert from '@mui/material/Alert';


export default function TodoForm({addTodo}){
  const [text, setText] = useState("");
  const [error, setError] = useState(false);
  const changeText = (evt) => {
    setText(evt.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(text.length){
      addTodo(text);
      setText("");
      setError(false);
    }
    else {
      setError(true);
    } 
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
        
        {error && <Alert severity="error">Please add some todo</Alert>}
        </form>
    </ListItem>
    
  )
}