import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'


export default function CustomInput({ title, value, onChangeText, editable, ...rest }){
  return(
    
    <>
      <View style={styles.container}>

        <Text style={styles.title}>{title}</Text>

        <TextInput
          style={[
            styles.input, 
            { 
              backgroundColor: editable ? '#FFF' : '#bbb', 
            }
          ]}
          value={value}
          onChangeText={ onChangeText }
          {...rest}
        />

      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container:{
    width: '90%',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFF',
    width: '100%',
    height: 55,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 20,

    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
  },
  title:{
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
})