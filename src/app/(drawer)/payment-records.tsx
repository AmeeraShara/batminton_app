import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PaymentRecords() {
  const [records, setRecords] = useState([
    { id: 1, student: "John Doe", amount: 50, method: "Cash", date: "2026-06-26", type: "Monthly Fee" },
    { id: 2, student: "Jane Smith", amount: 75, method: "Card", date: "2026-06-25", type: "Registration" },
    { id: 3, student: "Mike Johnson", amount: 50, method: "Bank Transfer", date: "2026-06-24", type: "Monthly Fee" },
    { id: 4, student: "Sarah Wilson", amount: 100, method: "Cash", date: "2026-06-23", type: "Equipment" },
    { id: 5, student: "Tom Brown", amount: 50, method: "Card", date: "2026-06-22", type: "Monthly Fee" },
  ]);

  const totalAmount = records.reduce((sum, record) => sum + record.amount, 0);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Records</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.summaryCard}>
        <View>
          <Text style={styles.summaryLabel}>Total Collected</Text>
          <Text style={styles.summaryAmount}>${totalAmount}</Text>
        </View>
        <View style={styles.summaryRight}>
          <Text style={styles.summaryCount}>{records.length} Transactions</Text>
          <TouchableOpacity style={styles.exportBtn}>
            <Ionicons name="download-outline" size={20} color="#2563EB" />
            <Text style={styles.exportText}>Export</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Transaction History</Text>

      {records.map((record) => (
        <View key={record.id} style={styles.recordCard}>
          <View style={styles.recordLeft}>
            <View style={[styles.recordIcon, { backgroundColor: '#EFF6FF' }]}>
              <Ionicons name="cash-outline" size={20} color="#2563EB" />
            </View>
            <View>
              <Text style={styles.recordStudent}>{record.student}</Text>
              <Text style={styles.recordType}>{record.type}</Text>
              <Text style={styles.recordMethod}>{record.method}</Text>
            </View>
          </View>
          <View style={styles.recordRight}>
            <Text style={styles.recordAmount}>${record.amount}</Text>
            <Text style={styles.recordDate}>{record.date}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 45,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  summaryCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  summaryAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1F2937",
    marginTop: 4,
  },
  summaryRight: {
    alignItems: "flex-end",
  },
  summaryCount: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 8,
  },
  exportBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  exportText: {
    color: "#2563EB",
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
  },
  recordCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recordLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  recordIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  recordStudent: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  recordType: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  recordMethod: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 1,
  },
  recordRight: {
    alignItems: "flex-end",
  },
  recordAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  recordDate: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 2,
  },
});