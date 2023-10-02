import AppRoutes from "./app.routes"
import AuthRoutes from "./auth.routes"


export default function Routes(){
  
  const isAuthenticated = false
  
  return(
    isAuthenticated ? <AppRoutes/> : <AuthRoutes/>
  )
}