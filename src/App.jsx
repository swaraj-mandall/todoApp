import React, { useEffect, useRef, useState } from "react";
import Modal from 'react-modal';


const App = () => {
  const [todo, setTodo] = useState("");
  const [todoData, setTodoData] = useState([]);
  const [todoCompletedData, setTodoCompletedData] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState("");
  const [currentIndex, setCurrentIndex] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleAddTodo = () => {
    if (todo) {
      setTodoData([...todoData, todo]);
      setTodo("");
    } else {
      setTodoData(todo);
    }
  };

  const handleEditTodo = (index, item) => {
    setOpen(true);
    setCurrentIndex(index);
    setCurrentTodo(item);
  };

  const handleSaveEdit = (currentTodo) => {
    const updateEditItem = [...todoData];
    updateEditItem[currentIndex] = currentTodo;
    setTodoData(updateEditItem);
    setOpen(false);
  };

  const handleDeleteTodo = (index) => {
    console.log("handleDeleteTodo function called ......");
    console.log(index, "index value inside the handleDeleteTodo .....");
    const updatedTodo = [...todoData];
    console.log(updatedTodo, "updatedTodo....");
    updatedTodo.splice(index, 1);
    console.log(updatedTodo, "updatedTodo2222....");
    setTodoData(updatedTodo);
  };

  const handleCompletedTodo = (index) => {
    const completedData = todoData[index];

    const updatedTodo = [...todoData];
    updatedTodo.splice(index, 1);
    setTodoData(updatedTodo);
    setTodoCompletedData([...todoCompletedData, completedData]);
  };

  const handleClearHistory = () => {
    setTodoCompletedData([]);
  };

  return (
    <div style={{ background: 'lightBlue', height: '100vh', overflowY: 'scroll' }}>
      <h1 style={{ textAlign: "center", padding: '20px 0px' }}>TO-DO APP</h1>
      <hr />
      <div
        style={{
          padding: "0px 50px",
          display: "flex",
          gap: "20px",
          margin: "50px 0px",
        }}
      >
        <input
          placeholder="Enter here.."
          ref={inputRef}
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          style={{ minWidth: "80%", padding: "5px 10px" }}
        />
        <button
          style={{ width: "auto", padding: '0px 20px', background: 'black', color: 'white' }}
          disabled={!todo}
          onClick={handleAddTodo}
        >
          Add +
        </button>
      </div>
      <div style={{ padding: "0px 50px" }}>
        <h3>To-do List (Pending) :</h3>
        <div
          style={{
            border: "1px solid black",
            padding: "20px",
            borderRadius: "10px",
            background: 'white',
            marginTop: '10px',
            minHeight: '200px'
          }}
        >
          {todoData.length === 0 && (
            <div>
              <p style={{ color: "red", fontSize: '15px' }}>No Todo Data exits</p>
            </div>
          )}
          {todoData.length > 0 &&
            todoData.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: '10px'
                  }}
                >
                  <div style={{ display: "flex", gap: 10 }}>
                    <input
                      type="checkbox"
                      onClick={() => handleCompletedTodo(index)}
                    />
                    <p>{item}</p>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button style={{ background: 'green', color: 'white', padding: '4px 20px' }} onClick={() => handleEditTodo(index, item)}>
                      Edit
                    </button>
                    <button style={{ background: 'red', color: 'white', padding: '4px 15px' }} onClick={() => handleDeleteTodo(index)}>
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <div style={{ padding: "40px 50px" }}>
        <h3>To-do List (Completed) :</h3>
        <div
          style={{
            border: "1px solid black",
            padding: "20px",
            borderRadius: "10px",
            background: 'white',
            marginTop: '10px ',
            minHeight: '200px'
          }}
        >
          {todoCompletedData.length === 0 && (
            <p style={{ color: "red", fontSize: '15px' }}>No Todo Completed Data exists</p>
          )}
          {todoCompletedData.length > 0 &&
            todoCompletedData.map((itemComplete) => {
              return (
                <div style={{ padding: '10px 20px' }}>
                  <ul>
                    <li>
                      <p>{itemComplete}</p>
                    </li>
                  </ul>
                </div>
              );
            })}
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {todoCompletedData.length > 0 && (
              <button style={{ color: 'white', background: 'orange', padding: '5px 20px' }} onClick={handleClearHistory}>Clear</button>
            )}
          </div>
        </div>
      </div>
      <Modal
        isOpen={open}
        contentLabel="Example Modal"
        style={{
          content: {
            width: '30%',
            height: '40%',
            margin: 'auto',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <div style={{ height:'10%', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <h2 style={{ }}>Edit Todo</h2>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection:'column',
            justifyContent:'space-between',
            gap: 10,
            marginBottom: "20px",
            height:'90%',
            padding: '20px'
          }}
        >
          <input
            style={{ width: "100%",height:'50%', borderRadius: "5px", outline: "none", padding:'0px 10px' }}
            type="text"
            value={currentTodo}
            onChange={(e) => setCurrentTodo(e.target.value)}
          />
          <div
            style={{
              widows:'100%',
              display:'flex',
              justifyContent:'space-between',
              alignItems:'center',
           
            }}
          >
            <button style={{ background:'red', color:'white', padding: '5px 10px'}} onClick={() => setOpen(false)}>Cancel</button>
            <button disabled = {!currentTodo} style={{ background:'green', color:'white', padding: '5px 15px', opacity : currentTodo ? '1' : '0.5'}} onClick={() => handleSaveEdit(currentTodo)}>Save</button>
          </div>
        </div>
      </Modal>

      {/* {open && (
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "30%",
            background: "pink",
            border: "1px solid green",
            borderRadius: "10px",
            zIndex: 1000,
            padding: "10px 20px",
          }}
        >
          <p style={{ fontWeight: 900, fontSize: "20px" }}>Edit Todo</p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              marginBottom: "20px",
            }}
          >
            <input
              style={{ width: "200px", borderRadius: "5px", outline: "none" }}
              type="text"
              value={currentTodo}
              onChange={(e) => setCurrentTodo(e.target.value)}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button onClick={() => setOpen(false)}>Cancel</button>
              <button onClick={() => handleSaveEdit(currentTodo)}>Save</button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default App;
