import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'


function getBottom(inte){
  const N = Number(inte) - 1
  const h = (20 + 60) + (N * 60) + 15
  return Number(h)
}


export default function FabItem({ iconName, order, isActive }){

  return(
    <>

      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.fabItem, isActive && { bottom: getBottom(order) }]}
        onPress={ () => {} }
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
})