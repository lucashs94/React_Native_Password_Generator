import useAuthContext from "../contexts/authContext"
import AppRoutes from "./app.routes"
import AuthRoutes from "./auth.routes"


export default function Routes(){

  const { signed } = useAuthContext()
  
  const isAuthenticated = signed
  
  return(
    isAuthenticated ? <AppRoutes/> : <AuthRoutes/>
  )
}