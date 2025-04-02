import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'

const TabLayout = () => {
    return (
        <Tabs
        screenOptions={{
            headerStyle: {
              backgroundColor: "#000000",
            },
            headerShadowVisible: false,
            headerTintColor: "#fff",
            tabBarStyle: {
              backgroundColor: "#000000",
            },
          }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Homepage',
                    headerShown: false,
                    tabBarIcon: ({ color }) => ( <MaterialIcons name="home" size={24} color={color} /> )
                }}
            />

            <Tabs.Screen 
                name='campaigns'
                options={{
                    title: 'Campaigns',
                    headerShown: false,
                    tabBarIcon: ({ color }) => ( <MaterialIcons name="campaign" size={24} color={color} /> )
                }}
            />

            <Tabs.Screen 
                name='profile'
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color }) => ( <MaterialIcons name="person" size={24} color={color} /> )
                }}
            />
            
        </Tabs>
    )
}

export default TabLayout

const styles = StyleSheet.create({})