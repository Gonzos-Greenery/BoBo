import React from 'react'
import { View, ActivityIndicator } from 'react-native'

import styles, { PINK } from './styles'

export default () => (
  <View style={styles.centered}>
    <ActivityIndicator size={60} color={PINK} />
  </View>
)
