import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const API_URL = "http://192.168.100.169:5000/api"; 

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  
  // Dashboard stats state
  const [dashboard, setDashboard] = useState({
    totalStudents: 0,
    totalAgeGroups: 0,
    totalSessions: 0,
    totalStaff: 0,
    newStudentsToday: 0,
    todayAttendance: 0,
    totalRevenue: 0,
    todayRevenue: 0
  });

  useEffect(() => {
    loadUser();
    loadDashboard();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");

      if (userData) {
        const parsedUser = JSON.parse(userData);
        
        // Get user name from the management_team table structure
        const name = parsedUser?.name || parsedUser?.full_name || "User";
        const role = parsedUser?.role?.toLowerCase() || "admin";
        
        setUser(parsedUser);
        setUserName(name);
        setUserRole(role);
      } else {
        console.log("No user data found in storage");
        // Redirect to login if no user
        router.replace("/");
      }
    } catch (error) {
      console.log("Error loading user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load dashboard data
  const loadDashboard = async () => {
    try {
      console.log('📊 Fetching dashboard data...');
      const response = await fetch(`${API_URL}/dashboard`);
      
      console.log('📊 Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📊 Dashboard API response:', JSON.stringify(data, null, 2));
      
      // Check if data has the expected structure
      if (data.success && data.data) {
        setDashboard({
          totalStudents: data.data.totalStudents || 0,
          totalAgeGroups: data.data.totalAgeGroups || 0,
          totalSessions: data.data.totalSessions || 0,
          totalStaff: data.data.totalStaff || 0,
          newStudentsToday: data.data.newStudentsToday || 0,
          todayAttendance: data.data.todayAttendance || 0,
          totalRevenue: data.data.totalRevenue || 0,
          todayRevenue: data.data.todayRevenue || 0
        });
      } else {
        console.error('Invalid data structure:', data);
        // Use default values if structure is wrong
        setDashboard({
          totalStudents: 0,
          totalAgeGroups: 0,
          totalSessions: 0,
          totalStaff: 0,
          newStudentsToday: 0,
          todayAttendance: 0,
          totalRevenue: 0,
          todayRevenue: 0
        });
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
      Alert.alert(
        "Connection Error",
        "Failed to load dashboard data. Please check your connection."
      );
      // Set default values on error
      setDashboard({
        totalStudents: 0,
        totalAgeGroups: 0,
        totalSessions: 0,
        totalStaff: 0,
        newStudentsToday: 0,
        todayAttendance: 0,
        totalRevenue: 0,
        todayRevenue: 0
      });
    }
  };

  const toggleMenu = (menuTitle: string) => {
    if (expandedMenu === menuTitle) {
      setExpandedMenu(null);
    } else {
      setExpandedMenu(menuTitle);
    }
  };

  const logout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("user");
          router.replace("/");
        },
      },
    ]);
  };

  // Quick actions based on role
  const getQuickActions = () => {
    
    if (userRole === "coach") {
      return [
        {
          title: "Practice Sessions",
          icon: "calendar-outline",
          route: "/attendance",
        },
        {
          title: "Settings",
          icon: "settings-outline",
          route: "/settings",
        },
      ];
    }
    
    return [
      {
        title: "Manage Students",
        icon: "people-outline",
        route: "/students",
      },
      {
        title: "Age Groups",
        icon: "radio-button-on-outline",
        route: "/agegroups",
      },
      {
        title: "Practice Sessions",
        icon: "calendar-outline",
        route: "/attendance",
      },
      {
        title: "Settings",
        icon: "settings-outline",
        route: "/settings",
      },
    ];
  };

  // All menu items for administrators
  const allMenuItems = [
    {
      icon: "grid-outline",
      title: "Dashboard",
      route: "/dashboard",
      isParent: false,
    },
    {
      icon: "people-outline",
      title: "Students",
      route: "/students",
      isParent: false,
    },
    {
      icon: "checkbox-outline",
      title: "Attendance",
      route: "/attendance",
      isParent: false,
    },
    {
      icon: "card-outline",
      title: "Payments",
      route: null,
      isParent: true,
      children: [
        {
          icon: "trending-up-outline",
          title: "Payment Tracker",
          route: "/payment-tracker",
        },
        {
          icon: "receipt-outline",
          title: "Payment Records",
          route: "/payment-records",
        },
      ],
    },
    {
      icon: "radio-button-on-outline",
      title: "Age Groups",
      route: "/agegroups",
      isParent: false,
    },
    {
      icon: "calendar-outline",
      title: "Sessions",
      route: "/sessions",
      isParent: false,
    },
    {
      icon: "stats-chart-outline",
      title: "Reports",
      route: "/reports",
      isParent: false,
    },
    {
      icon: "settings-outline",
      title: "Settings",
      route: "/settings",
      isParent: false,
    },
  ];

  // Coach menu items
  const coachMenuItems = [
    {
      icon: "grid-outline",
      title: "Dashboard",
      route: "/dashboard",
      isParent: false,
    },
    {
      icon: "calendar-outline",
      title: "Sessions",
      route: "/sessions",
      isParent: false,
    },
  ];

  // Determine which menu items to show based on user role
  const getMenuItems = () => {
    if (userRole === "coach") {
      return coachMenuItems;
    }
    return allMenuItems;
  };

  const menuItems = getMenuItems();
  const quickActions = getQuickActions();

  const renderDrawerItem = (item: any, index: number) => {
    if (item.isParent) {
      const isExpanded = expandedMenu === item.title;
      return (
        <View key={index}>
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => toggleMenu(item.title)}
          >
            <View style={styles.drawerItemLeft}>
              <Ionicons name={item.icon as any} size={24} color="#64748B" />
              <Text style={styles.drawerText}>{item.title}</Text>
            </View>
            <Ionicons
              name={isExpanded ? "chevron-up-outline" : "chevron-down-outline"}
              size={20}
              color="#64748B"
            />
          </TouchableOpacity>
          {isExpanded && (
            <View style={styles.subMenuContainer}>
              {item.children.map((child: any, childIndex: number) => (
                <TouchableOpacity
                  key={childIndex}
                  style={styles.subMenuItem}
                  onPress={() => {
                    setDrawerVisible(false);
                    router.push(child.route as any);
                  }}
                >
                  <View style={styles.subMenuItemLeft}>
                    <Ionicons name={child.icon as any} size={20} color="#64748B" />
                    <Text style={styles.subMenuText}>{child.title}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          key={index}
          style={styles.drawerItem}
          onPress={() => {
            setDrawerVisible(false);
            router.push(item.route as any);
          }}
        >
          <View style={styles.drawerItemLeft}>
            <Ionicons name={item.icon as any} size={24} color="#64748B" />
            <Text style={styles.drawerText}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logo}>
            <Ionicons name="radio-button-on" size={24} color="#fff" />
          </View>

          <TouchableOpacity onPress={() => setDrawerVisible(true)}>
            <Ionicons name="menu" size={28} color="#222" />
          </TouchableOpacity>
        </View>

        {/* Welcome Section with User Name and Info */}
        <View style={styles.welcomeSection}>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.title}>{userName}</Text>

          <View style={styles.userInfoContainer}>
            <View style={styles.roleBadge}>
              <Ionicons 
                name={userRole === "coach" ? "person-outline" : "shield-outline"} 
                size={16} 
                color="#2563EB" 
              />
              <Text style={styles.roleBadgeText}>
                You are logged in as {userRole === "coach" ? "Coach" : "Administrator"}
              </Text>
            </View>
          </View>
        </View>

        {/* Stats Cards - 1 Column */}
        <View style={styles.statsContainer}>
          {/* Total Students Card */}
          <TouchableOpacity 
            style={[styles.statsCard, styles.cardStudents]}
            onPress={() => router.push("/students" as any)}
            activeOpacity={0.8}
          >
            <View style={styles.statsCardContent}>
              <View style={styles.statsCardLeft}>
                <View style={styles.statsCardIconBox}>
                  <Ionicons name="people-outline" size={28} color="#2563EB" />
                </View>
                <View>
                  <Text style={styles.statsCardLabel}>Total Students</Text>
                  <Text style={styles.statsCardNumber}>{dashboard.totalStudents}</Text>
                </View>
              </View>
              <Ionicons name="arrow-forward-outline" size={22} color="#2563EB" />
            </View>
          </TouchableOpacity>

          {/* Age Groups Card */}
          <TouchableOpacity 
            style={[styles.statsCard, styles.cardAgeGroups]}
            onPress={() => router.push("/agegroups" as any)}
            activeOpacity={0.8}
          >
            <View style={styles.statsCardContent}>
              <View style={styles.statsCardLeft}>
                <View style={[styles.statsCardIconBox, { backgroundColor: "#E7FFF0" }]}>
                  <Ionicons name="radio-button-on-outline" size={28} color="#22C55E" />
                </View>
                <View>
                  <Text style={styles.statsCardLabel}>Age Groups</Text>
                  <Text style={styles.statsCardNumber}>{dashboard.totalAgeGroups}</Text>
                </View>
              </View>
              <Ionicons name="arrow-forward-outline" size={22} color="#22C55E" />
            </View>
          </TouchableOpacity>

          {/* Practice Sessions Card */}
          <TouchableOpacity 
            style={[styles.statsCard, styles.cardSessions]}
            onPress={() => router.push("/attendance" as any)}
            activeOpacity={0.8}
          >
            <View style={styles.statsCardContent}>
              <View style={styles.statsCardLeft}>
                <View style={[styles.statsCardIconBox, { backgroundColor: "#F4EBFF" }]}>
                  <Ionicons name="calendar-outline" size={28} color="#6D28D9" />
                </View>
                <View>
                  <Text style={styles.statsCardLabel}>Practice Sessions</Text>
                  <Text style={styles.statsCardNumber}>{dashboard.totalSessions}</Text>
                </View>
              </View>
              <Ionicons name="arrow-forward-outline" size={22} color="#6D28D9" />
            </View>
          </TouchableOpacity>

          {/* Team Members Card */}
          <TouchableOpacity 
            style={[styles.statsCard, styles.cardTeam]}
            onPress={() => router.push("/management-team" as any)}
            activeOpacity={0.8}
          >
            <View style={styles.statsCardContent}>
              <View style={styles.statsCardLeft}>
                <View style={[styles.statsCardIconBox, { backgroundColor: "#FEF3C7" }]}>
                  <Ionicons name="people-circle-outline" size={28} color="#D97706" />
                </View>
                <View>
                  <Text style={styles.statsCardLabel}>Team Members</Text>
                  <Text style={styles.statsCardNumber}>{dashboard.totalStaff}</Text>
                </View>
              </View>
              <Ionicons name="arrow-forward-outline" size={22} color="#D97706" />
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.quickTitle}>Quick Actions</Text>

        {quickActions.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.actionCard}
            onPress={() => router.push(item.route as any)}
          >
            <View style={styles.actionLeft}>
              <View style={styles.smallIcon}>
                <Ionicons name={item.icon as any} size={22} color="#2563EB" />
              </View>

              <Text style={styles.actionText}>{item.title}</Text>
            </View>

            <Ionicons name="arrow-forward-outline" size={22} color="#999" />
          </TouchableOpacity>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Drawer */}
      <Modal transparent visible={drawerVisible} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.drawer}>
            <View style={styles.drawerHeader}>
              <View>
                <Text style={styles.drawerName}>{userName}</Text>
                <Text style={styles.drawerRole}>
                  {user?.role || "Administrator"}
                </Text>
              </View>

              <TouchableOpacity onPress={() => setDrawerVisible(false)}>
                <Ionicons
                  name="close-circle-outline"
                  size={34}
                  color="#4F7CFF"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.line} />

            <ScrollView showsVerticalScrollIndicator={false}>
              {menuItems.map((item, index) => renderDrawerItem(item, index))}
            </ScrollView>

            <View style={styles.line} />

            <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
              <Ionicons name="log-out-outline" size={24} color="#EF4444" />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
  },
  
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    marginTop: 45,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  logo: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
  },

  welcomeSection: {
    marginBottom: 25,
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  greeting: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 2,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
  },

  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  roleBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
    alignSelf: "flex-start",
  },

  roleBadgeText: {
    fontSize: 13,
    color: "#2563EB",
    fontWeight: "500",
  },

  // Stats Container - 1 Column
  statsContainer: {
    marginBottom: 20,
  },

  statsCard: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  cardStudents: {
    borderLeftWidth: 4,
    borderLeftColor: "#2563EB",
  },

  cardAgeGroups: {
    borderLeftWidth: 4,
    borderLeftColor: "#22C55E",
  },

  cardSessions: {
    borderLeftWidth: 4,
    borderLeftColor: "#6D28D9",
  },

  cardTeam: {
    borderLeftWidth: 4,
    borderLeftColor: "#D97706",
  },

  statsCardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  statsCardLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  statsCardIconBox: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  statsCardLabel: {
    fontSize: 14,
    color: "#6B7280",
  },

  statsCardNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
  },

  quickTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
    marginTop: 5,
    color: "#1F2937",
  },

  actionCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 18,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  smallIcon: {
    marginRight: 15,
  },

  actionText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1F2937",
  },

  // Drawer styles
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  drawer: {
    width: "82%",
    height: "100%",
    backgroundColor: "#fff",
    paddingTop: 55,
    paddingHorizontal: 28,
  },

  drawerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  drawerName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
  },

  drawerRole: {
    color: "#64748B",
    marginTop: 5,
  },

  line: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 20,
  },

  drawerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },

  drawerItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  drawerText: {
    marginLeft: 18,
    fontSize: 18,
    color: "#1F2937",
  },

  subMenuContainer: {
    marginLeft: 20,
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    marginBottom: 8,
  },

  subMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  subMenuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  subMenuText: {
    marginLeft: 18,
    fontSize: 16,
    color: "#475569",
  },

  logoutBtn: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  logoutText: {
    marginLeft: 10,
    fontWeight: "600",
    color: "#EF4444",
  },
});