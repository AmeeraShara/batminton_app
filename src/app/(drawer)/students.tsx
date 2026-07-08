import AppHeader from "@/components/AppHeader";
import styles from "@/styles/students.styles";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  ScrollView,
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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
      await fetch(`${API}/${id}`, { method: "DELETE" });
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

      {/* TOP BAR */}
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

      {/* SEARCH */}
      <TextInput
        placeholder="Search student..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      {/* TABLE */}
      <View style={styles.tableContainer}>
        {/* HEADER */}
        <ScrollView horizontal showsHorizontalScrollIndicator>
          <View>
            <View style={styles.tableHeader}>
              <Text style={[styles.headerCell, { width: 120 }]}>Reg No</Text>
              <Text style={[styles.headerCell, { width: 150 }]}>Name</Text>
              <Text style={[styles.headerCell, { width: 80 }]}>Age</Text>
              <Text style={[styles.headerCell, { width: 140 }]}>Contact</Text>
              <Text style={[styles.headerCell, { width: 200 }]}>Email</Text>
              <Text style={[styles.headerCell, { width: 100 }]}>Action</Text>
            </View>

            {/* BODY */}
            <FlatList
              data={filteredStudents}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.tableRow}>
                  <Text style={[styles.cell, { width: 120 }]}>
                    {item.registration_number}
                  </Text>

                  <Text style={[styles.cell, { width: 150 }]}>
                    {item.student_name}
                  </Text>

                  <Text style={[styles.cell, { width: 80 }]}>{item.age}</Text>

                  <Text style={[styles.cell, { width: 140 }]}>
                    {item.contact_number}
                  </Text>

                  <Text style={[styles.cell, { width: 200 }]}>
                    {item.email}
                  </Text>

                  <View style={[styles.actionRow, { width: 100 }]}>
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
                      <Ionicons
                        name="create-outline"
                        size={20}
                        color="#2563EB"
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ marginLeft: 12 }}
                      onPress={() => removeStudent(item.id)}
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
        </ScrollView>
      </View>

      {/* MODAL */}
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

              {/* Age Group - Styled consistently with other inputs */}
              <View style={styles.ageGroupContainer}>
                <Picker
                  selectedValue={ageGroupId}
                  onValueChange={(value) => setAgeGroupId(value)}
                  style={styles.picker}
                  dropdownIconColor="#64748B"
                >
                  <Picker.Item label="Select Age Group" value="" />
                  {ageGroups.map((group: any) => (
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