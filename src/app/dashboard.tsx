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


const API_URL = "http://192.168.100.169:5000/api"; // Default for Android emulator

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
        console.log("User loaded:", { name, role });
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
      console.log("Fetching dashboard data from:", `${API_URL}/dashboard`);
      
      const response = await fetch(`${API_URL}/dashboard`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Dashboard data received:", data);

      setDashboard({
        totalStudents: data.totalStudents || 0,
        totalAgeGroups: data.totalAgeGroups || 0,
        totalSessions: data.totalSessions || 0,
      });
    } catch (error) {
      console.log("Error loading dashboard:", error);
      Alert.alert(
        "Connection Error",
        "Failed to load dashboard data. Please check your connection."
      );
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
    console.log("Getting quick actions for role:", userRole);
    
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
        title: "Payment Tracker",
        icon: "trending-up-outline",
        route: "/payment-tracker",
      },
      {
        title: "Payment Records",
        icon: "receipt-outline",
        route: "/payment-records",
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
          <Text style={styles.greeting}>👋 Hello!</Text>
          <Text style={styles.title}>{userName}</Text>

          <View style={styles.userInfoContainer}>
            <View style={styles.roleBadge}>
              <Ionicons 
                name={userRole === "coach" ? "person-outline" : "shield-outline"} 
                size={16} 
                color="#2563EB" 
              />
              <Text style={styles.roleBadgeText}>
                {userRole === "coach" ? "Coach" : "Administrator"}
              </Text>
            </View>
          </View>

          {user?.email && (
            <View style={styles.contactInfo}>
              <Ionicons name="mail-outline" size={16} color="#6B7280" />
              <Text style={styles.contactText}>{user?.email}</Text>
            </View>
          )}
          
          {user?.mobile && (
            <View style={styles.contactInfo}>
              <Ionicons name="call-outline" size={16} color="#6B7280" />
              <Text style={styles.contactText}>{user?.mobile}</Text>
            </View>
          )}
        </View>

        {/* Role-specific cards - only show for administrators */}
        {userRole !== "coach" && (
          <>
            <View style={styles.card}>
              <View>
                <Text style={styles.cardTitle}>Total Students</Text>
                <Text style={styles.cardNumber}>
                  {dashboard.totalStudents}
                </Text>
              </View>

              <View style={styles.iconBox}>
                <Ionicons name="people-outline" size={24} color="#2563EB" />
              </View>
            </View>

            <View style={styles.card}>
              <View>
                <Text style={styles.cardTitle}>Age Groups</Text>
                <Text style={styles.cardNumber}>
                  {dashboard.totalAgeGroups}
                </Text>
              </View>

              <View style={[styles.iconBox, { backgroundColor: "#E7FFF0" }]}>
                <Ionicons name="radio-button-on-outline" size={24} color="green" />
              </View>
            </View>
          </>
        )}

        <View style={styles.card}>
          <View>
            <Text style={styles.cardTitle}>Practice Sessions</Text>
            <Text style={styles.cardNumber}>
              {dashboard.totalSessions}
            </Text>
          </View>

          <View style={[styles.iconBox, { backgroundColor: "#F4EBFF" }]}>
            <Ionicons name="calendar-outline" size={24} color="#6D28D9" />
          </View>
        </View>

        {/* Payment Overview - only for administrators */}
        {userRole !== "coach" && (
          <>
            <Text style={styles.quickTitle}>Payment Overview</Text>

            <View style={styles.paymentCard}>
              <View style={styles.paymentCardLeft}>
                <View style={[styles.paymentIconBox, { backgroundColor: "#FEF3C7" }]}>
                  <Ionicons name="trending-up-outline" size={24} color="#D97706" />
                </View>
                <View>
                  <Text style={styles.paymentCardTitle}>Payment Tracker</Text>
                  <Text style={styles.paymentCardSubtitle}>View payment status</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.paymentActionBtn}
                onPress={() => router.push("/payment-tracker" as any)}
              >
                <Text style={styles.paymentActionText}>View</Text>
                <Ionicons name="arrow-forward-outline" size={16} color="#2563EB" />
              </TouchableOpacity>
            </View>

            <View style={styles.paymentCard}>
              <View style={styles.paymentCardLeft}>
                <View style={[styles.paymentIconBox, { backgroundColor: "#E0E7FF" }]}>
                  <Ionicons name="receipt-outline" size={24} color="#4F46E5" />
                </View>
                <View>
                  <Text style={styles.paymentCardTitle}>Payment Records</Text>
                  <Text style={styles.paymentCardSubtitle}>View all transactions</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.paymentActionBtn}
                onPress={() => router.push("/payment-records" as any)}
              >
                <Text style={styles.paymentActionText}>View</Text>
                <Ionicons name="arrow-forward-outline" size={16} color="#2563EB" />
              </TouchableOpacity>
            </View>
          </>
        )}

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
    fontSize: 32,
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
    fontSize: 14,
    color: "#2563EB",
    fontWeight: "600",
  },

  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    gap: 8,
  },

  contactText: {
    color: "#6B7280",
    fontSize: 14,
  },

  card: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardTitle: {
    color: "#68738D",
    fontSize: 14,
  },

  cardNumber: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#1F2937",
  },

  iconBox: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
  },

  quickTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
    marginTop: 10,
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

  paymentCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 18,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  paymentCardLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  paymentIconBox: {
    width: 50,
    height: 50,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  paymentCardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
  },

  paymentCardSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },

  paymentActionBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    gap: 4,
  },

  paymentActionText: {
    color: "#2563EB",
    fontWeight: "600",
    fontSize: 14,
  },

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