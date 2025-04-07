import { Animated, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { IPost } from '@/types/typePost'
import { GestureHandlerGestureEvent, GestureHandlerRootView, State, TapGestureHandler } from 'react-native-gesture-handler'
import Menu from './homepage-menu'

const HomePageCard = ({ postData }: { postData: IPost }) => {
    const [postLiked, setPostLiked] = useState(false)
    const [heartVisible, setHeartVisible] = useState(false);
    const scale = useRef(new Animated.Value(1)).current;
    const heartPosition = useRef(new Animated.Value(0)).current;

    const triggerHeartAnimation = () => {
        setHeartVisible(true);  // Show heart when double-tapped
        heartPosition.setValue(0);
        Animated.sequence([
            Animated.timing(heartPosition, {
                toValue: -75, // Move the heart upwards
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(scale, {
                toValue: 1.5, // Scale up the heart
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(scale, {
                toValue: 1, // Scale back down
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(heartPosition, {
                toValue: 0, // Return the heart to its original position
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();

        // Hide heart after animation
        setTimeout(() => {
            setHeartVisible(false);
        }, 600);
    };
    const onDoubleTapEvent = (event: GestureHandlerGestureEvent) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            setPostLiked(prev => !prev)
            console.log(postLiked)
            if (postLiked) console.log('remove like')
            else triggerHeartAnimation();
        }
    };
    const [isMenuVisible, setMenuVisible] = useState(false);

    const handleSettings = () => {
      console.log('Settings clicked');
      setMenuVisible(false);
    };
  
    const handleLogout = () => {
      console.log('Logout clicked');
      setMenuVisible(false);
    };

    return (
        <View style={{ marginBottom: 32 }} >{/* Row 1: User Details */}
                  <Menu
        isVisible={isMenuVisible}
        onClose={() => setMenuVisible(false)}
        onSettings={handleSettings}
        onLogout={handleLogout}
      />
            <View style={styles.userDetailsRow}>
                <Image
                    source={require("@/assets/images/user.png")}
                    style={styles.profileImage}
                />
                <Text style={styles.username}>{postData.userId.username}</Text>
                <Image
                    source={{ uri: 'https://placehold.co/40' }}
                    style={styles.badgeImage}
                />
                <Image
                    source={{ uri: 'https://placehold.co/40' }}
                    style={styles.badgeImage}
                />
                <TouchableOpacity onPress={() => setMenuVisible(true)} >
                    <MaterialIcons name='more-vert' size={24} />
                </TouchableOpacity>
            </View>

            {/* Row 2: Post Image */}
            <GestureHandlerRootView>
                <TapGestureHandler onHandlerStateChange={onDoubleTapEvent} numberOfTaps={2}>

                    <Pressable style={styles.imageRow}>
                        <Image
                            source={{ uri: postData.imageUrl }}
                            style={styles.postImage}
                        />
                    </Pressable>
                </TapGestureHandler>
            </GestureHandlerRootView>

            {heartVisible && (
                <Animated.View
                    style={[
                        styles.heartAnimation,
                        {
                            transform: [{ scale }, { translateY: heartPosition }],
                        },
                    ]}
                >
                    {/* <MaterialIcons
            name="favorite"
            size={50}
            color="red"
            style={styles.heartIcon}
          /> */}
                    <Image
                        source={require('@/assets/images/icons8-google3.png')}
                        style={{ width: 60, height: 60, borderRadius: 15 }}
                    />

                </Animated.View>
            )}

            {/* Row 3: Caption and Comments */}
            <View style={styles.captionRow}>
                <View style={{ flexDirection: 'row', gap: 15 }}>
                    <TouchableOpacity onPress={() => setPostLiked(prev => !prev)} >
                        <MaterialIcons name={postLiked ? 'favorite' : 'favorite-outline'} color={postLiked ? 'red' : 'black'} size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialIcons name='chat-bubble-outline' size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialIcons name='send' size={24} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.caption}>
                    {postData.caption || "Captions here"}
                </Text>
                <Text style={styles.hashtags}>
                    #hashtags
                </Text>
                {/* <Text style={styles.description}>
                    This is a description of the post.
                </Text> */}
                <Text style={styles.comments}>View all comments</Text>
            </View>

  

        </View>
    )
}

export default HomePageCard

const styles = StyleSheet.create({
    userDetailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    profileImage: {
        width: 54,
        height: 54,
        borderRadius: 60,
        marginRight: 10,
    },
    badgeImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 2,
    },
    username: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
    },
    menuIcon: {
        fontSize: 20,
        color: '#888',
    },
    imageRow: {
        alignItems: 'center',
        marginBottom: 10,
    },
    postImage: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    captionRow: {
        paddingHorizontal: 12,
    },
    caption: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 10
    },
    hashtags: {
        fontSize: 14,
        marginBottom: 5,
        fontStyle: 'italic',
        color: 'blue'
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    comments: {
        fontSize: 12,
        color: '#888',
    },
    heartAnimation: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -25, // Center the heart
        zIndex: 999, // Make sure the heart is on top of everything
    },
    heartIcon: {
        backgroundColor: 'transparent',
    },
})