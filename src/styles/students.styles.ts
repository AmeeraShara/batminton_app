import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
  },

  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
  },

  sub: {
    color: "#64748B",
    marginTop: 4,
  },

  search: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
  },

  addBtn: {
    backgroundColor: "#2563EB",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },

  addTxt: {
    color: "#fff",
    marginLeft: 5,
    fontWeight: "600",
  },

  tableContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    flex: 1,
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    padding: 15,
  },

  headerCell: {
    fontWeight: "700",
    color: "#475569",
  },

  tableRow: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  cell: {
    color: "#111827",
  },

  actionRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
  },

  // Add/Edit Modal
  modal: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 20,
    padding: 20,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },

  ageGroupContainer: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
  },

  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "transparent",
  },

  save: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 5,
  },

  saveText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  cancelBtn: {
    padding: 15,
    alignItems: "center",
  },

  cancelText: {
    color: "#64748B",
    fontWeight: "600",
    fontSize: 16,
  },

  // View Modal
  viewModal: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 20,
    padding: 20,
    maxHeight: "90%",
  },

  viewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },

  viewName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },

  viewReg: {
    fontSize: 16,
    color: "#64748B",
    marginTop: 4,
  },

  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    marginBottom: 20,
  },

  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 8,
  },

  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#2563EB",
  },

  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748B",
  },

  activeTabText: {
    color: "#2563EB",
    fontWeight: "600",
  },

  viewContent: {
    marginTop: 5,
  },

  infoSection: {
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },

  infoGrid: {
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 16,
  },

  infoItem: {
    marginBottom: 16,
  },

  infoLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "500",
  },

  // Attendance Summary Styles
  attendanceSummary: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },

  summaryNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },

  summaryLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },

  summaryDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E5E7EB',
  },

  // History Navigation
  historyNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },

  historyNavButton: {
    padding: 8,
  },

  historyMonthInfo: {
    alignItems: 'center',
  },

  historyMonthText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
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

  // Calendar Styles
  historyCalendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
  },

  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },

  historyWeekDayText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
    width: 32,
    textAlign: 'center',
  },

  calendarGrid: {
    marginBottom: 12,
  },

  calendarWeek: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 4,
  },

  historyDay: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },

  historyDayText: {
    fontSize: 12,
    color: '#111827',
  },

  historyDayPresent: {
    backgroundColor: '#D1FAE5',
  },

  historyDayTextPresent: {
    color: '#065F46',
    fontWeight: '600',
  },

  historyDayAbsent: {
    backgroundColor: '#FEE2E2',
  },

  historyDayTextAbsent: {
    color: '#991B1B',
    fontWeight: '600',
  },

  historyDayToday: {
    borderWidth: 2,
    borderColor: '#2563EB',
  },

  historyDayTextToday: {
    color: '#2563EB',
    fontWeight: '700',
  },

  historyDaySession: {
    backgroundColor: '#EFF6FF',
  },

  historyDayTextSession: {
    color: '#1E40AF',
  },

  calendarDayEmpty: {
    backgroundColor: 'transparent',
  },

  calendarDayTextEmpty: {
    color: 'transparent',
  },

  // Legend Styles
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },

  legendDotPresent: {
    backgroundColor: '#10B981',
  },

  legendDotAbsent: {
    backgroundColor: '#EF4444',
  },

  legendDotSession: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#93C5FD',
  },

  legendDotToday: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#2563EB',
  },

  legendText: {
    fontSize: 12,
    color: '#64748B',
  },

  // Overall Attendance
  overallAttendance: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },

  attendanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },

  attendanceLabel: {
    fontSize: 14,
    color: '#374151',
  },

  attendanceBarContainer: {
    marginTop: 4,
  },

  attendancePercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },

  progressBar: {
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 4,
  },

  // Payment Summary Styles
  paymentSummary: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },

  paymentStatCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },

  paymentStatLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },

  paymentStatValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  outstandingValue: {
    color: '#EF4444',
  },

  // Transaction List
  transactionList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },

  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },

  transactionInfo: {
    flex: 1,
  },

  transactionMonth: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },

  transactionDate: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },

  transactionDetails: {
    alignItems: 'flex-end',
  },

  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },

  transactionStatus: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 2,
  },

  statusPaid: {
    backgroundColor: '#D1FAE5',
  },

  statusPending: {
    backgroundColor: '#FEF3C7',
  },

  transactionStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },

  statusPaidText: {
    color: '#065F46',
  },

  statusPendingText: {
    color: '#92400E',
  },

  emptyState: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
  },

  emptyText: {
    color: '#94A3B8',
    marginTop: 12,
    fontSize: 16,
  },
});