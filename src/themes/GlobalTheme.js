import { Dimensions } from "react-native"

const {height, width} = Dimensions.get('window')

export const themeApp = {

  colors:{
    white: '#FFF',
    primary: '#344de9',
    primary_: '#214864',
    appBackgroundColor: '#ddd',
    perfilIcon_BG: '#aaa',
  },
  sizes:{
    window:{
      height,
      width,
    }
  },
  notifications:{
    colors:{
      success: '#4CAF50',
      warning: '#FD951f',
      error: '#FF5733',
      default: '#3A405B',
      // success: '#43D29E',
      // error: '#E91E63',
    },
  },
  
}