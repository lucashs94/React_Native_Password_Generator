import React, { useEffect, useState } from 'react'
import { Dimensions, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import * as Clipboard from 'expo-clipboard'
import { formatRelative } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { decryptPassword } from '../../../utils/functions/hashPassword'
import { themeApp } from '../../../themes/GlobalTheme'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { useIsFocused } from '@react-navigation/native'

const {width} = Dimensions.get('window')
const threshold = -width * 0.3

export default function PasswordItem({ item, removeData, newNotify, openedCard, openCardCommand }){

  const isFocused = useIsFocused()

  const [visible, setVisibile] = useState(false)
  const dX = useSharedValue(0)
  

  useEffect(() => {

    const resetCardPosition = () => {
      dX.value = withTiming(0) //withSpring(0, { damping: 2, stiffness: 80 });
    }
    
    return () => resetCardPosition()

  }, [isFocused])


  useEffect(() => {
    dX.value = withSpring(0)
    
  }, [openedCard])
  
  
  async function handleCopy(){
    const pass = decrypt(item.hash_pass)
    await Clipboard.setStringAsync(pass)

    newNotify({
      message: 'Senha copiada para a area de transferencia!',
      duration: 2000,
      show: true,
      iconName: 'info',
    })
  }


  function decrypt(hashed){
    return decryptPassword(hashed)
  }


  function formatDate(date){

    return formatRelative(new Date(date), new Date(), { locale: ptBR })
  }


  const gestureHandler = useAnimatedGestureHandler({

    onStart: (_, context) => {
      context.lastPosition = dX.value

      runOnJS(openCardCommand)(item.id)

    },
    onActive: (e, context) => {

      if( e.translationX < 0 ){
        dX.value = e.translationX + context.lastPosition
        
      }else{
        if(dX.value !== 0){
          dX.value = e.translationX + context.lastPosition
        }
      }

    },
    onEnd: (e) => {

      if(e.translationX < 0){

        if(e.translationX < threshold){
          dX.value = withTiming(0)
  
        } else{
          dX.value = withTiming(threshold)
        }

      }else{
        dX.value = withTiming(0)
      }

    },
  })


  const itemStyle = useAnimatedStyle(() => {
    return{
      transform:[
        {
          translateX: dX.value
        }
      ]
    }
  })


  return(
    <PanGestureHandler 
      onGestureEvent={gestureHandler} 
      activeOffsetX={[-20, 5]}
    >
      
      <Animated.View style={itemStyle}>
        <Pressable
          style={styles.areaItem}
          // onLongPress={removeData}
          // onPress={() => console.log('teste')}
        >
          <View
            style={styles.textArea}
          >
            <Text
              style={styles.textTitle}
            >
              {item.describe}
            </Text>
            <Text
              style={styles.textItem}
            >
              {
                visible ?
                decrypt(item.hash_pass) :
                '*'.repeat(decrypt(item.hash_pass).length)
              }
            </Text>
            <Text style={styles.textDate}>
              {formatDate(item.created_at)}
            </Text>
          </View>

          <View style={{flexDirection: 'row', gap: 15, marginRight: 5, }}>
            <TouchableOpacity
              style={{ }}
              activeOpacity={0.7}
              onPress={ handleCopy }
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
      </Animated.View>
    </PanGestureHandler>
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
    justifyContent: 'space-between',

    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
  },
  textTitle:{
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  textItem:{
    fontSize: 18,
    color: themeApp.colors.primary,
    paddingTop: 10,
  },
  textDate:{
    fontSize: 11,
    marginTop: 10,
  },
})