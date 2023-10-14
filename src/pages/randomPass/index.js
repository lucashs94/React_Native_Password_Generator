import { useState } from 'react'
import { StatusBar, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as Clipboard from 'expo-clipboard'

import ModalPassword from '../../components/modalPassword'
import CustomInput from './Components/Input'

import { Feather } from '@expo/vector-icons'
import ModalDelete from '../../components/modalDelete'
import useToastNotify from '../../contexts/toastContext'


export default function Home() {

  const { newNotify } = useToastNotify()

  const [passwordName, setPasswordName] = useState('')
  const [password, setPassword] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false)


  function handleGeneratePassword(){

    setModalVisible(true)
  }


  async function handleCopy(){
    await Clipboard.setStringAsync(password)

    newNotify({
      message: 'Senha copiada para a area de transferencia!',
      duration: 2000,
      show: true,
      iconName: 'info',
    })
  }


  return (
    <View style={styles.container}>

      <StatusBar barStyle={'light-content'}/>

      <CustomInput
        title={'Titulo da senha'}
        value={passwordName}
        onChangeText={setPasswordName}
        editable={true}
      />

      <View 
        style={{ flexDirection: 'row' }}
      >
        <CustomInput
          title={'Senha'}
          value={password}
          editable={false}
          caretHidden={true}
        />

        <TouchableOpacity
          style={[styles.iconButton, { right: 50 } ]}   
          activeOpacity={0.5}
          disabled={!password}
          onPress={ handleCopy }
        >
          <Feather name="copy" size={20} color="#FFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.iconButton, { borderColor: '#FF5733' } ]}   
          activeOpacity={0.5}
          disabled={!password}
          onPress={ () => setModalDeleteVisible(true) }
        >
          <Feather name="trash" size={20} color="#FF5733" />
        </TouchableOpacity>
      </View>


      <TouchableOpacity
        style={[styles.button,]}
        activeOpacity={0.8}
        onPress={ handleGeneratePassword}
      >
        <Text style={styles.buttonText}>Gerar senha aleatória</Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={[
          styles.button, 
          { backgroundColor: (password && passwordName) ? 'green' : '#aaa' }
        ]}
        activeOpacity={0.7}
        disabled={ !passwordName || !password }
        // onPress={ handleGeneratePassword}
      >
        <Text style={styles.buttonText}>Salvar Senha</Text>
      </TouchableOpacity>



      <Modal 
        visible={modalVisible}
        animationType='fade'
        transparent={true}
      >
        <ModalPassword 
          setPassword={setPassword}
          handleClose={ () => setModalVisible(false) }
        />
      </Modal>


      <Modal
        animationType='fade'
        transparent={true}
        visible={modalDeleteVisible}
      >
        <View
          style={styles.modalContainer}
        />        
        <Modal
          visible={modalDeleteVisible}
          animationType='slide'
          
          transparent={true}
        >
          <ModalDelete
            handleClose={ () => setModalDeleteVisible(false) }
            setPasswordName={setPasswordName}
            setPassword={setPassword}
          />
        </Modal>  

      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3FF',
    alignItems: 'center',
    marginTop: 50,
  },
  iconButton:{ 
    position: 'absolute',
    right: 8,
    top: 35,
    alignItems: 'center', 
    justifyContent: 'center', 
    height: 35,
    width: 35,
    borderRadius: 8, 

    borderWidth:1,
    borderColor: '#FFF',
  },
  button:{
    backgroundColor: '#392de9',
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
    marginTop: 20,

    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.4,
  },
  buttonText:{
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
  modalContainer:{
    flex: 1,
    backgroundColor: 'rgba(100, 100, 100, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
