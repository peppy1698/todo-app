import React, { useState } from 'react';
import './Todo.css';
import db from '../firebase';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Button,
} from '@mui/material';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Todo(props) {
  //modal
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [input, setInput] = useState('');

  //update todo
  const updateTodo = () => {
    db.collection('todos').doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
    setInput('');
  };

  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Editing Todo
          </Typography>
          <form>
            <input
              placeholder={props.todo.todo}
              type='text'
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button onClick={updateTodo} type='submit'>
              Update Todo
            </Button>
          </form>
        </Box>
      </Modal>

      <List className='todo__list'>
        <ListItem>
          <ListItemAvatar></ListItemAvatar>
          <ListItemText primary={props.todo.todo} secondary='Deadline⏰' />
        </ListItem>
        <Button onClick={(e) => setOpen(true)}>Edit</Button>
        <DeleteForeverTwoToneIcon
          onClick={(event) =>
            db.collection('todos').doc(props.todo.id).delete()
          }
        />
      </List>
    </>
  );
}

export default Todo;
