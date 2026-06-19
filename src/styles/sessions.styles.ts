import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
  },

  content: {
    padding: 20,
  },

  /* Loading & Error */
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  errorText: {
    fontSize: 16,
    color: "#EF4444",
    marginTop: 10,
    textAlign: "center",
  },

  retryButton: {
    marginTop: 15,
    backgroundColor: "#2563EB",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },

  retryButtonText: {
    color: "#fff",
    fontWeight: "600",
  },

  /* Header (MATCHED) */
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

  /* Filters */
  filterSection: {
    marginBottom: 15,
  },

  filterLabel: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
    color: "#374151",
  },

  filterScroll: {
    flexGrow: 0,
  },

  filterButtons: {
    flexDirection: "row",
  },

  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#E2E8F0",
    borderRadius: 20,
    marginRight: 8,
  },

  filterChipActive: {
    backgroundColor: "#2563EB",
  },

  filterChipText: {
    color: "#475569",
    fontSize: 13,
  },

  filterChipTextActive: {
    color: "#fff",
    fontWeight: "600",
  },

  /* Count */
  countContainer: {
    marginBottom: 12,
  },

  countText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  /* Table (MATCHED STYLE) */
  tableContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
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

  /* Empty State */
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },

  emptyText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#64748B",
  },

  emptySubText: {
    color: "#94A3B8",
    marginTop: 5,
  },

  /* Modal (MATCHED STYLE) */
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
  },

  modalScroll: {
    flexGrow: 1,
    justifyContent: "center",
  },

  modal: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 20,
    padding: 20,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    marginBottom: 12,
    overflow: "hidden",
  },

  picker: {
    height: 50,
  },

  /* Time Fields */
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  timeField: {
    flex: 1,
    marginHorizontal: 4,
  },

  timePickerButton: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  timePickerButtonText: {
    color: "#111827",
  },

  /* Age Groups */
  ageGroupContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },

  ageGroupChip: {
    backgroundColor: "#E2E8F0",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },

  ageGroupChipSelected: {
    backgroundColor: "#2563EB",
  },

  ageGroupChipText: {
    color: "#475569",
  },

  ageGroupChipTextSelected: {
    color: "#fff",
    fontWeight: "600",
  },

  noAgeGroups: {
    color: "#94A3B8",
  },

  selectedSummary: {
    backgroundColor: "#EFF6FF",
    padding: 12,
    borderRadius: 12,
    marginVertical: 12,
  },

  selectedSummaryLabel: {
    fontWeight: "600",
    color: "#1E40AF",
  },

  selectedSummaryText: {
    marginTop: 5,
    color: "#374151",
  },

  /* Save Button (MATCHED STYLE) */
  save: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  saveText: {
    color: "#fff",
    fontWeight: "600",
  },

  /* Time Picker Modal */
  timePickerOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  timePickerModal: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 20,
    padding: 20,
  },

  timePickerTitle: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },

  timePickerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  timePickerColumn: {
    flex: 1,
  },

  timePickerLabel: {
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 5,
  },

  timePicker: {
    height: 160,
  },

  timePickerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  cancelButton: {
    flex: 1,
    backgroundColor: "#E5E7EB",
    marginRight: 8,
    justifyContent: "center",
  },

  confirmButton: {
    flex: 1,
    backgroundColor: "#2563EB",
    marginLeft: 8,
    justifyContent: "center",
  },

  cancelButtonText: {
    textAlign: "center",
    fontWeight: "600",
    color: "#374151",
  },

  confirmButtonText: {
    textAlign: "center",
    fontWeight: "600",
    color: "#fff",
  },
});
