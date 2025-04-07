import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Keyboard, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router'; // Import the Link component from expo-router
import { userSignupHandler } from '@/api-handlers/authHandler';

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()


    const handleSignup = async () => {
        if (username !== "" && password !== "" && email !== "") {
            const signupResponse = await userSignupHandler(username, password, email)
            if (signupResponse.success) {
                router.replace("/")
            }
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.heading}>Create an Account</Text>

                    {/* Name Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />

                    {/* Email Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Email Address"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />

                    {/* Password Input */}
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    {/* Register Button */}
                    <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
                        <Text style={styles.signupButtonText}>Signup</Text>
                    </TouchableOpacity>

                    {/* Already have an account link */}
                    <Link href="/login" style={styles.loginLink}>
                        <Text style={styles.loginLinkText}>Already have an account? Login</Text>
                    </Link>

                    {/* Social Media Signup */}
                    <View style={styles.socialSignupContainer}>
                        <TouchableOpacity style={styles.socialButton}>
                            <Image
                                source={require('@/assets/images/icons8-google3.png')}
                                style={styles.socialIcon}
                            />
                            <Text style={styles.socialButtonText}>Signup with Google</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </Pressable>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingVertical: 20,
        // paddingBottom: 100,
        backgroundColor: '#FFF',
    },
    heading: {
        fontSize: 28,
        fontWeight: '600',
        marginBottom: 30,
        color: '#333',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#DDD',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 20,
        marginBottom: 12,
        fontSize: 16,
        backgroundColor: '#FFF',
        color: '#333',
    },
    signupButton: {
        width: '60%',
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        marginTop: 8,
        marginBottom: 20,
        borderWidth: 1,
    },
    signupButtonText: {
        fontSize: 18,
        fontWeight: '500',
    },
    loginLink: {
        marginBottom: 20,
    },
    loginLinkText: {
        color: '#5F9BF3',
        fontSize: 16,
    },
    socialSignupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop: 30,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 15,
        backgroundColor: '#FFF',
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#DDD',
        width: '80%',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    socialIcon: {
        width: 45,
        height: 45,
        marginRight: 12,
    },
    socialButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
});

export default SignupPage;
