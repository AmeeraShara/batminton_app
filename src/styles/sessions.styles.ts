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

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },

  title: {
    fontSize: 25,
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
    fontWeight: "500",
    marginLeft: 6,
  },

  filterSection: {
    marginBottom: 20,
  },

  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 10,
  },

  filterScroll: {
    flexGrow: 0,
  },

  filterButtons: {
    flexDirection: "row",
    gap: 8,
  },

  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginRight: 8,
  },

  filterChipActive: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  filterChipText: {
    fontSize: 14,
    color: "#475569",
  },

  filterChipTextActive: {
    color: "#fff",
  },

  countContainer: {
    marginBottom: 16,
  },

  countText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
  },

  tableContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
    minWidth: 840, // This ensures the table has a minimum width for horizontal scrolling
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingVertical: 16,
    paddingHorizontal: 15,
  },

  headerCell: {
    fontWeight: "700",
    color: "#475569",
    fontSize: 13,
  },

  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  cell: {
    fontSize: 14,
    color: "#111827",
  },

  actionRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  emptyContainer: {
    alignItems: "center",
    paddingVertical: 60,
  },

  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#64748B",
    marginTop: 12,
  },

  emptySubText: {
    fontSize: 14,
    color: "#94A3B8",
    marginTop: 4,
  },

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
    padding: 20,
    borderRadius: 20,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    flex: 1,
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#475569",
    marginBottom: 6,
    marginTop: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 14,
    borderRadius: 12,
    fontSize: 15,
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    overflow: "hidden",
  },

  picker: {
    height: 50,
  },

  timeRow: {
    flexDirection: "row",
    gap: 12,
  },

  timeField: {
    flex: 1,
  },

  ageGroupContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 6,
    gap: 8,
  },

  ageGroupChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#fff",
  },

  ageGroupChipSelected: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },

  ageGroupChipText: {
    color: "#475569",
    fontSize: 14,
  },

  ageGroupChipTextSelected: {
    color: "#fff",
  },

  noAgeGroups: {
    color: "#94A3B8",
    fontSize: 14,
    paddingVertical: 10,
  },

  save: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
  },

  saveText: {
    color: "#fff",
    fontWeight: "600",
  },
});