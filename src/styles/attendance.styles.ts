import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  content: {
    padding: 20,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },
  sub: {
    fontSize: 14,
    color: "#64748B",
  },
  section: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#94A3B8",
    letterSpacing: 1,
    marginBottom: 8,
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
    width: "100%",
  },
  dateCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  dateIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    color: "#0F172A",
    fontWeight: "500",
  },
  calendarContainer: {
    marginTop: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 16,
  },
  calendarHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  calendarNav: {
    padding: 4,
  },
  calendarMonthText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0F172A",
  },
  weekDaysRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  weekDayText: {
    flex: 1,
    textAlign: "center",
    fontSize: 11,
    fontWeight: "600",
    color: "#94A3B8",
    paddingVertical: 4,
  },
  calendarGrid: {
    gap: 2,
  },
  calendarWeek: {
    flexDirection: "row",
    gap: 2,
  },
  calendarDay: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    backgroundColor: "#F8FAFC",
    minHeight: 30,
  },
  calendarDayEmpty: {
    backgroundColor: "transparent",
  },
  calendarDaySelected: {
    backgroundColor: "#2563EB",
  },
  calendarDayPresent: {
    backgroundColor: "#DCFCE7",
  },
  calendarDayAbsent: {
    backgroundColor: "#FEE2E2",
  },
  calendarDayToday: {
    borderWidth: 2,
    borderColor: "#2563EB",
  },
  calendarDayText: {
    fontSize: 12,
    color: "#0F172A",
  },
  calendarDayTextSelected: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  calendarDayTextEmpty: {
    color: "transparent",
  },
  calendarDayTextPresent: {
    color: "#166534",
  },
  calendarDayTextAbsent: {
    color: "#991B1B",
  },
  calendarDayTextToday: {
    fontWeight: "600",
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
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
    fontSize: 11,
    color: "#64748B",
  },
  todayButton: {
    marginTop: 12,
    backgroundColor: "#EFF6FF",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
  },
  todayButtonText: {
    color: "#2563EB",
    fontWeight: "600",
    fontSize: 14,
  },
  warningContainer: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FEF2F2",
    padding: 10,
    borderRadius: 8,
  },
  warningText: {
    color: "#EF4444",
    fontSize: 13,
    flex: 1,
  },
  controlsSection: {
    marginBottom: 16,
  },
  ageGroupRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  ageGroupPickerContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
    marginLeft: 12,
  },
  ageGroupPicker: {
    height: 40,
    width: "100%",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: "#0F172A",
    fontSize: 14,
    marginLeft: 8,
  },
  selectAll: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#94A3B8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  selectAllText: {
    fontSize: 14,
    color: "#0F172A",
    fontWeight: "500",
  },
  studentItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 8,
  },
  studentCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#94A3B8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0F172A",
  },
  studentMeta: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 2,
  },
  viewBtn: {
    padding: 8,
  },
  markBtn: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  markBtnDisabled: {
    backgroundColor: "#94A3B8",
  },
  markBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
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
    color: "#94A3B8",
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
    marginBottom: 12,
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
    gap: 16,
    marginTop: 4,
  },
  historyStatItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  historyStatDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
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
    flex: 1,
    textAlign: "center",
    fontSize: 10,
    fontWeight: "600",
    color: "#94A3B8",
    paddingVertical: 4,
  },
  historyDay: {
    flex: 1,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    minHeight: 28,
    position: "relative",
  },
  historyDayPresent: {
    backgroundColor: "#DCFCE7",
  },
  historyDayAbsent: {
    backgroundColor: "#FEE2E2",
  },
  historyDayToday: {
    borderWidth: 2,
    borderColor: "#2563EB",
  },
  historyDaySession: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#93C5FD",
  },
  historyDayText: {
    fontSize: 11,
    color: "#0F172A",
  },
  historyDayTextPresent: {
    color: "#166534",
    fontWeight: "600",
  },
  historyDayTextAbsent: {
    color: "#991B1B",
    fontWeight: "600",
  },
  historyDayTextToday: {
    fontWeight: "600",
  },
  historyDayTextSession: {
    color: "#1D4ED8",
  },
  sessionIndicator: {
    position: "absolute",
    bottom: 2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#3B82F6",
  },
  sessionLegendContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },
  attendanceSummary: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
  },
  summaryLabel: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 4,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: "#E2E8F0",
  },
  percentageContainer: {
    marginTop: 4,
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

export default styles;