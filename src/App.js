import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import PrivateRoute from "./components/PrivateRoute"
import MovieDetails from "./pages/MovieDetails"

const App = () => {
  return (
    <>
    <Navbar/>
    <div className="container" style={{marginTop:'100px'}}>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/details/:id" element={<PrivateRoute/>}>
          <Route path="" element={<MovieDetails/>}/>
      </Route>
      <Route/>
    </Routes>

    </div>
    </>
  )
}

export default App