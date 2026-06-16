import AppHeader from "@/components/AppHeader";
import styles from "@/styles/sessions.styles";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Sessions() {
  const API = "http://192.168.8.102:5000/api/sessions";
  const ageGroupsAPI = "http://192.168.8.102:5000/api/agegroups";

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
  const [startTimeModal, setStartTimeModal] = useState(false);
  const [endTimeModal, setEndTimeModal] = useState(false);
  const [tempHour, setTempHour] = useState("09");
  const [tempMinute, setTempMinute] = useState("00");
  const [tempAmPm, setTempAmPm] = useState("AM");
  const [timePickerTarget, setTimePickerTarget] = useState<"start" | "end">(
    "start",
  );

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

  // Generate hours (1-12)
  const hours = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0"),
  );

  // Generate minutes (00-59)
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );

  const ampmOptions = ["AM", "PM"];

  // Sort age groups in correct order (U-9, U-11, U-13, U-15, U-17)
  const sortAgeGroups = (groups: any[]) => {
    const order = ["U-9", "U-11", "U-13", "U-15", "U-17"];
    return [...groups].sort((a, b) => {
      const indexA = order.indexOf(a.age_group_name);
      const indexB = order.indexOf(b.age_group_name);
      if (indexA === -1 && indexB === -1) return 0;
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
  };

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
      // Sort the age groups
      const sortedData = sortAgeGroups(data);
      setAgeGroups(sortedData);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to load age groups");
    }
  };

  const filterSessions = () => {
    if (!Array.isArray(sessions)) return;

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

  const formatTimeForDisplay = (time: string) => {
    if (!time) return "--:-- --";
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour.toString().padStart(2, "0")}:${minutes} ${ampm}`;
  };

  const convertTo24Hour = (hour: string, minute: string, ampm: string) => {
    let hour24 = parseInt(hour);
    if (ampm === "PM" && hour24 !== 12) {
      hour24 += 12;
    } else if (ampm === "AM" && hour24 === 12) {
      hour24 = 0;
    }
    return `${hour24.toString().padStart(2, "0")}:${minute}`;
  };

  const openTimePicker = (target: "start" | "end") => {
    setTimePickerTarget(target);
    const currentTime = target === "start" ? startTime : endTime;
    if (currentTime) {
      const [hours, minutes] = currentTime.split(":");
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 || 12;
      setTempHour(displayHour.toString().padStart(2, "0"));
      setTempMinute(minutes);
      setTempAmPm(ampm);
    } else {
      setTempHour("09");
      setTempMinute("00");
      setTempAmPm("AM");
    }
    if (target === "start") {
      setStartTimeModal(true);
    } else {
      setEndTimeModal(true);
    }
  };

  const saveTime = () => {
    const time24 = convertTo24Hour(tempHour, tempMinute, tempAmPm);
    if (timePickerTarget === "start") {
      setStartTime(time24);
      setStartTimeModal(false);
    } else {
      setEndTime(time24);
      setEndTimeModal(false);
    }
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
    if (!startTime) {
      Alert.alert("Error", "Please select start time");
      return;
    }
    if (!endTime) {
      Alert.alert("Error", "Please select end time");
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
                  <Text style={styles.label}>Start Time</Text>
                  <TouchableOpacity
                    style={styles.timePickerButton}
                    onPress={() => openTimePicker("start")}
                  >
                    <Text style={styles.timePickerButtonText}>
                      {startTime ? formatTimeForDisplay(startTime) : "--:-- --"}
                    </Text>
                    <Ionicons name="time-outline" size={20} color="#2563EB" />
                  </TouchableOpacity>
                </View>
                <View style={styles.timeField}>
                  <Text style={styles.label}>End Time</Text>
                  <TouchableOpacity
                    style={styles.timePickerButton}
                    onPress={() => openTimePicker("end")}
                  >
                    <Text style={styles.timePickerButtonText}>
                      {endTime ? formatTimeForDisplay(endTime) : "--:-- --"}
                    </Text>
                    <Ionicons name="time-outline" size={20} color="#2563EB" />
                  </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.label}>Age Groups (Select multiple)</Text>
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

              {/* Selected Age Groups Summary */}
              {selectedAgeGroups.length > 0 && (
                <View style={styles.selectedSummary}>
                  <Text style={styles.selectedSummaryLabel}>
                    Selected: {selectedAgeGroups.length} age group(s)
                  </Text>
                  <Text style={styles.selectedSummaryText}>
                    {ageGroups
                      .filter((g) =>
                        selectedAgeGroups.includes(g.id.toString()),
                      )
                      .map((g) => g.age_group_name)
                      .join(", ")}
                  </Text>
                </View>
              )}

              <TouchableOpacity style={styles.save} onPress={saveSession}>
                <Text style={styles.saveText}>
                  {editId ? "Update Session" : "Add Session"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* Start Time Picker Modal */}
      <Modal
        transparent
        visible={startTimeModal}
        animationType="slide"
        onRequestClose={() => setStartTimeModal(false)}
      >
        <View style={styles.timePickerOverlay}>
          <View style={styles.timePickerModal}>
            <Text style={styles.timePickerTitle}>Select Start Time</Text>

            <View style={styles.timePickerRow}>
              <View style={styles.timePickerColumn}>
                <Text style={styles.timePickerLabel}>Hour</Text>
                <Picker
                  selectedValue={tempHour}
                  onValueChange={(itemValue) => setTempHour(itemValue)}
                  style={styles.timePicker}
                >
                  {hours.map((hour) => (
                    <Picker.Item key={hour} label={hour} value={hour} />
                  ))}
                </Picker>
              </View>

              <View style={styles.timePickerColumn}>
                <Text style={styles.timePickerLabel}>Minute</Text>
                <Picker
                  selectedValue={tempMinute}
                  onValueChange={(itemValue) => setTempMinute(itemValue)}
                  style={styles.timePicker}
                >
                  {minutes.map((minute) => (
                    <Picker.Item key={minute} label={minute} value={minute} />
                  ))}
                </Picker>
              </View>

              <View style={styles.timePickerColumn}>
                <Text style={styles.timePickerLabel}>AM/PM</Text>
                <Picker
                  selectedValue={tempAmPm}
                  onValueChange={(itemValue) => setTempAmPm(itemValue)}
                  style={styles.timePicker}
                >
                  {ampmOptions.map((option) => (
                    <Picker.Item key={option} label={option} value={option} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.timePickerButtons}>
              <TouchableOpacity
                style={[styles.timePickerButton, styles.cancelButton]}
                onPress={() => setStartTimeModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.timePickerButton, styles.confirmButton]}
                onPress={saveTime}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* End Time Picker Modal */}
      <Modal
        transparent
        visible={endTimeModal}
        animationType="slide"
        onRequestClose={() => setEndTimeModal(false)}
      >
        <View style={styles.timePickerOverlay}>
          <View style={styles.timePickerModal}>
            <Text style={styles.timePickerTitle}>Select End Time</Text>

            <View style={styles.timePickerRow}>
              <View style={styles.timePickerColumn}>
                <Text style={styles.timePickerLabel}>Hour</Text>
                <Picker
                  selectedValue={tempHour}
                  onValueChange={(itemValue) => setTempHour(itemValue)}
                  style={styles.timePicker}
                >
                  {hours.map((hour) => (
                    <Picker.Item key={hour} label={hour} value={hour} />
                  ))}
                </Picker>
              </View>

              <View style={styles.timePickerColumn}>
                <Text style={styles.timePickerLabel}>Minute</Text>
                <Picker
                  selectedValue={tempMinute}
                  onValueChange={(itemValue) => setTempMinute(itemValue)}
                  style={styles.timePicker}
                >
                  {minutes.map((minute) => (
                    <Picker.Item key={minute} label={minute} value={minute} />
                  ))}
                </Picker>
              </View>

              <View style={styles.timePickerColumn}>
                <Text style={styles.timePickerLabel}>AM/PM</Text>
                <Picker
                  selectedValue={tempAmPm}
                  onValueChange={(itemValue) => setTempAmPm(itemValue)}
                  style={styles.timePicker}
                >
                  {ampmOptions.map((option) => (
                    <Picker.Item key={option} label={option} value={option} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.timePickerButtons}>
              <TouchableOpacity
                style={[styles.timePickerButton, styles.cancelButton]}
                onPress={() => setEndTimeModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.timePickerButton, styles.confirmButton]}
                onPress={saveTime}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
