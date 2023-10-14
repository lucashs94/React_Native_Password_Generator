import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'


function getBottom(inte){
  const N = Number(inte) - 1
  const h = (20 + 60) + (N * 60) + 15
  return Number(h)
}


export default function FabItem({ iconName, order, isActive, title, page }){

  const { navigate } = useNavigation()

  return(
    <>
      <Text style={[styles.title, isActive && { bottom: getBottom(order) + 17 }]}>
        {title}
      </Text>
      
      <TouchableOpacity
        activeOpacity={0.6}
        style={[styles.fabItem, isActive && { bottom: getBottom(order) }]}
        onPress={ () => {
          navigate(page)
        } }
      >
        <Feather name={iconName} color='#FFF' size={20}/>
      </TouchableOpacity>

    </>
  )
}

const styles = StyleSheet.create({
  fabItem:{
    position: 'absolute',
    backgroundColor: '#aaa',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    right: 25,
    bottom: 20,
    zIndex: 99,
  },
  title:{
    position: 'absolute',
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    right: 90,

    // borderWidth:1,
    // borderColor: 'red',
  },
})