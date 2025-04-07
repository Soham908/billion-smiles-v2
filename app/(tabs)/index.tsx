import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, RefreshControl, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import HomePageCard from '@/components/homepage-card';
import { Link, useRouter } from 'expo-router';
import { useUserStore } from '@/store/storeUser';
import { fetchAllPostHandler } from '@/api-handlers/postHandler';
import { IPost } from '@/types/typePost';

const HomePage = () => {
    const router = useRouter()
    const { userData } = useUserStore()
    const [allPosts, setAllPosts] = useState<IPost[]>()
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        const fetchAllPosts = async () => {
            const posts = await fetchAllPostHandler()
            console.log(posts)
            setAllPosts(posts.allPosts)
        }
        fetchAllPosts()
    }, [])

    const handleRefresh = async () => {
        const posts = await fetchAllPostHandler()
        console.log(posts)
        setAllPosts(posts.allPosts)
    }
    const [menuVisible, setMenuVisible] = useState(false);


    return (
        <View style={styles.container}>
            <View style={styles.appbar}>
                <Text style={{ flex: 1, fontSize: 24, fontWeight: 'bold' }}>Billion Smiles</Text>
                <TouchableOpacity style={{ margin: 10 }} onPress={() => router.push("/create-post")}>
                    <MaterialIcons name='add' size={24} />
                </TouchableOpacity>
                <TouchableOpacity style={{ margin: 0 }} onPress={() => setMenuVisible(true)} >
                    <MaterialIcons name='menu' size={24} />
                </TouchableOpacity>
                <Link href={'/signup'}>Signup</Link>
            </View>

            <FlatList
                data={allPosts}
                renderItem={({ item }: { item: IPost }) => {
                    return (
                        <HomePageCard postData={item} />
                    )
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={["#1E90FF"]}
                    />
                }
            />

{menuVisible && (
    <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/settings')}>
            <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => {
            // Handle logout logic
            useUserStore.getState().logout();
            router.push('/login');
        }}>
            <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
    </View>
)}


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
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dimmed background
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      },
    appbar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    menuContainer: {
        position: 'absolute',
        top: 50,
        right: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 100,
    },
    menuItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    menuText: {
        fontSize: 16,
        color: '#333',
    },
});
