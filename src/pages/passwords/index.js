import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useIsFocused } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'


import useStorage from '../../hooks/useStorage'
import PasswordItem from './components/passwordItem'

export default function Passwords(){

  const [listPass, setListPass] = useState([])
  const isFocused = useIsFocused()
  const { getItem, removeItem } = useStorage()

  useEffect(() =>{
    async function loadPasswords(){
      const passwords = await getItem('@pass#')
      setListPass(passwords)
    }
     
    loadPasswords()
  }, [isFocused])


  async function handleRemovePass(item){
    const pass = await removeItem('@pass#', item)
    setListPass(pass)
  }


  return(
    <>
      <SafeAreaView style={styles.statusBar} />
      <StatusBar style='light'/>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>MINHAS  SENHAS</Text>
        </View>
 
        <View style={styles.content}>
          <FlatList
            style={styles.flatList}
            data={listPass}
            keyExtractor={ item => String(item) }
            renderItem={ ({ item }) => (
              <PasswordItem 
                password={item} 
                removeData={ () => handleRemovePass(item) }
              />
            )}
          />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  statusBar:{
    flex: 0, 
    backgroundColor: '#392de9',
    height: 50,
  },
  container: {
    flex: 1,
  },
  header:{
    backgroundColor: '#392de9',
    paddingTop: 18,
    paddingBottom: 14,
    paddingHorizontal: 14,
  },
  title:{
    fontSize: 28,
    color: '#FFF',
    fontWeight: 'bold',
  },
  content:{
    flex: 1,
    paddingHorizontal: 14,
  },
  flatList:{
    flex:1,
    paddingTop: 14,
  },
})