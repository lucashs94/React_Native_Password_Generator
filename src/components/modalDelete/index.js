import React, { useState } from 'react'
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import useToastNotify from '../../contexts/toastContext'


export default function ModalDelete({ handleClose, setPassword, setPasswordName }){

  const { newNotify } = useToastNotify()

  function handleDelete(){
    setPassword('')
    setPasswordName('')
    handleClose()

    newNotify({
      type: 'error',
      message: 'Senha excluída com sucesso!',
      duration: 3000,
      show: true,
      iconName: 'trash',
    })
  }


  return(

    <View style={styles.content}>

      <Text style={styles.closeText}>
        Deseja realmente excluir a senha?
      </Text>

      <Pressable
        style={styles.closeButton}
        onPress={handleClose}
      >
        <Ionicons name="close" size={30} color="black" />
      </Pressable>

      <View style={styles.useArea}>
        <Text style={styles.auxText}>
          Ao confirmar essa ação, não será possivel desfazer.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={ handleDelete }
      >
        <Text style={styles.buttonText}>Excluir senha</Text>
        <Feather name="trash" size={20} color="#FF5733" />
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  content:{
    position: 'absolute',
    backgroundColor: '#FFF',
    width: '100%',
    borderRadius: 20,
    paddingVertical: 35,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    bottom: 0,
  },
  useArea:{
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: '90%',
    height: 50,
    paddingHorizontal: 15,
    alignItems: 'flex-start',
    justifyContent: 'center',

    marginTop: 30,
    borderRadius: 6,
  },
  closeText:{
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 30,
  },
  closeButton:{
    position: 'absolute',
    top: 30,
    right: 0,
    borderRadius: 100,
    backgroundColor: '#ddd',
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: -10,
  },
  button:{
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 6,
    width: '90%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    paddingHorizontal: 25,
    marginVertical: 12,

    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonText:{
    color: '#FF5733',
    fontWeight: 'bold',
    fontSize: 16,
  },
  auxText:{
    color: '#000',
  },
})