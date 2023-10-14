import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'

import { themeApp } from '../../themes/GlobalTheme'


export default function KnownPass(){
  return(
    <SafeAreaView style={styles.container}>
      <Text>
        SENHAS CONHECIDAS
      </Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeApp.colors.appBackgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
  }
})