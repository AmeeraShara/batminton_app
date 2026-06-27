import AppHeader from "@/components/AppHeader";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AgeGroups() {
  const API = "http://10.217.168.182:5000/api/agegroups";

  const [groups, setGroups] = useState<any[]>([]);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();
      setGroups(data);
    } catch (error) {
      console.log(error);
    }
  };

  const saveGroup = async () => {
    if (!name.trim()) return;

    try {
      if (editId) {
        await fetch(`${API}/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            age_group_name: name,
          }),
        });
      } else {
        await fetch(API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            age_group_name: name,
          }),
        });
      }

      setModal(false);
      setName("");
      setEditId(null);
      loadGroups();
    } catch (error) {
      console.log(error);
    }
  };

  const remove = async (id: number) => {
    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      loadGroups();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader />

      <View style={styles.top}>
        <View>
          <Text style={styles.title}>Age Groups</Text>
          <Text style={styles.sub}>
            Manage age group categories
          </Text>
        </View>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            setEditId(null);
            setName("");
            setModal(true);
          }}
        >
          <Ionicons
            name="add"
            size={18}
            color="#fff"
          />

          <Text style={styles.addTxt}>
            Add Age Group
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text
            style={[
              styles.headerCell,
              { flex: 2 },
            ]}
          >
            Age Group
          </Text>

          <Text
            style={[
              styles.headerCell,
              { flex: 2 },
            ]}
          >
            Created Date
          </Text>

          <Text
            style={[
              styles.headerCell,
              { flex: 1 },
            ]}
          >
            Actions
          </Text>
        </View>

        <FlatList
          data={groups}
          keyExtractor={(item) =>
            item.id.toString()
          }
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text
                style={[
                  styles.cell,
                  { flex: 2 },
                ]}
              >
                {item.age_group_name}
              </Text>

              <Text
                style={[
                  styles.cell,
                  { flex: 2 },
                ]}
              >
                {item.created_at
                  ? new Date(
                      item.created_at
                    ).toLocaleDateString()
                  : "-"}
              </Text>

              <View
                style={[
                  styles.actionRow,
                  { flex: 1 },
                ]}
              >
                <TouchableOpacity
                  onPress={() => {
                    setEditId(item.id);
                    setName(
                      item.age_group_name
                    );
                    setModal(true);
                  }}
                >
                  <Ionicons
                    name="create-outline"
                    size={20}
                    color="#2563EB"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    marginLeft: 12,
                  }}
                  onPress={() =>
                    remove(item.id)
                  }
                >
                  <Ionicons
                    name="trash-outline"
                    size={20}
                    color="#EF4444"
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      <Modal
        transparent
        visible={modal}
        animationType="fade"
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>
              {editId
                ? "Edit Age Group"
                : "Add New Age Group"}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="U10, U12, U15..."
              value={name}
              onChangeText={setName}
            />

            <TouchableOpacity
              style={styles.save}
              onPress={saveGroup}
            >
              <Text style={styles.saveText}>
                Save
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => {
                setModal(false);
                setName("");
                setEditId(null);
              }}
            >
              <Text
                style={styles.cancelText}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
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
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 10,
  },

  addTxt: {
    color: "#fff",
    fontWeight: "500",
    marginLeft: 6,
  },

  tableContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
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
    fontSize: 14,
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
    fontSize: 15,
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

  modal: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 20,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 14,
    borderRadius: 12,
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

  cancelBtn: {
    marginTop: 10,
    padding: 15,
    alignItems: "center",
  },

  cancelText: {
    color: "#64748B",
    fontWeight: "600",
  },
});