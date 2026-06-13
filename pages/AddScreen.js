import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function AddScreen({ pills, setPills, setScreen }) {
  const [name, setName] = useState("");
  const [hour, setHour] = useState("08");
  const [minute, setMinute] = useState("00");
  const [days, setDays] = useState([]);

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const toggleDay = (day) => {
    if (days.includes(day)) {
      setDays(days.filter((d) => d !== day));
    } else {
      setDays([...days, day]);
    }
  };

  const addPill = () => {
    const time = `${hour}:${minute}`;
    if (!name.trim()) return;

    if (days.length === 0) {
      alert("Select at least one day");
      return;
    }

    const newPill = {
      id: Date.now().toString(),
      name,
      time,
      days,
      taken: false,
      completedDates: [],
    };

    setPills([...pills, newPill]);
    setScreen("home");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff", padding: 20 }}>
      
      {/* Header */}
      <Text style={{
        fontSize: 28,
        fontWeight: "bold",
        marginTop: 15,
        marginBottom: 20,
        color: "#111"
      }}>
        Add Pill 
      </Text>

      {/* Card */}
      <View
        style={{
          backgroundColor: "white",
          padding: 18,
          borderRadius: 22,
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 4,
        }}
      >

        {/* NAME */}
        <Text style={{ marginBottom: 6, color: "#666", fontWeight: "600" }}>
          Name
        </Text>

        <TextInput
          placeholder="e.g. Vitamin D"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#aaa"
          style={{
            borderWidth: 1,
            borderColor: "#E6E6E6",
            borderRadius: 12,
            padding: 12,
            marginBottom: 18,
            backgroundColor: "#FAFAFA"
          }}
        />

        {/* TIME */}
        <Text style={{ marginBottom: 6, color: "#666", fontWeight: "600" }}>
          Time
        </Text>

        <View style={{
          flexDirection: "row",
          marginBottom: 18,
          backgroundColor: "#FAFAFA",
          borderRadius: 12,
          padding: 6
        }}>
          <View style={{ flex: 1 }}>
            <Picker selectedValue={hour} onValueChange={setHour}>
              {Array.from({ length: 24 }, (_, i) => {
                const v = i.toString().padStart(2, "0");
                return <Picker.Item key={v} label={v} value={v} />;
              })}
            </Picker>
          </View>

          <View style={{ flex: 1 }}>
            <Picker selectedValue={minute} onValueChange={setMinute}>
              {Array.from({ length: 60 }, (_, i) => {
                const v = i.toString().padStart(2, "0");
                return <Picker.Item key={v} label={v} value={v} />;
              })}
            </Picker>
          </View>
        </View>

        {/* DAYS */}
        <Text style={{ marginBottom: 8, color: "#666", fontWeight: "600" }}>
          Select Days
        </Text>

        <View style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginBottom: 18
        }}>
          {weekDays.map((day) => (
            <TouchableOpacity
              key={day}
              onPress={() => toggleDay(day)}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 14,
                borderRadius: 14,
                margin: 4,
                backgroundColor: days.includes(day) ? "#4CAF50" : "#EAEAEA",
              }}
            >
              <Text style={{
                color: days.includes(day) ? "white" : "#333",
                fontWeight: "600"
              }}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          onPress={addPill}
          style={{
            backgroundColor: "#111",
            padding: 15,
            borderRadius: 14,
            alignItems: "center",
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 3 },
          }}
        >
          <Text style={{ color: "white", fontWeight: "700" }}>
            Save Pill
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}