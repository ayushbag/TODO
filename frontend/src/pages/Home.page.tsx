import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Todo } from "../types/todo.types";

const Home = () => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState("");

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
        const response = await axios.get("http://localhost:8000/todos", {
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
    e.preventDefault()
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
        "http://localhost:8000/todos",
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

      setAllTodos((prevTodos): any => [...prevTodos, response.data]);
      setTodo("");
    } catch (error) {
      console.log("Failed to create todo:", error);
    }
  }

  async function deleteTodo(todoId: string) {
    try {
        const token = localStorage.getItem('authorization')
        if (!token) {
            alert("No Token!")
            navigate("/login")
            return;
        }

        await axios.delete(`http://localhost:8000/todos/${todoId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        setAllTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== todoId))

    } catch (error) {
        console.log("Failed to delete Todo", error);
    }
  }

  function logout() {
    localStorage.removeItem('authorization')
    navigate("/login")
  }

  return (
    <div className="bg-gray-900">
      <div className="max-w-2xl pt-12 mx-auto min-h-screen text-white p-4">
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
              className="flex justify-between items-center p-2 bg-gray-800 rounded mb-2"
            >
              <span>
                {todo.title} &nbsp;
                {todo.completed ? (
                  <div className="text-xs pt-3">(Completed)</div>
                ) : (
                  <div className="text-xs pt-3">(Pending)</div>
                )}
              </span>
              <div>
                <button

                    className="mr-2 text-green-500 hover:text-green-400
                ">
                  Edit
                </button>
                <button 
                    onClick={() => deleteTodo(todo._id)}
                    className="text-red-500 hover:text-red-400
                ">
                  Delete
                </button>
              </div>
            </li>
          ))}
          {/* /* More tasks will be rendered here */}
        </ul>
      </div>
    </div>
  );
};

export default Home;
