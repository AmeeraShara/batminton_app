// payment-records.tsx
import AppHeader from "@/components/AppHeader";
import styles from "@/styles/payment-records.styles";
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

export default function PaymentRecords() {
  // API URLs - Update with your actual IP
  const API = "http://192.168.100.169:5000/api/payments";
  const STUDENTS_API = "http://192.168.100.169:5000/api/students";
  const AGE_GROUPS_API = "http://192.168.100.169:5000/api/agegroups";

  // State Management
  const [payments, setPayments] = useState<any[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [ageGroups, setAgeGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [exporting, setExporting] = useState(false);
  const [activeTab, setActiveTab] = useState<'transactions' | 'students'>('transactions');

  // Filter states
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("");

  // Student status state
  const [studentStatus, setStudentStatus] = useState({
    total: 0,
    overdue: 0,
    upToDate: 0
  });

  // Month names
  const monthNames = [
    "All Months",
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const monthShort = [
    "Ja", "Fe", "Mar", "Ap", "Ma", "Ju",
    "Jul", "Au", "Se", "Oc", "No", "De"
  ];

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterPayments();
    calculateStudentStatus();
  }, [selectedMonth, selectedAgeGroup, payments, students]);

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      await Promise.all([loadPayments(), loadStudents(), loadAgeGroups()]);
    } catch (error) {
      setError("Failed to load data. Please check your connection.");
      Alert.alert(
        "Error",
        "Failed to load data. Please check your connection.",
      );
    } finally {
      setLoading(false);
    }
  };

  const loadPayments = async () => {
    try {
      const response = await fetch(API);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setPayments(data);
      setFilteredPayments(data);
    } catch (error) {
      console.log("Error loading payments:", error);
      setPayments([]);
      setFilteredPayments([]);
      throw error;
    }
  };

  const loadStudents = async () => {
    try {
      const response = await fetch(STUDENTS_API);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
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
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setAgeGroups(data);
    } catch (error) {
      console.log("Error loading age groups:", error);
      setAgeGroups([]);
      throw error;
    }
  };

  const filterPayments = () => {
    let filtered = [...payments];

    // Filter by month
    if (selectedMonth && selectedMonth !== "All Months") {
      filtered = filtered.filter((payment) => {
        if (!payment.payment_month) return false;
        return payment.payment_month.toLowerCase().includes(selectedMonth.toLowerCase());
      });
    }

    // Filter by age group - get student IDs for the selected age group
    if (selectedAgeGroup) {
      const studentIds = students
        .filter((student) => student.age_group_id === parseInt(selectedAgeGroup))
        .map((student) => student.id);
      
      filtered = filtered.filter((payment) => 
        studentIds.includes(payment.student_id)
      );
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => {
      const dateA = new Date(a.created_at || a.payment_date || 0);
      const dateB = new Date(b.created_at || b.payment_date || 0);
      return dateB.getTime() - dateA.getTime();
    });

    setFilteredPayments(filtered);
  };

  const calculateStudentStatus = () => {
    const studentIds = new Set(filteredPayments.map(p => p.student_id));
    
    // Count overdue students (students with any overdue payment)
    const overdueStudents = new Set();
    const upToDateStudents = new Set();
    
    filteredPayments.forEach(payment => {
      const status = payment.status?.toUpperCase() || 'PAID';
      if (status === 'OVERDUE') {
        overdueStudents.add(payment.student_id);
      }
    });
    
    // Students who have all payments up to date
    filteredPayments.forEach(payment => {
      const studentId = payment.student_id;
      const studentPayments = filteredPayments.filter(p => p.student_id === studentId);
      const allPaid = studentPayments.every(p => 
        p.status?.toUpperCase() === 'PAID' || p.status?.toUpperCase() === 'PENDING'
      );
      if (allPaid && !overdueStudents.has(studentId)) {
        upToDateStudents.add(studentId);
      }
    });
    
    setStudentStatus({
      total: studentIds.size,
      overdue: overdueStudents.size,
      upToDate: upToDateStudents.size
    });
  };

  const getTotalCollected = () => {
    return filteredPayments.reduce((sum, payment) => {
      const amount = parseFloat(payment.amount) || 0;
      return sum + amount;
    }, 0);
  };

  const getStudentName = (studentId: number) => {
    const student = students.find(s => s.id === studentId);
    return student ? student.student_name : 'Unknown Student';
  };

  const getStudentRegNumber = (studentId: number) => {
    const student = students.find(s => s.id === studentId);
    return student ? student.registration_number : 'N/A';
  };

  const getAgeGroupName = (studentId: number) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return 'N/A';
    const group = ageGroups.find(g => g.id === student.age_group_id);
    return group ? group.age_group_name : 'N/A';
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

  const getPaymentStatus = (status: string) => {
    const upperStatus = status?.toUpperCase() || 'PAID';
    switch (upperStatus) {
      case 'PAID':
        return { bg: '#D1FAE5', text: '#065F46', label: 'PAID' };
      case 'PENDING':
        return { bg: '#FEF3C7', text: '#92400E', label: 'PENDING' };
      case 'OVERDUE':
        return { bg: '#FEE2E2', text: '#991B1B', label: 'OVERDUE' };
      default:
        return { bg: '#D1FAE5', text: '#065F46', label: 'PAID' };
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method?.toLowerCase()) {
      case 'cash':
        return { icon: 'cash-outline', color: '#10B981' };
      case 'card':
        return { icon: 'card-outline', color: '#3B82F6' };
      case 'bank transfer':
        return { icon: 'business-outline', color: '#8B5CF6' };
      case 'credit card':
        return { icon: 'card-outline', color: '#6366F1' };
      case 'cheque':
        return { icon: 'document-text-outline', color: '#F59E0B' };
      default:
        return { icon: 'cash-outline', color: '#6B7280' };
    }
  };

  // Helper function to get the file system directory
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

    try {
      // @ts-ignore
      if (FileSystem.temporaryDirectory) {
        // @ts-ignore
        return FileSystem.temporaryDirectory;
      }
    } catch (e) {
      console.log('temporaryDirectory not available');
    }

    return null;
  };

  // Get student payment summary
  const getStudentPaymentSummary = (studentId: number) => {
    const studentPayments = filteredPayments.filter(p => p.student_id === studentId);
    const totalPaid = studentPayments.reduce((sum, p) => {
      if (p.status?.toUpperCase() === 'PAID') {
        return sum + (parseFloat(p.amount) || 0);
      }
      return sum;
    }, 0);
    
    const overdueCount = studentPayments.filter(p => p.status?.toUpperCase() === 'OVERDUE').length;
    const paidCount = studentPayments.filter(p => p.status?.toUpperCase() === 'PAID').length;
    const pendingCount = studentPayments.filter(p => p.status?.toUpperCase() === 'PENDING').length;
    
    return { totalPaid, overdueCount, paidCount, pendingCount, total: studentPayments.length };
  };

  // Get month status for a student
  const getMonthStatus = (studentId: number, monthIndex: number) => {
    const monthName = monthShort[monthIndex];
    const payment = filteredPayments.find(p => 
      p.student_id === studentId && 
      p.payment_month?.toLowerCase().includes(monthName.toLowerCase())
    );
    
    if (!payment) return 'No Payment';
    return payment.status?.toUpperCase() || 'PAID';
  };

  // Generate Students HTML Table for PDF
  const generateStudentsHTML = () => {
    let html = `
      <html>
        <head>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              padding: 30px; 
              margin: 0;
            }
            .header {
              margin-bottom: 20px;
              border-bottom: 2px solid #2563EB;
              padding-bottom: 15px;
            }
            h1 { 
              color: #1a1a2e; 
              font-size: 24px;
              margin: 0 0 5px 0;
            }
            .sub-header {
              color: #6B7280;
              font-size: 14px;
              margin: 5px 0;
            }
            .filters {
              background-color: #F3F4F6;
              padding: 10px 15px;
              border-radius: 6px;
              margin: 10px 0 15px 0;
              font-size: 13px;
              color: #374151;
            }
            .summary {
              background-color: #EFF6FF;
              padding: 10px 15px;
              border-radius: 6px;
              margin: 10px 0 15px 0;
              font-size: 14px;
              color: #1E40AF;
              font-weight: 500;
            }
            table { 
              width: 100%; 
              border-collapse: collapse; 
              margin-top: 15px;
              font-size: 13px;
            }
            th { 
              background-color: #2563EB; 
              color: white; 
              padding: 10px 8px; 
              text-align: left;
              font-weight: 600;
              border: 1px solid #2563EB;
            }
            td { 
              padding: 8px; 
              border: 1px solid #E5E7EB;
              text-align: left;
            }
            tr:nth-child(even) {
              background-color: #F9FAFB;
            }
            tr:hover {
              background-color: #F3F4F6;
            }
            .status-paid {
              color: #065F46;
              font-weight: 600;
            }
            .status-overdue {
              color: #991B1B;
              font-weight: 600;
            }
            .status-pending {
              color: #92400E;
              font-weight: 600;
            }
            .status-no-payment {
              color: #9CA3AF;
            }
            .footer {
              margin-top: 20px;
              color: #6B7280;
              font-size: 12px;
              border-top: 1px solid #E5E7EB;
              padding-top: 15px;
              text-align: center;
            }
            .badge {
              display: inline-block;
              padding: 2px 8px;
              border-radius: 12px;
              font-size: 11px;
              font-weight: 600;
            }
            .badge-paid {
              background-color: #D1FAE5;
              color: #065F46;
            }
            .badge-overdue {
              background-color: #FEE2E2;
              color: #991B1B;
            }
            .badge-pending {
              background-color: #FEF3C7;
              color: #92400E;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Payment Records - All Students</h1>
            <div class="sub-header">
              <strong>Generated:</strong> ${new Date().toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
          
          <div class="filters">
            <strong>Filters Applied:</strong> 
            Month: ${selectedMonth || 'All Months'} | 
            Age Group: ${selectedAgeGroup ? ageGroups.find(g => g.id === parseInt(selectedAgeGroup))?.age_group_name || 'All Age Groups' : 'All Age Groups'}
          </div>
          
          <div class="summary">
            <strong>Total Students:</strong> ${students.length} | 
            <strong>With Overdue:</strong> ${studentStatus.overdue} | 
            <strong>Up to Date:</strong> ${studentStatus.upToDate}
          </div>
          
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Reg. Number</th>
                <th>Student Name</th>
                <th>Age Group</th>
    `;

    // Add month columns
    monthShort.forEach(month => {
      html += `<th>${month}</th>`;
    });

    html += `
              </tr>
            </thead>
            <tbody>
    `;

    students.forEach((student, index) => {
      const ageGroup = ageGroups.find(g => g.id === student.age_group_id);
      const rowNum = index + 1;
      
      html += `
        <tr>
          <td>${rowNum}</td>
          <td>${student.registration_number || 'N/A'}</td>
          <td><strong>${student.student_name}</strong></td>
          <td>${ageGroup?.age_group_name || 'N/A'}</td>
      `;

      // Add month status cells
      monthShort.forEach((month, monthIndex) => {
        const status = getMonthStatus(student.id, monthIndex);
        let statusClass = 'status-no-payment';
        let badgeClass = '';
        let displayStatus = status;
        
        if (status === 'PAID') {
          statusClass = 'status-paid';
          badgeClass = 'badge-paid';
          displayStatus = 'Paid';
        } else if (status === 'OVERDUE') {
          statusClass = 'status-overdue';
          badgeClass = 'badge-overdue';
          displayStatus = 'Overdue';
        } else if (status === 'PENDING') {
          statusClass = 'status-pending';
          badgeClass = 'badge-pending';
          displayStatus = 'Pending';
        } else {
          displayStatus = '—';
        }
        
        html += `
          <td class="${statusClass}">
            ${displayStatus !== '—' ? `<span class="badge ${badgeClass}">${displayStatus}</span>` : displayStatus}
          </td>
        `;
      });

      html += `
        </tr>
      `;
    });

    html += `
            </tbody>
          </table>
          
          <div class="footer">
            Generated from Payment Records System • ${new Date().toLocaleString()}
          </div>
        </body>
      </html>
    `;

    return html;
  };

  // Generate Transactions HTML Table for PDF
  const generateTransactionsHTML = () => {
    let html = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; padding: 30px; }
            h1 { color: #1a1a2e; border-bottom: 2px solid #2563EB; padding-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th { 
              background-color: #2563EB; 
              color: white; 
              padding: 12px; 
              text-align: left;
              font-weight: bold;
            }
            td { padding: 10px; border-bottom: 1px solid #e5e7eb; }
            tr:hover { background-color: #f9fafb; }
            .total-row { background-color: #f3f4f6; font-weight: bold; }
            .status-badge {
              padding: 4px 12px;
              border-radius: 12px;
              font-size: 12px;
              font-weight: 600;
              display: inline-block;
            }
            .status-PAID { background-color: #D1FAE5; color: #065F46; }
            .status-PENDING { background-color: #FEF3C7; color: #92400E; }
            .status-OVERDUE { background-color: #FEE2E2; color: #991B1B; }
            .summary { 
              background-color: #f3f4f6; 
              padding: 15px; 
              border-radius: 8px;
              margin-top: 20px;
            }
            .filters {
              background-color: #EFF6FF;
              padding: 10px 15px;
              border-radius: 6px;
              margin: 10px 0 15px 0;
              font-size: 13px;
              color: #1E40AF;
            }
          </style>
        </head>
        <body>
          <h1>Payment Records - Transactions</h1>
          <div class="filters">
            <strong>Filters:</strong> Month: ${selectedMonth || 'All Months'} | 
            Age Group: ${selectedAgeGroup ? ageGroups.find(g => g.id === parseInt(selectedAgeGroup))?.age_group_name || 'All Age Groups' : 'All Age Groups'}
          </div>
          <div class="summary">
            <strong>Total Records:</strong> ${filteredPayments.length} | 
            <strong>Total Collected:</strong> Rs ${getTotalCollected().toFixed(2)}
          </div>
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Reg. Number</th>
                <th>Age Group</th>
                <th>Month Paid For</th>
                <th>Payment Date</th>
                <th>Method</th>
                <th>Amount (Rs)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
    `;

    filteredPayments.forEach(payment => {
      const status = getPaymentStatus(payment.status || 'PAID');
      html += `
        <tr>
          <td>${getStudentName(payment.student_id)}</td>
          <td>${getStudentRegNumber(payment.student_id)}</td>
          <td>${getAgeGroupName(payment.student_id)}</td>
          <td>${payment.payment_month || 'N/A'}</td>
          <td>${formatDate(payment.created_at || payment.payment_date)}</td>
          <td>${payment.payment_method || 'N/A'}</td>
          <td>Rs ${parseFloat(payment.amount || 0).toFixed(2)}</td>
          <td><span class="status-badge status-${status.label}">${status.label}</span></td>
        </tr>
      `;
    });

    html += `
      <tr class="total-row">
        <td colspan="6" style="text-align: right;"><strong>TOTAL:</strong></td>
        <td><strong>Rs ${getTotalCollected().toFixed(2)}</strong></td>
        <td></td>
      </tr>
    `;

    html += `
            </tbody>
          </table>
          <p style="margin-top: 20px; color: #6b7280; font-size: 12px;">
            Generated on: ${new Date().toLocaleString()}
          </p>
        </body>
      </html>
    `;

    return html;
  };

  // Download PDF based on active tab
  const downloadPDF = async () => {
    setExporting(true);
    try {
      let htmlContent;
      let fileName;
      
      if (activeTab === 'transactions') {
        if (filteredPayments.length === 0) {
          Alert.alert('No Data', 'There are no payment records to export.');
          setExporting(false);
          return;
        }
        htmlContent = generateTransactionsHTML();
        fileName = `Payment_Transactions_${new Date().toISOString().split('T')[0]}.html`;
      } else {
        if (students.length === 0) {
          Alert.alert('No Data', 'There are no students to export.');
          setExporting(false);
          return;
        }
        htmlContent = generateStudentsHTML();
        fileName = `Payment_Students_${new Date().toISOString().split('T')[0]}.html`;
      }
      
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
        if (!dir) {
          throw new Error('No file system directory available');
        }
        
        const fileUri = dir + fileName;
        await FileSystem.writeAsStringAsync(fileUri, htmlContent);
        
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(fileUri);
        } else {
          Alert.alert('Error', 'Sharing is not available on this device.');
        }
      }
    } catch (error) {
      console.error('PDF download error:', error);
      Alert.alert('Error', 'Failed to download PDF. Please try again.');
    } finally {
      setExporting(false);
    }
  };

  // Download Excel based on active tab
  const downloadExcel = async () => {
    setExporting(true);
    try {
      let csvContent;
      let fileName;
      
      if (activeTab === 'transactions') {
        if (filteredPayments.length === 0) {
          Alert.alert('No Data', 'There are no payment records to export.');
          setExporting(false);
          return;
        }
        
        const headers = [
          'Student Name',
          'Registration Number',
          'Age Group',
          'Month Paid For',
          'Payment Date',
          'Method',
          'Amount (Rs)',
          'Status'
        ];

        const rows = filteredPayments.map(payment => [
          `"${getStudentName(payment.student_id)}"`,
          `"${getStudentRegNumber(payment.student_id)}"`,
          `"${getAgeGroupName(payment.student_id)}"`,
          `"${payment.payment_month || 'N/A'}"`,
          `"${formatDate(payment.created_at || payment.payment_date)}"`,
          `"${payment.payment_method || 'N/A'}"`,
          parseFloat(payment.amount || 0).toFixed(2),
          `"${getPaymentStatus(payment.status || 'PAID').label}"`
        ]);

        rows.push([
          '',
          '',
          '',
          '',
          'TOTAL:',
          '',
          `"${getTotalCollected().toFixed(2)}"`,
          ''
        ]);

        csvContent = [
          headers.join(','),
          ...rows.map(row => row.join(','))
        ].join('\n');
        
        fileName = `Payment_Transactions_${new Date().toISOString().split('T')[0]}.csv`;
      } else {
        if (students.length === 0) {
          Alert.alert('No Data', 'There are no students to export.');
          setExporting(false);
          return;
        }
        
        // Students CSV
        const headers = ['#', 'Reg. Number', 'Student Name', 'Age Group', ...monthShort];
        const rows = students.map((student, index) => {
          const ageGroup = ageGroups.find(g => g.id === student.age_group_id);
          const row = [
            index + 1,
            `"${student.registration_number || 'N/A'}"`,
            `"${student.student_name}"`,
            `"${ageGroup?.age_group_name || 'N/A'}"`
          ];
          
          monthShort.forEach((_, monthIndex) => {
            const status = getMonthStatus(student.id, monthIndex);
            row.push(`"${status}"`);
          });
          
          return row;
        });

        csvContent = [
          headers.join(','),
          ...rows.map(row => row.join(','))
        ].join('\n');
        
        fileName = `Payment_Students_${new Date().toISOString().split('T')[0]}.csv`;
      }
      
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
        if (!dir) {
          throw new Error('No file system directory available');
        }
        
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

  const renderPaymentItem = ({ item }: { item: any }) => {
    const methodInfo = getMethodIcon(item.payment_method);
    const statusInfo = getPaymentStatus(item.status || 'PAID');
    const amount = parseFloat(item.amount) || 0;

    return (
      <View style={styles.tableRow}>
        <Text style={[styles.tableCell, styles.cellStudent]} numberOfLines={1}>
          {getStudentName(item.student_id)}
        </Text>
        <Text style={[styles.tableCell, styles.cellReg]} numberOfLines={1}>
          {getStudentRegNumber(item.student_id)}
        </Text>
        <Text style={[styles.tableCell, styles.cellAgeGroup]} numberOfLines={1}>
          {getAgeGroupName(item.student_id)}
        </Text>
        <Text style={[styles.tableCell, styles.cellMonth]} numberOfLines={1}>
          {item.payment_month}
        </Text>
        <Text style={[styles.tableCell, styles.cellDate]} numberOfLines={1}>
          {formatDate(item.created_at || item.payment_date)}
        </Text>
        <Text style={[styles.tableCell, styles.cellMethod]} numberOfLines={1}>
          <Ionicons size={12} color={methodInfo.color} /> {item.payment_method || 'N/A'}
        </Text>
        <Text style={[styles.tableCell, styles.cellAmount]} numberOfLines={1}>
          Rs {amount.toFixed(2)}
        </Text>
        <View style={[styles.tableCell, styles.cellStatus]}>
          <View style={[styles.statusBadge, { backgroundColor: statusInfo.bg }]}>
            <Text style={[styles.statusText, { color: statusInfo.text }]}>
              {statusInfo.label}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderStudentItem = ({ item }: { item: any }) => {
    const summary = getStudentPaymentSummary(item.id);
    const ageGroup = ageGroups.find(g => g.id === item.age_group_id);
    const studentNumber = students.indexOf(item) + 1;
    
    return (
      <View style={styles.studentCard}>
        <View style={styles.studentCardHeader}>
          <View style={styles.studentNameContainer}>
            <Text style={styles.studentNumber}>{studentNumber}.</Text>
            <Text style={styles.studentName}>{item.student_name}</Text>
          </View>
          <View style={styles.studentInfoContainer}>
            <Text style={styles.studentAgeGroup}>{ageGroup?.age_group_name || 'N/A'}</Text>
          </View>
        </View>
        
        <View style={styles.studentOverdueContainer}>
          <Text style={styles.studentOverdueText}>
            {summary.overdueCount} Overdue
          </Text>
        </View>
        
        {/* 12-Month Payment Status */}
        <View style={styles.monthlyStatusContainer}>
          {monthShort.map((month, index) => {
            const status = getMonthStatus(item.id, index);
            let dotColor = '#E5E7EB'; // no payment
            if (status === 'PAID') dotColor = '#10B981';
            else if (status === 'OVERDUE') dotColor = '#EF4444';
            else if (status === 'PENDING') dotColor = '#F59E0B';
            
            return (
              <View key={index} style={styles.monthDotContainer}>
                <View style={[styles.monthDot, { backgroundColor: dotColor }]} />
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  if (loading && !payments.length) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.loadingText}>Loading payment records...</Text>
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
            <Text style={styles.title}>Payment Records</Text>
            <Text style={styles.sub}>
              View historical transactions and overall student payment status.
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
            style={[styles.tabButton, activeTab === 'transactions' && styles.tabButtonActive]}
            onPress={() => setActiveTab('transactions')}
          >
            <Ionicons 
              name="receipt-outline" 
              size={18} 
              color={activeTab === 'transactions' ? '#2563EB' : '#6B7280'} 
            />
            <Text style={[styles.tabText, activeTab === 'transactions' && styles.tabTextActive]}>
              Transactions
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'students' && styles.tabButtonActive]}
            onPress={() => setActiveTab('students')}
          >
            <Ionicons 
              name="people-outline" 
              size={18} 
              color={activeTab === 'students' ? '#2563EB' : '#6B7280'} 
            />
            <Text style={[styles.tabText, activeTab === 'students' && styles.tabTextActive]}>
              All Students
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
                  onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="All Months" value="" />
                  {monthNames.slice(1).map((month) => (
                    <Picker.Item
                      key={month}
                      label={month}
                      value={month}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.filterGroup}>
              <Text style={styles.filterLabel}>Age Group</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedAgeGroup}
                  onValueChange={(itemValue) => setSelectedAgeGroup(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="All Age Groups" value="" />
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
          </View>
        </View>

        {/* Student Status Section - Only show in Students tab */}
        {activeTab === 'students' && (
          <View style={styles.studentStatusSection}>
            <View style={styles.studentStatusContainer}>
              <View style={styles.studentStatusItem}>
                <Text style={styles.studentStatusNumber}>{studentStatus.total}</Text>
                <Text style={styles.studentStatusLabel}>Students Displayed</Text>
              </View>
              
              <View style={styles.statusDivider} />
              
              <View style={styles.studentStatusItem}>
                <Text style={[styles.studentStatusNumber, styles.overdueNumber]}>
                  {studentStatus.overdue}
                </Text>
                <Text style={[styles.studentStatusLabel, styles.overdueLabel]}>
                  Overdue
                </Text>
              </View>
              
              <View style={styles.statusDivider} />
              
              <View style={styles.studentStatusItem}>
                <Text style={[styles.studentStatusNumber, styles.upToDateNumber]}>
                  {studentStatus.upToDate}
                </Text>
                <Text style={[styles.studentStatusLabel, styles.upToDateLabel]}>
                  Up to date
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Summary Section */}
        <View style={styles.summarySection}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryLeft}>
              <Text style={styles.summaryLabel}>Total Collected</Text>
              <Text style={styles.summaryAmount}>
                Rs {getTotalCollected().toFixed(2)}
              </Text>
            </View>
            <View style={styles.summaryRight}>
              <View style={styles.summaryStats}>
                <Text style={styles.summaryCount}>
                  {activeTab === 'transactions' 
                    ? `${filteredPayments.length} matching record${filteredPayments.length !== 1 ? 's' : ''}`
                    : `${students.length} student${students.length !== 1 ? 's' : ''}`
                  }
                </Text>
              </View>
              <View style={styles.exportButtons}>
                <TouchableOpacity 
                  style={[styles.exportBtn, styles.exportBtnPDF]} 
                  onPress={downloadPDF}
                  disabled={exporting || (activeTab === 'transactions' ? filteredPayments.length === 0 : students.length === 0)}
                >
                  {exporting ? (
                    <ActivityIndicator size="small" color="#2563EB" />
                  ) : (
                    <>
                      <Ionicons name="document-text-outline" size={18} color="#2563EB" />
                      <Text style={styles.exportText}>PDF</Text>
                    </>
                  )}
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.exportBtn, styles.exportBtnExcel]} 
                  onPress={downloadExcel}
                  disabled={exporting || (activeTab === 'transactions' ? filteredPayments.length === 0 : students.length === 0)}
                >
                  {exporting ? (
                    <ActivityIndicator size="small" color="#2563EB" />
                  ) : (
                    <>
                      <Ionicons name="grid-outline" size={18} color="#2563EB" />
                      <Text style={styles.exportText}>Excel</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Content based on active tab */}
        {activeTab === 'transactions' ? (
          // Transaction History - Table View
          <View style={styles.transactionSection}>
            <Text style={styles.sectionTitle}>Transaction History</Text>

            {filteredPayments.length > 0 ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                <View style={styles.tableContainer}>
                  {/* Table Header */}
                  <View style={styles.tableHeader}>
                    <Text style={[styles.headerCell, styles.cellStudent]}>Student Name</Text>
                    <Text style={[styles.headerCell, styles.cellReg]}>Reg. Number</Text>
                    <Text style={[styles.headerCell, styles.cellAgeGroup]}>Age Group</Text>
                    <Text style={[styles.headerCell, styles.cellMonth]}>Month Paid For</Text>
                    <Text style={[styles.headerCell, styles.cellDate]}>Payment Date</Text>
                    <Text style={[styles.headerCell, styles.cellMethod]}>Method</Text>
                    <Text style={[styles.headerCell, styles.cellAmount]}>Amount</Text>
                    <Text style={[styles.headerCell, styles.cellStatus]}>Status</Text>
                  </View>

                  {/* Table Body */}
                  <FlatList
                    data={filteredPayments}
                    keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                    scrollEnabled={false}
                    renderItem={renderPaymentItem}
                  />
                </View>
              </ScrollView>
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="receipt-outline" size={48} color="#D1D5DB" />
                <Text style={styles.emptyStateText}>No payment records found</Text>
                <Text style={styles.emptyStateSub}>
                  Try adjusting your filters to see more results.
                </Text>
              </View>
            )}
          </View>
        ) : (
          // All Students View
          <View style={styles.studentsSection}>
            <View style={styles.studentsHeader}>
              <Text style={styles.sectionTitle}>12-Month Payment Status</Text>
            </View>

            {/* Month Labels Header */}
            <View style={styles.monthLabelsContainer}>
              {monthShort.map((month, index) => (
                <Text key={index} style={styles.monthLabel}>{month}</Text>
              ))}
            </View>

            {/* Students List */}
            {students.length > 0 ? (
              <FlatList
                data={students}
                keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                scrollEnabled={false}
                renderItem={renderStudentItem}
                ItemSeparatorComponent={() => <View style={styles.studentSeparator} />}
              />
            ) : (
              <View style={styles.emptyState}>
                <Ionicons name="people-outline" size={48} color="#D1D5DB" />
                <Text style={styles.emptyStateText}>No students found</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}