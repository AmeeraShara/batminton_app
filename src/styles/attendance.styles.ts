// attendance.styles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
  },
  sub: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
  },
  section: {
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    letterSpacing: 1,
    marginBottom: 6,
    textTransform: "uppercase",
  },
  dropdownCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
  },
  pickerContainer: {
    height: 50,
    justifyContent: "center",
  },
  picker: {
    height: 50,
    color: "#0F172A",
  },
  dateCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
    color: "#0F172A",
    marginLeft: 12,
  },
  calendarContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 16,
    marginTop: 8,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  calendarNav: {
    padding: 8,
  },
  calendarMonthText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
  },
  weekDaysRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  weekDayText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    width: 40,
    textAlign: "center",
  },
  calendarGrid: {
    marginBottom: 12,
  },
  calendarWeek: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 4,
  },
  calendarDay: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  calendarDayEmpty: {
    backgroundColor: "transparent",
  },
  calendarDaySelected: {
    backgroundColor: "#2563EB",
  },
  calendarDayPresent: {
    backgroundColor: "#22C55E", // Green for present
  },
  calendarDayAbsent: {
    backgroundColor: "#EF4444", // Red for absent
  },
  calendarDayToday: {
    borderWidth: 2,
    borderColor: "#2563EB",
    backgroundColor: "transparent",
  },
  calendarDayText: {
    fontSize: 14,
    color: "#0F172A",
  },
  calendarDayTextSelected: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  calendarDayTextEmpty: {
    color: "#CBD5E1",
  },
  calendarDayTextPresent: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  calendarDayTextAbsent: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  calendarDayTextToday: {
    color: "#2563EB",
    fontWeight: "bold",
  },
  legendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  legendDotPresent: {
    backgroundColor: "#22C55E",
  },
  legendDotAbsent: {
    backgroundColor: "#EF4444",
  },
  legendDotToday: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#2563EB",
  },
  legendDotSelected: {
    backgroundColor: "#2563EB",
  },
  legendDotSession: {
    backgroundColor: "#E2E8F0",
    borderWidth: 1,
    borderColor: "#94A3B8",
  },
  legendText: {
    fontSize: 12,
    color: "#64748B",
  },
  todayButton: {
    backgroundColor: "#2563EB",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 12,
  },
  todayButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  warningContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF2F2",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  warningText: {
    fontSize: 14,
    color: "#EF4444",
    marginLeft: 8,
  },
  controlsSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  ageGroupRow: {
    marginBottom: 12,
  },
  ageGroupPickerContainer: {
    backgroundColor: "#F8FAFC",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginTop: 4,
    overflow: "hidden",
  },
  ageGroupPicker: {
    height: 44,
    color: "#0F172A",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 14,
    color: "#0F172A",
    marginLeft: 8,
  },
  selectAll: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
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
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  studentItemAlreadyMarked: {
    opacity: 0.7,
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#22C55E",
  },
  studentCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
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
    padding: 8,
  },
  markBtn: {
    backgroundColor: "#2563EB",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 16,
  },
  markBtnDisabled: {
    backgroundColor: "#94A3B8",
  },
  markBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 16,
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
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
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    textTransform: "uppercase",
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
    fontWeight: "600",
    color: "#0F172A",
    marginTop: 20,
    marginBottom: 12,
  },
  historyNavigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  historyNavButton: {
    padding: 8,
  },
  historyMonthInfo: {
    flex: 1,
    alignItems: "center",
  },
  historyMonthText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
  },
  historyMonthStats: {
    flexDirection: "row",
    marginTop: 4,
    gap: 12,
  },
  historyStatItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  historyStatDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  historyStatPresent: {
    backgroundColor: "#22C55E",
  },
  historyStatAbsent: {
    backgroundColor: "#EF4444",
  },
  historyStatText: {
    fontSize: 12,
    color: "#64748B",
  },
  historyCalendarContainer: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  historyWeekDayText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    width: 40,
    textAlign: "center",
  },
  historyDay: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  historyDayPresent: {
    backgroundColor: "#22C55E", // Green for present
  },
  historyDayAbsent: {
    backgroundColor: "#EF4444", // Red for absent
  },
  historyDayToday: {
    borderWidth: 2,
    borderColor: "#2563EB",
    backgroundColor: "transparent",
  },
  historyDaySession: {
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  historyDayText: {
    fontSize: 14,
    color: "#0F172A",
  },
  historyDayTextPresent: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  historyDayTextAbsent: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  historyDayTextToday: {
    color: "#2563EB",
    fontWeight: "bold",
  },
  historyDayTextSession: {
    color: "#475569",
  },
  sessionIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#94A3B8",
    marginTop: 2,
  },
  sessionLegendContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  attendanceSummary: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  summaryItem: {
    alignItems: "center",
    flex: 1,
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
  },
  summaryLabel: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 4,
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#E2E8F0",
  },
  percentageContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  percentageText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#E2E8F0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#2563EB",
    borderRadius: 4,
  },
});