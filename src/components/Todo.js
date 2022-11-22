import React, { useState } from 'react';
import './Todo.css';
import db from '../firebase';
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
  TextField,
  Input,
  Avatar,
} from '@mui/material';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styled from '@emotion/styled';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 100,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 3,
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
  //hover transition effect

  const HoverEffect = styled(Avatar)`
    ${({ theme }) => `
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
  `}
  `;

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
              size='small'
              className='update__input'
            />
            <Button onClick={updateTodo} type='submit' size='small'>
              Update
            </Button>
          </form>
        </Box>
      </Modal>

      <List className='todo__list'>
        <ListItem>
          <ListItemText primary={props.todo.todo} />
          <Button
            onClick={(e) => setOpen(true)}
            variant='outlined'
            size='small'
            id='edit__btn'
          >
            Edit
          </Button>

          <HoverEffect>
            <DeleteForeverTwoToneIcon
              onClick={(event) =>
                db.collection('todos').doc(props.todo.id).delete()
              }
            />
          </HoverEffect>
        </ListItem>

        <Divider light={true} />
      </List>
    </>
  );
}

export default Todo;
