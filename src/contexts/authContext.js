import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../services/api/supabaseService'


export const AuthContext = createContext({})

export function AuthProvider({ children }){

  const [user, setUser] = useState(null)
  const [loadingAuth, setLoadingAuth] = useState(false)


  useEffect(() => {
  }, [])


  async function AuthSignUp(name, email, password){
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options:{
        data:{
          name
        }
      }
    })
    .then(() => {

    })
    .catch( err => console.log(err) )

  }


  async function AuthSignIn(email, password){

    setLoadingAuth(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    .then( () => {

      // preencher USER
      // naviagte para appRoute

    })
    .catch( err => console.log(err))
    .finally( () => {
      setLoadingAuth(false)
    })
  }


  async function AuthSignOut(){

    const { error } = await supabase.auth.signOut()
    if(error) return error.message
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