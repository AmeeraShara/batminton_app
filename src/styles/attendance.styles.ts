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

  // Add these to your attendance.styles.ts

// Calendar styles
calendarContainer: {
  backgroundColor: '#FFFFFF',
  borderRadius: 12,
  padding: 16,
  marginTop: 8,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 3,
  borderWidth: 1,
  borderColor: '#E2E8F0',
},
calendarHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 16,
},
calendarNav: {
  padding: 4,
  width: 32,
  height: 32,
  justifyContent: 'center',
  alignItems: 'center',
},
calendarMonthText: {
  fontSize: 16,
  fontWeight: '600',
  color: '#1E293B',
},
weekDaysRow: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginBottom: 8,
},
weekDayText: {
  fontSize: 12,
  fontWeight: '500',
  color: '#94A3B8',
  width: 32,
  textAlign: 'center',
},
daysGridCalendar: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
},

todayButton: {
  backgroundColor: '#EFF6FF',
  borderRadius: 8,
  paddingVertical: 8,
  paddingHorizontal: 16,
  alignSelf: 'center',
  marginTop: 12,
},
todayButtonText: {
  color: '#2563EB',
  fontWeight: '500',
  fontSize: 14,
},

// Legend styles
legendContainer: {
  flexDirection: 'row',
  justifyContent: 'center',
  flexWrap: 'wrap',
  marginTop: 12,
  paddingTop: 12,
  borderTopWidth: 1,
  borderTopColor: '#E2E8F0',
},
legendItem: {
  flexDirection: 'row',
  alignItems: 'center',
  marginHorizontal: 8,
},
legendDot: {
  width: 10,
  height: 10,
  borderRadius: 5,
  marginRight: 4,
},
legendDotPresent: {
  backgroundColor: '#10B981',
},
legendDotAbsent: {
  backgroundColor: '#EF4444',
},
legendDotToday: {
  backgroundColor: 'transparent',
  borderWidth: 2,
  borderColor: '#2563EB',
},
legendDotSelected: {
  backgroundColor: '#2563EB',
},
legendText: {
  fontSize: 11,
  color: '#64748B',
},

 // History calendar
// historyCalendarContainer: {
//   backgroundColor: '#F8FAFC',
//   borderRadius: 12,
//   padding: 16,
//   marginTop: 8,
//   marginBottom: 16,
// },

// Attendance summary styles
// attendanceSummary: {
//   backgroundColor: '#F8FAFC',
//   borderRadius: 12,
//   padding: 16,
//   marginTop: 8,
// },
summaryRow: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  marginBottom: 12,
},
summaryItem: {
  alignItems: 'center',
},
summaryNumber: {
  fontSize: 24,
  fontWeight: '700',
  color: '#1E293B',
},
summaryLabel: {
  fontSize: 12,
  color: '#64748B',
  marginTop: 2,
},
summaryDivider: {
  width: 1,
  height: 30,
  backgroundColor: '#E2E8F0',
},
percentageContainer: {
  marginTop: 4,
},
percentageText: {
  fontSize: 14,
  fontWeight: '600',
  color: '#1E293B',
  textAlign: 'center',
  marginBottom: 8,
},
progressBar: {
  height: 8,
  backgroundColor: '#E2E8F0',
  borderRadius: 4,
  overflow: 'hidden',
},
progressFill: {
  height: '100%',
  backgroundColor: '#2563EB',
  borderRadius: 4,
},

// Add these to your attendance.styles.ts

// Year Navigation
yearNavigation: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 16,
  paddingVertical: 12,
  backgroundColor: '#F8FAFC',
  borderRadius: 12,
  marginBottom: 16,
},
yearNavButton: {
  padding: 8,
  width: 40,
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#EFF6FF',
  borderRadius: 8,
},
yearText: {
  fontSize: 18,
  fontWeight: '600',
  color: '#1E293B',
},

// All Months Container
allMonthsContainer: {
  marginBottom: 16,
},

// Month Card
monthCard: {
  backgroundColor: '#FFFFFF',
  borderRadius: 12,
  padding: 12,
  marginBottom: 12,
  borderWidth: 1,
  borderColor: '#E2E8F0',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 2,
  elevation: 1,
},
monthHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 8,
},
monthTitle: {
  fontSize: 14,
  fontWeight: '600',
  color: '#1E293B',
},
monthStats: {
  flexDirection: 'row',
  gap: 12,
},
monthStatItem: {
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: 8,
},
monthStatDot: {
  width: 8,
  height: 8,
  borderRadius: 4,
  marginRight: 4,
},
monthStatPresent: {
  backgroundColor: '#10B981',
},
monthStatAbsent: {
  backgroundColor: '#EF4444',
},
monthStatText: {
  fontSize: 12,
  fontWeight: '500',
  color: '#64748B',
},

// Month Week Days
monthWeekDays: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginBottom: 4,
},
monthWeekDayText: {
  fontSize: 10,
  fontWeight: '500',
  color: '#94A3B8',
  width: 28,
  textAlign: 'center',
},

