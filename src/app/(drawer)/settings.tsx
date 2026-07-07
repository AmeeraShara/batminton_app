import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from '@/components/AppHeader';

interface TeamMember {
  id: string;
  name: string;
  mobile: string;
  email: string;
  role: string;
  created_at?: string;
}

interface ApiResponse {
  success?: boolean;
  message?: string;
  insertId?: number;
}

// Updated API URL - use your computer's IP address
const getApiBaseUrl = () => {
  return 'http://192.168.100.169:5000/api/management-team';
};

export default function Settings() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Form states
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      setFetching(true);
      const apiUrl = getApiBaseUrl();
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        const text = await response.text();
        console.error('Response error:', text);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setTeamMembers(data);
      } else {
        console.error('Unexpected response format:', data);
        Alert.alert('Error', 'Failed to fetch team members: Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      Alert.alert(
        'Connection Error', 
        `Unable to connect to the server.\n\n${errorMessage}\n\nURL: ${getApiBaseUrl()}`
      );
    } finally {
      setFetching(false);
    }
  };

  const resetForm = () => {
    setName('');
    setMobile('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setRole('');
    setEditId(null);
  };

  const handleAddMember = async () => {
    // Validate required fields
    if (!name.trim() || !mobile.trim() || !email.trim() || !role) {
      Alert.alert('Error', 'Please fill in all required fields (Name, Mobile, Email, Role)');
      return;
    }

    // Only validate password for new members
    if (!editId && (!password.trim() || !confirmPassword.trim())) {
      Alert.alert('Error', 'Password is required for new members');
      return;
    }

    // Validate password match only if password is provided
    if (password && password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    // Build the member data
    const memberData: any = {
      name: name.trim(),
      mobile: mobile.trim(),
      email: email.trim(),
      role: role,
    };

    // Only include password if it's provided (for updates) or always for new members
    if (password.trim()) {
      memberData.password = password.trim();
    } else if (!editId) {
      // For new members, password is required
      Alert.alert('Error', 'Password is required');
      return;
    }

    try {
      setLoading(true);
      
      let url = getApiBaseUrl();
      let method = 'POST';
      
      if (editId) {
        url = `${getApiBaseUrl()}/${editId}`;
        method = 'PUT';
      }

      console.log('Saving to:', url);
      console.log('Method:', method);
      console.log('Data:', memberData);
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memberData),
      });

      const responseText = await response.text();
      console.log('Response status:', response.status);
      console.log('Response body:', responseText);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}\n${responseText}`);
      }

      const data: ApiResponse = JSON.parse(responseText);

      Alert.alert('Success', data.message || 'Team member saved successfully');
      await fetchTeamMembers();
      setModalVisible(false);
      resetForm();
    } catch (error) {
      console.error('Error saving team member:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      Alert.alert('Error', `Failed to save team member.\n\n${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMember = (id: string) => {
    Alert.alert(
      'Delete Member',
      'Are you sure you want to delete this team member?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              const url = `${getApiBaseUrl()}/${id}`;
              console.log('Deleting from:', url);
              
              const response = await fetch(url, {
                method: 'DELETE',
              });
              
              const responseText = await response.text();
              console.log('Delete response status:', response.status);
              console.log('Delete response body:', responseText);
              
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}\n${responseText}`);
              }
              
              const data: ApiResponse = JSON.parse(responseText);
              
              Alert.alert('Success', data.message || 'Team member deleted successfully');
              await fetchTeamMembers();
            } catch (error) {
              console.error('Error deleting team member:', error);
              const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
              Alert.alert('Error', `Failed to delete team member.\n\n${errorMessage}`);
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };

  const handleEditMember = (member: TeamMember) => {
    console.log('Editing member:', member);
    setEditId(member.id);
    setName(member.name);
    setMobile(member.mobile);
    setEmail(member.email);
    setRole(member.role);
    setPassword(''); // Clear password field for edit
    setConfirmPassword('');
    setModalVisible(true);
  };

  const filteredMembers = teamMembers.filter(
    (item) =>
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.email?.toLowerCase().includes(search.toLowerCase()) ||
      item.mobile?.includes(search)
  );

  if (fetching) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <AppHeader />
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Loading team members...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader />

      <View style={styles.top}>
        <View>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.sub}>System settings</Text>
        </View>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            resetForm();
            setModalVisible(true);
          }}
        >
          <Ionicons name="add" size={18} color="#fff" />
          <Text style={styles.addTxt}>Add Team Member</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Search team member..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
        placeholderTextColor="#94A3B8"
      />

      <View style={styles.tableContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator>
          <View style={{ flex: 1 }}>
            <View style={styles.tableHeader}>
              <Text style={[styles.headerCell, { width: 130 }]}>Name</Text>
              <Text style={[styles.headerCell, { width: 140 }]}>Mobile</Text>
              <Text style={[styles.headerCell, { width: 200 }]}>Email</Text>
              <Text style={[styles.headerCell, { width: 120 }]}>Role</Text>
              <Text style={[styles.headerCell, { width: 100 }]}>Action</Text>
            </View>

            <FlatList
              data={filteredMembers}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.tableRow}>
                  <Text style={[styles.cell, { width: 130 }]} numberOfLines={1}>
                    {item.name}
                  </Text>

                  <Text style={[styles.cell, { width: 140 }]} numberOfLines={1}>
                    {item.mobile}
                  </Text>

                  <Text style={[styles.cell, { width: 200 }]} numberOfLines={1}>
                    {item.email}
                  </Text>

                  <View style={[styles.cellWrapper, { width: 120 }]}>
                    <View style={styles.roleBadge}>
                      <Text style={styles.roleText}>{item.role}</Text>
                    </View>
                  </View>

                  <View style={[styles.actionRow, { width: 100 }]}>
                    <TouchableOpacity
                      onPress={() => handleEditMember(item)}
                      disabled={loading}
                    >
                      <Ionicons
                        name="create-outline"
                        size={20}
                        color="#2563EB"
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ marginLeft: 12 }}
                      onPress={() => handleDeleteMember(item.id)}
                      disabled={loading}
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
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Ionicons name="people-outline" size={48} color="#D1D5DB" />
                  <Text style={styles.emptyText}>No team members added yet</Text>
                  <Text style={styles.emptySubText}>Click "Add Team Member" to get started</Text>
                </View>
              }
            />
          </View>
        </ScrollView>
      </View>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.overlay}>
          <ScrollView contentContainerStyle={styles.modalScroll}>
            <View style={styles.modal}>
              <Text style={styles.modalTitle}>
                {editId ? "Edit Team Member" : "Add New Team Member"}
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Enter full name"
                value={name}
                onChangeText={setName}
                editable={!loading}
                placeholderTextColor="#94A3B8"
              />

              <TextInput
                style={styles.input}
                placeholder="Enter mobile number"
                value={mobile}
                onChangeText={setMobile}
                keyboardType="phone-pad"
                editable={!loading}
                placeholderTextColor="#94A3B8"
              />

              <TextInput
                style={styles.input}
                placeholder="Enter email address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading && !editId} // Disable email editing when updating
                placeholderTextColor="#94A3B8"
              />
              {editId && (
                <Text style={styles.helperText}>Email cannot be changed</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder={editId ? "Enter new password (optional)" : "Enter password"}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!loading}
                placeholderTextColor="#94A3B8"
              />

              <TextInput
                style={styles.input}
                placeholder={editId ? "Confirm new password" : "Confirm password"}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                editable={!loading}
                placeholderTextColor="#94A3B8"
              />

              <Text style={styles.roleLabel}>Select Role</Text>
              <View style={styles.pickerWrap}>
                {['Administrator', 'Operations', 'Member'].map((roleOption) => (
                  <TouchableOpacity
                    key={roleOption}
                    style={[
                      styles.roleOption,
                      role === roleOption && styles.roleOptionSelected
                    ]}
                    onPress={() => setRole(roleOption)}
                    disabled={loading}
                  >
                    <Text style={[
                      styles.roleOptionText,
                      role === roleOption && styles.roleOptionTextSelected
                    ]}>
                      {roleOption}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity 
                style={[styles.save, loading && styles.disabledButton]} 
                onPress={handleAddMember}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.saveText}>
                    {editId ? "Update Member" : "Add Member"}
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setModalVisible(false);
                  resetForm();
                }}
                disabled={loading}
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
    paddingTop: Platform.OS === 'web' ? 20 : 0,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#64748B',
    fontSize: 16,
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
    color: "#111827",
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
    borderWidth: 1,
    borderColor: "#E5E7EB",
    color: "#111827",
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
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerCell: {
    fontWeight: "700",
    color: "#475569",
    fontSize: 14,
  },
  tableRow: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    alignItems: 'center',
  },
  cell: {
    color: "#111827",
    fontSize: 14,
  },
  cellWrapper: {
    alignItems: 'flex-start',
  },
  actionRow: {
    flexDirection: "row",
    alignItems: 'center',
  },
  roleBadge: {
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  roleText: {
    color: "#1E40AF",
    fontSize: 12,
    fontWeight: "500",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
  },
  modalScroll: {
    flexGrow: 1,
    justifyContent: 'center',
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
    color: "#111827",
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    fontSize: 16,
    color: "#111827",
  },
  helperText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: -8,
    marginBottom: 12,
    fontStyle: 'italic',
  },
  roleLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 8,
  },
  pickerWrap: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    marginBottom: 15,
    padding: 5,
  },
  roleOption: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    marginBottom: 5,
  },
  roleOptionSelected: {
    backgroundColor: '#DBEAFE',
    borderColor: '#2563EB',
  },
  roleOptionText: {
    color: '#64748B',
    fontWeight: '500',
    fontSize: 14,
  },
  roleOptionTextSelected: {
    color: '#1E40AF',
  },
  save: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.7,
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
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#94A3B8',
    fontSize: 16,
    marginTop: 12,
  },
  emptySubText: {
    color: '#CBD5E1',
    fontSize: 14,
    marginTop: 4,
  },
});