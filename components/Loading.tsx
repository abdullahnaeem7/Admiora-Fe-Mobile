import { Colors } from '@/constants/Colors';
import React from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions, Modal, Text } from 'react-native';

const { width, height } = Dimensions.get('window');

const LoadingModal = ({ visible, text }: { visible: boolean, text?: string }) => (
    <Modal
        transparent={true}
        animationType="fade"
        visible={visible}
    >
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.dark.background} />
            {text ? <Text style={styles.loadingText}>{text}</Text> : null}
        </View>
    </Modal>
);
const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        width: width,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed background for modal
    },
    loadingText: {
        marginTop: 10, // Space between loader and text
        color: Colors.light.background, // Customize as per your theme
        fontSize: 16,
        textAlign: 'center',
    },
});

export default LoadingModal;
