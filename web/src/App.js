import './App.css';
import { useFormik } from "formik";
import { Grid } from '@mui/material';
import Item from '@mui/material/Grid'
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { useEffect, useState } from "react"
import {
  collection, addDoc, onSnapshot,
  query, serverTimestamp, orderBy, deleteDoc, updateDoc, doc
} from "firebase/firestore"
import { db } from './firebase'

const todoApp = collection(db, "todos")

const validationSchema = yup.object({
  todoItem: yup
    .string('add something todo')
    .required('required*'),
});

async function del(id) {
  await deleteDoc(doc(todoApp, id)

  );
}


function App() {
  const [todo, settodo] = useState([])

  useEffect(() => {
    const q = query(todoApp, orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {

      let todo = [];
      snapshot.forEach((doc) => {

        let id = doc.id;
        let data = doc.data();

        todo.unshift({
          id: id,
          todoItem: data.todoItem,

        });
      })
      settodo(todo)
    });

    return () => {
      unsubscribe()
      console.log("unsub")
    };
  }, []);

  const formik = useFormik({

    initialValues: {
      todoItem: ""
    },
    onSubmit: async (values) => {
      try {
        const docRef = await addDoc(todoApp, {
          timestamp: serverTimestamp(),
          todoItem: values.todoItem
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    validationSchema: validationSchema,
  });
  return (
    <div style={{ padding: "1rem" }} className="App">
      <h1 style={{ margin: "auto", padding: "1rem", textAlign: "center" }}>TODO APP</h1>
      <br />
      <form onSubmit={formik.handleSubmit}>
        <div id="in" >
          <Grid container spacing={1} sx={{ paddingLeft: "10%", paddingRight: "10%" }} >
            <Grid item xl={10} lg={10} xs={12} sm={12} md={10}  >
              <Item  >
                <Stack spacing={3}  >
                  <TextField
                    color="primary"
                    id="outlined-basic"
                    variant="standard"
                    placeholder="Enter text here"
                    name="todoItem"
                    inputProps={{
                      maxlength: 20
                    }}
                    value={formik.values.todoItem}
                    onChange={formik.handleChange}
                    error={formik.touched.todoItem && Boolean(formik.errors.todoItem)}
                    helperText={formik.touched.todoItem && formik.errors.todoItem}
                  />
                </Stack>
              </Item >
            </Grid>
            <Grid item xl={2} lg={2} xs={6} sm={6} md={2} >
              <Item>
                <Button sx={{ height: "40px", width: "100%", }} variant="contained"  color="primary" type="submit">Add</Button>
              </Item >
            </Grid>
          </Grid>
        </div>
      </form>

      <div >
        <br />
        <Grid container spacing={1} sx={{ paddingLeft: "10%", paddingRight: "10%" }}>
          <Grid item xl={12} lg={12} xs={12} sm={12} md={12} sx={{ textAlign: "left", margin: "auto" }}   >
            <Item   >
              <Stack spacing={1}  >
                {todo.map((eachTodo, i) => {
                  return (<div key={i}>
                    <ol>
                      <li style={{ fontSize: "24px" }}>
                        {eachTodo.todoItem}  <Button sx={{ background: "#ff0606", color: "black", width: "10%", fontSize: "11px" }} variant="contained" color="error" onClick={() => { del(eachTodo.id) }}>Delete Item </Button>
                        &nbsp;&nbsp;<Button sx={{ background: "yellow", color: "black", width: "10%", fontSize: "11px" }} variant="contained" color="secondary"
                          onClick={() => {}}>Edit Item </Button>
                        <hr />
                      </li>
                    </ol>
                  </div>)
                })}
              </Stack>
            </Item >
          </Grid>
        </Grid>
      </div>
    </div>
  );
}





export default App;