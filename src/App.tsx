import { Routes, Route } from "react-router-dom"
import Login from "./auth/Login"
import Register from "./auth/Register"
import SharedComponent from "./components/SharedComponent"
import Article from "./pages/Article"
import Home from "./pages/Home"


function App() {
  return (
   <>
    <Routes>
      <Route path="/home"  element={<SharedComponent />}>
      <Route index  element={<Home />} />
      {/* <Route path="/register"  element={<Register />} />
      <Route path="/login"  element={<Login />} /> */}
      </Route>
    </Routes>
   </>
  )
}

export default App
