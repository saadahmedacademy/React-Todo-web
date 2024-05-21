import { useState, useEffect } from 'react';
import './App.css';
import Navber from './components/Navber';
import Swal from 'sweetalert2';
import { ImFilesEmpty } from "react-icons/im";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const getLocalItems = () =>{
  let saveTodoList = localStorage.getItem("todos")
   if(saveTodoList){
    return JSON.parse(saveTodoList);
   }else{
    return [];
   }
}

function App(){
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(getLocalItems());
  const [showfinished,setShowFinished] = useState(false);


  function finishTaskList(){
    setShowFinished(!showfinished);
  }



  const addTodo = () => {
    if (todo === "") {
      toast.error("Please enter your todo!");
      return;
    }
    if (todos.some(t => t.todo === todo)) {
      toast.error("This todo already exists!");
      return;
    }
    const newTodos = [...todos, { id: uuidv4(), todo, isCompletes: false }];
    setTodos(newTodos);
    setTodo("");   

  };
  const editTodo = (e, id) => {
    if (todo !== "") {
      toast.error("Please clean input field before editing!");
      return;
    }
    const updateTodos = todos.find(i => i.id === id);
    const remainTodos = todos.filter(i => i.id!== id);
    setTodo(updateTodos.todo);
    setTodos(remainTodos);
    toast.info("Now you can edit your todo");
  
  };

  const deleteTodo = (index) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this task?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        const newTodos = todos.filter((_, i) => i!== index);
        setTodos(newTodos);
        toast.success('Task deleted successfully!');
 
      } else {
        toast.info('Task not deleted.');
      }
    });
  };

  const changeTodo = (e) => {
    setTodo(e.target.value);
  };

  
  const changeCheckbox = (e) => {
    if (e.target.checked) {
      toast.success("Task has done!");
      todos.isCompletes = true;
    } else {
      toast.info("Task is not completed yet!");
    }
    const todoId = e.target.name;
    const index = todos.findIndex(todoItem => todoItem.id === todoId);
    const newTodos = [...todos];
    newTodos[index].isCompletes =!newTodos[index].isCompletes;
    setTodos(newTodos);
    console.log(newTodos);

  };

  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


  return (
    <>
      <ToastContainer />
      <Navber />
      <main className="container background-image mx-auto p-6 rounded-lg my-5 w-full min-h-screen
        font-bold  bg-backimg shadow-lg" style={{ backgroundImage: "url('backimg.jpg')", backgroundSize: "cover" }}>
        <h2 className='text-2xl font-bold text-white text-center drop-shadow-lg'>Add Your Todo</h2>

        <div className="addTodo my-3 mx-auto sm:flex items-center justify-center block  gap-1">
          <input type="text" onChange={changeTodo} value={todo} className='sm:w-[80%] w-full  p-2 mt-2 rounded-lg text-center shadow-lg' placeholder='Enter Your Todo' />
          <button onClick={addTodo} type="submit" className='py-2 px-7 sm:w-[10%] w-full bg-pink-600 font-bold mt-2 text-white rounded-md'>Add</button>
        </div>

        <div className="">
          <h2 className='text-2xl font-bold text-center my-2 text-shadow text-white drop-shadow-lg'>Your Todos</h2>
        </div>
        <div className="todos sm:w-full w-auto mx-auto">

          <button onClick={finishTaskList}  className="py-2 px-7 bg-pink-600 font-bold text-white rounded-md">{showfinished ? "Show Finshed" : "Show All"}</button>

          {todos.length === 0 && <h3 className='text-2xl font-bold text-center my-[26vmin] bg-white p-5 w-[60vmin] rounded-lg mx-auto text-shadow text-pink-600 drop-shadow-lg'>No Task Available Right Now.<ImFilesEmpty className='mx-auto my-4 text-9xl' /></h3>}
          {todos.map((items, index) => {

            return (showfinished || items.isCompletes) && (
              <div key={index} className="todo block items-center gap-1 mx-auto my-3 shadow-lg bg-white rounded-lg p-3">
                <div className={items.isCompletes ? "line-through" : ""} style={{ fontFamily: "serif", fontSize: "20px", display: "flex", gap: '8px' }}>
                  <input type="checkbox" name={items.id} onChange={changeCheckbox} checked={items.isCompletes}/>
                  <div className=' sm:w-[75%] break-all w-auto .'><p>{items.todo}</p></div>
                </div>
                <div className="btn sm:w-[25%] flex flex-wrap justify-end ml-auto gap-2">
                  <button onClick={() => deleteTodo(index)} className='py-2 px-5 bg-pink-600 font-bold text-white rounded-md'>Delete</button>
                  <button onClick={(e) => editTodo(e, items.id)} className='py-2 px-5 bg-pink-600 font-bold text-white rounded-md'>Edit</button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default App;
