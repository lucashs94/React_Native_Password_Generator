import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

export default function PasswordItem({ password, removeData }){

  const [visible, setVisibile] = useState(false)

  return(
    <Pressable
      style={styles.areaItem}
      onLongPress={removeData}
    >
      <Text style={styles.textItem}>
        {visible ? password : '********'}
      </Text>

      <TouchableOpacity
        style={{ marginEnd: 10, }}
        activeOpacity={0.7}
        onPress={ () => setVisibile(!visible) }
      >
        <Feather name={visible ? 'eye' : 'eye-off'} size={20} color='#FFF'/>
      </TouchableOpacity>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  areaItem: {
    backgroundColor: '#0e0e0e',
    padding: 14,
    width: '100%',
    marginBottom: 14,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textItem:{
    color: '#FFF',
    fontWeight: 'bold',
  },
})