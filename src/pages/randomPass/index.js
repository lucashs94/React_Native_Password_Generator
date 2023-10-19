import { useState } from 'react'
import { StatusBar, Modal, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as Clipboard from 'expo-clipboard'
import { Feather } from '@expo/vector-icons'

import useAuthContext from '../../contexts/authContext'
import useToastNotify from '../../contexts/toastContext'
import useSupaDB from '../../hooks/useSupaDB'
import ModalPassword from '../../components/modalPassword'
import ModalDelete from '../../components/modalDelete'
import CustomInput from '../../components/Input'



export default function RandomPasswords() {

  const { newNotify } = useToastNotify()
  const { savePass } = useSupaDB()
  const { user } = useAuthContext()
  const { navigate } = useNavigation()

  const [passwordName, setPasswordName] = useState('')
  const [password, setPassword] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false)
  const [loading, setLoading] = useState(false)


  async function savePasswordToDB(){

    setLoading(true)

    const { error } = await savePass(user?.id, passwordName, password)

    newNotify({
      type: 'success',
      message: 'Senha salva com sucesso!',
      duration: 2000,
      show: true,
      iconName: 'lock',
    })

    setLoading(false)
    navigate('passwords')
  }


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
        onPress={ savePasswordToDB }
      >
        {loading ? 
          <Text style={styles.buttonText}>
            <ActivityIndicator size={'small'} color={'#FFF'} style={{marginRight:20}}/>
            Salvando...
          </Text>
          : 
          <Text style={[
            styles.buttonText,  
            { color: ( !password || !passwordName) ? '#ccc' : '#FFF' }
          ]}>
            Salvar Senha
          </Text>
        }
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
    backgroundColor: '#ddd',
    alignItems: 'center',
    paddingTop: 50,
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
})
