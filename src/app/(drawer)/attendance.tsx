import AppHeader from "@/components/AppHeader";
import styles from "@/styles/attendance.styles";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Attendance() {
  const API = "http://192.168.8.102:5000/api/attendance";
  const SESSIONS_API = "http://192.168.8.102:5000/api/sessions";
  const AGE_GROUPS_API = "http://192.168.8.102:5000/api/agegroups";
  const STUDENTS_API = "http://192.168.8.102:5000/api/students";

  const [sessions, setSessions] = useState<any[]>([]);
  const [ageGroups, setAgeGroups] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<any[]>([]);
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Date states
  const [markingDate, setMarkingDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  // Modal states for student details
  const [detailModal, setDetailModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [attendanceHistory, setAttendanceHistory] = useState<any[]>([]);

  // Month data for attendance history
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [selectedSession, selectedAgeGroup, searchQuery, students]);

  const loadData = async () => {
    setLoading(true);
    await Promise.all([
      loadSessions(),
      loadAgeGroups(),
      loadStudents(),
    ]);
    setLoading(false);
  };

  const loadSessions = async () => {
    try {
      const response = await fetch(SESSIONS_API);
      const data = await response.json();
      setSessions(data);
      if (data.length > 0) {
        setSelectedSession(data[0].id.toString());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadAgeGroups = async () => {
    try {
      const response = await fetch(AGE_GROUPS_API);
      const data = await response.json();
      setAgeGroups(data);
      if (data.length > 0) {
        setSelectedAgeGroup(data[0].id.toString());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadStudents = async () => {
    try {
      const response = await fetch(STUDENTS_API);
      const data = await response.json();
      setStudents(data);
      setFilteredStudents(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterStudents = () => {
    let filtered = [...students];

    // Filter by age group
    if (selectedAgeGroup) {
      filtered = filtered.filter(
        (student) => student.age_group_id === parseInt(selectedAgeGroup)
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (student) =>
          student.student_name?.toLowerCase().includes(query) ||
          student.registration_number?.toLowerCase().includes(query)
      );
    }

    setFilteredStudents(filtered);
  };

  const toggleStudentSelection = (studentId: number) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  const toggleAllStudents = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(s => s.id));
    }
  };

  const markAttendance = async () => {
    if (selectedStudents.length === 0) {
      Alert.alert("Error", "Please select at least one student");
      return;
    }

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: parseInt(selectedSession),
          student_ids: selectedStudents,
          date: markingDate.toISOString().split('T')[0],
          status: "present"
        }),
      });

      if (response.ok) {
        Alert.alert("Success", "Attendance marked successfully!");
        setSelectedStudents([]);
        loadStudents();
      } else {
        Alert.alert("Error", "Failed to mark attendance");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Error marking attendance");
    }
  };

  const viewStudentDetails = async (student: any) => {
    setSelectedStudent(student);
    await loadAttendanceHistory(student.id);
    setDetailModal(true);
  };

  const loadAttendanceHistory = async (studentId: number) => {
    try {
      const response = await fetch(`${API}/history/${studentId}`);
      const data = await response.json();
      setAttendanceHistory(data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatDateForDisplay = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long',
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    setShowCalendar(false);
    if (selectedDate) {
      setMarkingDate(selectedDate);
    }
  };

  // Get selected session name
  const selectedSessionObj = sessions.find(s => s.id.toString() === selectedSession);
  const selectedAgeGroupObj = ageGroups.find(a => a.id.toString() === selectedAgeGroup);

  // Check if session exists for this day
  const sessionForDay = sessions.filter(s => 
    s.day_of_week === markingDate.toLocaleDateString('en-US', { weekday: 'long' })
  );

  return (
    <View style={styles.container}>
      <AppHeader />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.top}>
            <View>
              <Text style={styles.title}>Attendance Tracker</Text>
              <Text style={styles.sub}>Mark daily attendance and view student history</Text>
            </View>
          </View>

          {/* Session Dropdown */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>SESSION</Text>
            <View style={styles.dropdownCard}>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedSession}
                  onValueChange={(itemValue) => setSelectedSession(itemValue)}
                  style={styles.picker}
                >
                  {sessions.map((session) => (
                    <Picker.Item 
                      key={session.id} 
                      label={`${session.session_name} (${session.day_of_week})`} 
                      value={session.id.toString()} 
                    />
                  ))}
                </Picker>
              </View>
              <Text style={styles.sessionDate}>
                {selectedSessionObj ? selectedSessionObj.day_of_week : ""}
                {selectedSessionObj && ` · ${formatDate(markingDate)}`}
              </Text>
            </View>
          </View>

          {/* Marking Date with Calendar */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>MARKING DATE</Text>
            <TouchableOpacity 
              style={styles.dateCard}
              onPress={() => setShowDatePicker(true)}
            >
              <View style={styles.dateIcon}>
                <Ionicons name="calendar-outline" size={24} color="#2563EB" />
              </View>
              <Text style={styles.dateText}>{formatDateForDisplay(markingDate)}</Text>
              <Ionicons name="chevron-down" size={20} color="#94A3B8" />
            </TouchableOpacity>

            {/* Date Picker */}
            {showDatePicker && (
              <DateTimePicker
                value={markingDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onDateChange}
              />
            )}

            {/* Warning Message */}
            {sessionForDay.length === 0 && (
              <View style={styles.warningContainer}>
                <Ionicons name="warning-outline" size={20} color="#EF4444" />
                <Text style={styles.warningText}>
                  No such sessions scheduled for this weekday.
                </Text>
              </View>
            )}
          </View>

          {/* Age Group and Search */}
          <View style={styles.controlsSection}>
            <View style={styles.ageGroupRow}>
              <Text style={styles.sectionLabel}>AGE GROUP</Text>
              <View style={styles.ageGroupPickerContainer}>
                <Picker
                  selectedValue={selectedAgeGroup}
                  onValueChange={(itemValue) => setSelectedAgeGroup(itemValue)}
                  style={styles.ageGroupPicker}
                >
                  <Picker.Item label="All Groups" value="" />
                  {ageGroups.map((group) => (
                    <Picker.Item 
                      key={group.id} 
                      label={group.age_group_name} 
                      value={group.id.toString()} 
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.searchRow}>
              <Ionicons name="search-outline" size={20} color="#94A3B8" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                placeholderTextColor="#94A3B8"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* Select All */}
          <TouchableOpacity style={styles.selectAll} onPress={toggleAllStudents}>
            <View style={styles.checkbox}>
              {selectedStudents.length === filteredStudents.length && filteredStudents.length > 0 && (
                <Ionicons name="checkmark" size={16} color="#2563EB" />
              )}
            </View>
            <Text style={styles.selectAllText}>
              Select All ({filteredStudents.length})
            </Text>
          </TouchableOpacity>

          {/* Students List */}
          <FlatList
            data={filteredStudents}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.studentItem}
                onPress={() => toggleStudentSelection(item.id)}
              >
                <View style={styles.studentCheckbox}>
                  {selectedStudents.includes(item.id) && (
                    <Ionicons name="checkmark" size={16} color="#2563EB" />
                  )}
                </View>
                <View style={styles.studentInfo}>
                  <Text style={styles.studentName}>{item.student_name}</Text>
                  <Text style={styles.studentMeta}>
                    {item.registration_number} · {item.age_group_name || "No Group"}
                  </Text>
                </View>
                <TouchableOpacity 
                  style={styles.viewBtn}
                  onPress={() => viewStudentDetails(item)}
                >
                  <Ionicons name="eye-outline" size={20} color="#2563EB" />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />

          {/* Mark Attendance Button */}
          <TouchableOpacity 
            style={[styles.markBtn, selectedStudents.length === 0 && styles.markBtnDisabled]}
            onPress={markAttendance}
            disabled={selectedStudents.length === 0 || sessionForDay.length === 0}
          >
            <Text style={styles.markBtnText}>
              Mark Attendance ({selectedStudents.length})
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Student Details Modal */}
      <Modal
        visible={detailModal}
        transparent
        animationType="slide"
        onRequestClose={() => setDetailModal(false)}
      >
        <View style={styles.modalOverlay}>
          <ScrollView style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Student Details</Text>
              <TouchableOpacity onPress={() => setDetailModal(false)}>
                <Ionicons name="close" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>

            {selectedStudent && (
              <>
                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Name</Text>
                  <Text style={styles.detailValue}>{selectedStudent.student_name}</Text>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Registration Number</Text>
                  <Text style={styles.detailValue}>{selectedStudent.registration_number}</Text>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>CONTACT</Text>
                  <Text style={styles.detailValue}>{selectedStudent.contact_number || "N/A"}</Text>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>PARENT CONTACT</Text>
                  <Text style={styles.detailValue}>{selectedStudent.parent_contact || "N/A"}</Text>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>EMAIL ADDRESS</Text>
                  <Text style={styles.detailValue}>{selectedStudent.email || "N/A"}</Text>
                </View>

                <Text style={styles.historyTitle}>Attendance History (2026)</Text>

                {/* Monthly Attendance Grid */}
                <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                  <View style={styles.attendanceGrid}>
                    {months.slice(0, 9).map((month, monthIndex) => (
                      <View key={month} style={styles.monthColumn}>
                        <Text style={styles.monthLabel}>{month}</Text>
                        <View style={styles.daysGrid}>
                          {Array.from({ length: 31 }, (_, dayIndex) => {
                            const day = dayIndex + 1;
                            // This would be actual attendance data
                            const isPresent = [1, 3, 5, 7, 10, 13, 17, 20, 24, 27, 31].includes(day);
                            const hasAttendance = isPresent || [2, 4, 6, 8, 9, 11, 12, 14, 15, 16, 18, 19, 21, 22, 23, 25, 26, 28, 29, 30].includes(day);
                            
                            return (
                              <View 
                                key={day} 
                                style={[
                                  styles.dayCell,
                                  isPresent && styles.dayPresent,
                                  !isPresent && hasAttendance && styles.dayAbsent,
                                  !hasAttendance && styles.dayEmpty
                                ]}
                              >
                                <Text style={[
                                  styles.dayText,
                                  isPresent && styles.dayTextPresent,
                                  !isPresent && hasAttendance && styles.dayTextAbsent,
                                ]}>
                                  {day}
                                </Text>
                              </View>
                            );
                          })}
                        </View>
                      </View>
                    ))}
                  </View>
                </ScrollView>

                {/* Attendance Summary */}
                <View style={styles.attendanceSummary}>
                  <Text style={styles.summaryText}>
                    0 days present · 34 days absent
                  </Text>
                  <Text style={styles.summaryPercentage}>
                    Overall Attendance: 0%
                  </Text>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}