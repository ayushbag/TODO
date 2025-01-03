import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handleOnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signin`, {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("authorization", token);
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;

      alert("Login Successful!");
      navigate("/")
    } catch (error: any) {
      console.error("Error is:", error.response?.data || error.message);

      if (error.response?.status === 401) {
        alert("Invalid credentials! Please try again.");
      } else {
        alert("An error occurred. Please try again later.");
      }
    } 
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Login
          </h2>
          <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-400 mb-2" htmlFor="email">
            Email
          </label>
          <input
            name="email"
            type="email"
            id="email"
            value={email}
            onChange={handleOnChangeEmail}
            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-400 mb-2" htmlFor="password">
            Password
          </label>
          <input
            name="password"
            type="password"
            id="password"
            value={password}
            onChange={handleOnChangePassword}
            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
          </form>
          <div>
        <div className="text-sm text-center pt-3 text-gray-400">
          Don't have an account?&nbsp;
          <Link to="/signup" className="underline text-gray-50">
            Signup
          </Link>
        </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
