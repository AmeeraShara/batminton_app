import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#6B7280",
  },

  top: {
    marginBottom: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1E293B",
  },

  sub: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },

  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF2F2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FCA5A5",
  },

  errorText: {
    marginLeft: 8,
    color: "#991B1B",
    fontSize: 14,
    flex: 1,
  },

  // Tab Styles
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    padding: 4,
    marginBottom: 16,
  },

  tabButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },

  tabButtonActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
  },

  tabTextActive: {
    color: "#2563EB",
  },

  // Filter Styles
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
    marginBottom: 12,
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
  },

  picker: {
    height: 44,
    ...Platform.select({
      android: {
        paddingVertical: 0,
      },
    }),
  },

  appliedSettings: {
    backgroundColor: "#F1F5F9",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    justifyContent: "center",
    flex: 1,
  },

  appliedSettingsText: {
    fontSize: 13,
    color: "#1E293B",
    fontWeight: "500",
  },

  // Stats Styles
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },

  statLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#94A3B8",
    textAlign: "center",
    letterSpacing: 0.5,
  },

  statNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E293B",
    marginTop: 4,
  },

  overdueNumber: {
    color: "#EF4444",
  },

  // Action Buttons
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },

  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 10,
    gap: 8,
  },

  generateButton: {
    backgroundColor: "#2563EB",
  },

  exportButton: {
    backgroundColor: "#059669",
  },

  excelButton: {
    backgroundColor: "#059669",
  },

  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },

  // Report Section
  reportSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },

  reportHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  reportTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
  },

  reportCount: {
    fontSize: 12,
    color: "#94A3B8",
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  // Table Styles (for Payment Report)
  tableContainer: {
    minWidth: "100%",
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F1F5F9",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#F1F5F9",
    backgroundColor: "#FFFFFF",
  },

  headerCell: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontSize: 11,
    fontWeight: "600",
    color: "#475569",
    textAlign: "center",
  },

  tableCell: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontSize: 12,
    color: "#1E293B",
    textAlign: "center",
  },

  cellIndex: {
    width: 30,
    minWidth: 30,
  },

  cellStudent: {
    width: 130,
    minWidth: 130,
    textAlign: "left",
    fontWeight: "500",
  },

  cellReg: {
    width: 85,
    minWidth: 85,
    textAlign: "left",
  },

  cellAgeGroup: {
    width: 90,
    minWidth: 90,
    textAlign: "left",
  },

  cellAmount: {
    width: 90,
    minWidth: 90,
    textAlign: "right",
    fontWeight: "500",
  },

  cellCount: {
    width: 65,
    minWidth: 65,
    textAlign: "center",
  },

  cellStatus: {
    width: 65,
    minWidth: 65,
    textAlign: "center",
  },

  cellDate: {
    width: 100,
    minWidth: 100,
    textAlign: "left",
    fontSize: 11,
  },

  overdueText: {
    color: "#EF4444",
    fontWeight: "600",
  },

  // Calendar Styles
  calendarContainer: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    flexWrap: "wrap",
  },

  calendarTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
  },

  legendContainer: {
    flexDirection: "row",
    gap: 12,
    flexWrap: "wrap",
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },

  legendSession: {
    backgroundColor: "#FEF3C7",
    borderWidth: 1,
    borderColor: "#D97706",
  },

  legendPresent: {
    backgroundColor: "#D1FAE5",
    borderWidth: 1,
    borderColor: "#059669",
  },

  legendAbsent: {
    backgroundColor: "#FEE2E2",
    borderWidth: 1,
    borderColor: "#DC2626",
  },

  legendText: {
    fontSize: 10,
    color: "#6B7280",
  },

  weekHeader: {
    flexDirection: "row",
    marginBottom: 8,
  },

  weekDayText: {
    flex: 1,
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
  },

  calendarWeek: {
    flexDirection: "row",
    marginBottom: 4,
  },

  calendarDayBase: {
    flex: 1,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    margin: 2,
    padding: 2,
    minHeight: 40,
  },

  calendarDayEmpty: {
    flex: 1,
    aspectRatio: 1,
    margin: 2,
    minHeight: 40,
    backgroundColor: "#F9FAFB",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
  },

  calendarDaySession: {
    flex: 1,
    aspectRatio: 1,
    margin: 2,
    minHeight: 40,
    backgroundColor: "#FEF3C7",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
  },

  calendarDayPresent: {
    flex: 1,
    aspectRatio: 1,
    margin: 2,
    minHeight: 40,
    backgroundColor: "#D1FAE5",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
  },

  calendarDayAbsent: {
    flex: 1,
    aspectRatio: 1,
    margin: 2,
    minHeight: 40,
    backgroundColor: "#FEE2E2",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
  },

  calendarDayText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#1E293B",
  },

  calendarDayTextEmpty: {
    fontSize: 12,
    fontWeight: "500",
    color: "#D1D5DB",
  },

  calendarDayTextPresent: {
    fontSize: 12,
    fontWeight: "500",
    color: "#065F46",
  },

  calendarDayTextAbsent: {
    fontSize: 12,
    fontWeight: "500",
    color: "#991B1B",
  },

  calendarDayStatus: {
    fontSize: 8,
    marginTop: 2,
  },

  selectStudentPrompt: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 8,
    backgroundColor: "#F1F5F9",
    borderRadius: 8,
    marginTop: 12,
  },

  selectStudentText: {
    fontSize: 14,
    color: "#6B7280",
  },

  // Student List Styles
  studentListContainer: {
    marginTop: 8,
  },

  studentListTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 12,
  },

  studentListItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: "#F1F5F9",
  },

  studentListItemSelected: {
    backgroundColor: "#EFF6FF",
    borderRadius: 8,
  },

  studentListLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 8,
  },

  studentListNumber: {
    fontSize: 12,
    fontWeight: "500",
    color: "#94A3B8",
    minWidth: 24,
  },

  studentListInfo: {
    flex: 1,
  },

  studentListName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1E293B",
  },

  studentListReg: {
    fontSize: 11,
    color: "#94A3B8",
  },

  studentListRight: {
    alignItems: "flex-end",
  },

  studentListPercentage: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2563EB",
  },

  studentListCount: {
    fontSize: 11,
    color: "#94A3B8",
  },

  // Empty State
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },

  emptyStateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#64748B",
    marginTop: 12,
  },

  emptyStateSub: {
    fontSize: 14,
    color: "#94A3B8",
    marginTop: 4,
  },
});