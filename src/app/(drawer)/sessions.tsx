import AppHeader from "@/components/AppHeader";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Sessions() {
  const API = "http://192.168.100.169:5000/api/sessions";
  const ageGroupsAPI = "http://192.168.100.169:5000/api/agegroups";

  const [sessions, setSessions] = useState<any[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<any[]>([]);
  const [ageGroups, setAgeGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [sessionName, setSessionName] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedAgeGroups, setSelectedAgeGroups] = useState<string[]>([]);
  const [editId, setEditId] = useState<number | null>(null);

  // Filter states
  const [selectedDayFilter, setSelectedDayFilter] = useState("All Days");
  const [selectedAgeGroupFilter, setSelectedAgeGroupFilter] =
    useState("All Age Groups");

  const days = [
    "All Days",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterSessions();
  }, [selectedDayFilter, selectedAgeGroupFilter, sessions]);

  const loadData = async () => {
    setLoading(true);
    await Promise.all([loadSessions(), loadAgeGroups()]);
    setLoading(false);
  };

  const loadSessions = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();
      setSessions(data);
      setFilteredSessions(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to load sessions");
    }
  };

  const loadAgeGroups = async () => {
    try {
      const response = await fetch(ageGroupsAPI);
      const data = await response.json();
      setAgeGroups(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterSessions = () => {
    let filtered = [...sessions];

    // Filter by day
    if (selectedDayFilter !== "All Days") {
      filtered = filtered.filter(
        (session) => session.day_of_week === selectedDayFilter,
      );
    }

    // Filter by age group
    if (selectedAgeGroupFilter !== "All Age Groups") {
      filtered = filtered.filter((session) => {
        const sessionAgeGroups =
          session.age_groups?.map((ag: any) => ag.age_group_name) || [];
        return (
          sessionAgeGroups.includes(selectedAgeGroupFilter) ||
          (sessionAgeGroups.length === 0 &&
            selectedAgeGroupFilter === "All Groups")
        );
      });
    }

    setFilteredSessions(filtered);
  };

  const toggleAgeGroup = (groupId: string) => {
    if (selectedAgeGroups.includes(groupId)) {
      setSelectedAgeGroups(selectedAgeGroups.filter((id) => id !== groupId));
    } else {
      setSelectedAgeGroups([...selectedAgeGroups, groupId]);
    }
  };

  const validateTime = (time: string) => {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
  };

  const saveSession = async () => {
    if (!sessionName.trim()) {
      Alert.alert("Error", "Please enter session name");
      return;
    }
    if (!dayOfWeek) {
      Alert.alert("Error", "Please select day of week");
      return;
    }
    if (!startTime || !validateTime(startTime)) {
      Alert.alert("Error", "Please enter valid start time (HH:MM format)");
      return;
    }
    if (!endTime || !validateTime(endTime)) {
      Alert.alert("Error", "Please enter valid end time (HH:MM format)");
      return;
    }

    try {
      let response;
      const sessionData = {
        session_name: sessionName,
        day_of_week: dayOfWeek,
        start_time: startTime,
        end_time: endTime,
        age_group_ids: selectedAgeGroups.map((id) => parseInt(id)),
      };

      if (editId) {
        response = await fetch(`${API}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sessionData),
        });
      } else {
        response = await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sessionData),
        });
      }

      if (response.ok) {
        setModal(false);
        resetForm();
        loadSessions();
        Alert.alert(
          "Success",
          `Session ${editId ? "updated" : "created"} successfully`,
        );
      } else {
        const error = await response.json();
        Alert.alert("Error", error.error || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to save session");
    }
  };

  const resetForm = () => {
    setSessionName("");
    setDayOfWeek("");
    setStartTime("");
    setEndTime("");
    setSelectedAgeGroups([]);
    setEditId(null);
  };

  const remove = async (id: number) => {
    Alert.alert(
      "Delete Session",
      "Are you sure you want to delete this session?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(`${API}/${id}`, {
                method: "DELETE",
              });
              if (response.ok) {
                loadSessions();
                Alert.alert("Success", "Session deleted successfully");
              } else {
                Alert.alert("Error", "Failed to delete session");
              }
            } catch (error) {
              console.log(error);
              Alert.alert("Error", "Failed to delete session");
            }
          },
        },
      ],
    );
  };

  const formatTime = (time: string) => {
    if (!time) return "-";
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  const getAgeGroupsText = (ageGroupsList: any[]) => {
    if (!ageGroupsList || ageGroupsList.length === 0) return "All Groups";
    return ageGroupsList.map((ag: any) => ag.age_group_name).join(", ");
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <AppHeader />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.top}>
            <View>
              <Text style={styles.title}>Practice Sessions</Text>
              <Text style={styles.sub}>Manage practice session schedules</Text>
            </View>

            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => {
                resetForm();
                setModal(true);
              }}
            >
              <Ionicons name="add" size={18} color="#fff" />
              <Text style={styles.addTxt}>Add Session</Text>
            </TouchableOpacity>
          </View>

          {/* Day Filter Buttons */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Day</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filterScroll}
            >
              <View style={styles.filterButtons}>
                {days.map((day) => (
                  <TouchableOpacity
                    key={day}
                    style={[
                      styles.filterChip,
                      selectedDayFilter === day && styles.filterChipActive,
                    ]}
                    onPress={() => setSelectedDayFilter(day)}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        selectedDayFilter === day &&
                          styles.filterChipTextActive,
                      ]}
                    >
                      {day}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Age Group Filter Buttons */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Age Group</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filterScroll}
            >
              <View style={styles.filterButtons}>
                <TouchableOpacity
                  style={[
                    styles.filterChip,
                    selectedAgeGroupFilter === "All Age Groups" &&
                      styles.filterChipActive,
                  ]}
                  onPress={() => setSelectedAgeGroupFilter("All Age Groups")}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      selectedAgeGroupFilter === "All Age Groups" &&
                        styles.filterChipTextActive,
                    ]}
                  >
                    All Age Groups
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.filterChip,
                    selectedAgeGroupFilter === "All Groups" &&
                      styles.filterChipActive,
                  ]}
                  onPress={() => setSelectedAgeGroupFilter("All Groups")}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      selectedAgeGroupFilter === "All Groups" &&
                        styles.filterChipTextActive,
                    ]}
                  >
                    All Groups
                  </Text>
                </TouchableOpacity>
                {ageGroups.map((group) => (
                  <TouchableOpacity
                    key={group.id}
                    style={[
                      styles.filterChip,
                      selectedAgeGroupFilter === group.age_group_name &&
                        styles.filterChipActive,
                    ]}
                    onPress={() =>
                      setSelectedAgeGroupFilter(group.age_group_name)
                    }
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        selectedAgeGroupFilter === group.age_group_name &&
                          styles.filterChipTextActive,
                      ]}
                    >
                      {group.age_group_name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Session Count */}
          <View style={styles.countContainer}>
            <Text style={styles.countText}>
              All Sessions ({filteredSessions.length})
            </Text>
          </View>

          {/* Sessions Table with Scroll Bar */}
          <ScrollView horizontal showsHorizontalScrollIndicator={true}>
            <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <Text style={[styles.headerCell, { width: 200 }]}>
                  Session Name
                </Text>
                <Text style={[styles.headerCell, { width: 120 }]}>Day</Text>
                <Text style={[styles.headerCell, { width: 120 }]}>
                  Start Time
                </Text>
                <Text style={[styles.headerCell, { width: 120 }]}>
                  End Time
                </Text>
                <Text style={[styles.headerCell, { width: 180 }]}>
                  Age Groups
                </Text>
                <Text style={[styles.headerCell, { width: 100 }]}>Actions</Text>
              </View>

              {filteredSessions.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Ionicons name="calendar-outline" size={50} color="#CBD5E1" />
                  <Text style={styles.emptyText}>No sessions found</Text>
                  <Text style={styles.emptySubText}>
                    Tap "Add Session" to create one
                  </Text>
                </View>
              ) : (
                <FlatList
                  data={filteredSessions}
                  keyExtractor={(item) => item.id.toString()}
                  scrollEnabled={false}
                  renderItem={({ item }) => (
                    <View style={styles.tableRow}>
                      <Text
                        style={[styles.cell, { width: 200 }]}
                        numberOfLines={2}
                      >
                        {item.session_name}
                      </Text>
                      <Text style={[styles.cell, { width: 120 }]}>
                        {item.day_of_week}
                      </Text>
                      <Text style={[styles.cell, { width: 120 }]}>
                        {formatTime(item.start_time)}
                      </Text>
                      <Text style={[styles.cell, { width: 120 }]}>
                        {formatTime(item.end_time)}
                      </Text>
                      <Text
                        style={[styles.cell, { width: 180 }]}
                        numberOfLines={2}
                      >
                        {getAgeGroupsText(item.age_groups)}
                      </Text>
                      <View style={[styles.actionRow, { width: 100 }]}>
                        <TouchableOpacity
                          onPress={() => {
                            setEditId(item.id);
                            setSessionName(item.session_name);
                            setDayOfWeek(item.day_of_week);
                            setStartTime(item.start_time.substring(0, 5));
                            setEndTime(item.end_time.substring(0, 5));
                            setSelectedAgeGroups(
                              item.age_groups?.map((ag: any) =>
                                ag.id.toString(),
                              ) || [],
                            );
                            setModal(true);
                          }}
                        >
                          <Ionicons
                            name="create-outline"
                            size={20}
                            color="#2563EB"
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{ marginLeft: 16 }}
                          onPress={() => remove(item.id)}
                        >
                          <Ionicons
                            name="trash-outline"
                            size={20}
                            color="#EF4444"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                />
              )}
            </View>
          </ScrollView>
        </View>
      </ScrollView>

      {/* Add/Edit Modal */}
      <Modal
        transparent
        visible={modal}
        animationType="slide"
        onRequestClose={() => {
          setModal(false);
          resetForm();
        }}
      >
        <View style={styles.overlay}>
          <ScrollView contentContainerStyle={styles.modalScroll}>
            <View style={styles.modal}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {editId
                    ? "Edit Practice Session"
                    : "Add New Practice Session"}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setModal(false);
                    resetForm();
                  }}
                >
                  <Ionicons name="close" size={24} color="#64748B" />
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Session Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Morning Practice, Advanced Training"
                value={sessionName}
                onChangeText={setSessionName}
              />

              <Text style={styles.label}>Day of Week</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={dayOfWeek}
                  onValueChange={(itemValue) => setDayOfWeek(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select day" value="" />
                  {days
                    .filter((d) => d !== "All Days")
                    .map((day) => (
                      <Picker.Item key={day} label={day} value={day} />
                    ))}
                </Picker>
              </View>

              <View style={styles.timeRow}>
                <View style={styles.timeField}>
                  <Text style={styles.label}>Start Time (HH:MM)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="09:00"
                    value={startTime}
                    onChangeText={setStartTime}
                  />
                </View>
                <View style={styles.timeField}>
                  <Text style={styles.label}>End Time (HH:MM)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="11:00"
                    value={endTime}
                    onChangeText={setEndTime}
                  />
                </View>
              </View>

              <Text style={styles.label}>Age Groups</Text>
              <View style={styles.ageGroupContainer}>
                {ageGroups.map((group) => (
                  <TouchableOpacity
                    key={group.id}
                    style={[
                      styles.ageGroupChip,
                      selectedAgeGroups.includes(group.id.toString()) &&
                        styles.ageGroupChipSelected,
                    ]}
                    onPress={() => toggleAgeGroup(group.id.toString())}
                  >
                    <Text
                      style={[
                        styles.ageGroupChipText,
                        selectedAgeGroups.includes(group.id.toString()) &&
                          styles.ageGroupChipTextSelected,
                      ]}
                    >
                      {group.age_group_name}
                    </Text>
                  </TouchableOpacity>
                ))}
                {ageGroups.length === 0 && (
                  <Text style={styles.noAgeGroups}>
                    No age groups available
                  </Text>
                )}
              </View>

              <TouchableOpacity style={styles.save} onPress={saveSession}>
                <Text style={styles.saveText}>
                  {editId ? "Update Session" : "Add Session"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },

  title: {
    fontSize: 25,
    fontWeight: "700",
  },

  sub: {
    color: "#64748B",
    marginTop: 4,
  },

  addBtn: {
    backgroundColor: "#2563EB",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },

  addTxt: {
    color: "#fff",
    fontWeight: "500",
    marginLeft: 6,
  },

  filterSection: {
    marginBottom: 20,
  },

  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 10,
  },

  filterScroll: {
    flexGrow: 0,
  },

  filterButtons: {
    flexDirection: "row",
    gap: 8,
  },

  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginRight: 8,
  },

  filterChipActive: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  filterChipText: {
    fontSize: 14,
    color: "#475569",
  },

  filterChipTextActive: {
    color: "#fff",
  },

  countContainer: {
    marginBottom: 16,
  },

  countText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
  },

  tableContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
    minWidth: 840, // This ensures the table has a minimum width for horizontal scrolling
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingVertical: 16,
    paddingHorizontal: 15,
  },

  headerCell: {
    fontWeight: "700",
    color: "#475569",
    fontSize: 13,
  },

  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  cell: {
    fontSize: 14,
    color: "#111827",
  },

  actionRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  emptyContainer: {
    alignItems: "center",
    paddingVertical: 60,
  },

  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#64748B",
    marginTop: 12,
  },

  emptySubText: {
    fontSize: 14,
    color: "#94A3B8",
    marginTop: 4,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
  },

  modalScroll: {
    flexGrow: 1,
    justifyContent: "center",
  },

  modal: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 20,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    flex: 1,
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#475569",
    marginBottom: 6,
    marginTop: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 14,
    borderRadius: 12,
    fontSize: 15,
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    overflow: "hidden",
  },

  picker: {
    height: 50,
  },

  timeRow: {
    flexDirection: "row",
    gap: 12,
  },

  timeField: {
    flex: 1,
  },

  ageGroupContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 6,
    gap: 8,
  },

  ageGroupChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#fff",
  },

  ageGroupChipSelected: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  ageGroupChipText: {
    color: "#475569",
    fontSize: 14,
  },

  ageGroupChipTextSelected: {
    color: "#fff",
  },

  noAgeGroups: {
    color: "#94A3B8",
    fontSize: 14,
    paddingVertical: 10,
  },

  save: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
  },

  saveText: {
    color: "#fff",
    fontWeight: "600",
  },
});
