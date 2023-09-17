import AsyncStorage from '@react-native-async-storage/async-storage'


const useStorage = () => {

  const getItem = async (key) => {
    try {
      const passwords = await AsyncStorage.getItem(key)
      return JSON.parse(passwords) || []

    } catch (error) {
      console.log(error)
      return []
    }
  }


  const saveItem = async (key, value) => {
    try {
      let passwords = await getItem(key)
      passwords.push(value)

      await AsyncStorage.setItem(key, JSON.stringify(passwords))

    } catch (error) {
      console.log(error)
    }
  }


  const removeItem = async (key, value) => {
    try {
      let passwords = await getItem(key)
      let newPasswords = passwords.filter( pass => pass !== value )

      await AsyncStorage.setItem(key, JSON.stringify(newPasswords))
      return newPasswords

    } catch (error) {
      console.log(error)
    }
  }


  return{
    getItem,
    saveItem,
    removeItem,
  }

}

export default useStorage