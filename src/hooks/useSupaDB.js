import { supabase } from '../services/api/supabaseService'


const useSupaDB = () => {


  const signUp = async (name, email, password) => {
  
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options:{
        data:{
          name,
        }
      }
    })

    return {data, error}
  }


  const signIn = async (email, password) => {

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    return {data, error}
  }  


  const signOut = async () => {

    const { error } = await supabase.auth.signOut()

    return {error}
  }  
  

  const createUser = async (id, name, email) => {

    const { error } = await supabase
    .from('users')
    .insert({ 
      id, 
      name,
      email,
    })

    if(error){
      return error.message
    }
  }


  const updateUser = async (id, name, email) => {
    
    const { error } = await supabase
    .from('users')
    .update({ 
      name,
      email,
    })
    .eq('id', id)

    if(error){
      return error.message
    }
  }


  return{
    signUp,
    signIn,
    signOut,
    createUser,
    updateUser,
  }

}

export default useSupaDB