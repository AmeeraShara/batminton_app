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

  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    marginBottom: 6,
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

  historyCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 18,
    marginBottom: 20,
  },

  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  historyTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  historySub: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
  },

  viewAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  viewAllText: {
    color: "#2563EB",
    fontWeight: "600",
    fontSize: 14,
  },

  historyItem: {
    backgroundColor: "#F8FAFC",
    padding: 14,
    borderRadius: 12,
    marginRight: 12,
    alignItems: "center",
    minWidth: 100,
  },

  historyMonth: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 4,
  },

  historyAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2563EB",
    marginBottom: 4,
  },

  historyMethod: {
    fontSize: 11,
    color: "#94A3B8",
    marginBottom: 8,
  },

  deleteHistoryBtn: {
    padding: 4,
  },

  emptyHistory: {
    padding: 20,
    alignItems: "center",
  },

  emptyText: {
    color: "#94A3B8",
  },

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