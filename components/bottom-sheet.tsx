import React, { useRef, useState, useCallback, useMemo } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import BottomSheet, { BottomSheetScrollView, BottomSheetView, BottomSheetFooter, BottomSheetFooterProps, BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { useSheetStore } from '@/store/sheetStore';
import { MaterialIcons } from '@expo/vector-icons';

const comments = [
    {
        id: 1,
        username: 'johndoe',
        avatar: 'https://i.pravatar.cc/150?img=1',
        text: 'This is so cool!',
        createdAt: '2h',
    },
    {
        id: 2,
        username: 'janesmith',
        avatar: 'https://i.pravatar.cc/150?img=2',
        text: 'Loving this! 🔥',
        createdAt: '5h',
    },
    {
        id: 3,
        username: 'mike89',
        avatar: 'https://i.pravatar.cc/150?img=3',
        text: 'Awesome work, keep it up!',
        createdAt: '1d',
    },
    {
        id: 4,
        username: 'sara_lee',
        avatar: 'https://i.pravatar.cc/150?img=4',
        text: 'Totally agree with this!',
        createdAt: '3h',
    },
    {
        id: 5,
        username: 'techgeek',
        avatar: 'https://i.pravatar.cc/150?img=5',
        text: 'Just bookmarked this 🔖',
        createdAt: '4h',
    },
    {
        id: 6,
        username: 'noahwrites',
        avatar: 'https://i.pravatar.cc/150?img=6',
        text: 'Can’t wait to try this out!',
        createdAt: '45m',
    },
    {
        id: 7,
        username: 'emilyrose',
        avatar: 'https://i.pravatar.cc/150?img=7',
        text: 'This made my day 😊',
        createdAt: '30m',
    },
    {
        id: 8,
        username: 'daniel_k',
        avatar: 'https://i.pravatar.cc/150?img=8',
        text: 'I wish I found this sooner!',
        createdAt: '6h',
    },
    {
        id: 9,
        username: 'luna_star',
        avatar: 'https://i.pravatar.cc/150?img=9',
        text: 'So helpful, thank you!',
        createdAt: '12h',
    },
    {
        id: 10,
        username: 'the_real_omar',
        avatar: 'https://i.pravatar.cc/150?img=10',
        text: 'Brilliant explanation 👏',
        createdAt: '10m',
    },
    {
        id: 81,
        username: 'daniel_k',
        avatar: 'https://i.pravatar.cc/150?img=8',
        text: 'I wish I found this sooner!',
        createdAt: '6h',
    },
    {
        id: 91,
        username: 'luna_star',
        avatar: 'https://i.pravatar.cc/150?img=9',
        text: 'So helpful, thank you!',
        createdAt: '12h',
    },
    {
        id: 102,
        username: 'the_real_omar',
        avatar: 'https://i.pravatar.cc/150?img=10',
        text: 'Brilliant explanation 👏',
        createdAt: '10m',
    },
    {
        id: 191,
        username: 'luna_star',
        avatar: 'https://i.pravatar.cc/150?img=9',
        text: 'So helpful, thank you!',
        createdAt: '12h',
    },
    {
        id: 1102,
        username: 'the_real_omar',
        avatar: 'https://i.pravatar.cc/150?img=10',
        text: 'Brilliant explanation 👏',
        createdAt: '10m',
    },
];


const CommentInputFooter = ({ onSubmit }: { onSubmit: (text: string) => void }) => {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (!text.trim()) return;
        onSubmit(text);
        setText('');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
            <View style={styles.footerContainer}>
                <Image
                    source={{ uri: 'https://i.pravatar.cc/150?img=8' }}
                    style={styles.inputAvatar}
                />
                <TextInput
                    placeholder="Add a comment..."
                    placeholderTextColor="#999"
                    value={text}
                    onChangeText={setText}
                    style={styles.input}
                />
                <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                    <MaterialIcons name="send" size={20} color="#1E90FF" />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};


const CommentSheet = () => {
    const { closeCommentSheet } = useSheetStore();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['50%', '75%'], []);


    const renderFooter = useCallback(
        ({ animatedFooterPosition }: BottomSheetFooterProps) => (
            <BottomSheetFooter animatedFooterPosition={animatedFooterPosition}>
                <CommentInputFooter onSubmit={(text) => console.log('Post:', text)} />
            </BottomSheetFooter>
        ),
        []
    );

    const renderBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => (
            <BottomSheetBackdrop
                {...props}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                pressBehavior="close"
                style={{ backgroundColor: '#0002' }}
            />
        ),
        []
    );


    return (
        <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            enablePanDownToClose
            onClose={closeCommentSheet}
            footerComponent={renderFooter}
            backdropComponent={renderBackdrop}
        >
            <BottomSheetScrollView
                style={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 12 }}
            >
                <BottomSheetView style={styles.innerContent}>
                    {comments.map((comment) => (
                        <View key={comment.id} style={styles.commentRow}>
                            <Image source={{ uri: comment.avatar }} style={styles.avatar} />

                            <View style={styles.commentContent}>
                                <Text style={styles.commentText}>
                                    <Text style={styles.username}>{comment.username} </Text>
                                    {comment.text}
                                </Text>
                                <Text style={styles.timestamp}>{comment.createdAt}</Text>
                            </View>

                            <TouchableOpacity style={styles.likeButton}>
                                <MaterialIcons name="favorite-outline" size={16} color="#888" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </BottomSheetView>
            </BottomSheetScrollView>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        flexGrow: 1,
    },
    innerContent: {
        paddingTop: 12,
        paddingBottom: 40,
        paddingHorizontal: 16,
    },
    commentRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 10,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 12,
    },
    commentContent: {
        flex: 1,
    },
    commentText: {
        fontSize: 14,
        color: '#000',
        lineHeight: 20,
    },
    username: {
        fontWeight: 'bold',
    },
    timestamp: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    },
    likeButton: {
        marginLeft: 8,
        marginTop: 2,
    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: '#fff',
        borderTopWidth: 0.5,
        borderColor: '#ccc',
    },
    inputAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 14,
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#f1f1f1',
        borderRadius: 20,
    },
    sendButton: {
        marginLeft: 8,
    },
});

export default CommentSheet;
