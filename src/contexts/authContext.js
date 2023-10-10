import { createContext, useContext, useEffect, useState } from 'react'

import useSupaDB from '../hooks/useSupaDB'
import useStorage from '../hooks/useStorage'
import AsyncStorage from '@react-native-async-storage/async-storage'


export const AuthContext = createContext({})

export function AuthProvider({ children }){

  const { signIn, signUp, signOut, createUser, getUser } = useSupaDB()
  const { saveUser, getUser: getLocalUser } = useStorage()

  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(false)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    
    const loadLocalUser = async () => {
      const user = await getLocalUser()
      
      if(user){
        setUser(user)
      }

      setLoading(false)
    }
    loadLocalUser()
    
  }, [])


  async function AuthSignUp(name, email, password){

    setLoadingAuth(true)

    const response = await signUp(name, email, password)
    
    if(response.error){
      setLoadingAuth(false)
      return response.error
    }

    const { error } = await createUser(response.data.user.id, name, email)
    if(error){
      setLoadingAuth(false)
      return error
    }

    setLoadingAuth(false)
  }


  async function AuthSignIn(email, password){

    setLoadingAuth(true)

    const response = await signIn(email, password)

    if(response.error){
      setLoadingAuth(false)
      return response.error
    }

    const supaUser = await getUser(response.data.user.id)

    if(supaUser.error){
      setLoadingAuth(false)
      return supaUser.error
    }

    setUser({
      id: response.data.user.id,
      name: supaUser.data[0].name,
      email: response.data.user.email
    })

    await saveUser({
      id: response.data.user.id,
      name: supaUser.data[0].name,
      email: response.data.user.email
    })
    
    setLoadingAuth(false)
  }


  async function AuthSignOut(){

    await signOut()
    await AsyncStorage.clear()
    setUser('')
  }


  return(
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loadingAuth,
        loading,
        setUser,
        AuthSignUp,
        AuthSignIn,
        AuthSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}


export default function useAuthContext(){
  return(
    useContext(AuthContext)
  )
}