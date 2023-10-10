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
  

  const getUser = async (id) => {

    const { data, error } = await supabase
    .from('users')
    .select('name')
    .eq('id', id)

    return {data, error}
  }


  const createUser = async (id, name, email) => {

    const { data, error } = await supabase
    .from('users')
    .insert({ 
      id, 
      name,
      email,
    })
    .select()

    return {data,error}
  }


  const updateUser = async (id, name, email) => {
    
    const { data, error } = await supabase
    .from('users')
    .update({ 
      name,
      email,
    })
    .eq('id', id)
    .select()

    return {data, error}
  }


  return{
    signUp,
    signIn,
    signOut,
    getUser,
    createUser,
    updateUser,
  }

}

export default useSupaDB