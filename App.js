import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HomeScreen from "./pages/HomeScreen";
import AddScreen from "./pages/AddScreen";

export default function App() {
  const [pills, setPills] = useState([]);
  const [screen, setScreen] = useState("home"); // 👈 switch

  // LOAD
  useEffect(() => {
    const load = async () => {
      const data = await AsyncStorage.getItem("PILLS");
      if (data) setPills(JSON.parse(data));
    };
    load();
  }, []);

  // SAVE
  useEffect(() => {
    AsyncStorage.setItem("PILLS", JSON.stringify(pills));
  }, [pills]);

  return (
    <View style={{ flex: 1 }}>

      {/* TOP NAV */}
      <View style={{
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: 50,
        paddingBottom: 10,
        backgroundColor: "#eee"
      }}>
        <TouchableOpacity onPress={() => setScreen("home")}>
          <Text style={{ fontSize: 22 }}>🏠</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setScreen("add")}>
          <Text style={{ fontSize: 22 }}>➕</Text>
        </TouchableOpacity>
      </View>

      {/* SCREENS */}
      {screen === "home" ? (
        <HomeScreen pills={pills} setPills={setPills} />
      ) : (
        <AddScreen
          pills={pills}
          setPills={setPills}
          setScreen={setScreen}   // 👈 ADD THIS
        />
      )}

    </View>
  );
}