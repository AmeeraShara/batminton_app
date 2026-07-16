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
        
        const name = parsedUser?.name || parsedUser?.full_name || "User";
        const role = parsedUser?.role?.toLowerCase() || "admin";
        
        setUser(parsedUser);
        setUserName(name);
        setUserRole(role);
      } else {
        console.log("No user data found in storage");
        router.replace("/login");
      }
    } catch (error) {
      console.log("Error loading user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadDashboard = async () => {
    try {
      const response = await fetch(`${API_URL}/dashboard`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
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
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
    }
  };

  const toggleMenu = (menuTitle: string) => {
    if (expandedMenu === menuTitle) {
      setExpandedMenu(null);
    } else {
      setExpandedMenu(menuTitle);
    }
  };

  const logout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("user");
              setDrawerVisible(false);
              router.replace("/login");
            } catch (error) {
              console.log("Logout error:", error);
              Alert.alert("Error", "Failed to logout. Please try again.");
            }
          },
        },
      ]
    );
  };

  // Get stats based on role
  const getStatsCards = () => {
    if (userRole === "coach") {
      // Coach only sees sessions and attendance
      return [
        {
          id: 'sessions',
          title: "Practice Sessions",
          value: dashboard.totalSessions,
          icon: "calendar-outline",
          route: "/attendance",
          color: "#6D28D9",
          bgColor: "#F4EBFF",
          borderColor: "#6D28D9"
        },
        {
          id: 'attendance',
          title: "Today's Attendance",
          value: dashboard.todayAttendance,
          icon: "checkbox-outline",
          route: "/attendance",
          color: "#2563EB",
          bgColor: "#EEF2FF",
          borderColor: "#2563EB"
        }
      ];
    }
    
    // Admin sees all stats
    return [
      {
        id: 'students',
        title: "Total Students",
        value: dashboard.totalStudents,
        icon: "people-outline",
        route: "/students",
        color: "#2563EB",
        bgColor: "#EEF2FF",
        borderColor: "#2563EB"
      },
      {
        id: 'agegroups',
        title: "Age Groups",
        value: dashboard.totalAgeGroups,
        icon: "radio-button-on-outline",
        route: "/agegroups",
        color: "#22C55E",
        bgColor: "#E7FFF0",
        borderColor: "#22C55E"
      },
      {
        id: 'sessions',
        title: "Practice Sessions",
        value: dashboard.totalSessions,
        icon: "calendar-outline",
        route: "/attendance",
        color: "#6D28D9",
        bgColor: "#F4EBFF",
        borderColor: "#6D28D9"
      },
      {
        id: 'staff',
        title: "Team Members",
        value: dashboard.totalStaff,
        icon: "people-circle-outline",
        route: "/settings",
        color: "#D97706",
        bgColor: "#FEF3C7",
        borderColor: "#D97706"
      }
    ];
  };

  // Get quick actions based on role
  const getQuickActions = () => {
    if (userRole === "coach") {
      return [
        {
          title: "Take Attendance",
          icon: "checkbox-outline",
          route: "/attendance",
          description: "Mark today's attendance"
        },
        {
          title: "View Sessions",
          icon: "calendar-outline",
          route: "/sessions",
          description: "Check practice sessions"
        },

      ];
    }
    
    return [
      {
        title: "Manage Students",
        icon: "people-outline",
        route: "/students",
        description: "Add or update students"
      },
      {
        title: "Age Groups",
        icon: "radio-button-on-outline",
        route: "/agegroups",
        description: "Manage age categories"
      },
      {
        title: "Practice Sessions",
        icon: "calendar-outline",
        route: "/attendance",
        description: "Schedule & track sessions"
      },
      {
        title: "Payment Tracker",
        icon: "card-outline",
        route: "/payment-tracker",
        description: "View payment records"
      }
    ];
  };

  // Get menu items based on role
  const getMenuItems = () => {
    if (userRole === "coach") {
      return [
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
                {
          icon: "checkbox-outline",
          title: "Attendance",
          route: "/attendance",
          isParent: false,
        },

        
      ];
    }
    
    return [
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
  };

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

  const statsCards = getStatsCards();
  const quickActions = getQuickActions();
  const menuItems = getMenuItems();

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.logo}>
            <Ionicons name="radio-button-on" size={24} color="#fff" />
          </View>

          <TouchableOpacity onPress={() => setDrawerVisible(true)}>
            <Ionicons name="menu" size={28} color="#222" />
          </TouchableOpacity>
        </View>

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

        <View style={styles.statsContainer}>
          {statsCards.map((card) => (
            <TouchableOpacity 
              key={card.id}
              style={[
                styles.statsCard, 
                { borderLeftColor: card.borderColor }
              ]}
              onPress={() => router.push(card.route as any)}
              activeOpacity={0.8}
            >
              <View style={styles.statsCardContent}>
                <View style={styles.statsCardLeft}>
                  <View style={[styles.statsCardIconBox, { backgroundColor: card.bgColor }]}>
                    <Ionicons name={card.icon as any} size={28} color={card.color} />
                  </View>
                  <View>
                    <Text style={styles.statsCardLabel}>{card.title}</Text>
                    <Text style={styles.statsCardNumber}>{card.value}</Text>
                  </View>
                </View>
                <Ionicons name="arrow-forward-outline" size={22} color={card.color} />
              </View>
            </TouchableOpacity>
          ))}
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
              <View>
                <Text style={styles.actionText}>{item.title}</Text>
                {item.description && (
                  <Text style={styles.actionDescription}>{item.description}</Text>
                )}
              </View>
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
              
              <View style={{ marginTop: 20, gap: 10 }}>
                <TouchableOpacity 
                  style={[styles.logoutBtn, { backgroundColor: '#fcfcfc', borderColor: '#ffffff', borderWidth: 2 }]} 
                  onPress={logout}
                >
                  <Ionicons name="log-out-outline" size={24} color="#000000" />
                  <Text style={[styles.logoutText, { color: '#000000' }]}> LOGOUT</Text>
                </TouchableOpacity>
              </View>

              <View style={{ height: 30 }} />
            </ScrollView>
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
    borderLeftWidth: 4,
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
    flex: 1,
  },

  smallIcon: {
    marginRight: 15,
  },

  actionText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1F2937",
  },

  actionDescription: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
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
    paddingVertical: 11,
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
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  logoutText: {
    marginLeft: 10,
    fontWeight: "600",
    color: "#EF4444",
  },
});