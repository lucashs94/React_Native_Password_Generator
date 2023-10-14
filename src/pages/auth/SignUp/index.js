import React, { useState } from 'react'
import { 
  ActivityIndicator,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView, 
  StatusBar, 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View
} from 'react-native'

import { useNavigation } from '@react-navigation/native'
import useAuthContext from '../../../contexts/authContext'


export default function SignUp(){

  const { AuthSignUp, loadingAuth } = useAuthContext()

  const navigation = useNavigation()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  async function handleSignUp(){

    if(name !== '' && email !== '' && password !== ''){

      Keyboard.dismiss()
      
      const err = await AuthSignUp(name, email, password)

      if(err){
        console.log(err)
      }

      navigation.navigate('SignIn')
      setName('')
      setEmail('')
      setPassword('')
    }
  }


  return(
    <Pressable 
      style={styles.container}
      onPress={() => Keyboard.dismiss()}
    >

      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={'light-content'}/>
        
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ width: '100%', alignItems: 'center' }}
          keyboardVerticalOffset={40}
        >
          <Text style={styles.title}>
            TELA SIGNUP
          </Text>
      
          <TextInput
            style={styles.input}
            placeholder='Nome'
            placeholderTextColor={'#AAA'}
            value={name}
            onChangeText={setName}
            autoCapitalize='words'
          />
          <TextInput
            style={styles.input}
            placeholder='seuemail@email.com'
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
            onPress={handleSignUp}
            disabled={loadingAuth}
          >
            {loadingAuth ? (
              <ActivityIndicator color='#FFF'/>
            ):
            (
              <Text style={styles.buttonText}>Cadastrar</Text>
            )}
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <TouchableOpacity
          style={styles.forgotPass}
          onPress={ () => navigation.navigate('SignIn') }
        >
          <Text style={styles.forgotPassText}>Já tem uma conta? Faça Login</Text>
        </TouchableOpacity>

      </SafeAreaView>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#392de9',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
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