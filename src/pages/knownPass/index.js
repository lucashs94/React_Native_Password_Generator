import { useState } from 'react'
import { StatusBar, Modal, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import * as Clipboard from 'expo-clipboard'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import useToastNotify from '../../contexts/toastContext'
import useAuthContext from '../../contexts/authContext'
import ModalDelete from '../../components/modalDelete'
import CustomInput from '../../components/Input'
import useSupaDB from '../../hooks/useSupaDB'


export default function KnownPasswords() {

  const { newNotify } = useToastNotify()
  const { savePass } = useSupaDB()
  const { user } = useAuthContext()
  const { navigate } = useNavigation()

  const [passwordName, setPasswordName] = useState('')
  const [password, setPassword] = useState('')
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false)
  const [loading, setLoading] = useState(false)


  async function handleCopy(){
    await Clipboard.setStringAsync(password)

    newNotify({
      message: 'Senha copiada para a area de transferencia!',
      duration: 2000,
      show: true,
      iconName: 'info',
    })
  }


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
          onChangeText={setPassword}
          editable={true}
        />
      </View>


      <View style={styles.buttonOptionsArea}>

        <TouchableOpacity
          style={styles.optionsButton}
          activeOpacity={0.5}
          disabled={!password || !passwordName}
          onPress={handleCopy}
        >
          <Text style={styles.optionsButtonText}>
            Copiar senha
          </Text>
          <Feather name="copy" size={20} color="#FFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionsButton}
          activeOpacity={0.5}
          disabled={!password || !passwordName}
          onPress={ () => setModalDeleteVisible(true) }
        >
          <Text style={[styles.optionsButtonText, { color: '#FF5733' }]}>
            Excluir senha
          </Text>
          <Feather name="trash" size={20} color="#FF5733" />
        </TouchableOpacity>
        
      </View>


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
  buttonOptionsArea:{
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 20,
  },
  optionsButton:{
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#555',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,

    alignItems: 'center',
    justifyContent: 'center'
  },
  optionsButtonText:{
    color: '#FFF',
    fontWeight: 'bold',
    marginRight: 10,
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
