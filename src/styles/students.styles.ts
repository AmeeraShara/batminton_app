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
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
  },

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
  },

  pickerWrap: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    marginBottom: 15,
  },

  save: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  saveText: {
    color: "#fff",
    fontWeight: "700",
  },

  cancelBtn: {
    padding: 15,
    alignItems: "center",
  },

  cancelText: {
    color: "#64748B",
    fontWeight: "600",
  },
});
