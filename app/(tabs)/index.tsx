import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import HomePageCard from '@/components/homepage-card';
import { Link, useRouter } from 'expo-router';
import { useUserStore } from '@/store/storeUser';

const HomePage = () => {
    const router = useRouter()
    const { userData } = useUserStore()
console.log(userData)
    return (
        <View style={styles.container}>
        <View style={styles.appbar}>
                <Text style={{ flex: 1, fontSize: 24, fontWeight: 'bold' }}>Billion Smiles</Text>
                <TouchableOpacity style={{ margin: 10 }} onPress={() => router.push("/create-post")}>
                    <MaterialIcons name='add' size={24} />
                </TouchableOpacity>
                <TouchableOpacity style={{ margin: 0 }}>
                    <MaterialIcons name='menu' size={24} />
                </TouchableOpacity>
                <Link href={'/signup'}>Signup</Link>
            </View>

            <FlatList
                data={[1, 2, 3, 4, 5, 6]}
                renderItem={() => {
                    return (
                        <HomePageCard />
                    )
                }}
            />

        </View>
    );
};

export default HomePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 10,
    },
    appbar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 10,
    },
});
