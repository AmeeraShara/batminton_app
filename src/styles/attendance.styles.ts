// attendance.styles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({

  content: {
    padding: 16,
    paddingBottom: 100,
  },
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 20,
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
  },
  sub: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 2,
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
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  weekDaysRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
    paddingHorizontal: 4,
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
    backgroundColor: "#22C55E",
  },
  calendarDayAbsent: {
    backgroundColor: "#EF4444",
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

  historyNavigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 12,
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
    fontWeight: "700",
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
    fontSize: 11,
    fontWeight: "600",
    color: "#64748B",
    width: 35,
    textAlign: "center",
  },
  historyDay: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  historyDayPresent: {
    backgroundColor: "#22C55E",
    borderRadius: 17.5,
  },
  historyDayAbsent: {
    backgroundColor: "#EF4444",
    borderRadius: 17.5,
  },
 

  historyDayText: {
    fontSize: 13,
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
    backgroundColor: "#22C55E",
    borderRadius: 4,
  },
  // Add these to your attendance.styles.ts file

// History section styles
historyContainer: {
  marginTop: 24,
  padding: 16,
  backgroundColor: '#F8FAFC',
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#E2E8F0',
},

historyHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 16,
  flexWrap: 'wrap',
  gap: 8,
},

historyTitle: {
  fontSize: 18,
  fontWeight: '700',
  color: '#1E293B',
},

selectedStudentBadge: {
  backgroundColor: '#DBEAFE',
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 8,
  alignItems: 'flex-end',
},

selectedStudentName: {
  fontSize: 14,
  fontWeight: '600',
  color: '#1E40AF',
},

selectedStudentReg: {
  fontSize: 12,
  color: '#3B82F6',
  marginTop: 2,
},

// Student item selected state
studentItemSelected: {
  backgroundColor: '#EFF6FF',
  borderColor: '#2563EB',
  borderWidth: 2,
},

// Selection indicator (replacing the unused sessionIndicator)
selectionIndicator: {
  width: 30,
  height: 30,
  justifyContent: 'center',
  alignItems: 'center',
},

// Make sure these existing styles are defined or add them if missing
sessionIndicator: {
  width: 30,
  height: 30,
  justifyContent: 'center',
  alignItems: 'center',
},

// If you don't have these already, add them too
historyDayTextSession: {
  color: '#3B82F6',
},

historyDaySession: {
  backgroundColor: '#EFF6FF',
  borderWidth: 1,
  borderColor: '#93C5FD',
},

historyDayTextToday: {
  color: '#2563EB',
  fontWeight: '700',
},

historyDayToday: {
  backgroundColor: '#DBEAFE',
  borderWidth: 2,
  borderColor: '#2563EB',
},

horizontalScrollView: {
  flexGrow: 0,
  marginBottom: 8,
},
horizontalMonthContainer: {
  flexDirection: "row",
  gap: 16,
  paddingVertical: 8,
  paddingHorizontal: 4,
},
monthColumn: {
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  padding: 12,
  borderWidth: 1,
  borderColor: "#E2E8F0",
  minWidth: 80,
},
monthColumnHeader: {
  alignItems: "center",
  marginBottom: 8,
  paddingBottom: 8,
  borderBottomWidth: 1,
  borderBottomColor: "#F1F5F9",
},
monthColumnTitle: {
  fontSize: 12,
  fontWeight: "700",
  color: "#0F172A",
  marginBottom: 4,
},
monthColumnStats: {
  flexDirection: "row",
  gap: 8,
},
monthColumnStatText: {
  fontSize: 10,
  fontWeight: "500",
  color: "#64748B",
},
dayOfWeekHeaders: {
  flexDirection: "row",
  marginBottom: 4,
  justifyContent: "flex-start",
},
dayOfWeekHeaderCell: {
  flex: 1,
  alignItems: "center",
  paddingVertical: 4,
  minWidth: 28,
},
dayOfWeekHeaderText: {
  fontSize: 9,
  fontWeight: "600",
  color: "#94A3B8",
  textAlign: "center",
},
sessionDaysColumn: {
  flexDirection: "row",
  justifyContent: "flex-start",
},
sessionDayCell: {
  flex: 1,
  alignItems: "center",
  gap: 3,
  paddingVertical: 2,
  minWidth: 28,
},
sessionDayNumber: {
  width: 24,
  height: 24,
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 4,
  backgroundColor: "#F8FAFC",
  borderWidth: 1,
  borderColor: "#E2E8F0",
  marginVertical: 1,
},
sessionDayNumberPresent: {
  backgroundColor: "#DCFCE7",
  borderColor: "#86EFAC",
},
sessionDayNumberAbsent: {
  backgroundColor: "#FEE2E2",
  borderColor: "#FCA5A5",
},
sessionDayNumberToday: {
  backgroundColor: "#DBEAFE",
  borderWidth: 2,
  borderColor: "#3B82F6",
},
sessionDayNumberText: {
  fontSize: 10,
  fontWeight: "500",
  color: "#1E293B",
},
sessionDayNumberTextPresent: {
  color: "#166534",
},
sessionDayNumberTextAbsent: {
  color: "#991B1B",
},
sessionDayNumberTextToday: {
  color: "#1D4ED8",
  fontWeight: "500",
},
historyYearText: {
  fontSize: 16,
  fontWeight: "700",
  color: "#0F172A",
  minWidth: 60,
  textAlign: "center",
},
historyLegendContainer: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: 12,
  paddingVertical: 12,
  borderTopWidth: 1,
  borderTopColor: "#F1F5F9",
  marginTop: 8,
},
legendDotPresent: {
  backgroundColor: "#86EFAC",
},
legendDotAbsent: {
  backgroundColor: "#FCA5A5",
},
legendDotSession: {
  backgroundColor: "#F8FAFC",
  borderWidth: 1,
  borderColor: "#E2E8F0",
},
legendDotToday: {
  backgroundColor: "#DBEAFE",
  borderWidth: 2,
  borderColor: "#3B82F6",
},
legendDotSelected: {
  backgroundColor: "#2563EB",
},
});