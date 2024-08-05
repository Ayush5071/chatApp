import Home from "./pages/Home/Home"
import {SignUp}  from "./pages/signUp/SignUp.jsx"
import {Login} from "./pages/login/Login.jsx"
import { Route, Routes } from "react-router-dom"

function App() {

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </div>
  )
}

export default App
