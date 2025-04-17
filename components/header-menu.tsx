import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useUserStore } from '@/store/userStore';
import { router } from 'expo-router';

type Props = {
    menuVisible: boolean;
    setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
    menuPosition: { x: number; y: number; height: number };
};

const HeaderMenu = ({ menuVisible, setMenuVisible, menuPosition }: Props) => {

    const handleOutsideClick = () => {
        if (menuVisible) {
            setMenuVisible(false);
        }
    };

    return (
        <Modal
            visible={menuVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={handleOutsideClick}
        >
            <Pressable onPress={handleOutsideClick} style={{ flex: 1 }}>
                <View style={styles.overlay}>
                    <View
                        style={[
                            styles.menuContainer,
                            {
                                top: menuPosition.y + menuPosition.height + 12,
                                left: menuPosition.x - 48,
                            },
                        ]}
                    >
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => {
                                router.push('/settings');
                                setMenuVisible(false);
                            }}
                        >
                            <Text style={styles.menuText}>Settings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => {
                                useUserStore.getState().logoutUser();
                                router.replace('/login');
                                setMenuVisible(false);
                            }}
                        >
                            <Text style={styles.menuText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Pressable>
        </Modal>

    )
}

export default HeaderMenu

const styles = StyleSheet.create({
    menuContainer: {
        position: 'absolute',
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 100,
    },
    menuItem: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    menuText: {
        fontSize: 16,
        color: '#333',
    },
    overlay: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
})