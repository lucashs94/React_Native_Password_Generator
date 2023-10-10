import { useState } from 'react';
import { StatusBar, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Slider from '@react-native-community/slider'
import ModalPassword from '../../components/modal';

let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

export default function Home() {

  const [size, setSize] = useState(8)
  const [password, setPassword] = useState('')
  const [modalVisible, setModalVisible] = useState(false )

  function handleGeneratePassword(){

    let pass = ''
    for(let i = 0, n = charset.length; i < size; i++){
      pass += charset.charAt(Math.floor(Math.random() * n))
    }

    setPassword(pass)
    setModalVisible(true)
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'}/>
      <Image 
        source={require('../../assets/logo.png')}
        style={styles.logo}
      />

      <Text style={styles.title}>{size} caracteres</Text>

      <View style={styles.areaSlider}>
        <Slider 
          style={styles.slider}
          minimumValue={6}
          maximumValue={20}
          maximumTrackTintColor='#ff0000'
          thumbTintColor='#392de9'
          value={size}
          onValueChange={ (value) => setSize(value.toFixed(0)) }
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={ handleGeneratePassword}
      >
        <Text style={styles.buttonText}>Gerar Senha</Text>
      </TouchableOpacity>

      <Modal 
        visible={modalVisible}
        animationType='fade'
        transparent={true}
      >
        <ModalPassword 
          password={password} 
          handleClose={ () => setModalVisible(false) }
        />
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    marginBottom: 60,
  },
  title:{
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  areaSlider:{
    marginVertical: 14,
    width: '70%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 8,
  },
  slider:{
    height: 50,
  },
  button:{
    backgroundColor: '#392de9',
    borderRadius: 8,
    width: '70%',
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
});
