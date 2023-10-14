import { createContext, useContext, useState } from 'react'


export const ToastContext = createContext({})

export function ToastContextProvider({ children }){

  const initial_state = {
    type: null,
    message: null,
    duration: 4000,
    show: false,
    iconName: null,
  }

  const [notify, setNotify] = useState(initial_state)


  function newNotify(toast){

    setNotify({
      type: toast.type || 'default',
      message: toast.message || '',
      duration: toast.duration || 4000,
      show: true,
      iconName: toast.iconName,
    })
  }

  function hideNotify(){
    setNotify( () => initial_state)
  }


  return(
    <ToastContext.Provider
      value={{
        notify,
        setNotify,
        newNotify,
        hideNotify,
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}


export default function useToastNotify(){
  return(
    useContext(ToastContext)
  )
}