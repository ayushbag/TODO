import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login.page"
import Signup from "./pages/Signup.page"
import Home from "./pages/Home.page"


const App = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/" element={<Home />}/>
    </Routes>  
  )
}

export default App
