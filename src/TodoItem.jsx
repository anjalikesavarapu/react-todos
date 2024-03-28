import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon  from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';

export default function TodoItem({todo, removeTodo, toggle}) {
  const labelId = `checkbox-list-label-${todo.id}`;
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="comments" onClick={removeTodo}>
          <DeleteIcon />
          <EditNoteIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={todo.isCompleted}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
            onChange={toggle}
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={todo.text} />
      </ListItemButton>
    </ListItem>
  );
}