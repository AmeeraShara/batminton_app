import AppHeader from "@/components/AppHeader";
import { Ionicons } from "@expo/vector-icons";
import styles from "@/styles/paymentTracker.styles";

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
  const API = "http://10.217.168.182:5000/api/payments";
  const STUDENTS_API = "http://10.217.168.182:5000/api/students";

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
                method: "DELETE" 
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
      ]
    );
  };

  // Get student payment history
  const getStudentPaymentHistory = (studentId: string) => {
    return payments
      .filter((payment) => payment.student_id === studentId)
      .sort((a, b) => new Date(b.payment_month).getTime() - new Date(a.payment_month).getTime());
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
            <Text style={styles.label}>STUDENT</Text>
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
                  const month = date.toLocaleString("default", { month: "long" });
                  const year = date.getFullYear();
                  const label = `${month} ${year}`;
                  return <Picker.Item key={label} label={label} value={label} />;
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
            <Text style={styles.label}>AMOUNT ($)</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="$ 0.00"
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

        {/* Student Payment History */}
        {selectedStudent && (
          <View style={styles.historyCard}>
            <View style={styles.historyHeader}>
              <View>
                <Text style={styles.historyTitle}>
                  {selectedStudent.student_name}
                </Text>
                <Text style={styles.historySub}>
                  Payment History ({getStudentPaymentHistory(selectedStudent.id).length}{" "}
                  records)
                </Text>
              </View>
              <TouchableOpacity
                style={styles.viewAllBtn}
                onPress={() => {
                  setStudentId(selectedStudent.id);
                  setStudentName(selectedStudent.student_name);
                  setModal(true);
                }}
              >
                <Text style={styles.viewAllText}>View All</Text>
                <Ionicons name="arrow-forward" size={16} color="#2563EB" />
              </TouchableOpacity>
            </View>

            {getStudentPaymentHistory(selectedStudent.id).length > 0 ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {getStudentPaymentHistory(selectedStudent.id).map((item, index) => (
                  <View key={index} style={styles.historyItem}>
                    <Text style={styles.historyMonth}>
                      {new Date(item.payment_month).toLocaleString("default", {
                        month: "short",
                        year: "numeric",
                      })}
                    </Text>
                    <Text style={styles.historyAmount}>${item.amount}</Text>
                    <Text style={styles.historyMethod}>{item.payment_method}</Text>
                    <TouchableOpacity
                      style={styles.deleteHistoryBtn}
                      onPress={() => deletePayment(item.id)}
                    >
                      <Ionicons name="trash-outline" size={14} color="#EF4444" />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            ) : (
              <View style={styles.emptyHistory}>
                <Text style={styles.emptyText}>No payment records</Text>
              </View>
            )}
          </View>
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
                  item.student_name?.toLowerCase().includes(search.toLowerCase()) ||
                  item.registration_number?.toLowerCase().includes(search.toLowerCase())
              )}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalStudentItem}
                  onPress={() => {
                    handleStudentSelect(item);
                    setModal(false);
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