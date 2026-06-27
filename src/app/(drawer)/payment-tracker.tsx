import AppHeader from "@/components/AppHeader";
import styles from "@/styles/paymentTracker.styles";

import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function PaymentTracker() {
  // API Endpoints - Update with your actual IP
  const API = "http://192.168.8.102:5000/api/payments";
  const STUDENTS_API = "http://192.168.8.102:5000/api/students";

  // State Management
  const [payments, setPayments] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form Fields
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [paymentMonth, setPaymentMonth] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [amount, setAmount] = useState("");

  // Payment Methods
  const paymentMethods = ["Cash", "Bank Transfer", "Credit Card", "Cheque"];

  // Months for payment status
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  // Get current date
  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get current month
  const getCurrentMonth = () => {
    const date = new Date();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Load data on mount
  useEffect(() => {
    loadPayments();
    loadStudents();
    setPaymentMonth(getCurrentMonth());
  }, []);

  // Load all payments
  const loadPayments = async () => {
    try {
      setLoading(true);
      setError("");
      console.log("Fetching payments from:", API);

      const response = await fetch(API);
      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Payments loaded:", data.length);
      setPayments(data);
    } catch (error) {
      console.log("Error loading payments:", error);
      setError("Failed to load payments. Please check your connection.");
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  // Load all students
  const loadStudents = async () => {
    try {
      console.log("Fetching students from:", STUDENTS_API);
      const response = await fetch(STUDENTS_API);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Students loaded:", data.length);
      setStudents(data);
    } catch (error) {
      console.log("Error loading students:", error);
      setStudents([]);
    }
  };

  // Reset form
  const resetForm = () => {
    setEditId(null);
    setStudentId("");
    setStudentName("");
    setPaymentMonth(getCurrentMonth());
    setPaymentMethod("Cash");
    setAmount("");
    setSelectedStudent(null);
  };

  // Save payment
  const savePayment = async () => {
    if (!studentId) {
      Alert.alert("Error", "Please select a student");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }

    const body = {
      student_id: studentId,
      payment_month: paymentMonth,
      payment_method: paymentMethod,
      amount: parseFloat(amount),
    };

    try {
      setLoading(true);
      const url = editId ? `${API}/${editId}` : API;
      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await loadPayments();
      resetForm();
      setModal(false);
      Alert.alert("Success", "Payment saved successfully");
    } catch (error) {
      console.log("Error saving payment:", error);
      Alert.alert("Error", "Failed to save payment");
    } finally {
      setLoading(false);
    }
  };

  // Delete payment
  const deletePayment = async (id: number) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this payment?",
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

              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }

              await loadPayments();
              Alert.alert("Success", "Payment deleted successfully");
            } catch (error) {
              console.log("Error deleting payment:", error);
              Alert.alert("Error", "Failed to delete payment");
            }
          },
        },
      ],
    );
  };

  // Get student payment history
  const getStudentPaymentHistory = (studentId: string) => {
    return payments
      .filter((payment) => payment.student_id === studentId)
      .sort(
        (a, b) =>
          new Date(b.created_at || b.payment_month).getTime() -
          new Date(a.created_at || a.payment_month).getTime(),
      );
  };

  // Get payment status for a specific month
  const getPaymentStatus = (studentId: string, monthIndex: number) => {
    const currentYear = new Date().getFullYear();
    const monthDate = new Date(currentYear, monthIndex, 1);
    const monthString = monthDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    const payment = payments.find(
      (p) => p.student_id === studentId && p.payment_month === monthString,
    );

    if (payment) {
      return "paid";
    }

    // Check if month is in the future
    const currentMonthIndex = new Date().getMonth();
    if (monthIndex > currentMonthIndex) {
      return "pending";
    }

    return "overdue";
  };

  // Handle student selection
  const handleStudentSelect = (student: any) => {
    setSelectedStudent(student);
    setStudentId(student.id);
    setStudentName(student.student_name);
  };

  // Show loading state
  if (loading && !payments.length) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.loadingText}>Loading...</Text>
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
        {/* TOP BAR */}
        <View style={styles.top}>
          <View>
            <Text style={styles.title}>Payment Tracker</Text>
            <Text style={styles.sub}>Manage student payments</Text>
          </View>

          <View style={styles.dateBadge}>
            <Ionicons name="calendar-outline" size={16} color="#2563EB" />
            <Text style={styles.dateText}>{getCurrentDate()}</Text>
          </View>
        </View>

        {/* Error Display */}
        {error ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={20} color="#EF4444" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {/* Payment Form Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Record Payment</Text>

          {/* Student Picker */}
          <View style={styles.formGroup}>
            <View style={styles.pickerHeader}>
              <Text style={styles.label}>STUDENT</Text>
              <TouchableOpacity 
                style={styles.selectStudentBtn}
                onPress={() => setModal(true)}
              >
                <Text style={styles.selectStudentText}>Browse</Text>
                <Ionicons name="search-outline" size={16} color="#2563EB" />
              </TouchableOpacity>
            </View>
            <View style={styles.pickerWrap}>
              <Picker
                selectedValue={studentId}
                onValueChange={(value) => {
                  const student = students.find((s) => s.id === value);
                  setStudentId(value);
                  setStudentName(student?.student_name || "");
                  setSelectedStudent(student || null);
                }}
              >
                <Picker.Item label="Select student..." value="" />
                {students.map((student: any) => (
                  <Picker.Item
                    key={student.id}
                    label={student.student_name}
                    value={student.id}
                  />
                ))}
              </Picker>
            </View>
          </View>

          {/* Payment Month */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>PAYMENT MONTH</Text>
            <View style={styles.pickerWrap}>
              <Picker
                selectedValue={paymentMonth}
                onValueChange={(value) => setPaymentMonth(value)}
              >
                <Picker.Item
                  label={`${getCurrentMonth()} (Current)`}
                  value={getCurrentMonth()}
                />
                {Array.from({ length: 6 }, (_, i) => {
                  const date = new Date();
                  date.setMonth(date.getMonth() - (i + 1));
                  const month = date.toLocaleString("default", {
                    month: "long",
                  });
                  const year = date.getFullYear();
                  const label = `${month} ${year}`;
                  return (
                    <Picker.Item key={label} label={label} value={label} />
                  );
                })}
              </Picker>
            </View>
          </View>

          {/* Payment Method */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>PAYMENT METHOD</Text>
            <View style={styles.pickerWrap}>
              <Picker
                selectedValue={paymentMethod}
                onValueChange={(value) => setPaymentMethod(value)}
              >
                {paymentMethods.map((method) => (
                  <Picker.Item key={method} label={method} value={method} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Amount Input */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>AMOUNT (Rs)</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="Rs 0.00"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={savePayment}
            disabled={loading}
          >
            <Text style={styles.submitBtnText}>
              {loading ? "Saving..." : "Submit Payment"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Student Details Card - Only shown when a student is selected */}
        {selectedStudent && (
          <>
            <View style={styles.studentCard}>
              <View style={styles.studentHeader}>
                <View style={styles.studentAvatar}>
                  <Text style={styles.studentAvatarText}>
                    {selectedStudent.student_name?.charAt(0) || "S"}
                  </Text>
                </View>
                <View style={styles.studentInfo}>
                  <Text style={styles.studentName}>
                    {selectedStudent.student_name}
                  </Text>
                  <Text style={styles.studentGroup}>
                    {selectedStudent.age_group_name || "U-9"}
                  </Text>
                </View>
                <TouchableOpacity style={styles.studentAction}>
                  <Ionicons name="chevron-forward" size={24} color="#64748B" />
                </TouchableOpacity>
              </View>

              <View style={styles.studentContact}>
                <View style={styles.contactItem}>
                  <Ionicons name="call-outline" size={16} color="#64748B" />
                  <Text style={styles.contactText}>
                    {selectedStudent.contact_number || "N/A"}
                  </Text>
                </View>
                <View style={styles.contactItem}>
                  <Ionicons name="mail-outline" size={16} color="#64748B" />
                  <Text style={styles.contactText}>
                    {selectedStudent.email || "N/A"}
                  </Text>
                </View>
              </View>
            </View>

            {/* 12-Month Payment Status */}
            <View style={styles.statusCard}>
              <Text style={styles.statusTitle}>12-Month Payment Status</Text>
              <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                  <View
                    style={[styles.legendDot, { backgroundColor: "#10B981" }]}
                  />
                  <Text style={styles.legendText}>Paid</Text>
                </View>
                <View style={styles.legendItem}>
                  <View
                    style={[styles.legendDot, { backgroundColor: "#EF4444" }]}
                  />
                  <Text style={styles.legendText}>Overdue</Text>
                </View>
                <View style={styles.legendItem}>
                  <View
                    style={[styles.legendDot, { backgroundColor: "#F59E0B" }]}
                  />
                  <Text style={styles.legendText}>Pending</Text>
                </View>
              </View>

              <View style={styles.monthsGrid}>
                {months.map((month, index) => {
                  const status = getPaymentStatus(selectedStudent.id, index);
                  const statusColor =
                    status === "paid"
                      ? "#10B981"
                      : status === "overdue"
                        ? "#EF4444"
                        : "#F59E0B";

                  return (
                    <View key={index} style={styles.monthItem}>
                      <View
                        style={[
                          styles.monthDot,
                          { backgroundColor: statusColor },
                        ]}
                      />
                      <Text style={styles.monthLabel}>{month}</Text>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* Recent Transactions - Table View */}
            <View style={styles.transactionCard}>
              <Text style={styles.transactionTitle}>Recent Transactions</Text>

              {getStudentPaymentHistory(selectedStudent.id).length > 0 ? (
                <>
                  {/* Table Header */}
                  <View style={styles.tableHeader}>
                    <Text style={[styles.tableHeaderText, { flex: 1.5 }]}>Date</Text>
                    <Text style={[styles.tableHeaderText, { flex: 1.5 }]}>Billed Month</Text>
                    <Text style={[styles.tableHeaderText, { flex: 1.2 }]}>Method</Text>
                    <Text style={[styles.tableHeaderText, { flex: 1.2 }]}>Amount</Text>
                    <Text style={[styles.tableHeaderText, { flex: 1 }]}>Status</Text>
                  </View>

                  {/* Table Rows */}
                  {getStudentPaymentHistory(selectedStudent.id).map((item, index) => (
                    <View key={index} style={styles.tableRow}>
                      <Text style={[styles.tableCell, { flex: 1.5 }]}>
                        {formatDate(item.created_at || item.payment_month)}
                      </Text>
                      <Text style={[styles.tableCell, { flex: 1.5 }]}>
                        {item.payment_month}
                      </Text>
                      <Text style={[styles.tableCell, { flex: 1.2 }]}>
                        {item.payment_method}
                      </Text>
                      <Text style={[styles.tableCell, { flex: 1.2, fontWeight: "600", color: "#055807" }]}>
                        Rs. {item.amount}
                      </Text>
                      <View style={[styles.statusBadge, { flex: 1 }]}>
                        <Text style={styles.statusBadgeText}>PAID</Text>
                      </View>
                      {/* $<TouchableOpacity
                        style={styles.deleteBtn}
                        onPress={() => deletePayment(item.id)}
                      >
                        <Ionicons name="trash-outline" size={16} color="#EF4444" />
                      </TouchableOpacity> */}
                    </View>
                  ))}
                </>
              ) : (
                <View style={styles.emptyTransaction}>
                  <Ionicons name="receipt-outline" size={40} color="#CBD5E1" />
                  <Text style={styles.emptyTransactionText}>
                    No transactions yet for this student.
                  </Text>
                </View>
              )}
            </View>
          </>
        )}
      </ScrollView>

      {/* Student Selection Modal */}
      <Modal visible={modal} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select a Student</Text>
              <TouchableOpacity
                onPress={() => {
                  setModal(false);
                  resetForm();
                }}
              >
                <Ionicons name="close" size={24} color="#64748B" />
              </TouchableOpacity>
            </View>

            <TextInput
              placeholder="Search students..."
              value={search}
              onChangeText={setSearch}
              style={styles.modalSearch}
            />

            <FlatList
              data={students.filter(
                (item) =>
                  item.student_name
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||
                  item.registration_number
                    ?.toLowerCase()
                    .includes(search.toLowerCase()),
              )}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalStudentItem}
                  onPress={() => {
                    handleStudentSelect(item);
                    setModal(false);
                    setSearch("");
                  }}
                >
                  <View style={styles.modalStudentAvatar}>
                    <Text style={styles.modalAvatarText}>
                      {item.student_name?.charAt(0) || "S"}
                    </Text>
                  </View>
                  <View style={styles.modalStudentInfo}>
                    <Text style={styles.modalStudentName}>
                      {item.student_name}
                    </Text>
                    <Text style={styles.modalStudentReg}>
                      {item.registration_number}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}