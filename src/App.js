import React, { useEffect, useState } from 'react';
import { Button, FormControl } from '@mui/material';
import TextField from '@mui/material/TextField';
import Todo from './components/Todo';
import './App.css';
//importing components
import firebase from 'firebase';
import db from './firebase';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState(' ');

  //when the app loads, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    //this code here.. fires when the app.js loads
    db.collection('todos')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const addTodo = (event) => {
    //this will fire off when we click the button
    event.preventDefault();

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // setTodos([...todos, input]);
    setInput(''); // clear the input field
  };

  return (
    <div className='App'>
      <h1 className='header'>📝 TODO APP 📝</h1>
      <form>
        <FormControl>
          <TextField
            label='✅Write a Todo'
            color='secondary'
            type='text'
            size='small'
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>

        <Button
          id='addTodo__btn'
          disabled={!input}
          variant='contained'
          color='secondary'
          type='submit'
          onClick={addTodo}
        >
          Add Todo
        </Button>
      </form>
      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
