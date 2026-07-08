import AppHeader from "@/components/AppHeader";
import styles from "@/styles/students.styles";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Students() {
  const API = "http://192.168.100.169:5000/api/students";
  const AGE_API = "http://192.168.100.169:5000/api/agegroups";
  const ATTENDANCE_API = "http://192.168.100.169:5000/api/attendance";
  const PAYMENTS_API = "http://192.168.100.169:5000/api/payments";
  const SESSIONS_API = "http://192.168.100.169:5000/api/sessions";

  const [students, setStudents] = useState<any[]>([]);
  const [ageGroups, setAgeGroups] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("attendance");
  const [attendanceHistory, setAttendanceHistory] = useState<any[]>([]);
  const [paymentHistory, setPaymentHistory] = useState<any[]>([]);
  const [loadingAttendance, setLoadingAttendance] = useState(false);
  const [loadingPayments, setLoadingPayments] = useState(false);
  const [startYear, setStartYear] = useState(new Date().getFullYear());

  const [registrationNumber, setRegistrationNumber] = useState("");
  const [studentName, setStudentName] = useState("");
  const [age, setAge] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [parentContact, setParentContact] = useState("");
  const [email, setEmail] = useState("");
  const [ageGroupId, setAgeGroupId] = useState("");

  const monthNames = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
  ];
  
  const fullMonthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekDaysFull = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  useEffect(() => {
    loadStudents();
    loadAgeGroups();
    loadSessions();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadAgeGroups = async () => {
    try {
      const response = await fetch(AGE_API);
      const data = await response.json();
      setAgeGroups(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadSessions = async () => {
    try {
      const response = await fetch(SESSIONS_API);
      const data = await response.json();
      setSessions(data);
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setEditId(null);
    setRegistrationNumber("");
    setStudentName("");
    setAge("");
    setContactNumber("");
    setParentContact("");
    setEmail("");
    setAgeGroupId("");
  };

  const saveStudent = async () => {
    const body = {
      registration_number: registrationNumber,
      student_name: studentName,
      age,
      contact_number: contactNumber,
      parent_contact: parentContact,
      email,
      age_group_id: ageGroupId,
    };

    try {
      if (editId) {
        await fetch(`${API}/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }

      loadStudents();
      resetForm();
      setModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const removeStudent = async (id: number) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      loadStudents();
    } catch (error) {
      console.log(error);
    }
  };

  const viewStudent = async (student: any) => {
    setSelectedStudent(student);
    setViewModal(true);
    setActiveTab("attendance");
    await loadAttendanceHistory(student.id);
    await loadPaymentHistory(student.id);
  };

  const loadAttendanceHistory = async (studentId: number) => {
    setLoadingAttendance(true);
    try {
      const response = await fetch(`${ATTENDANCE_API}/student/${studentId}`);
      if (response.ok) {
        const data = await response.json();
        setAttendanceHistory(data || []);
      } else {
        setAttendanceHistory([]);
      }
    } catch (error) {
      console.log("Error loading attendance:", error);
      setAttendanceHistory([]);
    } finally {
      setLoadingAttendance(false);
    }
  };

  const loadPaymentHistory = async (studentId: number) => {
    setLoadingPayments(true);
    try {
      const response = await fetch(PAYMENTS_API);
      if (response.ok) {
        const data = await response.json();
        const studentPayments = data.filter((p: any) => {
          return p.student_id === studentId || 
                 p.studentId === studentId || 
                 p.student === studentId;
        });
        setPaymentHistory(studentPayments || []);
      } else {
        setPaymentHistory([]);
      }
    } catch (error) {
      console.log("Error loading payments:", error);
      setPaymentHistory([]);
    } finally {
      setLoadingPayments(false);
    }
  };

  const getAgeGroupName = (groupId: string) => {
    const group = ageGroups.find(g => g.id === groupId);
    return group ? group.age_group_name : "N/A";
  };

  const getAttendanceStatus = (day: number, month: number, year: number): string | null => {
    if (!selectedStudent || !attendanceHistory) return null;

    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    const dateObj = new Date(year, month, day);
    const dayOfWeek = dateObj.toLocaleDateString("en-US", { weekday: "long" });
    const hasSession = sessions.some((s) => s.day_of_week === dayOfWeek);

    if (!hasSession) {
      return null;
    }

    const record = attendanceHistory.find((h) => {
      if (!h.attendance_date) return false;
      const recordDate = new Date(h.attendance_date);
      const recordDateStr = `${recordDate.getFullYear()}-${String(recordDate.getMonth() + 1).padStart(2, "0")}-${String(recordDate.getDate()).padStart(2, "0")}`;
      return recordDateStr === dateStr;
    });

    if (record) {
      return record.status || null;
    }

    if (dateStr < todayStr) {
      return "Absent";
    }

    return null;
  };

  const getAttendanceStats = () => {
    if (!selectedStudent || !attendanceHistory) {
      return { present: 0, absent: 0, total: 0, percentage: 0 };
    }

    const today = new Date();
    let present = 0;
    let absent = 0;

    for (let month = 0; month <= today.getMonth(); month++) {
      const year = today.getFullYear();
      const sessionDaysByWeekDay = getMonthSessionDays(month, year);
      
      const allSessionDays: number[] = [];
      weekDaysFull.forEach(day => {
        if (sessionDaysByWeekDay[day]) {
          allSessionDays.push(...sessionDaysByWeekDay[day]);
        }
      });

      allSessionDays.forEach(day => {
        const dateObj = new Date(year, month, day);
        if (dateObj <= today) {
          const status = getAttendanceStatus(day, month, year);
          if (status === "Present") {
            present++;
          } else if (status === "Absent") {
            absent++;
          }
        }
      });
    }

    const total = present + absent;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

    return { present, absent, total, percentage };
  };

  const getMonthlyStats = (month: number, year: number) => {
    if (!selectedStudent || !attendanceHistory) {
      return { present: 0, absent: 0, total: 0 };
    }

    const today = new Date();
    let present = 0;
    let absent = 0;

    const sessionDaysByWeekDay = getMonthSessionDays(month, year);
    const allSessionDays: number[] = [];
    weekDaysFull.forEach(day => {
      if (sessionDaysByWeekDay[day]) {
        allSessionDays.push(...sessionDaysByWeekDay[day]);
      }
    });

    allSessionDays.forEach(day => {
      const dateObj = new Date(year, month, day);
      if (dateObj <= today) {
        const status = getAttendanceStatus(day, month, year);
        if (status === "Present") {
          present++;
        } else if (status === "Absent") {
          absent++;
        }
      }
    });

    const total = present + absent;
    return { present, absent, total };
  };

  const getPaymentStats = () => {
    if (!paymentHistory || paymentHistory.length === 0) {
      return { totalPaid: 0, outstanding: 0, totalRecords: 0 };
    }

    const totalPaid = paymentHistory.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);

    const outstanding = paymentHistory
      .filter(p => p.status?.toUpperCase() !== 'PAID')
      .reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);

    const totalRecords = paymentHistory.length;

    return { totalPaid, outstanding, totalRecords };
  };

  const getMonthSessionDays = (month: number, year: number): { [key: string]: number[] } => {
    const sessionDaysByWeekDay: { [key: string]: number[] } = {};
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    weekDaysFull.forEach(day => {
      sessionDaysByWeekDay[day] = [];
    });
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
      const hasSession = sessions.some((s) => s.day_of_week === dayOfWeek);
      if (hasSession) {
        if (sessionDaysByWeekDay[dayOfWeek] !== undefined) {
          sessionDaysByWeekDay[dayOfWeek].push(day);
        }
      }
    }
    return sessionDaysByWeekDay;
  };

  const getAllMonths = () => {
    const months = [];
    for (let month = 0; month < 12; month++) {
      months.push({ month, year: startYear });
    }
    return months;
  };

  const changeYear = (increment: number) => {
    setStartYear(startYear + increment);
  };

  const filteredStudents = students.filter(
    (item) =>
      item.student_name?.toLowerCase().includes(search.toLowerCase()) ||
      item.registration_number?.toLowerCase().includes(search.toLowerCase()),
  );

  const stats = getAttendanceStats();
  const paymentStats = getPaymentStats();
  const allMonths = getAllMonths();

  return (
    <View style={styles.container}>
      <AppHeader />

      {/* TOP BAR */}
      <View style={styles.top}>
        <View>
          <Text style={styles.title}>Students</Text>
          <Text style={styles.sub}>Manage registered students</Text>
        </View>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            resetForm();
            setModal(true);
          }}
        >
          <Ionicons name="add" size={18} color="#fff" />
          <Text style={styles.addTxt}>Add Student</Text>
        </TouchableOpacity>
      </View>

      {/* SEARCH */}
      <TextInput
        placeholder="Search student..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      {/* TABLE */}
      <View style={styles.tableContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator>
          <View>
            <View style={styles.tableHeader}>
              <Text style={[styles.headerCell, { width: 120 }]}>Reg No</Text>
              <Text style={[styles.headerCell, { width: 150 }]}>Name</Text>
              <Text style={[styles.headerCell, { width: 80 }]}>Age</Text>
              <Text style={[styles.headerCell, { width: 140 }]}>Contact</Text>
              <Text style={[styles.headerCell, { width: 200 }]}>Email</Text>
              <Text style={[styles.headerCell, { width: 130 }]}>Action</Text>
            </View>

            <FlatList
              data={filteredStudents}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.tableRow}>
                  <Text style={[styles.cell, { width: 120 }]}>
                    {item.registration_number}
                  </Text>

                  <Text style={[styles.cell, { width: 150 }]}>
                    {item.student_name}
                  </Text>

                  <Text style={[styles.cell, { width: 80 }]}>{item.age}</Text>

                  <Text style={[styles.cell, { width: 140 }]}>
                    {item.contact_number}
                  </Text>

                  <Text style={[styles.cell, { width: 200 }]}>
                    {item.email}
                  </Text>

                  <View style={[styles.actionRow, { width: 130 }]}>
                    <TouchableOpacity onPress={() => viewStudent(item)}>
                      <Ionicons name="eye-outline" size={20} color="#2563EB" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ marginLeft: 12 }}
                      onPress={() => {
                        setEditId(item.id);
                        setRegistrationNumber(item.registration_number);
                        setStudentName(item.student_name);
                        setAge(String(item.age));
                        setContactNumber(item.contact_number);
                        setParentContact(item.parent_contact);
                        setEmail(item.email);
                        setAgeGroupId(item.age_group_id);
                        setModal(true);
                      }}
                    >
                      <Ionicons name="create-outline" size={20} color="#2563EB" />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ marginLeft: 12 }}
                      onPress={() => removeStudent(item.id)}
                    >
                      <Ionicons name="trash-outline" size={20} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        </ScrollView>
      </View>

      {/* ADD/EDIT MODAL */}
      <Modal visible={modal} transparent animationType="fade">
        <View style={styles.overlay}>
          <ScrollView>
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>
                {editId ? "Edit Student" : "Add Student"}
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Registration Number"
                value={registrationNumber}
                onChangeText={setRegistrationNumber}
              />

              <TextInput
                style={styles.input}
                placeholder="Student Name"
                value={studentName}
                onChangeText={setStudentName}
              />

              <TextInput
                style={styles.input}
                placeholder="Age"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
              />

              <TextInput
                style={styles.input}
                placeholder="Contact Number"
                value={contactNumber}
                onChangeText={setContactNumber}
              />

              <TextInput
                style={styles.input}
                placeholder="Parent Contact"
                value={parentContact}
                onChangeText={setParentContact}
              />

              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />

              <View style={styles.ageGroupContainer}>
                <Picker
                  selectedValue={ageGroupId}
                  onValueChange={(value) => setAgeGroupId(value)}
                  style={styles.picker}
                  dropdownIconColor="#64748B"
                >
                  <Picker.Item label="Select Age Group" value="" />
                  {ageGroups.map((group: any) => (
                    <Picker.Item
                      key={group.id}
                      label={group.age_group_name}
                      value={group.id}
                    />
                  ))}
                </Picker>
              </View>

              <TouchableOpacity style={styles.save} onPress={saveStudent}>
                <Text style={styles.saveText}>Save Student</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setModal(false);
                  resetForm();
                }}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* VIEW STUDENT MODAL */}
      <Modal visible={viewModal} transparent animationType="fade">
        <View style={styles.overlay}>
          <ScrollView>
            <View style={styles.viewModal}>
              {/* Header */}
              <View style={styles.viewHeader}>
                <View>
                  <Text style={styles.viewName}>{selectedStudent?.student_name}</Text>
                  <Text style={styles.viewReg}>
                    {selectedStudent?.registration_number} · {getAgeGroupName(selectedStudent?.age_group_id)}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => setViewModal(false)}>
                  <Ionicons name="close" size={28} color="#64748B" />
                </TouchableOpacity>
              </View>

              {/* Tabs */}
              <View style={styles.tabContainer}>
                <TouchableOpacity
                  style={[styles.tab, activeTab === "information" && styles.activeTab]}
                  onPress={() => setActiveTab("information")}
                >
                  <Text style={[styles.tabText, activeTab === "information" && styles.activeTabText]}>
                    Information
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.tab, activeTab === "attendance" && styles.activeTab]}
                  onPress={() => setActiveTab("attendance")}
                >
                  <Text style={[styles.tabText, activeTab === "attendance" && styles.activeTabText]}>
                    Attendance
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.tab, activeTab === "payments" && styles.activeTab]}
                  onPress={() => setActiveTab("payments")}
                >
                  <Text style={[styles.tabText, activeTab === "payments" && styles.activeTabText]}>
                    Payments
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Content */}
              {activeTab === "information" && selectedStudent && (
                <View style={styles.viewContent}>
                  <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>Student Profile</Text>
                    
                    <View style={styles.infoGrid}>
                      <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>FULL NAME</Text>
                        <Text style={styles.infoValue}>{selectedStudent.student_name}</Text>
                      </View>

                      <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>AGE</Text>
                        <Text style={styles.infoValue}>{selectedStudent.age} years</Text>
                      </View>

                      <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>CONTACT NUMBER</Text>
                        <Text style={styles.infoValue}>{selectedStudent.contact_number}</Text>
                      </View>

                      <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>EMAIL ADDRESS</Text>
                        <Text style={styles.infoValue}>{selectedStudent.email}</Text>
                      </View>

                      <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>REGISTRATION NUMBER</Text>
                        <Text style={styles.infoValue}>{selectedStudent.registration_number}</Text>
                      </View>

                      <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>AGE GROUP</Text>
                        <Text style={styles.infoValue}>{getAgeGroupName(selectedStudent.age_group_id)}</Text>
                      </View>

                      <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>PARENT CONTACT</Text>
                        <Text style={styles.infoValue}>{selectedStudent.parent_contact}</Text>
                      </View>

                      <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>REGISTERED ON</Text>
                        <Text style={styles.infoValue}>
                          {selectedStudent.created_at 
                            ? new Date(selectedStudent.created_at).toLocaleDateString() 
                            : "N/A"}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}

              {activeTab === "attendance" && (
                <View style={styles.viewContent}>
                  <View style={styles.attendanceHeader}>
                    <Text style={styles.sectionTitle}>Attendance History</Text>
                    <View style={styles.navigationButtons}>
                      <TouchableOpacity
                        onPress={() => changeYear(-1)}
                        style={styles.navButton}
                      >
                        <Ionicons name="chevron-back" size={20} color="#2563EB" />
                      </TouchableOpacity>
                      <Text style={styles.yearText}>{startYear}</Text>
                      <TouchableOpacity
                        onPress={() => changeYear(1)}
                        style={styles.navButton}
                      >
                        <Ionicons name="chevron-forward" size={20} color="#2563EB" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Overall Stats */}
                  <View style={styles.attendanceSummary}>
                    <View style={styles.summaryRow}>
                      <View style={styles.summaryItem}>
                        <Text style={styles.summaryNumber}>{stats.total}</Text>
                        <Text style={styles.summaryLabel}>Total Records</Text>
                      </View>
                      <View style={styles.summaryDivider} />
                      <View style={styles.summaryItem}>
                        <Text style={styles.summaryNumber}>{stats.present}</Text>
                        <Text style={styles.summaryLabel}>Sessions Attended</Text>
                      </View>
                      <View style={styles.summaryDivider} />
                      <View style={styles.summaryItem}>
                        <Text style={styles.summaryNumber}>{stats.percentage}%</Text>
                        <Text style={styles.summaryLabel}>Attendance Rate</Text>
                      </View>
                    </View>
                  </View>

                  {/* Horizontal Months with Vertical Days - All 12 months */}
                  <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={true}
                    style={styles.horizontalScrollView}
                  >
                    <View style={styles.horizontalMonthContainer}>
                      {allMonths.map(({ month, year }, index) => {
                        const sessionDaysByWeekDay = getMonthSessionDays(month, year);
                        const monthStats = getMonthlyStats(month, year);
                        
                        const activeDays: { day: string; dates: number[] }[] = [];
                        weekDaysFull.forEach(day => {
                          if (sessionDaysByWeekDay[day] && sessionDaysByWeekDay[day].length > 0) {
                            activeDays.push({ day, dates: sessionDaysByWeekDay[day] });
                          }
                        });
                        
                        return (
                          <View key={index} style={styles.monthColumn}>
                            <View style={styles.monthColumnHeader}>
                              <Text style={styles.monthColumnTitle}>
                                {monthNames[month]} {year}
                              </Text>
                              <View style={styles.monthColumnStats}>
                                <Text style={styles.monthColumnStatText}>
                                  P: {monthStats.present}
                                </Text>
                                <Text style={styles.monthColumnStatText}>
                                  A: {monthStats.absent}
                                </Text>
                              </View>
                            </View>

                            <View style={styles.dayOfWeekHeaders}>
                              {activeDays.map(({ day }) => (
                                <View key={day} style={styles.dayOfWeekHeaderCell}>
                                  <Text style={styles.dayOfWeekHeaderText}>
                                    {day.substring(0, 3)}
                                  </Text>
                                </View>
                              ))}
                            </View>

                            <View style={styles.sessionDaysColumn}>
                              {activeDays.map(({ day, dates }) => (
                                <View key={day} style={styles.sessionDayCell}>
                                  {dates.map((dayNumber, dayIndex) => {
                                    const status = getAttendanceStatus(dayNumber, month, year);
                                    const isToday = 
                                      dayNumber === new Date().getDate() &&
                                      month === new Date().getMonth() &&
                                      year === new Date().getFullYear();

                                    let dayStyle = styles.sessionDayNumber;
                                    let textStyle = styles.sessionDayNumberText;

                                    if (status === "Present") {
                                      dayStyle = { ...styles.sessionDayNumber, ...styles.sessionDayNumberPresent };
                                      textStyle = { ...styles.sessionDayNumberText, ...styles.sessionDayNumberTextPresent };
                                    } else if (status === "Absent") {
                                      dayStyle = { ...styles.sessionDayNumber, ...styles.sessionDayNumberAbsent };
                                      textStyle = { ...styles.sessionDayNumberText, ...styles.sessionDayNumberTextAbsent };
                                    } else if (isToday) {
                                      dayStyle = { ...styles.sessionDayNumber, ...styles.sessionDayNumberToday };
                                      textStyle = { ...styles.sessionDayNumberText, ...styles.sessionDayNumberTextToday };
                                    }

                                    return (
                                      <View key={dayIndex} style={dayStyle}>
                                        <Text style={textStyle}>{dayNumber}</Text>
                                      </View>
                                    );
                                  })}
                                </View>
                              ))}
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  </ScrollView>

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
                      <View style={[styles.legendDot, styles.legendDotSession]} />
                      <Text style={styles.legendText}>Session Day</Text>
                    </View>
                  </View>

                  {/* Overall Attendance */}
                  <View style={styles.overallAttendance}>
                    <View style={styles.attendanceRow}>
                      <Text style={styles.attendanceLabel}>
                        {stats.present} days present
                      </Text>
                      <Text style={styles.attendanceLabel}>
                        {stats.absent} days absent
                      </Text>
                    </View>
                    <View style={styles.attendanceBarContainer}>
                      <Text style={styles.attendancePercentage}>
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
                </View>
              )}
                     <br></br>
              {activeTab === "payments" && (
                <View style={styles.viewContent}>
                  

                  {/* Payment Summary Cards */}
                  <View style={styles.paymentSummaryCards}>
                    <View style={styles.paymentCard}>
                      <Text style={styles.paymentCardLabel}>Total Paid</Text>
                      <Text style={styles.paymentCardValue}>
                        Rs {(paymentStats.totalPaid || 0).toFixed(2)}
                      </Text>
                    </View>
                     </View>
                     <View>
                    <View style={styles.paymentCard}>
                      <Text style={styles.paymentCardLabel}>Outstanding Balance</Text>
                      <Text style={[styles.paymentCardValue, styles.outstandingValue]}>
                        Rs {(paymentStats.outstanding || 0).toFixed(2)}
                      </Text>
                    </View>
                 </View>
<br></br>
                  {/* Transaction History */}
                  <Text style={styles.sectionTitle}>Transaction History</Text>
                  
                  {paymentHistory && paymentHistory.length > 0 ? (
                    <View style={styles.transactionList}>
                      {paymentHistory.map((payment, index) => (
                        <View key={index} style={styles.transactionItem}>
                          <View style={styles.transactionInfo}>
                            <Text style={styles.transactionMonth}>
                              {payment.payment_month || payment.month || 'N/A'}
                            </Text>
                            <Text style={styles.transactionDate}>
                              {payment.payment_date || payment.date || 'N/A'}
                            </Text>
                          </View>
                          <View style={styles.transactionDetails}>
                            <Text style={styles.transactionAmount}>
                              Rs {parseFloat(payment.amount || 0).toFixed(2)}
                            </Text>
                            <View style={[
                              styles.transactionStatus,
                              payment.status?.toUpperCase() === 'PAID' 
                                ? styles.statusPaid 
                                : styles.statusPending
                            ]}>
                              <Text style={[
                                styles.transactionStatusText,
                                payment.status?.toUpperCase() === 'PAID' 
                                  ? styles.statusPaidText 
                                  : styles.statusPendingText
                              ]}>
                                {payment.status || 'PAID'}
                              </Text>
                            </View>
                          </View>
                        </View>
                      ))}
                    </View>
                  ) : (
                    <View style={styles.emptyState}>
                      <Ionicons name="cash-outline" size={48} color="#CBD5E1" />
                      <Text style={styles.emptyText}>No payment records found</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}