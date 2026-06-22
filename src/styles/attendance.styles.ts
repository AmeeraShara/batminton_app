import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0F172A",
  },

  sub: {
    color: "#64748B",
    marginTop: 4,
    fontSize: 14,
  },

  section: {
    marginBottom: 20,
  },

  sectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#94A3B8",
    letterSpacing: 1,
    marginBottom: 8,
  },

  dropdownCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: "#F8FAFC",
  },

  picker: {
    height: 50,
  },

  sessionDate: {
    fontSize: 14,
    color: "#475569",
    paddingHorizontal: 4,
    paddingVertical: 2,
  },

  dateCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  dateIcon: {
    marginRight: 12,
  },

  dateText: {
    flex: 1,
    fontSize: 16,
    color: "#0F172A",
    fontWeight: "500",
  },

  warningContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF2F2",
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#FECACA",
  },

  warningText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#EF4444",
    flex: 1,
  },

  controlsSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  ageGroupRow: {
    marginBottom: 12,
  },

  ageGroupPickerContainer: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    marginTop: 4,
    backgroundColor: "#F8FAFC",
  },

  ageGroupPicker: {
    height: 50,
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#0F172A",
    paddingVertical: 4,
  },

  selectAll: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 4,
    marginBottom: 8,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    borderRadius: 6,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  studentCheckbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: "#CBD5E1",
    borderRadius: 6,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  selectAllText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0F172A",
  },

  studentItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },

  studentInfo: {
    flex: 1,
  },

  studentName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
  },

  studentMeta: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
  },

  viewBtn: {
    padding: 6,
  },

  markBtn: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },

  markBtnDisabled: {
    backgroundColor: "#94A3B8",
    shadowOpacity: 0,
  },

  markBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
  },

  modalContent: {
    backgroundColor: "#FFFFFF",
    margin: 20,
    borderRadius: 20,
    padding: 20,
    maxHeight: "90%",
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
  },

  detailSection: {
    marginBottom: 16,
  },

  detailLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#94A3B8",
    letterSpacing: 0.5,
    marginBottom: 4,
  },

  detailValue: {
    fontSize: 16,
    color: "#0F172A",
    fontWeight: "500",
  },

  historyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginTop: 20,
    marginBottom: 16,
  },

  attendanceGrid: {
    flexDirection: "row",
    paddingVertical: 10,
  },

  monthColumn: {
    marginRight: 16,
    alignItems: "center",
  },

  monthLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
    marginBottom: 8,
  },

  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: 120,
  },

  dayCell: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    margin: 1,
  },

  dayPresent: {
    backgroundColor: "#22C55E",
  },

  dayAbsent: {
    backgroundColor: "#EF4444",
  },

  dayEmpty: {
    backgroundColor: "#F1F5F9",
  },

  dayText: {
    fontSize: 10,
    color: "#FFFFFF",
    fontWeight: "500",
  },

  dayTextPresent: {
    color: "#FFFFFF",
  },

  dayTextAbsent: {
    color: "#FFFFFF",
  },

  attendanceSummary: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },

  summaryText: {
    fontSize: 15,
    color: "#475569",
    marginBottom: 4,
  },

  summaryPercentage: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
});