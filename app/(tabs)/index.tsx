import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, RefreshControl, Modal, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import HomePageCard from '@/components/homepage-card';
import { useRouter } from 'expo-router';
import { useUserStore } from '@/store/userStore';
import { fetchAllPostHandler } from '@/api-handlers/postHandler';
import { IPost } from '@/types/typePost';

const HomePage = () => {
    const router = useRouter();
    const userData = useUserStore((state) => state.userData);
    const [allPosts, setAllPosts] = useState<IPost[]>();
    const [refreshing, setRefreshing] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0, height: 0 });
    const menuButtonRef = useRef(null);

    useEffect(() => {
        const fetchAllPosts = async () => {
            const posts = await fetchAllPostHandler();
            setAllPosts(posts.allPosts);
        };
        fetchAllPosts();
    }, []);

    const handleRefresh = async () => {
        const posts = await fetchAllPostHandler();
        setAllPosts(posts.allPosts);
    };

    const handleOutsideClick = () => {
        if (menuVisible) {
            setMenuVisible(false);
        }
    };

    const handleMenuButtonLayout = (event) => {
        const { x, y, height } = event.nativeEvent.layout;
        setMenuPosition({ x, y, height });
    };

    return (
        <View style={styles.container}>
            <View style={styles.appbar}>
                <Text style={{ flex: 1, fontSize: 24, fontWeight: 'bold' }}>App Name</Text>
                <TouchableOpacity style={{ margin: 10 }} onPress={() => router.push("/create-post")}>
                    <MaterialIcons name="add" size={24} />
                </TouchableOpacity>
                <TouchableOpacity
                    ref={menuButtonRef}
                    style={{ margin: 0 }}
                    onPress={() => setMenuVisible(!menuVisible)}
                    onLayout={handleMenuButtonLayout}
                >
                    <MaterialIcons name="menu" size={24} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={allPosts}
                renderItem={({ item }: { item: IPost }) => {
                    return <HomePageCard postData={item} userData={userData} />;
                }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={["#1E90FF"]} />
                }
            />

            {menuVisible && (
                <Modal
                    visible={menuVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={handleOutsideClick}
                >
                    <TouchableWithoutFeedback onPress={handleOutsideClick}>
                        <View style={styles.overlay}>
                            <View
                                style={[
                                    styles.menuContainer,
                                    {
                                        top: menuPosition.y + menuPosition.height + 12, // Position below the button
                                        left: menuPosition.x - 48, // Align with the left of the button
                                    },
                                ]}
                            >
                                <TouchableOpacity
                                    style={styles.menuItem}
                                    onPress={() => {
                                        router.push('/settings');
                                        setMenuVisible(false);
                                    }}
                                >
                                    <Text style={styles.menuText}>Settings</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.menuItem}
                                    onPress={() => {
                                        useUserStore.getState().logoutUser();
                                        router.push('/login');
                                        setMenuVisible(false);
                                    }}
                                >
                                    <Text style={styles.menuText}>Logout</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            )}

        </View>
    );
};

export default HomePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 10,
    },
    overlay: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dimmed background
    },
    appbar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    menuContainer: {
        position: 'absolute',
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
