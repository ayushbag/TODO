import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Todo } from "../types/todo.types";

const Home = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState("");
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function getAllTodos() {
      try {
        const token = localStorage.getItem("authorization");
        if (!token) {
          alert("No Token Found!");
          navigate("/login");
          return;
        }
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/todos`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllTodos(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Something went wrong!", error);
      }
    }

    getAllTodos();
  }, [todo]);

  async function createTodo(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authorization");
      if (!token) {
        alert("No token found");
        navigate("/login");
        return;
      }

      if (!todo.trim()) {
        alert("Todo cannot be empty!");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/todos`,
        {
          title: todo,
          completed: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAllTodos((prevTodos) => [...prevTodos, response.data]);
      setTodo("");
    } catch (error) {
      console.log("Failed to create todo:", error);
    }
  }

  async function deleteTodo(todoId: string) {
    try {
      const token = localStorage.getItem("authorization");
      if (!token) {
        alert("No Token!");
        navigate("/login");
        return;
      }

      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/todos/${todoId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAllTodos((prevTodos) =>
        prevTodos.filter((todo) => todo._id !== todoId)
      );
    } catch (error) {
      console.log("Failed to delete Todo", error);
    }
  }

  async function handleStatus(todoId: string) {
    try {
      const token = localStorage.getItem("authorization");
      if (!token) {
        alert("No token");
        navigate("/login");
      }

      const todoToUpdate = allTodos.find((todo) => todo._id === todoId);
      if (!todoToUpdate) {
        console.error("Todo not found");
        return;
      }

      const updatedCompleted = !todoToUpdate.completed;

      setAllTodos((prevTodo) =>
        prevTodo.map((todo) =>
          todo._id === todoId
            ? {
                ...todo,
                completed: updatedCompleted,
              }
            : todo
        )
      );

      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/todos/status/${todoId}`,
        {
          completed: updatedCompleted,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log("Error while update", error);
    }
  }

  async function updateTodoTitle(todoId: string, updateTodo: string) {
    try {
      const token = localStorage.getItem("authorization");
      if (!token) {
        alert("No token found!");
        navigate("/login");
      }

      const todoToUpdate = allTodos.find((todo) => todo._id === todoId);

      if (!todoToUpdate) {
        console.log("todo doesn't exist!");
        return;
      }

      setAllTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === todoId ? { ...todo, title: updateTodo } : todo
        )
      );

      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/todos/title/${todoId}`,
        {
          title: updateTodo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log("error while updating title", error);
    }
  }

  function logout() {
    localStorage.removeItem("authorization");
    navigate("/login");
  }

  return (
    <>
      <div className="bg-gray-900 min-h-screen">
      <div className="max-w-2xl pt-12 mx-auto text-white p-4">
        <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Todo App</h1>
        <button
          onClick={logout}
          className="p-2 bg-red-600 text-sm rounded hover:bg-red-700"
        >
          Logout
        </button>
        </div>
        <form onSubmit={createTodo} className="mb-4">
        <input
          name="todo"
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a new task"
        />
        <button
          type="submit"
          className="mt-2 w-full p-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          Add Task
        </button>
        </form>
        <ul className="flex flex-col-reverse">
        {allTodos.map((todo) => (
          <li
          key={todo._id}
          className={`flex flex-col md:flex-row justify-between items-center bg-gray-800 px-5 py-2 md:py-4 gap-y-2 rounded mb-2`}
          >
          <div className="flex items-center gap-x-3 leading-4 mb-2 md:mb-0 w-full md:w-auto">
        <input
        type="checkbox"
        className="accent-blue-500"
        onChange={() => {
          handleStatus(todo._id);
        }}
        name="completed"
        id="completed"
        checked={todo.completed}
        />

        {editingTodoId === todo._id ? (
        <div className="flex flex-col md:flex-row items-center gap-x-2 w-full">
          <input
          type="text"
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          className="p-1 rounded bg-gray-700 border border-gray-600 focus:outline-none w-full md:w-auto"
          />
          <div className="flex pt-1 md:pt-0">
          <button
        onClick={() => {
        if (updatedTitle.trim()) {
          updateTodoTitle(todo._id, updatedTitle);
          setEditingTodoId(null);
          setUpdatedTitle("");
        } else {
          alert("Title cannot be empty!");
        }
        }}
        className="p-1 text-sm text-blue-600 rounded hover:bg-blue-700"
          >
        Save
          </button>
          <button
        onClick={() => {
        setEditingTodoId(null);
        setUpdatedTitle("");
        }}
        className="p-1 text-sm text-gray-300 rounded hover:bg-gray-700"
          >
        Cancel
          </button>
          </div>
        </div>
        ) : (
        <span
          className={`${
          todo.completed ? `line-through text-gray-500` : ``
          }`}
        >
          {todo.title}
        </span>
        )}
          </div>
          <div className="flex gap-2">
        <button
        onClick={() => {
          setEditingTodoId(todo._id);
          setUpdatedTitle(todo.title);
        }}
        className="px-4 py-1 text-sm bg-green-600 rounded hover:bg-green-700 text-white"
        >
        Edit
        </button>
        <button
        onClick={() => deleteTodo(todo._id)}
        className="px-4 py-1 text-sm bg-red-600 rounded hover:bg-red-700 text-white"
        >
        Delete
        </button>
          </div>
          </li>
        ))}
        </ul>
      </div>
      </div>
    </>
  );
};

export default Home;
