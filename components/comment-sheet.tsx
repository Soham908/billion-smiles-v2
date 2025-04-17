import React, { useRef, useState, useCallback, useMemo } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import BottomSheet, { BottomSheetScrollView, BottomSheetView, BottomSheetFooter, BottomSheetFooterProps, BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { useSheetStore } from '@/store/sheetStore';
import { MaterialIcons } from '@expo/vector-icons';
import { uploadCommentHandler } from '@/api-handlers/postHandler';
import { useUserStore } from '@/store/userStore';
import dayjs from 'dayjs';
import { TapGestureHandler } from 'react-native-gesture-handler';
import { usePostStore } from '@/store/postStore';
import { IPost } from '@/types/typePost';


const formatTimeShort = (date: string | Date) => {
    const now = dayjs();
    const time = dayjs(date);
    const diffInMinutes = now.diff(time, 'minute');

    if (diffInMinutes < 1) return 'just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m`;

    const diffInHours = now.diff(time, 'hour');
    if (diffInHours < 24) return `${diffInHours}h`;

    const diffInDays = now.diff(time, 'day');
    return `${diffInDays}d`;
};


const CommentInputFooter = () => {
    const [commentText, setCommentText] = useState('');
    const { userData } = useUserStore.getState()
    const { postId, setComments } = useSheetStore()
    const { allPosts, setAllPosts } = usePostStore()
    const handleSend = async () => {
        if (!commentText.trim()) return;
        setCommentText('');
        const response = await uploadCommentHandler(userData._id, userData.username, postId, commentText)
        response.postData && setComments([...response.postData?.comments].reverse())
        const postIndex = allPosts.findIndex((post: IPost) => post._id === postId)

        const updatedPosts = [...allPosts]
        if (response.postData) {
            updatedPosts[postIndex] = response.postData;
            setAllPosts(updatedPosts);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
            <View style={styles.footerContainer}>
                <Image
                    source={{ uri: 'https://i.pravatar.cc/150?img=4' }}
                    style={styles.inputAvatar}
                />
                <TextInput
                    placeholder="Add a comment..."
                    placeholderTextColor="#999"
                    value={commentText}
                    onChangeText={setCommentText}
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
    const { comments, closeCommentSheet } = useSheetStore();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['50%', '75%'], []);

    const renderFooter = useCallback(
        ({ animatedFooterPosition }: BottomSheetFooterProps) => (
            <BottomSheetFooter animatedFooterPosition={animatedFooterPosition}>
                <CommentInputFooter />
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

    const [likedComments, setLikedComments] = useState<{ [key: string]: boolean }>({});

    const toggleLike = (commentId: string) => {
        setLikedComments(prev => ({
            ...prev,
            [commentId]: !prev[commentId],
        }));
    };

    const handleDoubleTap = (commentId: string) => {
        toggleLike(commentId);
    };


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
                    {comments.map((comment) => {
                        const isLiked = likedComments[comment._id];

                        return (
                            <TapGestureHandler
                                key={comment._id}
                                numberOfTaps={2}
                                onActivated={() => handleDoubleTap(comment._id)}
                            >
                                <View style={styles.commentRow}>
                                    <Image source={{ uri: 'https://i.pravatar.cc/150?img=1' }} style={styles.avatar} />

                                    <View style={styles.commentContent}>
                                        <Text style={styles.commentText}>
                                            <Text style={styles.username}>{comment.commentUsername} </Text>
                                            {comment.commentText}
                                        </Text>
                                        <Text style={styles.timestamp}>
                                            {formatTimeShort(comment.createdAt)}
                                        </Text>
                                    </View>

                                    <TouchableOpacity style={styles.likeButton} onPress={() => toggleLike(comment._id)}>
                                        <MaterialIcons
                                            name={isLiked ? 'favorite' : 'favorite-outline'}
                                            color={isLiked ? 'red' : 'black'}
                                            size={20}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </TapGestureHandler>
                        );
                    })}

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
