import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, KeyboardAvoidingView, Keyboard, Platform, ScrollView, Pressable, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker"
import { useUserStore } from '@/store/userStore';
import { createPostHandler, IPostDetails } from '@/api-handlers/uploadPostHandler';
import { useRouter } from 'expo-router';
import { fetchCausesHandler } from '@/api-handlers/causeHandler';
import { ICause } from '@/types/typeCause';
import { CauseCard } from '@/components/create-post-cause-list';


const CreatePost = () => {
    const [caption, setCaption] = useState("");
    const [selectedImageURI, setSelectedImageURI] = useState("")
    const [uploadUri, setUploadUri] = useState("")
    const [disableButton, setDisableButton] = useState(false)
    const { userData } = useUserStore()
    const router = useRouter()

    const [selectedCauseId, setSelectedCauseId] = useState<string | null>(null);
    const [causeData, setCauseData] = useState<ICause>()
    const handleSelectCause = (cause: ICause) => {
        setSelectedCauseId(prev => prev === cause._id ? null : cause._id!);
        setCauseData(cause)
    };


    const recommendedCampaigns = [
        { id: '1', campaignTitle: 'Clean Earth Initiative', companyName: 'GreenWorld', location: 'New York', causeName: 'Environment' },
        { id: '2', campaignTitle: 'Help for Homeless', companyName: 'GoodHands', location: 'Los Angeles', causeName: 'Charity' },
        { id: '3', campaignTitle: 'Water Wells for All', companyName: 'PureWater', location: 'Chicago', causeName: 'Water Access' },
        { id: '4', campaignTitle: 'Feed the Hungry', companyName: 'FoodForAll', location: 'San Francisco', causeName: 'Hunger' },
        { id: '5', campaignTitle: 'Animal Rescue Mission', companyName: 'PawsUp', location: 'Miami', causeName: 'Animal Welfare' },
        { id: '6', campaignTitle: 'Save the Trees', companyName: 'TreeCare', location: 'Seattle', causeName: 'Environment' },
        { id: '7', campaignTitle: 'Educate the Future', companyName: 'LearnNow', location: 'Houston', causeName: 'Education' },
        { id: '8', campaignTitle: 'Disaster Relief Fund', companyName: 'HopeGivers', location: 'Phoenix', causeName: 'Emergency Aid' },
        { id: '9', campaignTitle: 'Renewable Energy', companyName: 'SunPower', location: 'Denver', causeName: 'Energy' },
    ];
    const columns = [];
    for (let i = 0; i < recommendedCampaigns.length; i += 2) {
        columns.push(recommendedCampaigns.slice(i, i + 2));
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            quality: 1,
            base64: true,
        });

        if (!result.canceled) {
            setSelectedImageURI(result.assets[0].uri);
            let base64Img = `data:${result.assets[0].mimeType};base64,${result.assets[0].base64}`;
            setUploadUri(base64Img);
        }
    };

    const uploadPost = async () => {
        setDisableButton(true);
        if (caption !== '' && uploadUri) {
            const postDetails: IPostDetails = { userId: userData._id, imageUrl: "", caption: caption, causeId: causeData?._id! }
            const response = await createPostHandler(postDetails, uploadUri);
            router.replace("/");
        }
        setDisableButton(false);
    };

    const [allCauses, setAllCauses] = useState<ICause[]>()


    useEffect(() => {
        const fetchCauses = async () => {
            const response = await fetchCausesHandler()
            console.log(response)
            if (response.success && response.causeData)
                setAllCauses(response.causeData)
        }
        fetchCauses()
    }, [])

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView style={styles.container}>
                <View style={styles.container}>
                    {/* Image Picker Section */}
                    <TouchableOpacity style={styles.imagePickerContainer} onPress={pickImage}>
                        {selectedImageURI ? (
                            <Image source={{ uri: selectedImageURI }} style={styles.selectedImage} />
                        ) : (
                            <View style={styles.placeholder}>
                                <MaterialIcons name="image" size={50} color="#ccc" />
                                <Text style={styles.placeholderText}>Select an Image</Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    {/* Caption Input */}
                    <Text style={styles.sectionTitle}>Captions</Text>
                    <View style={styles.captionContainer}>
                        <TextInput
                            style={styles.captionInput}
                            placeholder="Write a caption..."
                            placeholderTextColor="#888"
                            multiline
                            value={caption}
                            onChangeText={setCaption}
                        />
                    </View>

                    {/* Recommended Campaigns */}
                    <View style={styles.sectionContainer}>
                        <Text style={styles.sectionTitle}>Recommended Campaigns</Text>
                        <FlatList
                            data={allCauses}
                            renderItem={({ item }) => (
                                <CauseCard
                                    cause={item}
                                    isSelected={item._id === selectedCauseId}
                                    onPress={handleSelectCause}
                                />
                            )}
                            keyExtractor={(item) => item._id!}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingLeft: 16 }}
                        />
                    </View>

                    {/* Upload Post Button */}
                    <TouchableOpacity style={[
                        styles.uploadButton,
                        disableButton ? styles.disabledButton : null
                    ]} onPress={() => uploadPost()} disabled={disableButton}>
                        <Text style={styles.uploadButtonText}>Upload Post</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    imagePickerContainer: {
        width: '54%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#000',
        borderRadius: 12,
        marginVertical: 16,
    },
    placeholder: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        marginTop: 8,
        fontSize: 16,
        color: '#888',
    },
    selectedImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    captionContainer: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#DDD',
        borderRadius: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        marginHorizontal: 16,
    },
    captionInput: {
        fontSize: 16,
        color: '#333',
        textAlignVertical: 'top',
    },
    sectionContainer: {
        paddingVertical: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 16,
        marginBottom: 8,
        color: '#333',
    },
    columnsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
    },
    column: {
        marginRight: 12,
    },
    campaignCard: {
        backgroundColor: '#f7f7f7',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        width: 240,
    },
    campaignDetailSection: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 4,
        marginTop: 8,
    },
    campaignTitle: {
        fontSize: 14,
        marginBottom: 4,
        color: '#333',
        fontWeight: 'bold',
    },
    campaignText: {
        fontSize: 12,
        color: '#333',
    },
    uploadButton: {
        backgroundColor: '#2a9d8f',
        paddingVertical: 14,
        borderRadius: 8,
        marginHorizontal: 16,
        marginBottom: 16,
        alignItems: 'center',
    },
    uploadButtonText: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: '600',
    },
    disabledButton: {
        backgroundColor: '#ccc',
        opacity: 0.6,
    },
});

export default CreatePost;
