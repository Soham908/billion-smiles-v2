import { Modal, StyleSheet, Text, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';

const HeaderMenu = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuButtonRef = useRef<TouchableOpacity>(null);

  const toggleMenu = () => {
    if (menuVisible) {
      setMenuVisible(false);
    } else {
      // Measure the button's position
      menuButtonRef.current?.measure((fx, fy, width, height, px, py) => {
        setMenuPosition({ top: py + height, left: px });
        setMenuVisible(true);
      });
    }
  };

  const handleOutsidePress = () => {
    setMenuVisible(false);
    console.log("huehue")
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Billion Smiles</Text>
        <TouchableOpacity ref={menuButtonRef} onPress={toggleMenu} style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Modal */}
      {menuVisible && (
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <Modal transparent animationType="fade" visible={menuVisible} onRequestClose={handleOutsidePress}>
            <View style={styles.overlay}>
              <View style={[styles.menu, { top: menuPosition.top, left: menuPosition.left }]}>
                <TouchableOpacity style={styles.menuItem} onPress={() => console.log('Settings')}>
                  <Text>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} onPress={() => console.log('Logout')}>
                  <Text>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

export default HeaderMenu;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#f8f8f8',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    menuButton: {
      padding: 8,
    },
    menuIcon: {
      fontSize: 24,
    },
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dimmed background
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    menu: {
      position: 'absolute',
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5, // For Android shadow
    },
    menuItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
  });
  