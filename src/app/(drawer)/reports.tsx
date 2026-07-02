import AppHeader from "@/components/AppHeader";
import styles from "@/styles/reports.styles";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

// Type guard for error handling
function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

export default function Reports() {
  // API URLs - Update with your actual IP
  const API = "http://192.168.8.102:5000/api";
  const ATTENDANCE_API = `${API}/attendance`;
  const STUDENTS_API = `${API}/students`;
  const AGE_GROUPS_API = `${API}/agegroups`;
  const SESSIONS_API = `${API}/sessions`;
  const PAYMENTS_API = `${API}/payments`;

  // State Management
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [exporting, setExporting] = useState(false);
  const [activeTab, setActiveTab] = useState<'attendance' | 'payments'>('attendance');

  // Attendance Data
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [ageGroups, setAgeGroups] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);

  // Filter states
  const [selectedMonth, setSelectedMonth] = useState<string>(new Date().getMonth().toString());
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());

  // Attendance Report data
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [reportStats, setReportStats] = useState({
    totalDaysAttended: 0,
    totalSessionDays: 0,
    overallAttendance: 0,
  });

  // Payment Report data
  const [paymentReportData, setPaymentReportData] = useState<any[]>([]);
  const [paymentStats, setPaymentStats] = useState({
    totalCollected: 0,
    totalStudents: 0,
    overdueCount: 0,
  });

  // Calendar state
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  // Month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const monthShort = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Year options
  const yearOptions = [
    { id: (new Date().getFullYear() - 2).toString(), name: (new Date().getFullYear() - 2).toString() },
    { id: (new Date().getFullYear() - 1).toString(), name: (new Date().getFullYear() - 1).toString() },
    { id: new Date().getFullYear().toString(), name: new Date().getFullYear().toString() },
    { id: (new Date().getFullYear() + 1).toString(), name: (new Date().getFullYear() + 1).toString() },
  ];

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (activeTab === 'attendance' && students.length > 0 && attendanceRecords.length > 0 && sessions.length > 0) {
      generateAttendanceReport();
    }
    if (activeTab === 'payments' && payments.length > 0 && students.length > 0) {
      generatePaymentReport();
    }
  }, [activeTab, selectedMonth, selectedAgeGroup, selectedYear, students, attendanceRecords, sessions, payments]);

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      await Promise.all([
        loadAttendanceRecords(),
        loadStudents(),
        loadAgeGroups(),
        loadSessions(),
        loadPayments(),
      ]);
    } catch (error) {
      setError("Failed to load data. Please check your connection.");
      Alert.alert("Error", "Failed to load data. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const loadAttendanceRecords = async () => {
    try {
      const response = await fetch(ATTENDANCE_API);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setAttendanceRecords(data);
    } catch (error) {
      console.log("Error loading attendance records:", error);
      setAttendanceRecords([]);
      throw error;
    }
  };

  const loadStudents = async () => {
    try {
      const response = await fetch(STUDENTS_API);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.log("Error loading students:", error);
      setStudents([]);
      throw error;
    }
  };

  const loadAgeGroups = async () => {
    try {
      const response = await fetch(AGE_GROUPS_API);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setAgeGroups(data);
    } catch (error) {
      console.log("Error loading age groups:", error);
      setAgeGroups([]);
      throw error;
    }
  };

  const loadSessions = async () => {
    try {
      const response = await fetch(SESSIONS_API);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setSessions(data);
    } catch (error) {
      console.log("Error loading sessions:", error);
      setSessions([]);
      throw error;
    }
  };

  const loadPayments = async () => {
    try {
      const response = await fetch(PAYMENTS_API);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setPayments(data);
    } catch (error) {
      console.log("Error loading payments:", error);
      setPayments([]);
      throw error;
    }
  };

  // ==================== ATTENDANCE REPORT FUNCTIONS ====================

  const getSessionDaysForMonth = (year: number, month: number): Date[] => {
    const sessionDays: Date[] = [];
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
      const hasSession = sessions.some(s => s.day_of_week === dayOfWeek);
      if (hasSession) {
        sessionDays.push(date);
      }
    }
    
    return sessionDays;
  };

  const getSessionDaysCountForMonth = (year: number, month: number): number => {
    return getSessionDaysForMonth(year, month).length;
  };

  const getSessionDateStrings = (year: number, month: number): string[] => {
    const sessionDays = getSessionDaysForMonth(year, month);
    return sessionDays.map(d => 
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    );
  };

  const getTotalSessionDays = () => {
    const year = parseInt(selectedYear);
    const month = parseInt(selectedMonth);
    return getSessionDaysCountForMonth(year, month);
  };

  const getCalendarWeeks = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();

    const weeks = [];
    let currentWeek = [];

    for (let i = 0; i < startDayOfWeek; i++) {
      currentWeek.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
    }

    return weeks;
  };

  const getAttendanceStatus = (studentId: number, day: number, month: number, year: number): string | null => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const sessionDateStrings = getSessionDateStrings(year, month);
    if (!sessionDateStrings.includes(dateStr)) {
      return null;
    }

    const record = attendanceRecords.find(r => {
      if (!r.attendance_date) return false;
      const recordDate = new Date(r.attendance_date);
      const recordDateStr = `${recordDate.getFullYear()}-${String(recordDate.getMonth() + 1).padStart(2, '0')}-${String(recordDate.getDate()).padStart(2, '0')}`;
      return r.student_id === studentId && recordDateStr === dateStr;
    });

    if (record) {
      return record.status || null;
    }
    return 'Absent';
  };

  const generateAttendanceReport = () => {
    let filteredStudents = [...students];
    if (selectedAgeGroup) {
      filteredStudents = filteredStudents.filter(
        s => s.age_group_id === parseInt(selectedAgeGroup)
      );
    }

    const year = parseInt(selectedYear);
    const month = parseInt(selectedMonth);
    const sessionDateStrings = getSessionDateStrings(year, month);
    const totalSessionDays = sessionDateStrings.length;

    const reportData = filteredStudents.map(student => {
      let attendedCount = 0;
      const dailyStatus: { [key: string]: string } = {};

      sessionDateStrings.forEach(dateStr => {
        const status = getAttendanceStatus(student.id, parseInt(dateStr.split('-')[2]), month, year);
        dailyStatus[dateStr] = status || 'Absent';
        if (status === 'Present') {
          attendedCount++;
        }
      });

      return {
        student_id: student.id,
        student_name: student.student_name,
        registration_number: student.registration_number || 'N/A',
        age_group_name: ageGroups.find(g => g.id === student.age_group_id)?.age_group_name || 'N/A',
        attended: attendedCount,
        total_session_days: totalSessionDays,
        attendance_percentage: totalSessionDays > 0 ? Math.round((attendedCount / totalSessionDays) * 100) : 0,
        daily_status: dailyStatus,
      };
    });

    reportData.sort((a, b) => b.attendance_percentage - a.attendance_percentage);
    setAttendanceData(reportData);

    if (selectedStudentId) {
      const student = reportData.find(s => s.student_id === selectedStudentId);
      setSelectedStudent(student || null);
    }

    const totalAttended = reportData.reduce((sum, s) => sum + s.attended, 0);
    const totalPossible = reportData.reduce((sum, s) => sum + s.total_session_days, 0);
    const overallPercentage = totalPossible > 0 ? Math.round((totalAttended / totalPossible) * 100) : 0;

    setReportStats({
      totalDaysAttended: totalAttended,
      totalSessionDays: totalPossible,
      overallAttendance: overallPercentage,
    });
  };

  // ==================== PAYMENT REPORT FUNCTIONS ====================

  const generatePaymentReport = () => {
    let filteredStudents = [...students];
    if (selectedAgeGroup) {
      filteredStudents = filteredStudents.filter(
        s => s.age_group_id === parseInt(selectedAgeGroup)
      );
    }

    const year = parseInt(selectedYear);
    const month = parseInt(selectedMonth);

    let filteredPayments = [...payments];
    if (selectedMonth) {
      filteredPayments = filteredPayments.filter(p => {
        if (!p.created_at) return false;
        const date = new Date(p.created_at);
        return date.getMonth() === month && date.getFullYear() === year;
      });
    } else if (selectedYear) {
      filteredPayments = filteredPayments.filter(p => {
        if (!p.created_at) return false;
        const date = new Date(p.created_at);
        return date.getFullYear() === year;
      });
    }

    const paymentByStudent = new Map();
    filteredStudents.forEach(student => {
      const studentPayments = filteredPayments.filter(p => p.student_id === student.id);
      const totalPaid = studentPayments.reduce((sum, p) => {
        return sum + (parseFloat(p.amount) || 0);
      }, 0);
      
      const overdueCount = studentPayments.filter(p => p.status?.toUpperCase() === 'OVERDUE').length;
      
      paymentByStudent.set(student.id, {
        student_id: student.id,
        student_name: student.student_name,
        registration_number: student.registration_number || 'N/A',
        age_group_name: ageGroups.find(g => g.id === student.age_group_id)?.age_group_name || 'N/A',
        total_paid: totalPaid,
        payment_count: studentPayments.length,
        overdue_count: overdueCount,
        last_payment: studentPayments.length > 0 ? studentPayments[0]?.created_at : null,
        payments: studentPayments,
      });
    });

    const reportData = Array.from(paymentByStudent.values());
    reportData.sort((a, b) => b.total_paid - a.total_paid);
    setPaymentReportData(reportData);

    const totalCollected = reportData.reduce((sum, s) => sum + s.total_paid, 0);
    const overdueCount = reportData.filter(s => s.overdue_count > 0).length;

    setPaymentStats({
      totalCollected,
      totalStudents: reportData.length,
      overdueCount,
    });
  };

  // ==================== HELPERS ====================

  const getFileSystemDirectory = () => {
    try {
      // @ts-ignore
      if (FileSystem.documentDirectory) {
        // @ts-ignore
        return FileSystem.documentDirectory;
      }
    } catch (e) {
      console.log('documentDirectory not available');
    }

    try {
      // @ts-ignore
      if (FileSystem.cacheDirectory) {
        // @ts-ignore
        return FileSystem.cacheDirectory;
      }
    } catch (e) {
      console.log('cacheDirectory not available');
    }

    return null;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return 'N/A';
    }
  };

  // ==================== EXPORT FUNCTIONS ====================

  const generateAttendanceHTML = () => {
    const year = parseInt(selectedYear);
    const month = parseInt(selectedMonth);
    const sessionDateStrings = getSessionDateStrings(year, month);
    const weeks = getCalendarWeeks(month, year);
    
    let html = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 30px; margin: 0; background: #ffffff; }
            .header { margin-bottom: 20px; border-bottom: 2px solid #2563EB; padding-bottom: 15px; }
            h1 { color: #1a1a2e; font-size: 24px; margin: 0 0 5px 0; }
            .sub-header { color: #6B7280; font-size: 14px; }
            .filters { background: #F3F4F6; padding: 10px 15px; border-radius: 6px; margin: 15px 0; }
            .stats { display: flex; gap: 15px; margin: 20px 0; }
            .stat-box { flex: 1; background: #EFF6FF; padding: 15px; border-radius: 8px; text-align: center; }
            .stat-number { font-size: 28px; font-weight: 700; color: #1E40AF; }
            .stat-label { font-size: 12px; color: #6B7280; margin-top: 5px; }
            .calendar-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; margin: 10px 0; }
            .calendar-header { font-weight: 600; padding: 8px; text-align: center; background: #E5E7EB; }
            .calendar-day { padding: 8px; text-align: center; border: 1px solid #E5E7EB; min-height: 30px; }
            .day-present { background: #D1FAE5; color: #065F46; }
            .day-absent { background: #FEE2E2; color: #991B1B; }
            .day-session { background: #FEF3C7; color: #92400E; }
            .day-empty { background: #F9FAFB; }
            .student-list { margin-top: 20px; }
            .student-item { padding: 8px; border-bottom: 1px solid #E5E7EB; }
            .student-name { font-weight: 600; }
            .student-percentage { float: right; }
            .footer { margin-top: 20px; color: #6B7280; font-size: 12px; border-top: 1px solid #E5E7EB; padding-top: 15px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Attendance Report - ${monthNames[month]} ${year}</h1>
            <div class="sub-header">Generated: ${new Date().toLocaleString()}</div>
          </div>
          <div class="filters">
            <strong>Filters:</strong> Age Group: ${selectedAgeGroup ? ageGroups.find(g => g.id === parseInt(selectedAgeGroup))?.age_group_name || 'All' : 'All'}
          </div>
          <div class="stats">
            <div class="stat-box"><div class="stat-number">${reportStats.totalDaysAttended}</div><div class="stat-label">Days Attended</div></div>
            <div class="stat-box"><div class="stat-number">${reportStats.totalSessionDays}</div><div class="stat-label">Session Days</div></div>
            <div class="stat-box"><div class="stat-number">${reportStats.overallAttendance}%</div><div class="stat-label">Attendance</div></div>
          </div>
          <h3>Session Days Calendar</h3>
          <div class="calendar-grid">
    `;

    weekDays.forEach(day => {
      html += `<div class="calendar-header">${day}</div>`;
    });

    weeks.forEach(week => {
      week.forEach(day => {
        if (day === null) {
          html += `<div class="calendar-day day-empty"></div>`;
        } else {
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const isSessionDay = sessionDateStrings.includes(dateStr);
          const cssClass = isSessionDay ? 'day-session' : 'day-empty';
          html += `<div class="calendar-day ${cssClass}">${day}</div>`;
        }
      });
    });

    html += `
          </div>
          <p style="font-size:12px;color:#6B7280;">Session days are highlighted in yellow.</p>
          <h3>Student Attendance</h3>
          <div class="student-list">
    `;

    attendanceData.forEach((student, index) => {
      html += `
        <div class="student-item">
          <span class="student-name">${index + 1}. ${student.student_name}</span>
          <span class="student-percentage">${student.attendance_percentage}% (${student.attended}/${student.total_session_days})</span>
        </div>
      `;
    });

    html += `
          </div>
          <div class="footer">Generated from Reports System • ${new Date().toLocaleString()}</div>
        </body>
      </html>
    `;

    return html;
  };

  const generateAttendanceCSV = () => {
    const year = parseInt(selectedYear);
    const month = parseInt(selectedMonth);
    const sessionDateStrings = getSessionDateStrings(year, month);
    
    let csv = '\uFEFF';
    csv += 'Student Name,Registration Number,Age Group,';
    sessionDateStrings.forEach(date => {
      csv += `${date},`;
    });
    csv += 'Attended,Session Days,Percentage\n';

    attendanceData.forEach(student => {
      csv += `"${student.student_name}","${student.registration_number}","${student.age_group_name}",`;
      sessionDateStrings.forEach(date => {
        const status = student.daily_status[date] || 'Absent';
        csv += `${status === 'Present' ? 'P' : 'A'},`;
      });
      csv += `${student.attended},${student.total_session_days},${student.attendance_percentage}%\n`;
    });

    return csv;
  };

  const generatePaymentHTML = () => {
    let html = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 30px; margin: 0; }
            .header { margin-bottom: 20px; border-bottom: 2px solid #2563EB; padding-bottom: 15px; }
            h1 { color: #1a1a2e; font-size: 24px; margin: 0 0 5px 0; }
            .sub-header { color: #6B7280; font-size: 14px; margin: 5px 0; }
            .filters { background-color: #F3F4F6; padding: 10px 15px; border-radius: 6px; margin: 10px 0 15px 0; font-size: 13px; }
            .stats-container { display: flex; gap: 15px; margin: 20px 0; }
            .stat-box { flex: 1; background: #EFF6FF; padding: 15px; border-radius: 8px; text-align: center; }
            .stat-number { font-size: 28px; font-weight: 700; color: #1E40AF; }
            .stat-label { font-size: 12px; color: #6B7280; margin-top: 5px; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 13px; }
            th { background-color: #2563EB; color: white; padding: 10px 8px; text-align: left; border: 1px solid #2563EB; }
            td { padding: 8px; border: 1px solid #E5E7EB; text-align: left; }
            tr:nth-child(even) { background-color: #F9FAFB; }
            .status-overdue { color: #991B1B; font-weight: 600; }
            .footer { margin-top: 20px; color: #6B7280; font-size: 12px; border-top: 1px solid #E5E7EB; padding-top: 15px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Payment Report</h1>
            <div class="sub-header">Generated: ${new Date().toLocaleString()}</div>
          </div>
          <div class="filters">
            <strong>Filters:</strong> Month: ${selectedMonth ? monthNames[parseInt(selectedMonth)] : 'All Months'} | 
            Year: ${selectedYear} | Age Group: ${selectedAgeGroup ? ageGroups.find(g => g.id === parseInt(selectedAgeGroup))?.age_group_name || 'All' : 'All'}
          </div>
          <div class="stats-container">
            <div class="stat-box"><div class="stat-number">Rs ${paymentStats.totalCollected.toFixed(2)}</div><div class="stat-label">Total Collected</div></div>
            <div class="stat-box"><div class="stat-number">${paymentStats.totalStudents}</div><div class="stat-label">Students</div></div>
            <div class="stat-box"><div class="stat-number">${paymentStats.overdueCount}</div><div class="stat-label">Overdue</div></div>
          </div>
          <table>
            <thead><tr><th>#</th><th>Student</th><th>Reg. #</th><th>Age Group</th><th>Total Paid</th><th>Payments</th><th>Overdue</th><th>Last Payment</th></tr></thead>
            <tbody>`;

    paymentReportData.forEach((student: any, index: number) => {
      html += `<tr>
        <td>${index + 1}</td>
        <td>${student.student_name}</td>
        <td>${student.registration_number}</td>
        <td>${student.age_group_name}</td>
        <td>Rs ${student.total_paid.toFixed(2)}</td>
        <td>${student.payment_count}</td>
        <td class="${student.overdue_count > 0 ? 'status-overdue' : ''}">${student.overdue_count}</td>
        <td>${formatDate(student.last_payment)}</td>
      </tr>`;
    });

    html += `</tbody></table>
          <div class="footer">Generated from Reports System • ${new Date().toLocaleString()}</div>
        </body>
      </html>
    `;
    return html;
  };

  const generatePaymentCSV = () => {
    let csv = '\uFEFF';
    csv += '#,Student Name,Registration Number,Age Group,Total Paid (Rs),Payment Count,Overdue Count,Last Payment\n';
    
    paymentReportData.forEach((student: any, index: number) => {
      csv += `${index + 1},"${student.student_name}","${student.registration_number}","${student.age_group_name}",${student.total_paid.toFixed(2)},${student.payment_count},${student.overdue_count},"${formatDate(student.last_payment)}"\n`;
    });
    
    return csv;
  };

  const downloadPDF = async () => {
    let htmlContent;
    let fileName;
    
    if (activeTab === 'attendance') {
      if (attendanceData.length === 0) {
        Alert.alert('No Data', 'No attendance data available to export.');
        return;
      }
      htmlContent = generateAttendanceHTML();
      fileName = `Attendance_Report_${monthShort[parseInt(selectedMonth)]}_${selectedYear}.html`;
    } else {
      if (paymentReportData.length === 0) {
        Alert.alert('No Data', 'No payment data available to export.');
        return;
      }
      htmlContent = generatePaymentHTML();
      fileName = `Payment_Report_${monthShort[parseInt(selectedMonth)]}_${selectedYear}.html`;
    }

    setExporting(true);
    try {
      if (Platform.OS === 'web') {
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        const dir = getFileSystemDirectory();
        if (!dir) throw new Error('No file system directory available');
        const fileUri = dir + fileName;
        await FileSystem.writeAsStringAsync(fileUri, htmlContent);
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(fileUri);
        } else {
          Alert.alert('Error', 'Sharing is not available on this device.');
        }
      }
    } catch (error) {
      console.error('Download error:', error);
      Alert.alert('Error', 'Failed to download report. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  const downloadExcel = async () => {
    let csvContent;
    let fileName;
    
    if (activeTab === 'attendance') {
      if (attendanceData.length === 0) {
        Alert.alert('No Data', 'No attendance data available to export.');
        return;
      }
      csvContent = generateAttendanceCSV();
      fileName = `Attendance_Report_${monthShort[parseInt(selectedMonth)]}_${selectedYear}.csv`;
    } else {
      if (paymentReportData.length === 0) {
        Alert.alert('No Data', 'No payment data available to export.');
        return;
      }
      csvContent = generatePaymentCSV();
      fileName = `Payment_Report_${monthShort[parseInt(selectedMonth)]}_${selectedYear}.csv`;
    }

    setExporting(true);
    try {
      const csvWithBOM = '\uFEFF' + csvContent;
      
      if (Platform.OS === 'web') {
        const blob = new Blob([csvWithBOM], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        const dir = getFileSystemDirectory();
        if (!dir) throw new Error('No file system directory available');
        const fileUri = dir + fileName;
        await FileSystem.writeAsStringAsync(fileUri, csvWithBOM);
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(fileUri);
        } else {
          Alert.alert('Error', 'Sharing is not available on this device.');
        }
      }
    } catch (error) {
      console.error('Excel download error:', error);
      Alert.alert('Error', 'Failed to download Excel file. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  // ==================== RENDER FUNCTIONS ====================

  const renderAttendanceReport = () => {
    const year = parseInt(selectedYear);
    const month = parseInt(selectedMonth);
    const weeks = getCalendarWeeks(month, year);
    const sessionDateStrings = getSessionDateStrings(year, month);

    return (
      <>
        {/* Calendar View */}
        <View style={styles.calendarContainer}>
          <View style={styles.calendarHeader}>
            <Text style={styles.calendarTitle}>
              {monthNames[month]} {year}
            </Text>
            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, styles.legendSession]} />
                <Text style={styles.legendText}>Session</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, styles.legendPresent]} />
                <Text style={styles.legendText}>Present</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, styles.legendAbsent]} />
                <Text style={styles.legendText}>Absent</Text>
              </View>
            </View>
          </View>

          <View style={styles.weekHeader}>
            {weekDays.map((day) => (
              <Text key={day} style={styles.weekDayText}>{day}</Text>
            ))}
          </View>

          {weeks.map((week, weekIndex) => (
            <View key={weekIndex} style={styles.calendarWeek}>
              {week.map((day, dayIndex) => {
                if (day === null) {
                  return <View key={dayIndex} style={styles.calendarDayEmpty} />;
                }

                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const isSessionDay = sessionDateStrings.includes(dateStr);
                
                let status = null;
                if (isSessionDay && selectedStudent) {
                  status = selectedStudent.daily_status[dateStr] || 'Absent';
                }

                let dayStyle = styles.calendarDayBase;
                let dayTextStyle = styles.calendarDayText;
                
                if (!isSessionDay) {
                  dayStyle = styles.calendarDayEmpty;
                  dayTextStyle = styles.calendarDayTextEmpty;
                } else if (status === 'Present') {
                  dayStyle = styles.calendarDayPresent;
                  dayTextStyle = styles.calendarDayTextPresent;
                } else if (status === 'Absent') {
                  dayStyle = styles.calendarDayAbsent;
                  dayTextStyle = styles.calendarDayTextAbsent;
                } else {
                  dayStyle = styles.calendarDaySession;
                  dayTextStyle = styles.calendarDayText;
                }

                return (
                  <View key={dayIndex} style={dayStyle}>
                    <Text style={dayTextStyle}>{day}</Text>
                    {isSessionDay && status && (
                      <Text style={styles.calendarDayStatus}>
                        {status === 'Present' ? '✓' : '✗'}
                      </Text>
                    )}
                  </View>
                );
              })}
            </View>
          ))}

          {!selectedStudent && attendanceData.length > 0 && (
            <View style={styles.selectStudentPrompt}>
              <Ionicons name="hand-left-outline" size={24} color="#94A3B8" />
              <Text style={styles.selectStudentText}>Select a student to view attendance</Text>
            </View>
          )}
        </View>

        {/* Student List */}
        <View style={styles.studentListContainer}>
          <Text style={styles.studentListTitle}>Student Attendance</Text>
          
          {attendanceData.map((student, index) => {
            const isSelected = selectedStudentId === student.student_id;
            return (
              <TouchableOpacity
                key={student.student_id}
                style={[
                  styles.studentListItem,
                  isSelected && styles.studentListItemSelected
                ]}
                onPress={() => {
                  setSelectedStudentId(student.student_id);
                  setSelectedStudent(student);
                }}
              >
                <View style={styles.studentListLeft}>
                  <Text style={styles.studentListNumber}>{index + 1}.</Text>
                  <View style={styles.studentListInfo}>
                    <Text style={styles.studentListName}>{student.student_name}</Text>
                    <Text style={styles.studentListReg}>{student.registration_number}</Text>
                  </View>
                </View>
                <View style={styles.studentListRight}>
                  <Text style={styles.studentListPercentage}>
                    {student.attendance_percentage}%
                  </Text>
                  <Text style={styles.studentListCount}>
                    {student.attended}/{student.total_session_days}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </>
    );
  };

  const renderPaymentReport = () => {
    return (
      <>
        {/* Statistics Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>TOTAL COLLECTED</Text>
            <Text style={styles.statNumber}>Rs {paymentStats.totalCollected.toFixed(2)}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>TOTAL STUDENTS</Text>
            <Text style={styles.statNumber}>{paymentStats.totalStudents}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>OVERDUE</Text>
            <Text style={[styles.statNumber, paymentStats.overdueCount > 0 && styles.overdueNumber]}>
              {paymentStats.overdueCount}
            </Text>
          </View>
        </View>

        {/* Report Table */}
        <View style={styles.reportSection}>
          <View style={styles.reportHeader}>
            <Text style={styles.reportTitle}>Payment Report</Text>
            <Text style={styles.reportCount}>{paymentReportData.length} students</Text>
          </View>

          {paymentReportData.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={true}>
              <View style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                  <Text style={[styles.headerCell, styles.cellIndex]}>#</Text>
                  <Text style={[styles.headerCell, styles.cellStudent]}>Student Name</Text>
                  <Text style={[styles.headerCell, styles.cellReg]}>Reg. #</Text>
                  <Text style={[styles.headerCell, styles.cellAgeGroup]}>Age Group</Text>
                  <Text style={[styles.headerCell, styles.cellAmount]}>Total Paid</Text>
                  <Text style={[styles.headerCell, styles.cellCount]}>Payments</Text>
                  <Text style={[styles.headerCell, styles.cellStatus]}>Overdue</Text>
                  <Text style={[styles.headerCell, styles.cellDate]}>Last Payment</Text>
                </View>

                <FlatList
                  data={paymentReportData}
                  keyExtractor={(item) => item.student_id?.toString() || Math.random().toString()}
                  scrollEnabled={false}
                  renderItem={({ item }) => {
                    return (
                      <View style={styles.tableRow}>
                        <Text style={[styles.tableCell, styles.cellIndex]}>{paymentReportData.indexOf(item) + 1}</Text>
                        <Text style={[styles.tableCell, styles.cellStudent]} numberOfLines={1}>
                          {item.student_name}
                        </Text>
                        <Text style={[styles.tableCell, styles.cellReg]} numberOfLines={1}>
                          {item.registration_number}
                        </Text>
                        <Text style={[styles.tableCell, styles.cellAgeGroup]} numberOfLines={1}>
                          {item.age_group_name}
                        </Text>
                        <Text style={[styles.tableCell, styles.cellAmount]}>
                          Rs {item.total_paid.toFixed(2)}
                        </Text>
                        <Text style={[styles.tableCell, styles.cellCount]}>
                          {item.payment_count}
                        </Text>
                        <Text style={[styles.tableCell, styles.cellStatus, item.overdue_count > 0 && styles.overdueText]}>
                          {item.overdue_count}
                        </Text>
                        <Text style={[styles.tableCell, styles.cellDate]} numberOfLines={1}>
                          {formatDate(item.last_payment)}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
            </ScrollView>
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="card-outline" size={48} color="#D1D5DB" />
              <Text style={styles.emptyStateText}>No payment data found</Text>
              <Text style={styles.emptyStateSub}>Try adjusting your filters to see more results.</Text>
            </View>
          )}
        </View>
      </>
    );
  };

  // ==================== MAIN RENDER ====================

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.loadingText}>Loading report data...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.top}>
          <View>
            <Text style={styles.title}>Reports & Analytics</Text>
            <Text style={styles.sub}>
              Generate and export detailed attendance and payment reports.
            </Text>
          </View>
        </View>

        {/* Error Display */}
        {error ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={20} color="#EF4444" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'attendance' && styles.tabButtonActive]}
            onPress={() => {
              setActiveTab('attendance');
              setSelectedStudentId(null);
              setSelectedStudent(null);
            }}
          >
            <Ionicons 
              name="checkbox-outline" 
              size={18} 
              color={activeTab === 'attendance' ? '#2563EB' : '#6B7280'} 
            />
            <Text style={[styles.tabText, activeTab === 'attendance' && styles.tabTextActive]}>
              Attendance
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'payments' && styles.tabButtonActive]}
            onPress={() => {
              setActiveTab('payments');
              setSelectedStudentId(null);
              setSelectedStudent(null);
            }}
          >
            <Ionicons 
              name="card-outline" 
              size={18} 
              color={activeTab === 'payments' ? '#2563EB' : '#6B7280'} 
            />
            <Text style={[styles.tabText, activeTab === 'payments' && styles.tabTextActive]}>
              Payments
            </Text>
          </TouchableOpacity>
        </View>

        {/* Filter Section */}
        <View style={styles.filterSection}>
          <View style={styles.filterRow}>
            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>Month</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedMonth}
                  onValueChange={(itemValue) => {
                    setSelectedMonth(itemValue);
                    setSelectedStudentId(null);
                    setSelectedStudent(null);
                  }}
                  style={styles.picker}
                >
                  <Picker.Item label="All Months" value="" />
                  {monthNames.map((month, index) => (
                    <Picker.Item key={index} label={month} value={index.toString()} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>Year</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedYear}
                  onValueChange={(itemValue) => {
                    setSelectedYear(itemValue);
                    setSelectedStudentId(null);
                    setSelectedStudent(null);
                  }}
                  style={styles.picker}
                >
                  {yearOptions.map((year) => (
                    <Picker.Item key={year.id} label={year.name} value={year.id} />
                  ))}
                </Picker>
              </View>
            </View>
          </View>

          <View style={styles.filterRow}>
            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>Age Group</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedAgeGroup}
                  onValueChange={(itemValue) => {
                    setSelectedAgeGroup(itemValue);
                    setSelectedStudentId(null);
                    setSelectedStudent(null);
                  }}
                  style={styles.picker}
                >
                  <Picker.Item label="All Age Groups" value="" />
                  {ageGroups.map((group) => (
                    <Picker.Item key={group.id} label={group.age_group_name} value={group.id.toString()} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>
                {activeTab === 'attendance' ? 'Session Days' : 'Records'}
              </Text>
              <View style={styles.appliedSettings}>
                <Text style={styles.appliedSettingsText}>
                  {activeTab === 'attendance' 
                    ? `${getTotalSessionDays()} days`
                    : `${paymentReportData.length} records`
                  }
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Statistics Cards - Show different stats based on tab */}
        {activeTab === 'attendance' ? (
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>TOTAL DAYS ATTENDED</Text>
              <Text style={styles.statNumber}>{reportStats.totalDaysAttended}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>TOTAL SESSION DAYS</Text>
              <Text style={styles.statNumber}>{reportStats.totalSessionDays}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>OVERALL ATTENDANCE</Text>
              <Text style={styles.statNumber}>{reportStats.overallAttendance}%</Text>
            </View>
          </View>
        ) : (
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>TOTAL COLLECTED</Text>
              <Text style={styles.statNumber}>Rs {paymentStats.totalCollected.toFixed(2)}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>TOTAL STUDENTS</Text>
              <Text style={styles.statNumber}>{paymentStats.totalStudents}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>OVERDUE</Text>
              <Text style={[styles.statNumber, paymentStats.overdueCount > 0 && styles.overdueNumber]}>
                {paymentStats.overdueCount}
              </Text>
            </View>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.generateButton]}
            onPress={() => {
              if (activeTab === 'attendance') {
                generateAttendanceReport();
              } else {
                generatePaymentReport();
              }
            }}
          >
            <Ionicons name="refresh-outline" size={20} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>Generate Report</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.exportButton]}
            onPress={downloadPDF}
            disabled={exporting || (activeTab === 'attendance' ? attendanceData.length === 0 : paymentReportData.length === 0)}
          >
            {exporting ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <Ionicons name="document-text-outline" size={20} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>PDF</Text>
              </>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.excelButton]}
            onPress={downloadExcel}
            disabled={exporting || (activeTab === 'attendance' ? attendanceData.length === 0 : paymentReportData.length === 0)}
          >
            {exporting ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <Ionicons name="grid-outline" size={20} color="#FFFFFF" />
                <Text style={styles.actionButtonText}>Excel</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Report Content */}
        {activeTab === 'attendance' ? (
          <View style={styles.reportSection}>
            <View style={styles.reportHeader}>
              <Text style={styles.reportTitle}>Attendance Report</Text>
              <Text style={styles.reportCount}>
                {attendanceData.length} students
              </Text>
            </View>

            {attendanceData.length > 0 ? (
              renderAttendanceReport()
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="stats-chart-outline" size={48} color="#D1D5DB" />
                <Text style={styles.emptyStateText}>No attendance data found</Text>
                <Text style={styles.emptyStateSub}>
                  Click "Generate Report" to load data.
                </Text>
              </View>
            )}
          </View>
        ) : (
          renderPaymentReport()
        )}
      </ScrollView>
    </SafeAreaView>
  );
}