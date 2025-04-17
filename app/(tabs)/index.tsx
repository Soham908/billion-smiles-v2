import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, RefreshControl, LayoutChangeEvent } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import HomePageCard from '@/components/homepage-card';
import { useRouter } from 'expo-router';
import { useUserStore } from '@/store/userStore';
import { fetchAllPostHandler } from '@/api-handlers/postHandler';
import { IPost } from '@/types/typePost';
import { useSheetStore } from '@/store/sheetStore';
import CommentSheet from '@/components/comment-sheet';
import { usePostStore } from '@/store/postStore';
import HeaderMenu from '@/components/header-menu';

const HomePage = () => {
    const router = useRouter();
    const userData = useUserStore((state) => state.userData);
    const [refreshing, setRefreshing] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0, height: 0 });
    const menuButtonRef = useRef(null);
    const { isCommentsOpen } = useSheetStore()
    const { allPosts, setAllPosts } = usePostStore()

    useEffect(() => {
        const fetchAllPosts = async () => {
            const posts = await fetchAllPostHandler();
            if (posts.success && posts.allPosts){
                setAllPosts(posts.allPosts);                
            }
        };
        fetchAllPosts();
    }, []);

    const handleRefresh = async () => {
        const posts = await fetchAllPostHandler();
        if (posts.success && posts.allPosts)
            setAllPosts(posts.allPosts);
    };

    const handleMenuButtonLayout = (event: LayoutChangeEvent) => {
        const { x, y, height } = event.nativeEvent.layout;
        setMenuPosition({ x, y, height });
    };

    return (
        <View style={styles.container}>
            <View style={styles.appbar}>
                <Text style={{ flex: 1, fontSize: 24, fontWeight: 'bold' }}>Billion Smiles</Text>
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
                <HeaderMenu menuPosition={menuPosition} menuVisible={menuVisible} setMenuVisible={setMenuVisible} />
            )}

            { isCommentsOpen && <CommentSheet /> }

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
    appbar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 10,
    },
});
