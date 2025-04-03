import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'

const HomePageCard = () => {
    return (
        <View style={{ marginBottom: 32 }} >{/* Row 1: User Details */}
            <View style={styles.userDetailsRow}>
                <Image
                    source={{ uri: 'https://placehold.co/60' }}
                    style={styles.profileImage}
                />
                <Text style={styles.username}>Username</Text>
                <Image
                    source={{ uri: 'https://placehold.co/40' }}
                    style={styles.badgeImage}
                />
                <Image
                    source={{ uri: 'https://placehold.co/40' }}
                    style={styles.badgeImage}
                />
                <TouchableOpacity>
                    <MaterialIcons name='more-vert' size={24} />
                </TouchableOpacity>
            </View>

            {/* Row 2: Post Image */}
            <View style={styles.imageRow}>
                <Image
                    source={{ uri: 'https://placehold.co/300x200' }}
                    style={styles.postImage}
                />
            </View>

            {/* Row 3: Caption and Comments */}
            <View style={styles.captionRow}>
                <View style={{ flexDirection: 'row', gap: 15 }}>
                    <TouchableOpacity>
                        <MaterialIcons name='favorite-outline' size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialIcons name='chat-bubble-outline' size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialIcons name='send' size={24} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.caption}>
                    This is a caption
                </Text>
                <Text style={styles.hashtags}>
                    #hashtags
                </Text>
                <Text style={styles.description}>
                    This is a description of the post.
                </Text>
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
        width: 60,
        height: 60,
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
        fontSize: 16,
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
})