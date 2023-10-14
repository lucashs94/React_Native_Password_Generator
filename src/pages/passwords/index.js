import React, { useEffect, useState } from 'react'
import { FlatList, Image, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

import useStorage from '@hooks/useStorage'
import useToastNotify from '@contexts/toastContext'
import { themeApp } from '../../themes/GlobalTheme'

import PasswordItem from './components/passwordItem'
import FabItem from './components/FabItem'



export default function Passwords(){

  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const { getItem, removeItem } = useStorage()
  const { newNotify } = useToastNotify()

  const [listPass, setListPass] = useState([])
  const [isFabActive, setIsFabActive] = useState(false)


  useEffect(() =>{
    async function loadPasswords(){
      const passwords = await getItem('@pass#')
      setListPass(passwords)
    }
     
    loadPasswords()
    setIsFabActive(false)
    
  }, [isFocused])


  async function handleRemovePass(item){
    const pass = await removeItem('@pass#', item)
    setListPass(pass)
  }


  return(
    <>
      <SafeAreaView style={styles.statusBar} />
      <StatusBar barStyle={'light-content'}/>

      <View style={styles.container}>

        <View style={styles.header}>

          <TouchableOpacity
            style={styles.perfilIcon}
            onPress={ () => {} }
          >
            <Text style={styles.perfilIconText}>
              LS
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuIcon}
            onPress={() => navigation.openDrawer()}
          >
            <Feather name='menu' size={30} color='#FFF'/>
          </TouchableOpacity>
          
          <Image 
            style={styles.image}
            source={require('../../assets/logo.png')}
            resizeMode='contain'
          />

          <Text style={styles.title}>
            MINHAS SENHAS
          </Text>
          
        </View>

        <View style={styles.content}>
          <FlatList
            showsVerticalScrollIndicator={false}
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


      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.fabButton}
        onPress={ () => setIsFabActive(!isFabActive) }
      >
        {isFabActive ? 
          <Ionicons name="close" size={30} color="white" />
        :
          <Feather name="plus" size={30} color="white" />
        }
      </TouchableOpacity>

      
      {isFabActive && 
        <Pressable
          style={styles.fabArea}
          onPress={ () => setIsFabActive(false) }
        >
          <FabItem 
            iconName={'user'} 
            order={1} 
            isActive={isFabActive} 
            title={'Senha conhecida'}
            page={'knownPasswords'}
          />

          <FabItem 
            iconName={'lock'} 
            order={2} 
            isActive={isFabActive} 
            title={'Gerar senha aleatoria'}
            page={'randomPasswords'}
          />

        </Pressable>
      }
    </>
  )
}

const styles = StyleSheet.create({
  statusBar:{
    flex: 0, 
    backgroundColor: themeApp.colors.primary,
  },
  container: {
    flex: 1,
    backgroundColor: '#ddd',
  },
  image:{
    marginTop: -40,
    alignSelf: 'center',
    height: 60,
    aspectRatio: 1,
  },
  menuIcon:{
    position: 'absolute',
    top: -30,
    left: 15,
    width: 35,
  },
  perfilIcon:{
    position: 'absolute',
    backgroundColor: '#aaa',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    right: 20,
    top: -30,
    borderWidth: 1,
    borderColor: 'red',
  },
  perfilIconText:{
    fontWeight: 'bold',
    color: '#FFF',
  },
  header:{
    backgroundColor: themeApp.colors.primary,
    paddingBottom: 25,
    paddingHorizontal: 14,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,

    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
  },
  title:{
    alignSelf: 'center',
    paddingTop: 16,
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
  content:{
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 10
  },
  flatList:{
    flex:1,
    paddingTop: 14,
  },
  fabButton:{
    position: 'absolute',
    backgroundColor: themeApp.colors.primary,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    right: 20,
    bottom: 20,
    zIndex: 99,
  },
  fabButtonText:{
    color: '#FFF',
    fontSize: 50,
  },
  fabArea:{
    position: 'absolute',
    height: themeApp.sizes.window.height,
    width: themeApp.sizes.window.width,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
  },
})