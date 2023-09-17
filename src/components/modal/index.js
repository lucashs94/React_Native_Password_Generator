import React from 'react'
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import * as Clipboard from 'expo-clipboard'

import useStorage from '../../hooks/useStorage'

export default function ModalPassword({ password, handleClose }){

  const { saveItem } = useStorage()
   

  async function handleCopytoClipboard(){
    
    await Clipboard.setStringAsync(password)
    alert('senha salva com sucesso')
  }

  async function handleSavePassword(){
    
    await saveItem('@pass#', password)
    handleClose()
  }


  return(
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          Senha Gerada 
        </Text>

        <Pressable 
          style={styles.passwordArea}
          onLongPress={ handleCopytoClipboard }
        >
          <Text style={styles.passwordText}>
            {password}
          </Text>
        </Pressable>

        <View style={styles.buttonArea}>
          <TouchableOpacity 
            activeOpacity={0.7}
            style={[styles.button, styles.buttonBack]}
            onPress={handleClose}
          >
            <Text style={[styles.buttonText, styles.buttonBackText]}>
              Voltar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            activeOpacity={0.7}
            style={[styles.button, styles.buttonSave]}
            onPress={handleSavePassword}
          >
            <Text style={[styles.buttonText, styles.buttonSaveText]}>
              Salvar
            </Text>
          </TouchableOpacity>
        </View>

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
    backgroundColor: '#FFF',
    width: '85%',
    borderRadius: 6,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24, 
  },
  passwordArea:{
    backgroundColor: '#0e0e0e',
    width: '80%',
    padding: 16,
    borderRadius: 8,
    alignItems:'center',
    justifyContent: 'center',
    marginVertical: 14,
  },
  passwordText:{
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
  },
  buttonArea:{
    flexDirection: 'row',
    width: '80%',
    gap: 6,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  button:{
    flex: 1,
    alignItems: 'center',
    marginVertical: 16 ,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonSave:{
    backgroundColor: '#392de9',
    paddingVertical: 12,
    paddingHorizontal: 6,
  },
  buttonBack:{
    borderWidth: 2,
    borderColor: 'red',
  },
  buttonText:{
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSaveText:{
    color: '#FFF',
  },
  buttonBackText:{
    color: 'red',
  },
})