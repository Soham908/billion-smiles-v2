import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CampaignsPage = () => {
  return (
    <View style={styles.container} >
      <Text>CampaignsPage</Text>
    </View>
  )
}

export default CampaignsPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})