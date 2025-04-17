import BadgeSection from '@/components/badge-section';
import CauseList from '@/components/cause-list';
import HeaderMenu from '@/components/header-menu';
import { usePostStore } from '@/store/postStore';
import { useUserStore } from '@/store/userStore';
import { MaterialIcons } from '@expo/vector-icons';
import { router, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, LayoutChangeEvent } from 'react-native';

const ProfileHeader = () => {

    const { userData } = useUserStore()
    const router = useRouter()

    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0, height: 0 });
    const menuButtonRef = useRef(null);

    const handleMenuButtonLayout = (event: LayoutChangeEvent) => {
        const { x, y, height } = event.nativeEvent.layout;
        setMenuPosition({ x, y, height });
    };


    return (
        <View style={styles.headerContainer}>
            <View style={styles.appbar}>
                <Text style={{ flex: 1, fontSize: 24, fontWeight: 'bold' }}>{userData.username || "Username"}</Text>
                <TouchableOpacity style={{ margin: 10 }} onPress={() => router.push("/create-post")}>
                    <MaterialIcons name='add' size={24} />
                </TouchableOpacity>
                <TouchableOpacity
                    ref={menuButtonRef}
                    style={{ margin: 0 }}
                    onPress={() => setMenuVisible(!menuVisible)}
                    onLayout={handleMenuButtonLayout}
                >
                    <MaterialIcons name='menu' size={24} />
                </TouchableOpacity>

            </View>

            {/* User Detail Section */}
            <View style={styles.userDetailSection}>
                <View style={styles.leftColumn}>
                    <Image source={require("@/assets/images/user.png")} style={styles.profileImage} />
                </View>
                <View style={styles.rightColumn}>
                    <View style={styles.statsRow}>
                        <View style={styles.userDetailsItem}>
                            <Text style={styles.statNumber}>120</Text>
                            <Text style={styles.userDetailsLabel}>Posts</Text>
                        </View>
                        <View style={styles.userDetailsItem}>
                            <Text style={styles.statNumber}>350</Text>
                            <Text style={styles.userDetailsLabel}>Followers</Text>
                        </View>
                        <View style={styles.userDetailsItem}>
                            <Text style={styles.statNumber}>180</Text>
                            <Text style={styles.userDetailsLabel}>Following</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.editButton}>
                        <MaterialIcons name='edit' size={16} />
                        <Text style={styles.editButtonText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* User Description Section */}
            <View style={styles.userDescriptionSection}>
                <Text style={styles.username}>{userData.username || "Username"}</Text>
                <Text style={styles.description}>Passionate about making a difference. Helping animals, supporting education, and more.</Text>

                {userData.userType === 'ngo' ?
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.sectionTitle}>Causes Created</Text>
                            <TouchableOpacity style={styles.createCauseButton} onPress={() => router.push("/create-cause")}>
                                <MaterialIcons name='add' size={16} />
                            </TouchableOpacity>
                        </View>
                        <CauseList />
                    </View>
                    :
                    <View>
                        <Text style={styles.sectionTitle}>Supports</Text>
                        <View style={styles.supportsContainer}>
                            {['Animals', 'Education', 'Environment'].map((cause, index) => (
                                <View key={index} style={styles.causeLabel}>
                                    <Text style={styles.causeLabelText}>{cause}</Text>
                                </View>
                            ))}
                        </View>
                        <Text style={styles.sectionTitle}>Badges & Stats</Text>

                        <BadgeSection />

                        <View style={styles.statsContainer}>
                            {[
                                { id: 1, label: 'Hearts Earned', value: 1500 },
                                { id: 2, label: 'Impact Created', value: 250 },
                            ].map((stat) => (
                                <View key={stat.id} style={styles.statsCard}>
                                    <View style={styles.statItem}>
                                        <Text style={styles.statValue}>{stat.value}</Text>
                                        <Text style={styles.statLabel}>{stat.label}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                }
            </View>

            <View style={styles.userDescriptionSection}>
                <Text style={styles.sectionTitle}>Posts Created</Text>
            </View>


            {menuVisible && (
                <HeaderMenu menuPosition={menuPosition} menuVisible={menuVisible} setMenuVisible={setMenuVisible} />
            )}

        </View>
    );
};

const ProfileFooter = () => {
    return (
        <View style={styles.profileFooterSection}>
            <Text style={styles.footerTitle}>
                Create more posts
            </Text>
            <TouchableOpacity style={{ alignContent: 'center', justifyContent: 'center', marginStart: 12 }} onPress={() => router.push("/create-post")}>
                <MaterialIcons name='add' size={28} />
            </TouchableOpacity>
        </View>
    )
}

const ProfilePage = () => {

    const { userPosts } = usePostStore()
    return (
        <FlatList
            data={userPosts}
            keyExtractor={(item) => item._id.toString()}
            numColumns={3}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.postItem}>
                    <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
                </TouchableOpacity>
            )}
            ListHeaderComponent={<ProfileHeader />}
            ListFooterComponent={<ProfileFooter />}
        />
    );
};

const styles = StyleSheet.create({
    appbar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 10,
        marginTop: 10,
        justifyContent: 'flex-end'
    },
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#FFF',
    },
    headerContainer: {
        backgroundColor: '#FFF',
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 45,
    },
    postItem: {
        flex: 1,
        aspectRatio: 1,
        borderWidth: 0.5,
        borderColor: '#000',
        maxWidth: '33.3%'
    },
    postImage: {
        width: '100%',
        height: '100%',
    },
    userDetailSection: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        // paddingTop: 16,
        paddingBottom: 4,
        alignItems: 'center',
    },
    leftColumn: {
        marginRight: 16,
    },
    rightColumn: {
        flex: 1,
        justifyContent: 'center',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 12,
    },
    userDetailsItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    userDetailsLabel: {
        fontSize: 14,
        color: '#888',
    },
    editButton: {
        marginTop: 16,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 5,
        flexDirection: 'row',
        borderWidth: 1,
        width: '92%',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    editButtonText: {
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 4,
    },
    userDescriptionSection: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 8,
        color: '#333',
    },
    supportsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 12,
    },
    causeLabel: {
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        paddingVertical: 4,
        paddingHorizontal: 12,
        marginRight: 8,
        marginBottom: 8,
    },
    causeLabelText: {
        fontSize: 12,
        color: '#333',
    },
    badgesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 12,
    },
    badge: {
        marginRight: 8,
        marginBottom: 8,
    },
    badgeImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    statsContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    statsCard: {
        backgroundColor: '#000',
        borderRadius: 8,
        padding: 12,
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
    },
    profileFooterSection: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row'
    },
    footerTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginVertical: 8,
        color: '#333',
    },
    createCauseButton: {
        paddingVertical: 4,
        paddingHorizontal: 4,
        // paddingRight: 12,
        borderRadius: 40,
        flexDirection: 'row',
        borderWidth: 1,
        backgroundColor: 'transparent',
        alignSelf: 'center',
        justifyContent: 'center',
        marginLeft: 12,
    },
    createCauseText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default ProfilePage;
