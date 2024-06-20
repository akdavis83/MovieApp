import { toast } from "react-toastify"
import { useAuth } from "../context/Auth"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () => {

  const {currentUser} = useAuth() 

  if(!currentUser) toast.error('Please Login First')

  return currentUser? <Outlet/>: <Navigate to="/login"/>
}

export default PrivateRoute