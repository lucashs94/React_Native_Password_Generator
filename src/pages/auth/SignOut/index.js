import { useEffect, useLayoutEffect } from 'react'
import useAuthContext from '../../../contexts/authContext'


export default function SignOut(){

  const { AuthSignOut } = useAuthContext()

  useLayoutEffect(()=>{

    AuthSignOut()
  }, [])

  return null
}