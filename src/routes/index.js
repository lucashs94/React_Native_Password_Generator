import useAuthContext from "../contexts/authContext"
import AuthRoutes from "./auth.routes"
import { ActivityIndicator, View } from "react-native"
import { StatusBar } from "expo-status-bar"
import DrawerRoutes from "./drawer.routes"


export default function Routes(){

  const { signed, loading } = useAuthContext()
  
  const isAuthenticated = signed
  
  if(loading){
    return(
      <View style={{ 
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        backgroundColor: '#392de9' 
      }}>
        <StatusBar style="light"/>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    )
  }

  return(
    isAuthenticated ? <DrawerRoutes/> : <AuthRoutes/>
  )
}