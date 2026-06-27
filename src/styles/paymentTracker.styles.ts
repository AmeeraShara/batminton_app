import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
  },

  scrollContent: {
    paddingBottom: 40,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 12,
    color: "#64748B",
  },

  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 5,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
  },

  sub: {
    color: "#64748B",
    marginTop: 4,
  },

  dateBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },

  dateText: {
    color: "#2563EB",
    fontWeight: "500",
    fontSize: 12,
  },

  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEE2E2",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    gap: 8,
  },

  errorText: {
    color: "#EF4444",
    flex: 1,
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 18,
    marginBottom: 20,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
  },

  formGroup: {
    marginBottom: 15,
  },

  pickerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  selectStudentBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: "#EFF6FF",
    borderRadius: 8,
  },

  selectStudentText: {
    color: "#2563EB",
    fontWeight: "600",
    fontSize: 12,
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    letterSpacing: 0.5,
  },

  pickerWrap: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    overflow: "hidden",
  },

  amountInput: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 14,
    fontSize: 18,
    fontWeight: "600",
    backgroundColor: "#F8FAFC",
  },

  submitBtn: {
    backgroundColor: "#2563EB",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 5,
  },

  submitBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  // Student Card
  studentCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 18,
    marginBottom: 15,
  },

  studentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  studentAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  studentAvatarText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2563EB",
  },

  studentInfo: {
    flex: 1,
  },

  studentName: {
    fontSize: 18,
    fontWeight: "700",
  },

  studentGroup: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 2,
  },

  studentAction: {
    padding: 4,
  },

  studentContact: {
    flexDirection: "row",
    gap: 20,
  },

  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  contactText: {
    fontSize: 13,
    color: "#64748B",
  },

  // Status Card
  statusCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 18,
    marginBottom: 15,
  },

  statusTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },

  legendContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 15,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  legendText: {
    fontSize: 12,
    color: "#64748B",
  },

  monthsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  monthItem: {
    alignItems: "center",
    width: "8%",
    marginBottom: 8,
  },

  monthDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },

  monthLabel: {
    fontSize: 9,
    color: "#64748B",
    fontWeight: "600",
  },

  // Transaction Card - Table View
  transactionCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 18,
    marginBottom: 20,
  },

  transactionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 15,
  },

  tableHeader: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#E5E7EB",
    marginBottom: 8,
  },

  tableHeaderText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  tableCell: {
    fontSize: 12,
    color: "#111827",
  },

  statusBadge: {
    backgroundColor: "#D1FAE5",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignItems: "center",
  },

  statusBadgeText: {
    fontSize: 9,
    fontWeight: "700",
    color: "#065F46",
    letterSpacing: 0.5,
  },

  deleteBtn: {
    padding: 4,
    marginLeft: 8,
  },

  emptyTransaction: {
    alignItems: "center",
    paddingVertical: 30,
  },

  emptyTransactionText: {
    color: "#94A3B8",
    marginTop: 8,
    fontSize: 14,
  },

  // Modal
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
  },

  modal: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
  },

  modalSearch: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 14,
    marginBottom: 15,
  },

  modalStudentItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  modalStudentAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  modalAvatarText: {
    color: "#2563EB",
    fontWeight: "700",
    fontSize: 18,
  },

  modalStudentInfo: {
    flex: 1,
  },

  modalStudentName: {
    fontSize: 16,
    fontWeight: "600",
  },

  modalStudentReg: {
    fontSize: 13,
    color: "#64748B",
  },
});