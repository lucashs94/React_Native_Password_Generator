import React, { useState } from 'react'
import { 
  ActivityIndicator,
  SafeAreaView, 
  StatusBar, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity 
} from 'react-native'

import { useNavigation } from '@react-navigation/native'
import useAuthContext from '../../../contexts/authContext'


export default function SignIn(){

  const { loadingAuth, AuthSignIn } = useAuthContext()

  const navigation = useNavigation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  async function handleLogin(){
    
    if(email !== '' && password !== ''){
      await AuthSignIn(email, password)
      setEmail('')
      setPassword('')
    }
  }


  return(
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'}/>

      <Text style={styles.title}>
        TELA LOGIN
      </Text>

      <TextInput 
        style={styles.input}
        placeholder='seu_email@email.com'
        placeholderTextColor={'#AAA'}
        value={email}
        onChangeText={setEmail}
        autoCapitalize='none'
        keyboardType='email-address'
      />

      <TextInput 
        style={styles.input}
        placeholder='***********'
        placeholderTextColor={'#AAA'}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCapitalize='none'
      />

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={handleLogin}
        disabled={loadingAuth}
      >
        {loadingAuth ? (
          <ActivityIndicator color='#FFF'/>
        ): 
        (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.forgotPass}
        onPress={ () => navigation.navigate('SignUp') }
      >
        <Text style={styles.forgotPassText}>Não tem uma conta? Clique aqui</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#392de9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontSize: 40,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 120,
  },
  input:{
    width: '80%',
    height: 50,
    borderRadius: 6,
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button:{
    width: '80%',
    height: 50,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#33b249'
  },
  buttonText:{
    fontSize: 22,
    color: '#FFF',
    fontWeight: 'bold',
  },
  forgotPass:{
    marginVertical: 40,
  },
  forgotPassText:{
    color: '#FFF',
    textDecorationLine: 'underline'
  },
})