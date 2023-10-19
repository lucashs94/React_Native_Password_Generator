import CryptoJS from "react-native-crypto-js"



const KEY = '1jv9WzvwKRc61pgz6HuMxvkQECetukwl'


const hashPassword = (password) => {

  try {
    const hashedPassword = CryptoJS.AES.encrypt(password, KEY).toString()
    return hashedPassword

  } catch (error) {
    throw new Error('Erro ao criar o hash da senha')
  }

}


const decryptPassword = (hashedPassword) => {

  try {

    const match = CryptoJS.AES.decrypt(hashedPassword, KEY).toString(CryptoJS.enc.Utf8)
    return match
    
  } catch (error) {
    throw new Error('Erro ao comparar a senha');
  }
}


export { hashPassword, decryptPassword };