// Month Days Grid
monthDaysGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
},
monthDayCell: {
  width: 28,
  height: 28,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 14,
  marginVertical: 1,
},
monthDayEmpty: {
  backgroundColor: 'transparent',
},
monthDayPresent: {
  backgroundColor: '#10B981',
},
monthDayAbsent: {
  backgroundColor: '#EF4444',
},
monthDayToday: {
  borderWidth: 2,
  borderColor: '#2563EB',
  backgroundColor: 'transparent',
},
monthDayText: {
  fontSize: 11,
  color: '#1E293B',
},
monthDayTextEmpty: {
  color: 'transparent',
},
monthDayTextPresent: {
  color: '#FFFFFF',
  fontWeight: '500',
},
monthDayTextAbsent: {
  color: '#FFFFFF',
  fontWeight: '500',
},
monthDayTextToday: {
  color: '#2563EB',
  fontWeight: '600',
},

// Calendar Grid
calendarGrid: {
  marginTop: 4,
},
calendarWeek: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginBottom: 4,
},
calendarDay: {
  width: 36,
  height: 36,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 18,
},
calendarDayEmpty: {
  backgroundColor: 'transparent',
},
calendarDaySelected: {
  backgroundColor: '#2563EB',
},
calendarDayPresent: {
  backgroundColor: '#10B981',
},
calendarDayAbsent: {
  backgroundColor: '#EF4444',
},
calendarDayToday: {
  borderWidth: 2,
  borderColor: '#2563EB',
  backgroundColor: 'transparent',
},
calendarDayText: {
  fontSize: 14,
  color: '#1E293B',
  fontWeight: '500',
},
calendarDayTextSelected: {
  color: '#FFFFFF',
  fontWeight: '600',
},
calendarDayTextPresent: {
  color: '#FFFFFF',
  fontWeight: '500',
},
calendarDayTextAbsent: {
  color: '#FFFFFF',
  fontWeight: '500',
},
calendarDayTextToday: {
  color: '#2563EB',
  fontWeight: '600',
},
calendarDayTextEmpty: {
  color: 'transparent',
},

// Horizontal Scroll View for months
horizontalScrollView: {
  marginVertical: 8,
},
monthsHorizontalContainer: {
  flexDirection: 'row',
  paddingVertical: 4,
  paddingHorizontal: 2,
},

// Horizontal Month Card
monthCardHorizontal: {
  backgroundColor: '#FFFFFF',
  borderRadius: 12,
  padding: 10,
  marginRight: 12,
  borderWidth: 1,
  borderColor: '#E2E8F0',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 2,
  elevation: 1,
  width: 160,
},
monthWeekRow: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginVertical: 1,
},

// History Navigation
historyNavigation: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#F8FAFC',
  borderRadius: 12,
  padding: 12,
  marginBottom: 16,
},
historyNavButton: {
  padding: 8,
  width: 40,
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#EFF6FF',
  borderRadius: 8,
},
historyMonthInfo: {
  flex: 1,
  alignItems: 'center',
},
historyMonthText: {
  fontSize: 16,
  fontWeight: '600',
  color: '#1E293B',
},
historyMonthStats: {
  flexDirection: 'row',
  marginTop: 4,
  gap: 12,
},
historyStatItem: {
  flexDirection: 'row',
  alignItems: 'center',
},
historyStatDot: {
  width: 8,
  height: 8,
  borderRadius: 4,
  marginRight: 4,
},
historyStatPresent: {
  backgroundColor: '#10B981',
},
historyStatAbsent: {
  backgroundColor: '#EF4444',
},
historyStatText: {
  fontSize: 12,
  color: '#64748B',
},

// History Calendar
historyCalendarContainer: {
  backgroundColor: '#F8FAFC',
  borderRadius: 12,
  padding: 16,
  marginBottom: 16,
},
historyWeekDayText: {
  fontSize: 11,
  fontWeight: '500',
  color: '#94A3B8',
  width: 36,
  textAlign: 'center',
},
historyDay: {
  width: 36,
  height: 36,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 18,
},
historyDayPresent: {
  backgroundColor: '#10B981',
},
historyDayAbsent: {
  backgroundColor: '#EF4444',
},
historyDayToday: {
  borderWidth: 2,
  borderColor: '#2563EB',
  backgroundColor: 'transparent',
},
historyDayText: {
  fontSize: 13,
  color: '#1E293B',
  fontWeight: '500',
},
historyDayTextPresent: {
  color: '#FFFFFF',
  fontWeight: '500',
},
historyDayTextAbsent: {
  color: '#FFFFFF',
  fontWeight: '500',
},
historyDayTextToday: {
  color: '#2563EB',
  fontWeight: '600',
},

// History Title
historyTitle: {
  fontSize: 18,
  fontWeight: '600',
  color: '#1E293B',
  marginTop: 16,
  marginBottom: 12,
},

// Add these styles

loadingContainer: {
  padding: 20,
  alignItems: 'center',
  justifyContent: 'center',
},

noDataContainer: {
  padding: 40,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#F8FAFC',
  borderRadius: 12,
  marginBottom: 16,
},

noDataText: {
  marginTop: 12,
  fontSize: 16,
  color: '#64748B',
  fontWeight: '500',
},
});

