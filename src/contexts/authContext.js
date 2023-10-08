import { createContext, useContext, useEffect, useState } from 'react'

import useSupaDB from '../hooks/useSupaDB'


export const AuthContext = createContext({})

export function AuthProvider({ children }){

  const { signIn, signUp, signOut } = useSupaDB()

  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(false)


  useEffect(() => {
  }, [])


  async function AuthSignUp(name, email, password){

    setLoadingAuth(true)

    const response = await signUp(name, email, password)

    if(response.error){
      setLoadingAuth(false)
      return
    }
    
    setLoadingAuth(false)
    
  }


  async function AuthSignIn(email, password){

    setLoadingAuth(true)

    const response = await signIn(email, password)

    if(response.error){
      setLoadingAuth(false)
      return
    }
    
    setLoadingAuth(false)
  }


  async function AuthSignOut(){

    await signOut()
    setUser('')
  }


  return(
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loadingAuth,
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