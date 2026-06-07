import AppHeader from "@/components/AppHeader";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import {
    FlatList,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function Students() {
  const API = "http://192.168.100.169:5000/api/students";
  const AGE_API = "http://192.168.100.169:5000/api/agegroups";

  const [students, setStudents] = useState<any[]>([]);
  const [ageGroups, setAgeGroups] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const [modal, setModal] = useState(false);

  const [editId, setEditId] = useState(null);

  const [registrationNumber, setRegistrationNumber] = useState("");

  const [studentName, setStudentName] = useState("");

  const [age, setAge] = useState("");

  const [contactNumber, setContactNumber] = useState("");

  const [parentContact, setParentContact] = useState("");

  const [email, setEmail] = useState("");

  const [ageGroupId, setAgeGroupId] = useState("");

  useEffect(() => {
    loadStudents();
    loadAgeGroups();
  }, []);

  const loadStudents = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadAgeGroups = async () => {
    try {
      const response = await fetch(AGE_API);
      const data = await response.json();
      setAgeGroups(data);
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setEditId(null);
    setRegistrationNumber("");
    setStudentName("");
    setAge("");
    setContactNumber("");
    setParentContact("");
    setEmail("");
    setAgeGroupId("");
  };

  const saveStudent = async () => {
    const body = {
      registration_number: registrationNumber,
      student_name: studentName,
      age,
      contact_number: contactNumber,
      parent_contact: parentContact,
      email,
      age_group_id: ageGroupId,
    };

    try {
      if (editId) {
        await fetch(`${API}/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
      } else {
        await fetch(API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
      }

      loadStudents();
      resetForm();
      setModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const removeStudent = async (id: number) => {
    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      loadStudents();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredStudents = students.filter(
    (item) =>
      item.student_name?.toLowerCase().includes(search.toLowerCase()) ||
      item.registration_number?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <AppHeader />

      <View style={styles.top}>
        <View>
          <Text style={styles.title}>Students</Text>

          <Text style={styles.sub}>Manage registered students</Text>
        </View>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            resetForm();
            setModal(true);
          }}
        >
          <Ionicons name="add" size={18} color="#fff" />

          <Text style={styles.addTxt}>Add Student</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Search student..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, { flex: 1.2 }]}>Reg No</Text>

          <Text style={[styles.headerCell, { flex: 2 }]}>Name</Text>

          <Text style={[styles.headerCell, { flex: 1 }]}>Age</Text>

          <Text style={[styles.headerCell, { flex: 2 }]}>Group</Text>

          <Text style={[styles.headerCell, { flex: 1 }]}>Action</Text>
        </View>

        <FlatList
          data={filteredStudents}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={[styles.cell, { flex: 1.2 }]}>
                {item.registration_number}
              </Text>

              <Text style={[styles.cell, { flex: 2 }]}>
                {item.student_name}
              </Text>

              <Text style={[styles.cell, { flex: 1 }]}>{item.age}</Text>

              <Text style={[styles.cell, { flex: 2 }]}>
                {item.age_group_name}
              </Text>

              <View style={[styles.actionRow, { flex: 1 }]}>
                <TouchableOpacity
                  onPress={() => {
                    setEditId(item.id);

                    setRegistrationNumber(item.registration_number);

                    setStudentName(item.student_name);

                    setAge(String(item.age));

                    setContactNumber(item.contact_number);

                    setParentContact(item.parent_contact);

                    setEmail(item.email);

                    setAgeGroupId(item.age_group_id);

                    setModal(true);
                  }}
                >
                  <Ionicons name="create-outline" size={20} color="#2563EB" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    marginLeft: 12,
                  }}
                  onPress={() => removeStudent(item.id)}
                >
                  <Ionicons name="trash-outline" size={20} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>

      <Modal visible={modal} transparent animationType="fade">
        <View style={styles.overlay}>
          <ScrollView>
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>
                {editId ? "Edit Student" : "Add Student"}
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Registration Number"
                value={registrationNumber}
                onChangeText={setRegistrationNumber}
              />

              <TextInput
                style={styles.input}
                placeholder="Student Name"
                value={studentName}
                onChangeText={setStudentName}
              />

              <TextInput
                style={styles.input}
                placeholder="Age"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
              />

              <TextInput
                style={styles.input}
                placeholder="Contact Number"
                value={contactNumber}
                onChangeText={setContactNumber}
              />

              <TextInput
                style={styles.input}
                placeholder="Parent Contact"
                value={parentContact}
                onChangeText={setParentContact}
              />

              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />

              <View style={styles.pickerWrap}>
                <Picker
                  selectedValue={ageGroupId}
                  onValueChange={(value) => setAgeGroupId(value)}
                >
                  <Picker.Item label="Select Age Group" value="" />

                  {Array.isArray(ageGroups) &&
                    ageGroups.map((group: any) => (
                      <Picker.Item
                        key={group.id}
                        label={group.age_group_name}
                        value={group.id}
                      />
                    ))}
                </Picker>
              </View>

              <TouchableOpacity style={styles.save} onPress={saveStudent}>
                <Text style={styles.saveText}>Save Student</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setModal(false);
                  resetForm();
                }}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
