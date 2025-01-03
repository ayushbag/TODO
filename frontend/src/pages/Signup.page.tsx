import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Error from "../components/Error";

const Signup = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [ error, setError ] = useState(false) 

  let navigate = useNavigate()

  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handleOnChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleOnClick = async (e: any) => {
    e.preventDefault()
    try {
      const response = await axios.post(`http://localhost:8000/user/signup`, { email, password })
      if (!response) {
        console.log("Error While Signup")  
      } 
      alert("Signup Succeeded!")
      navigate("/login")
    } catch (error) {
      console.log("Error While Signup")
      setError(true)
    }
  }
  
  return (
    <>
      <div onClick={() => setError(false)} className="absolute top-0">
      {error && <Error />}
      </div>
      <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Signup
        </h2>
        <form>
        <div className="mb-4">
          <label className="block text-gray-400 mb-2" htmlFor="email">
          Email
          </label>
          <input
          type="email"
          id="email"
          name="email"
          className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleOnChangeEmail}
          value={email}
          required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-400 mb-2" htmlFor="password">
          Password
          </label>
          <input
          type="password"
          id="password"
          name="password"
          className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={handleOnChangePassword}
          required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition duration-300"
          onClick={handleOnClick}
        >
          Register
        </button>
        </form>
        <div className="text-sm text-center pt-3 text-gray-400">
        Already have an account?&nbsp;
        <Link to="/login" className="underline text-gray-50">
          Login
        </Link>
        </div>
      </div>
      </div>
    </>
  );
};

export default Signup;
