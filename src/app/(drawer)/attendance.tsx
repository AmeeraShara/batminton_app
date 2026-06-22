import AppHeader from "@/components/AppHeader";
import styles from "@/styles/attendance.styles";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Attendance() {
  // API URLs - FIXED duplicate declaration
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

  // Modal states for student details
  const [detailModal, setDetailModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [attendanceHistory, setAttendanceHistory] = useState<any[]>([]);

  // History month/year state
  const [historyMonth, setHistoryMonth] = useState(new Date().getMonth());
  const [historyYear, setHistoryYear] = useState(new Date().getFullYear());

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [selectedSession, selectedAgeGroup, searchQuery, students]);

  const loadData = async () => {
    setLoading(true);
    try {
      await Promise.all([loadSessions(), loadAgeGroups(), loadStudents()]);
    } catch (error) {
      console.error("Error loading data:", error);
      Alert.alert("Error", "Failed to load data. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const loadSessions = async () => {
    try {
      const response = await fetch(SESSIONS_API);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setSessions(data);
      if (data.length > 0) {
        setSelectedSession(data[0].id.toString());
      }
    } catch (error) {
      console.error("Error loading sessions:", error);
      Alert.alert("Error", "Failed to load sessions");
    }
  };

  const loadAgeGroups = async () => {
    try {
      const response = await fetch(AGE_GROUPS_API);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setAgeGroups(data);
      if (data.length > 0) {
        setSelectedAgeGroup(data[0].id.toString());
      }
    } catch (error) {
      console.error("Error loading age groups:", error);
      Alert.alert("Error", "Failed to load age groups");
    }
  };

  const loadStudents = async () => {
    try {
      const response = await fetch(STUDENTS_API);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setStudents(data);
      setFilteredStudents(data);
    } catch (error) {
      console.error("Error loading students:", error);
      Alert.alert("Error", "Failed to load students");
    }
  };

  const filterStudents = () => {
    let filtered = [...students];

    if (selectedAgeGroup) {
      filtered = filtered.filter(
        (student) => student.age_group_id === parseInt(selectedAgeGroup),
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (student) =>
          student.student_name?.toLowerCase().includes(query) ||
          student.registration_number?.toLowerCase().includes(query),
      );
    }

    setFilteredStudents(filtered);
  };

  const toggleStudentSelection = (studentId: number) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  const toggleAllStudents = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map((s) => s.id));
    }
  };

  const markAttendance = async () => {
    if (selectedStudents.length === 0) {
      Alert.alert("Error", "Please select at least one student");
      return;
    }

    // Check if session exists for the selected day
    const sessionForDay = sessions.filter(
      (s) =>
        s.day_of_week ===
        markingDate.toLocaleDateString("en-US", { weekday: "long" }),
    );

    if (sessionForDay.length === 0) {
      Alert.alert("Error", "No sessions scheduled for this day");
      return;
    }

    try {
      const requestBody = {
        session_id: parseInt(selectedSession),
        student_ids: selectedStudents,
        age_group_id: selectedAgeGroup ? parseInt(selectedAgeGroup) : null,
        date: markingDate.toISOString().split("T")[0],
        status: "present",
        remarks: null,
      };

      console.log("Sending attendance data:", requestBody);

      const response = await fetch(API, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(requestBody),
      });

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Non-JSON response:", text);
        throw new Error("Server returned non-JSON response");
      }

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Attendance marked successfully!");
        setSelectedStudents([]);
        // Reload students to refresh the list
        await loadStudents();
      } else {
        Alert.alert("Error", data?.error || data?.message || "Failed to mark attendance");
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
      Alert.alert("Error", "Server error while marking attendance. Please try again.");
    }
  };

  const viewStudentDetails = async (student: any) => {
    setSelectedStudent(student);
    await loadAttendanceHistory(student.id);
    setDetailModal(true);
  };

  const loadAttendanceHistory = async (studentId: number) => {
    try {
      // Corrected URL - matches backend route /student/:studentId
      const url = `${API}/student/${studentId}`;
      console.log("Fetching attendance history from:", url);
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setAttendanceHistory(data || []);
    } catch (error) {
      console.error("Error loading attendance history:", error);
      setAttendanceHistory([]);
      Alert.alert("Error", "Failed to load attendance history");
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDateForDisplay = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const selectedSessionObj = sessions.find(
    (s) => s.id.toString() === selectedSession,
  );
  const sessionForDay = sessions.filter(
    (s) =>
      s.day_of_week ===
      markingDate.toLocaleDateString("en-US", { weekday: "long" }),
  );

  // Calendar functions - returns array of weeks (each week is array of 7 days)
  const getCalendarWeeks = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();

    const weeks = [];
    let currentWeek = [];

    // Add empty cells for days before the first day of month
    for (let i = 0; i < startDayOfWeek; i++) {
      currentWeek.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(day);

      // If we have 7 days in the week, start a new week
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    // Add remaining empty cells to complete the last week
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }

    return weeks;
  };

  // Get attendance status for a specific day
  const getAttendanceStatus = (day: number, month: number, year: number) => {
    if (
      !selectedStudent ||
      !attendanceHistory ||
      attendanceHistory.length === 0
    )
      return null;

    const date = new Date(year, month, day);
    const dateStr = date.toISOString().split("T")[0];

    const record = attendanceHistory.find((h) => {
      const recordDate = h.attendance_date ? new Date(h.attendance_date) : null;
      if (!recordDate) return false;
      const recordDateStr = recordDate.toISOString().split("T")[0];
      return recordDateStr === dateStr;
    });

    if (record) {
      return record.status || null;
    }
    return null;
  };

  // Get attendance statistics for the year
  const getYearlyAttendanceStats = () => {
    if (!attendanceHistory || attendanceHistory.length === 0) {
      return { present: 0, absent: 0, total: 0, percentage: 0 };
    }

    const present = attendanceHistory.filter(
      (h) => h.status === "present" || h.status === "Present",
    ).length;
    const absent = attendanceHistory.filter(
      (h) => h.status === "absent" || h.status === "Absent",
    ).length;
    const total = attendanceHistory.length;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

    return { present, absent, total, percentage };
  };

  // Get monthly statistics
  const getMonthlyStats = (month: number, year: number) => {
    if (!attendanceHistory || attendanceHistory.length === 0) {
      return { present: 0, absent: 0, total: 0 };
    }

    const monthRecords = attendanceHistory.filter((h) => {
      const date = h.attendance_date ? new Date(h.attendance_date) : null;
      if (!date) return false;
      return date.getMonth() === month && date.getFullYear() === year;
    });

    const present = monthRecords.filter((h) => 
      h.status === "present" || h.status === "Present"
    ).length;
    const absent = monthRecords.filter((h) => 
      h.status === "absent" || h.status === "Absent"
    ).length;
    const total = monthRecords.length;

    return { present, absent, total };
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleDateSelect = (day: number) => {
    const newDate = new Date(
      markingDate.getFullYear(),
      markingDate.getMonth(),
      day,
    );
    setMarkingDate(newDate);
    setShowDatePicker(false);
  };

  const changeMonth = (increment: number) => {
    const newDate = new Date(markingDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setMarkingDate(newDate);
  };

  const changeHistoryMonth = (increment: number) => {
    let newMonth = historyMonth + increment;
    let newYear = historyYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }

    setHistoryMonth(newMonth);
    setHistoryYear(newYear);
  };

  const stats = getYearlyAttendanceStats();
  const calendarWeeks = getCalendarWeeks(
    markingDate.getMonth(),
    markingDate.getFullYear(),
  );
  const historyWeeks = getCalendarWeeks(historyMonth, historyYear);
  const monthStats = getMonthlyStats(historyMonth, historyYear);

  return (
    <View style={styles.container}>
      <AppHeader />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.top}>
            <View>
              <Text style={styles.title}>Attendance Tracker</Text>
              <Text style={styles.sub}>
                Mark daily attendance and view student history
              </Text>
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
            </View>
          </View>

          {/* Marking Date with Calendar */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>MARKING DATE</Text>

            <TouchableOpacity
              style={styles.dateCard}
              onPress={() => setShowDatePicker(!showDatePicker)}
            >
              <View style={styles.dateIcon}>
                <Ionicons name="calendar-outline" size={24} color="#2563EB" />
              </View>
              <Text style={styles.dateText}>
                {formatDateForDisplay(markingDate)}
              </Text>
              <Ionicons
                name={showDatePicker ? "chevron-up" : "chevron-down"}
                size={20}
                color="#94A3B8"
              />
            </TouchableOpacity>

            {/* Compact Calendar */}
            {showDatePicker && (
              <View style={styles.calendarContainer}>
                <View style={styles.calendarHeader}>
                  <TouchableOpacity
                    onPress={() => changeMonth(-1)}
                    style={styles.calendarNav}
                  >
                    <Ionicons name="chevron-back" size={24} color="#2563EB" />
                  </TouchableOpacity>
                  <Text style={styles.calendarMonthText}>
                    {monthNames[markingDate.getMonth()]}{" "}
                    {markingDate.getFullYear()}
                  </Text>
                  <TouchableOpacity
                    onPress={() => changeMonth(1)}
                    style={styles.calendarNav}
                  >
                    <Ionicons
                      name="chevron-forward"
                      size={24}
                      color="#2563EB"
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.weekDaysRow}>
                  {weekDays.map((day) => (
                    <Text key={day} style={styles.weekDayText}>
                      {day}
                    </Text>
                  ))}
                </View>

                <View style={styles.calendarGrid}>
                  {calendarWeeks.map((week, weekIndex) => (
                    <View key={weekIndex} style={styles.calendarWeek}>
                      {week.map((day, dayIndex) => {
                        const status = day
                          ? getAttendanceStatus(
                              day,
                              markingDate.getMonth(),
                              markingDate.getFullYear(),
                            )
                          : null;
                        const isToday =
                          day === new Date().getDate() &&
                          markingDate.getMonth() === new Date().getMonth() &&
                          markingDate.getFullYear() ===
                            new Date().getFullYear();
                        const isSelected = day === markingDate.getDate();

                        return (
                          <TouchableOpacity
                            key={dayIndex}
                            style={[
                              styles.calendarDay,
                              day === null && styles.calendarDayEmpty,
                              isSelected && styles.calendarDaySelected,
                              status === "present" && styles.calendarDayPresent,
                              status === "absent" && styles.calendarDayAbsent,
                              isToday && !isSelected && styles.calendarDayToday,
                            ]}
                            onPress={() =>
                              day !== null && handleDateSelect(day)
                            }
                            disabled={day === null}
                          >
                            <Text
                              style={[
                                styles.calendarDayText,
                                isSelected && styles.calendarDayTextSelected,
                                day === null && styles.calendarDayTextEmpty,
                                status === "present" &&
                                  styles.calendarDayTextPresent,
                                status === "absent" &&
                                  styles.calendarDayTextAbsent,
                                isToday &&
                                  !isSelected &&
                                  styles.calendarDayTextToday,
                              ]}
                            >
                              {day || ""}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  ))}
                </View>

                {/* Legend */}
                <View style={styles.legendContainer}>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, styles.legendDotPresent]} />
                    <Text style={styles.legendText}>Present</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, styles.legendDotAbsent]} />
                    <Text style={styles.legendText}>Absent</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, styles.legendDotToday]} />
                    <Text style={styles.legendText}>Today</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View
                      style={[styles.legendDot, styles.legendDotSelected]}
                    />
                    <Text style={styles.legendText}>Selected</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.todayButton}
                  onPress={() => {
                    setMarkingDate(new Date());
                    setShowDatePicker(false);
                  }}
                >
                  <Text style={styles.todayButtonText}>Go to Today</Text>
                </TouchableOpacity>
              </View>
            )}

            {sessionForDay.length === 0 && (
              <View style={styles.warningContainer}>
                <Ionicons name="warning-outline" size={20} color="#EF4444" />
                <Text style={styles.warningText}>
                  No sessions scheduled for this weekday.
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
          <TouchableOpacity
            style={styles.selectAll}
            onPress={toggleAllStudents}
          >
            <View style={styles.checkbox}>
              {selectedStudents.length === filteredStudents.length &&
                filteredStudents.length > 0 && (
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
                    {item.registration_number} ·{" "}
                    {item.age_group_name || "No Group"}
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
            style={[
              styles.markBtn,
              selectedStudents.length === 0 && styles.markBtnDisabled,
            ]}
            onPress={markAttendance}
            disabled={
              selectedStudents.length === 0 || sessionForDay.length === 0
            }
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
                  <Text style={styles.detailValue}>
                    {selectedStudent.student_name}
                  </Text>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Registration Number</Text>
                  <Text style={styles.detailValue}>
                    {selectedStudent.registration_number}
                  </Text>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Contact</Text>
                  <Text style={styles.detailValue}>
                    {selectedStudent.contact_number || "N/A"}
                  </Text>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Parent Contact</Text>
                  <Text style={styles.detailValue}>
                    {selectedStudent.parent_contact || "N/A"}
                  </Text>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Email</Text>
                  <Text style={styles.detailValue}>
                    {selectedStudent.email || "N/A"}
                  </Text>
                </View>

                <Text style={styles.historyTitle}>Attendance History</Text>

                {/* Month Navigation */}
                <View style={styles.historyNavigation}>
                  <TouchableOpacity
                    onPress={() => changeHistoryMonth(-1)}
                    style={styles.historyNavButton}
                  >
                    <Ionicons name="chevron-back" size={24} color="#2563EB" />
                  </TouchableOpacity>
                  <View style={styles.historyMonthInfo}>
                    <Text style={styles.historyMonthText}>
                      {monthNames[historyMonth]} {historyYear}
                    </Text>
                    <View style={styles.historyMonthStats}>
                      <View style={styles.historyStatItem}>
                        <View
                          style={[
                            styles.historyStatDot,
                            styles.historyStatPresent,
                          ]}
                        />
                        <Text style={styles.historyStatText}>
                          {monthStats.present} present
                        </Text>
                      </View>
                      <View style={styles.historyStatItem}>
                        <View
                          style={[
                            styles.historyStatDot,
                            styles.historyStatAbsent,
                          ]}
                        />
                        <Text style={styles.historyStatText}>
                          {monthStats.absent} absent
                        </Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => changeHistoryMonth(1)}
                    style={styles.historyNavButton}
                  >
                    <Ionicons
                      name="chevron-forward"
                      size={24}
                      color="#2563EB"
                    />
                  </TouchableOpacity>
                </View>

                {/* History Calendar */}
                <View style={styles.historyCalendarContainer}>
                  <View style={styles.weekDaysRow}>
                    {weekDays.map((day) => (
                      <Text key={day} style={styles.historyWeekDayText}>
                        {day}
                      </Text>
                    ))}
                  </View>

                  <View style={styles.calendarGrid}>
                    {historyWeeks.map((week, weekIndex) => (
                      <View key={weekIndex} style={styles.calendarWeek}>
                        {week.map((day, dayIndex) => {
                          const status = day
                            ? getAttendanceStatus(
                                day,
                                historyMonth,
                                historyYear,
                              )
                            : null;
                          const isToday =
                            day === new Date().getDate() &&
                            historyMonth === new Date().getMonth() &&
                            historyYear === new Date().getFullYear();

                          return (
                            <View
                              key={dayIndex}
                              style={[
                                styles.historyDay,
                                day === null && styles.calendarDayEmpty,
                                status === "present" &&
                                  styles.historyDayPresent,
                                status === "absent" && styles.historyDayAbsent,
                                isToday && !status && styles.historyDayToday,
                              ]}
                            >
                              <Text
                                style={[
                                  styles.historyDayText,
                                  day === null && styles.calendarDayTextEmpty,
                                  status === "present" &&
                                    styles.historyDayTextPresent,
                                  status === "absent" &&
                                    styles.historyDayTextAbsent,
                                  isToday &&
                                    !status &&
                                    styles.historyDayTextToday,
                                ]}
                              >
                                {day || ""}
                              </Text>
                            </View>
                          );
                        })}
                      </View>
                    ))}
                  </View>
                </View>

                {/* Yearly Attendance Summary */}
                <View style={styles.attendanceSummary}>
                  <View style={styles.summaryRow}>
                    <View style={styles.summaryItem}>
                      <Text style={styles.summaryNumber}>{stats.present}</Text>
                      <Text style={styles.summaryLabel}>Present</Text>
                    </View>
                    <View style={styles.summaryDivider} />
                    <View style={styles.summaryItem}>
                      <Text style={styles.summaryNumber}>{stats.absent}</Text>
                      <Text style={styles.summaryLabel}>Absent</Text>
                    </View>
                    <View style={styles.summaryDivider} />
                    <View style={styles.summaryItem}>
                      <Text style={styles.summaryNumber}>{stats.total}</Text>
                      <Text style={styles.summaryLabel}>Total</Text>
                    </View>
                  </View>
                  <View style={styles.percentageContainer}>
                    <Text style={styles.percentageText}>
                      Overall Attendance: {stats.percentage}%
                    </Text>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progressFill,
                          { width: `${stats.percentage}%` },
                        ]}
                      />
                    </View>
                  </View>
                </View>
              </>
            )}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}