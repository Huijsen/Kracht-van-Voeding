import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

export default function HomeScreen({ pills, setPills }) {
  const toggleTaken = (id) => {
    setPills(
      pills.map((p) =>
        p.id === id ? { ...p, taken: !p.taken } : p
      )
    );
  };

  const deletePill = (id) => {
    setPills(pills.filter((p) => p.id !== id));
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        padding: 12,
        marginBottom: 10,
        backgroundColor: "lightgrey",
        borderRadius: 10,
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => toggleTaken(item.id)}
      >
        <Text
          style={{
            fontSize: 16,
            textDecorationLine: item.taken ? "line-through" : "none",
            color: item.taken ? "green" : "black",
          }}
        >
          {item.time} - {item.name}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => deletePill(item.id)}>
        <Text style={{ color: "red", fontSize: 18 }}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        My Pills
      </Text>

      <FlatList
        data={pills}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}