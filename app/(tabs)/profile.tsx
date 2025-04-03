import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const ProfileHeader = () => {
    // Combine all header sections (user details, description, supports, badges, stats)
    // Replace the following with your actual header JSX (based on your previous code)
    return (
        <View style={styles.headerContainer}>
            <View style={styles.appbar}>
                <Text style={{ flex: 1, fontSize: 24, fontWeight: 'bold' }}>Username</Text>
                <TouchableOpacity style={{ margin: 10 }}>
                    <MaterialIcons name='add' size={24} />
                </TouchableOpacity>
                <TouchableOpacity style={{ margin: 0 }}>
                    <MaterialIcons name='menu' size={24} />
                </TouchableOpacity>

            </View>

            {/* User Detail Section */}
            <View style={styles.userDetailSection}>
                <View style={styles.leftColumn}>
                    <Image source={{ uri: 'https://placehold.co/100' }} style={styles.profileImage} />
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
                <Text style={styles.username}>Username</Text>
                <Text style={styles.description}>Passionate about making a difference. Helping animals, supporting education, and more.</Text>
                <Text style={styles.sectionTitle}>Supports</Text>
                <View style={styles.supportsContainer}>
                    {['Animals', 'Education', 'Environment'].map((cause, index) => (
                        <View key={index} style={styles.causeLabel}>
                            <Text style={styles.causeLabelText}>{cause}</Text>
                        </View>
                    ))}
                </View>
                <Text style={styles.sectionTitle}>Badges & Stats</Text>
                <View style={styles.badgesContainer}>
                    {[{ id: 1 }, { id: 2 }].map((badge) => (
                        <View key={badge.id} style={styles.badge}>
                            <Image source={{ uri: 'https://placehold.co/100' }} style={styles.badgeImage} />
                        </View>
                    ))}
                </View>
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

            <View style={styles.userDescriptionSection}>
                <Text style={styles.sectionTitle}>Posts Created</Text>
            </View>
        </View>
    );
};

const ProfilePage = () => {
    const postsData = [
        { id: '1', image: 'https://placehold.co/300' },
        { id: '2', image: 'https://placehold.co/301' },
        { id: '3', image: 'https://placehold.co/302' },
        { id: '32', image: 'https://placehold.co/302' },
        { id: '3222', image: 'https://placehold.co/302' },
        { id: '311', image: 'https://placehold.co/302' },
        { id: '333123', image: 'https://placehold.co/302' },
        { id: '323123123', image: 'https://placehold.co/302' },
        { id: '3111111', image: 'https://placehold.co/302' },
        { id: '36', image: 'https://placehold.co/302' },
        { id: '34', image: 'https://placehold.co/302' },
        { id: '83', image: 'https://placehold.co/302' },
        { id: '361', image: 'https://placehold.co/302' },
        { id: '341', image: 'https://placehold.co/302' },
        { id: '831', image: 'https://placehold.co/302' },
        { id: '831', image: 'https://placehold.co/302' },
        { id: '831212', image: 'https://placehold.co/302' },
        // ... more posts
    ];

    return (
        <FlatList
            data={postsData}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            renderItem={({ item }) => (
                <TouchableOpacity style={styles.postItem}>
                    <Image source={{ uri: item.image }} style={styles.postImage} />
                </TouchableOpacity>
            )}
            contentContainerStyle={styles.postsContainer}
            ListHeaderComponent={<ProfileHeader />}
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
    // ... your header and other section styles (userDetailSection, leftColumn, rightColumn, etc.)
    // Example for profileImage, statsRow, etc.
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 45,
        borderWidth: 2,
        borderColor: '#4A90E2',
    },
    // Styles for posts grid remain the same
    postsContainer: {
        // No horizontal padding for full-width grid
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
    // ... add your other styles here
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
});

export default ProfilePage;
