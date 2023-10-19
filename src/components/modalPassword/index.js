import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import Slider from '@react-native-community/slider'
import { Ionicons } from '@expo/vector-icons';

import { getRandomPass } from '../../utils/functions/randomPassword'


export default function ModalPassword({ setPassword, handleClose }){

  const isFocused = useIsFocused()

  const [size, setSize] = useState(8)
  const [tempPass, setTempPass] = useState('')


  useEffect(() => {
    if(isFocused){
      handleGeneratePassword()
    }
  },[isFocused])


  function handleGeneratePassword(){

    const pass = getRandomPass(size)
    setTempPass(pass)
  }
   

  async function handleCopytoClipboard(){
    
    await Clipboard.setStringAsync(password)
    alert('senha salva com sucesso')
  }


  async function handleSavePassword(){
    
    setPassword(tempPass)
    handleClose()
  }


  return(
    <View style={styles.container}>

      <View style={styles.content}>

        <Pressable 
          style={styles.closeButton}
          onPress={handleClose}
        >
          <Ionicons name="close" size={30} color="black" />
        </Pressable>

        <Text style={styles.title}>
          Senha Gerada 
        </Text>

        <Pressable 
          style={styles.passwordArea}
          onLongPress={ handleCopytoClipboard }
        >
          <Text style={styles.passwordText}>
            {tempPass}
          </Text>
        </Pressable>

        <View style={styles.areaSlider}>
          <Slider 
            style={styles.slider}
            minimumValue={8}
            maximumValue={20}
            maximumTrackTintColor='#ff0000'
            thumbTintColor='#392de9'
            value={size}
            onValueChange={ (value) => {
              setSize(value.toFixed(0))
              handleGeneratePassword()
            }}
          />
        </View>

        <Text style={styles.charLegendText}>{size} caracteres</Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={ handleSavePassword }
        >
          <Text style={styles.buttonText}>Confirmar Senha</Text>
        </TouchableOpacity>


      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(100, 100, 100, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content:{
    position: 'absolute',
    backgroundColor: '#FFF',
    width: '90%',
    borderRadius: 6,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
    top: 150,
  },
  closeButton:{
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: -10,
  },
  title:{
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 14, 
  },
  passwordArea:{
    backgroundColor: '#0e0e0e',
    width: '90%',
    height: 57,
    padding: 16,
    borderRadius: 8,
    alignItems:'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  passwordText:{
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
  },


  charLegendText:{
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 20,
  },
  areaSlider:{
    marginTop: 30,
    width: '90%',
    backgroundColor: '#ccc',
    borderRadius: 8,
    padding: 8,
  },
  slider:{
    height: 50,
  },
  button:{
    backgroundColor: '#392de9',
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    marginVertical: 12,
  },
  buttonText:{
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
})