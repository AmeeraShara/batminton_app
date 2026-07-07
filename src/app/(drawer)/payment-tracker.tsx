import AppHeader from "@/components/AppHeader";
import styles from "@/styles/paymentTracker.styles";

import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function PaymentTracker() {
  // API Endpoints - Update with your actual IP
  const API = "http://192.168.100.169:5000/api/payments";
  const STUDENTS_API = "http://192.168.100.169:5000/api/students";

  // State Management
  const [payments, setPayments] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
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
      console.log("Sample payment data:", JSON.stringify(data[0], null, 2));
      setPayments(data);
      
      // If a student is selected, refresh their data
      if (studentId) {
        const student = students.find((s) => String(s.id) === String(studentId));
        if (student) {
          setSelectedStudent(student);
        }
      }
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
      console.log("Sample student data:", JSON.stringify(data[0], null, 2));
      console.log("All students:", JSON.stringify(data, null, 2));
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

      console.log("Saving payment:", { url, method, body });

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Payment saved:", result);

      await loadPayments();
      
      // Keep the student selected after payment
      if (studentId) {
        const student = students.find((s) => String(s.id) === String(studentId));
        if (student) {
          setSelectedStudent(student);
        }
      }
      
      // Reset only the form fields, keep student selected
      setAmount("");
      setPaymentMonth(getCurrentMonth());
      setPaymentMethod("Cash");
      setEditId(null);
      
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
              
              // Keep the student selected after deletion
              if (studentId) {
                const student = students.find((s) => String(s.id) === String(studentId));
                if (student) {
                  setSelectedStudent(student);
                }
              }
              
              Alert.alert("Success", "Payment deleted successfully");
            } catch (error) {
              Alert.alert("Error", "Failed to delete payment");
            }
          },
        },
      ],
    );
  };

  // Get student payment history
  const getStudentPaymentHistory = (studentId: string) => {
    if (!studentId) return [];
    

    
    const filtered = payments.filter((payment) => {
      return String(payment.student_id) === String(studentId);
    });
    
    
    const sorted = filtered.sort(
      (a, b) =>
        new Date(b.created_at || b.payment_month).getTime() -
        new Date(a.created_at || a.payment_month).getTime(),
    );
    
    return sorted;
  };

  // Get payment status for a specific month
  const getPaymentStatus = (studentId: string, monthIndex: number) => {
    if (!studentId) return "pending";
    
    const currentYear = new Date().getFullYear();
    const monthDate = new Date(currentYear, monthIndex, 1);
    const monthString = monthDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    const payment = payments.find(
      (p) => String(p.student_id) === String(studentId) && p.payment_month === monthString,
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

  // Handle student selection from dropdown
  const handleStudentSelect = (value: string) => {

    
    setStudentId(value);
    
    if (value) {
      // Try to find student by comparing string values
      const student = students.find((s) => {
        return String(s.id) === String(value);
      });
      
      console.log("Found student:", student);
      
      if (student) {
        setStudentName(student.student_name || "");
        setSelectedStudent(student);
        console.log("✅ Student selected successfully:", student.student_name);
        console.log("Student ID for payments:", student.id);
        
        // Check if this student has payments
        const studentPayments = payments.filter(p => String(p.student_id) === String(student.id));
        console.log("This student has", studentPayments.length, "payments");
        if (studentPayments.length > 0) {
          console.log("First payment:", studentPayments[0]);
        }
      } else {
        console.log("❌ No student found with ID:", value);
        console.log("Available student IDs:", students.map(s => `${s.id} (${typeof s.id})`));
        setStudentName("");
        setSelectedStudent(null);
      }
    } else {
      console.log("No student selected");
      setStudentName("");
      setSelectedStudent(null);
    }
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
            <Text style={styles.label}>SELECT STUDENT</Text>
            <View style={styles.pickerWrap}>
              <Picker
                selectedValue={studentId}
                onValueChange={handleStudentSelect}
                style={{ height: 50 }}
              >
                <Picker.Item label="-- Select a student --" value="" />
                {students.map((student: any) => (
                  <Picker.Item
                    key={student.id}
                    label={`${student.student_name} (${student.age_group_name || 'U-9'})`}
                    value={String(student.id)}
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
                style={{ height: 50 }}
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
                style={{ height: 50 }}
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
              placeholder="Enter amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              placeholderTextColor="#94A3B8"
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitBtn, loading && styles.submitBtnDisabled]}
            onPress={savePayment}
            disabled={loading}
          >
            <Text style={styles.submitBtnText}>
              {loading ? "Processing..." : "Submit Payment"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* STUDENT DETAILS - SHOWS IMMEDIATELY AFTER SELECTION */}
        {selectedStudent ? (
          <>
            {/* Student Info Card */}
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
                    {selectedStudent.age_group_name || "U-9"} • Reg: {selectedStudent.registration_number || "N/A"}
                  </Text>
                </View>
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

            {/* Recent Transactions */}
            <View style={styles.transactionCard}>
              <Text style={styles.transactionTitle}>Recent Transactions</Text>

              {(() => {
                const history = getStudentPaymentHistory(selectedStudent.id);
                if (history.length > 0) {
                  return (
                    <>
                      <View style={styles.tableHeader}>
                        <Text style={[styles.tableHeaderText, { flex: 1.5 }]}>Date</Text>
                        <Text style={[styles.tableHeaderText, { flex: 1.5 }]}>Billed Month</Text>
                        <Text style={[styles.tableHeaderText, { flex: 1.2 }]}>Method</Text>
                        <Text style={[styles.tableHeaderText, { flex: 1.2 }]}>Amount</Text>
                        <Text style={[styles.tableHeaderText, { flex: 1 }]}>Status</Text>
                      </View>

                      {history.map((item, index) => (
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
                        </View>
                      ))}
                    </>
                  );
                } else {
                  return (
                    <View style={styles.emptyTransaction}>
                      <Ionicons name="receipt-outline" size={40} color="#CBD5E1" />
                      <Text style={styles.emptyTransactionText}>
                        No transactions yet for this student.
                      </Text>
                    </View>
                  );
                }
              })()}
            </View>
          </>
        ) : (
          // Show message when no student is selected
          <View style={styles.noStudentSelected}>
            <Ionicons name="person-outline" size={60} color="#CBD5E1" />
            <Text style={styles.noStudentText}>
              Select a student from the dropdown above to view their payment history
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}