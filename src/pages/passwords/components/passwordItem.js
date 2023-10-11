import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

export default function PasswordItem({ password, removeData }){

  const [visible, setVisibile] = useState(false)

  return(
    <Pressable
      style={styles.areaItem}
      onLongPress={removeData}
    >
      <View
        style={styles.textArea}
      >
        <Text
          style={styles.textTitle}
        >
          Titulo da senha
        </Text>
        <Text
          style={styles.textItem}
        >
          {
            visible ?
            password :
            '*'.repeat(password.length)
          }
        </Text>
        <Text style={styles.textDate}>Salvo em: 10/20/2022</Text>
      </View>

      <View style={{flexDirection: 'row', gap: 15, marginRight: 5, }}>
        <TouchableOpacity
          style={{ }}
          activeOpacity={0.7}
          // onPress={ () => setVisibile(!visible) }
        >
          <Feather name='copy' size={20} color='#777'/>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ }}
          activeOpacity={0.7}
          onPress={ () => setVisibile(!visible) }
        >
          <Feather name={visible ? 'eye-off' : 'eye'} size={20} color='#777'/>
        </TouchableOpacity>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  areaItem: {
    backgroundColor: '#FFF',
    padding: 14,
    width: '100%',
    marginBottom: 14,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textTitle:{
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  textItem:{
    fontSize: 18,
    color: '#344de9',
    paddingTop: 10,
  },
  textDate:{
    fontSize: 11,
    marginTop: 10,
  },
})