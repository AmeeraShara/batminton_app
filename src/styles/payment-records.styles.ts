// payment-records.styles.ts
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  top: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E293B",
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
    fontSize: 16,
    color: "#64748B",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF2F2",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 14,
    flex: 1,
  },
  filterSection: {
    marginBottom: 16,
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
    fontWeight: "600",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  pickerContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
    height: 50,
    justifyContent: "center",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  summarySection: {
    marginBottom: 24,
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLeft: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  summaryAmount: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
    marginTop: 4,
  },
  summaryRight: {
    alignItems: "flex-end",
  },
  summaryStats: {
    marginBottom: 8,
  },
  summaryCount: {
    fontSize: 13,
    color: "#6B7280",
  },


  transactionSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 16,
  },
  tableContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    borderBottomWidth: 2,
    borderBottomColor: "#E2E8F0",
    paddingVertical: 10,
    paddingHorizontal: 8,
    minWidth: 900, // Ensures all columns are visible
  },
  headerCell: {
    fontSize: 11,
    fontWeight: "700",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.3,
    paddingHorizontal: 6,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    paddingVertical: 10,
    paddingHorizontal: 8,
    minWidth: 900,
    alignItems: "center",
  },
  tableCell: {
    fontSize: 12,
    color: "#1F2937",
    paddingHorizontal: 6,
  },
  cellStudent: {
    width: 110,
    fontWeight: "500",
  },
  cellReg: {
    width: 85,
  },
  cellAgeGroup: {
    width: 75,
  },
  cellMonth: {
    width: 110,
  },
  cellDate: {
    width: 100,
  },
  cellMethod: {
    width: 85,
  },
  cellAmount: {
    width: 80,
    fontWeight: "600",
    textAlign: "right",
  },
  cellStatus: {
    width: 70,
    alignItems: "center",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginTop: 12,
  },
  emptyStateSub: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  exportButtons: {
    flexDirection: 'row',
    gap: 8,
  },

  exportBtnPDF: {
    backgroundColor: '#EFF6FF',
    borderColor: '#2563EB',
  },

  exportBtnExcel: {
    backgroundColor: '#F0FDF4',
    borderColor: '#16A34A',
  },

  exportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
    gap: 6,
    minWidth: 60,
    justifyContent: 'center',
  },

  exportText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2563EB',
  },
});