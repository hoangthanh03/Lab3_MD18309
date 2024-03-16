import React, { useState } from 'react';
import { View, FlatList, Animated, Text, StyleSheet } from 'react-native';

const ITEM_HEIGHT = 100;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Bai2 = () => {
  const [data, setData] = useState([...Array(20).keys()].map((i) => ({ key: String(i), text: `Item ${i}` })));

  const scrollY = new Animated.Value(0);

  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true });

  const renderItem = ({ item, index }) => {
    const inputRange = [-1, 0, ITEM_HEIGHT * index, ITEM_HEIGHT * (index + 2)];
    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [0, 1, 1, 0],
    });
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.5, 1, 1, 0.5],
    });

    return (
      <Animated.View style={{ ...styles.itemContainer, opacity, transform: [{ scale }] }}>
        <Text style={styles.itemText}>{item.text}</Text>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <AnimatedFlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  itemContainer: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor:'pink',
    margin:10,
    borderRadius:10
  },
  itemText: {
    fontSize: 18,
  },
});

export default Bai2;
