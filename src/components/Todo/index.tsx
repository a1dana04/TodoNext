"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { RiEdit2Fill } from "react-icons/ri";

const Todo = () => {
  const [todoInput, setTodoInput] = useState("");
  const [todo, setTodo] = useState<Todo[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  interface Todo {
    _id: number;
    title: string;
  }

  useEffect(() => {
    getTodo();
  }, []);

  const editTodo = () => {
    if (editId !== null) {
      axios
        .patch(
          `https://api-v2.elchocrud.pro/api/v1/8060342b632588938265e90508ade194/todo4/${editId}`,
          { title: todoInput }
        )
        .then(() => {
          getTodo();
          setTodoInput(""); 
          setEditId(null); 
        });
    }
  };

  const editTodo1 = (id: number, title: string) => {
    setEditId(id); 
    setTodoInput(title); 
  };

  const deleteTodo = (id: number) => {
    axios.delete(
      `https://api-v2.elchocrud.pro/api/v1/8060342b632588938265e90508ade194/todo4/${id}`
    )
    .then(() => getTodo());
  };

  const getTodo = () => {
    axios
      .get(
        `https://api-v2.elchocrud.pro/api/v1/8060342b632588938265e90508ade194/todo4`
      )
      .then((res) => setTodo(res.data));
  };

  const addTodo = () => {
    if (!todoInput) return;
    let obj = {
      title: todoInput,
    };
    axios.post(
      `https://api-v2.elchocrud.pro/api/v1/8060342b632588938265e90508ade194/todo4`,
      obj
    )
    .then(() => {
      getTodo();
      setTodoInput(""); 
    });
  };

  return (
    <div className="container">
        <h1 className=" text-white text-3xl text-center pt-36 pb-10 font-bold">To Do List</h1>
      <div className="pb-20 flex items-center justify-center gap-5 ">
        <input
          onChange={(e) => setTodoInput(e.target.value)}
          className="w-96 h-10 bg-transparent border-2 rounded-sm outline-none pl-3 pt-2.5 placeholder:text-white"
          type="text"
          placeholder="text..."
          value={todoInput} 
        />
        <button 
          onClick={() => (editId !== null ? editTodo() : addTodo())}
          className="w-20 h-10 bg-sky-800 rounded-lg hover:bg-transparent border-2"
        >
          {editId !== null ? 'Update' : 'Add'}
        </button>
      </div>
      <div className="flex items-center justify-center flex-col gap-10">
        {todo.map((el) => (
          <div
            key={el._id}
            className="flex items-center gap-10 cursor-pointer "
          >
            <div className="flex w-96 h-10 bg-transparent border-2 rounded-lg pl-3 pt-2.5 ">
              <span className="text-white text-center">{el.title}</span>
            </div>

            <div className="flex gap-5 text-2xl">
              <span className="text-red-700" onClick={() => deleteTodo(el._id)}>
                <RiDeleteBin6Fill />
              </span>
              <span className="text-sky-500 hover:text-white" onClick={() => editTodo1(el._id, el.title)}>
                <RiEdit2Fill />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
