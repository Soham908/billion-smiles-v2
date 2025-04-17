import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, Switch } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { userSignupHandler, ngoSignupHandler } from '@/api-handlers/authHandler';
import { useUserStore } from '@/store/userStore';

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isNGO, setIsNGO] = useState(false);
    const [organizationName, setOrganizationName] = useState('');
    const [registrationId, setRegistrationId] = useState('');

    const { setUserData } = useUserStore();
    const router = useRouter();

    const handleSignup = async () => {
        if (!username || !email || !password) return;

        if (isNGO) {
            if (!organizationName || !registrationId) return;
            const res = await ngoSignupHandler(username, password, email, organizationName, registrationId);
            if (res.success && res.userData) {
                setUserData(res.userData);
                router.replace('/');
            }
        } else {
            const res = await userSignupHandler(username, password, email);
            if (res.success && res.userData) {
                setUserData(res.userData);
                router.replace('/');
            }
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.heading}>Create an Account</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Email Address"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    {/* NGO Toggle */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                        <Switch value={isNGO} onValueChange={setIsNGO} />
                        <Text style={{ marginLeft: 10, fontSize: 16 }}>Registering as NGO</Text>
                    </View>

                    {/* Conditional NGO Fields */}
                    {isNGO && (
                        <>
                            <TextInput
                                style={styles.input}
                                placeholder="Organization Name"
                                value={organizationName}
                                onChangeText={setOrganizationName}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Registration ID"
                                value={registrationId}
                                onChangeText={setRegistrationId}
                            />
                        </>
                    )}

                    <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
                        <Text style={styles.signupButtonText}>Signup</Text>
                    </TouchableOpacity>

                    <Link href="/login" style={styles.loginLink}>
                        <Text style={styles.loginLinkText}>Already have an account? Login</Text>
                    </Link>

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
