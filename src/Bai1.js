import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

const Bai1 = () => {
    const offset = useSharedValue(0);

    const moveSquare = () => {
        offset.value = Math.random() * 200; // Randomize position
    };

    const squareStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: withSpring(offset.value) }]
        };
    });
    return (
        <View style={styles.container}>
            <Animated.View style={[styles.square, squareStyle]} />
            <TouchableOpacity onPress={moveSquare} style={styles.button}>
                <Text>Move</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Bai1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    square: {
        width: 100,
        height: 100,
        backgroundColor: 'pink',
        borderRadius:20
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'lightblue',
        borderRadius:10
    }
});
