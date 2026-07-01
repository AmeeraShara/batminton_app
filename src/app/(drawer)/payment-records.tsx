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
} from "react-native";

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
  const API = "http://192.168.8.102:5000/api/payments";
  const STUDENTS_API = "http://192.168.8.102:5000/api/students";
  const AGE_GROUPS_API = "http://192.168.8.102:5000/api/agegroups";

  // State Management
  const [payments, setPayments] = useState<any[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [ageGroups, setAgeGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filter states
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>("");

  // Month names
  const monthNames = [
    "All Months",
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterPayments();
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
                  {filteredPayments.length} matching record{filteredPayments.length !== 1 ? 's' : ''}
                </Text>
              </View>
              <TouchableOpacity style={styles.exportBtn}>
                <Ionicons name="download-outline" size={18} color="#2563EB" />
                <Text style={styles.exportText}>Export</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Transaction History - Table View */}
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
      </ScrollView>
    </SafeAreaView>
  );
}