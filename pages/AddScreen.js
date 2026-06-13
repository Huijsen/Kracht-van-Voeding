import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";

export default function AddScreen({ navigation, pills, setPills, setScreen }) {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [everyOtherDay, setEveryOtherDay] = useState(false);

  const addPill = () => {
    if (!name || !time) return;

    const newPill = {
      id: Date.now().toString(),
      name,
      time,
      everyOtherDay,
      taken: false,
      startDate: new Date().toISOString(),
    };

    setPills([...pills, newPill]);

    setScreen("home");
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />

      <TextInput
        placeholder="HH:MM"
        value={time}
        onChangeText={setTime}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />

      <TouchableOpacity
        onPress={() => setEveryOtherDay(!everyOtherDay)}
        style={{ padding: 10, backgroundColor: "gray", marginBottom: 10 }}
      >
        <Text>Every other day: {everyOtherDay ? "ON" : "OFF"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={addPill}
        style={{ backgroundColor: "black", padding: 12 }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
}