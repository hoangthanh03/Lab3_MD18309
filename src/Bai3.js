import React, { useState, useRef } from "react";
import { Text, View, StyleSheet, Animated, TouchableOpacity, FlatList } from "react-native";

export default function Bai3() {
  const [data, setData] = useState([
    { key: '1', title: 'Item 1' },
    { key: '2', title: 'Item 2' },
    { key: '3', title: 'Item 3' },
    { key: '4', title: 'Item 4' },
    { key: '5', title: 'Item 5' },
  ]);

  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(60)).current;

  const toggleHeader = () => {
    const initialValue = expanded ? 200 : 60;
    const finalValue = expanded ? 60 : 200;
    setExpanded(!expanded);
    animation.setValue(initialValue);
    Animated.spring(animation, {
      toValue: finalValue,
      useNativeDriver: false,
    }).start();
  };

  const renderListItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text>{item.title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.header, { height: animation }]}>
        <Text style={styles.headerText}>Mo rong header</Text>
      </Animated.View>
      <FlatList
        data={data}
        renderItem={renderListItem}
        keyExtractor={(item) => item.key}
        onScroll={(event) => {
          const currentOffset = event.nativeEvent.contentOffset.y;
          const direction = currentOffset > 0 && currentOffset > 200 ? 'down' : 'up'; // Define the scroll direction
          if (direction === 'down' && !expanded) {
            toggleHeader();
          } else if (direction === 'up' && expanded) {
            toggleHeader();
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#000CCC',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
