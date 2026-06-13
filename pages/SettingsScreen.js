import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput } from "react-native";

export default function SettingsScreen({ pills, setPills }) {

  const [pinVisible, setPinVisible] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);
  const [pin, setPin] = React.useState("");

  const correctPin = "1234";

  const deletePill = (id) => {
    setPills(pills.filter((p) => p.id !== id));
  };

  const confirmDelete = () => {
    if (pin === correctPin) {
      deletePill(selectedId);
      setPin("");
      setPinVisible(false);
      setSelectedId(null);
    } else {
      alert("Wrong PIN");
    }
  };

  const today = new Date();

  const totalSupplements = pills.length;

  const totalTaken = pills.reduce(
    (sum, pill) => sum + (pill.completedDates || []).length,
    0
  );

  const totalScheduled = pills.reduce(
    (sum, pill) => sum + (pill.days?.length || 0),
    0
  );

  const completionPercent =
    totalScheduled === 0
      ? 0
      : Math.min(
          100,
          Math.round((totalTaken / totalScheduled) * 100)
        );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginTop: 15,
          marginBottom: 20,
          marginLeft: 5,
        }}
      >
        Overview
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Progress Card */}
        <View
          style={{
            backgroundColor: "#4CAF50",
            borderRadius: 24,
            padding: 22,
            marginBottom: 22,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            Your Progress
          </Text>

          <Text
            style={{
              color: "white",
              fontSize: 42,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            {completionPercent}%
          </Text>

          <Text style={{ color: "rgba(255,255,255,0.9)" }}>
            Overall completion
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                {totalSupplements}
              </Text>

              <Text style={{ color: "rgba(255,255,255,0.9)" }}>
                Supplements
              </Text>
            </View>

            <View>
              <Text
                style={{
                  color: "white",
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                {totalTaken}
              </Text>

              <Text style={{ color: "rgba(255,255,255,0.9)" }}>
                Check-ins
              </Text>
            </View>
          </View>
        </View>

        {/* Empty State */}
        {pills.length === 0 ? (
          <View
            style={{
              backgroundColor: "white",
              padding: 30,
              borderRadius: 20,
              alignItems: "center",

              shadowColor: "#000",
              shadowOpacity: 0.08,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 3 },
              elevation: 3,
            }}
          >
            <Text style={{ fontSize: 50 }}>💊</Text>

            <Text
              style={{
                marginTop: 10,
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              No supplements yet
            </Text>

            <Text
              style={{
                color: "gray",
                marginTop: 5,
                textAlign: "center",
              }}
            >
              Add your first supplement to start tracking.
            </Text>
          </View>
        ) : (
          pills.map((pill) => {
            const last7Days = Array.from(
              { length: 7 },
              (_, index) => {
                const date = new Date();
                date.setDate(today.getDate() - (6 - index));
                return date;
              }
            );

            return (
              <View
                key={pill.id}
                style={{
                  backgroundColor: "white",
                  padding: 20,
                  borderRadius: 20,
                  marginBottom: 16,

                  shadowColor: "#000",
                  shadowOpacity: 0.08,
                  shadowRadius: 8,
                  shadowOffset: { width: 0, height: 3 },
                  elevation: 3,
                }}
              >
                {/* Header */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "700",
                        marginLeft: -4,
                      }}
                    >
                      {pill.name}
                    </Text>

                    <Text
                      style={{
                        color: "#666",
                        marginTop: 3,
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "600",
                          textDecorationLine: "underline",
                        }}
                      >
                        {pill.time}
                      </Text>
                      {" on "}
                      {pill.days.join(", ")}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      setSelectedId(pill.id);
                      setPinVisible(true);
                    }}
                    style={{ padding: 6 }}
                  >
                    <Text
                      style={{
                        color: "#ff0400",
                        fontSize: 20,
                        opacity: 0.6,
                      }}
                    >
                      ✕
                    </Text>
                  </TouchableOpacity>
                </View>


                {/* 7 Day Tracker */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 18,
                  }}
                >
                  {last7Days.map((date) => {
                    const dateString = date.toDateString();

                    const taken = (
                      pill.completedDates || []
                    ).includes(dateString);

                    return (
                      <View
                        key={dateString}
                        style={{ alignItems: "center" }}
                      >
                        <Text
                          style={{
                            fontSize: 11,
                            color: "#777",
                            marginBottom: 6,
                          }}
                        >
                          {date.toLocaleDateString("en-US", {
                            weekday: "short",
                          })}
                        </Text>

                        <View
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: 13,
                            backgroundColor: taken
                              ? "#4CAF50"
                              : "#ECECEC",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: taken ? "white" : "#999",
                              fontWeight: "700",
                              fontSize: 12,
                            }}
                          >
                            {taken ? "✓" : "•"}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      <Modal visible={pinVisible} transparent animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "85%",
              backgroundColor: "white",
              borderRadius: 20,
              padding: 20,
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 5 },
              elevation: 8,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}>
              Confirm Delete
            </Text>

            <Text style={{ fontSize: 13, color: "#666", marginBottom: 15 }}>
              Enter your PIN to remove this supplement
            </Text>

            <TextInput
              value={pin}
              onChangeText={setPin}
              keyboardType="numeric"
              secureTextEntry
              placeholder="••••"
              placeholderTextColor="#aaa"
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 12,
                padding: 12,
                fontSize: 16,
                marginBottom: 20,
                textAlign: "center",
                letterSpacing: 6,
              }}
            />

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <TouchableOpacity
                onPress={() => {
                  setPinVisible(false);
                  setPin("");
                  setSelectedId(null);
                }}
                style={{
                  flex: 1,
                  padding: 12,
                  borderRadius: 12,
                  backgroundColor: "#eee",
                  marginRight: 8,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "600", color: "#333" }}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={confirmDelete}
                style={{
                  flex: 1,
                  padding: 12,
                  borderRadius: 12,
                  backgroundColor: "#ff4d4d",
                  marginLeft: 8,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "600", color: "white" }}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> 

    </View>
  );
}