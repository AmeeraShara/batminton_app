// payment-records.styles.ts
import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  mainContent: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  top: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E293B",
    letterSpacing: -0.5,
  },
  sub: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    color: "#64748B",
    fontSize: 14,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEE2E2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: "#991B1B",
    fontSize: 14,
    marginLeft: 8,
  },

  // Tab Navigation
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 8,
  },
  tabButtonActive: {
    backgroundColor: "#EFF6FF",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },
  tabTextActive: {
    color: "#2563EB",
    fontWeight: "600",
  },

  // Filter Section
  filterSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  filterRow: {
    flexDirection: "row",
    gap: 12,
  },
  filterGroup: {
    flex: 1,
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#64748B",
    marginBottom: 4,
  },
  pickerContainer: {
    backgroundColor: "#F1F5F9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
    height: Platform.OS === "ios" ? 50 : 44,
    justifyContent: "center",
  },
  picker: {
    color: "#1E293B",
    fontSize: 14,
    ...(Platform.OS === "ios" ? { height: 50 } : { height: 44 }),
  },

  // Student Status Section
  studentStatusSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  studentStatusContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  studentStatusItem: {
    alignItems: "center",
    flex: 1,
  },
  studentStatusNumber: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
  },
  overdueNumber: {
    color: "#EF4444",
  },
  upToDateNumber: {
    color: "#10B981",
  },
  studentStatusLabel: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
    fontWeight: "500",
  },
  overdueLabel: {
    color: "#EF4444",
  },
  upToDateLabel: {
    color: "#10B981",
  },
  statusDivider: {
    width: 1,
    height: 40,
    backgroundColor: "#E5E7EB",
  },

  // Summary Section
  summarySection: {
    marginBottom: 16,
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryLeft: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#64748B",
  },
  summaryAmount: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E293B",
    marginTop: 2,
  },
  summaryRight: {
    alignItems: "flex-end",
    gap: 8,
  },
  summaryStats: {
    alignItems: "flex-end",
  },
  summaryCount: {
    fontSize: 14,
    color: "#64748B",
  },
  exportButtons: {
    flexDirection: "row",
    gap: 8,
  },
  exportBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
  },
  exportBtnPDF: {
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
  },
  exportBtnExcel: {
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
  },
  exportText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000000",
  },

  // Transaction Table
  transactionSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 12,
  },
  tableContainer: {
    minWidth: "100%",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
  headerCell: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
    paddingHorizontal: 4,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    alignItems: "center",
  },
  tableCell: {
    fontSize: 13,
    color: "#1E293B",
    paddingHorizontal: 4,
  },
  cellStudent: { width: 100, minWidth: 100 },
  cellReg: { width: 90, minWidth: 90 },
  cellAgeGroup: { width: 80, minWidth: 80 },
  cellMonth: { width: 100, minWidth: 100 },
  cellDate: { width: 90, minWidth: 90 },
  cellMethod: { width: 80, minWidth: 80 },
  cellAmount: { width: 80, minWidth: 80, fontWeight: "500" },
  cellStatus: { width: 80, minWidth: 80 },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },

  // Students Section
  studentsSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  studentsHeader: {
    marginBottom: 12,
  },
  monthLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginBottom: 8,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  monthLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#6B7280',
    width: 20,
    textAlign: 'center',
  },
  studentCard: {
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  studentCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  studentNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  studentNumber: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  studentInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  studentAgeGroup: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  studentOverdueContainer: {
    marginBottom: 8,
  },
  studentOverdueText: {
    fontSize: 13,
    color: '#EF4444',
    fontWeight: '500',
  },
  monthlyStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  monthDotContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  studentSeparator: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 4,
  },

  // Empty State
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#64748B",
    marginTop: 12,
  },
  emptyStateSub: {
    fontSize: 14,
    color: "#94A3B8",
    marginTop: 4,
  },
});