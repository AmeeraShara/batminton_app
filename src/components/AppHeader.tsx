import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
} from "react-native";

export default function AppHeader() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const data = await AsyncStorage.getItem("user");
      if (data) {
        const parsedUser = JSON.parse(data);
        setUser(parsedUser);
        setUserRole(parsedUser?.role?.toLowerCase() || "");
      }
    } catch (error) {
      console.log("Error loading user:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMenu = (menuTitle: string) => {
    if (expandedMenu === menuTitle) {
      setExpandedMenu(null);
    } else {
      setExpandedMenu(menuTitle);
    }
  };

  const navigateTo = (route: string) => {
    setDrawerVisible(false);
    setTimeout(() => {
      router.replace(route as any);
    }, 150);
  };

  // DIRECT LOGOUT - No confirmation, just logout
  const directLogout = async () => {
    try {
      // Clear user data
      await AsyncStorage.removeItem("user");
      
      // Close drawer
      setDrawerVisible(false);
      
      // Navigate to login
      router.replace("/login");
      
    } catch (error) {
      Alert.alert("Error", "Failed to logout. Please try again.");
    }
  };

  // Logout with confirmation using Alert
  const logoutWithConfirm = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => console.log(" Logout cancelled"),
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: directLogout,
        },
      ]
    );
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

  // Coach menu items (only Dashboard, Sessions)
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
    const role = userRole || user?.role?.toLowerCase() || "";
    if (role === "coach") {
      return coachMenuItems;
    }
    return allMenuItems;
  };

  const menuItems = getMenuItems();

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
          onPress={() => navigateTo(item.route)}
        >
          <View style={styles.drawerItemLeft}>
            <Ionicons name={item.icon as any} size={24} color="#64748B" />
            <Text style={styles.drawerText}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.header}>
        <View style={styles.logo}>
          <Ionicons name="radio-button-on" size={24} color="#fff" />
        </View>
        <View style={{ width: 28, height: 28, backgroundColor: "#E2E8F0", borderRadius: 8 }} />
      </View>
    );
  }

  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logo}>
          <Ionicons name="radio-button-on" size={24} color="#fff" />
        </View>

        <TouchableOpacity onPress={() => setDrawerVisible(true)}>
          <Ionicons name="menu" size={28} color="#222" />
        </TouchableOpacity>
      </View>

      {/* Drawer */}
      <Modal transparent visible={drawerVisible} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.drawer}>
            <ScrollView 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ 
                paddingBottom: 40,
                flexGrow: 1 
              }}
            >
              <View style={styles.drawerHeader}>
                <View>
                  <Text style={styles.drawerName}>
                    {user?.name || user?.full_name || "User"}
                  </Text>
                  <Text style={styles.drawerRole}>
                    {user?.role || "Administrator"}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => setDrawerVisible(false)}>
                  <Ionicons name="close-circle-outline" size={34} color="#4F7CFF" />
                </TouchableOpacity>
              </View>

              <View style={styles.line} />

              {menuItems.map((item, index) => renderDrawerItem(item, index))}

              <View style={styles.line} />
              <View style={{ gap: 10 }}>
                <TouchableOpacity 
                  style={[styles.logoutBtn, { 
                    backgroundColor: '#fefefe', 
                    borderColor: '#ffffff', 
                    borderWidth: 2 
                  }]} 
                  onPress={directLogout}
                  activeOpacity={0.7}
                >
                  <Ionicons name="log-out-outline" size={24} color="#000000" />
                  <Text style={[styles.logoutText, { color: '#000000' }]}> Logout</Text>
                </TouchableOpacity>
              </View>

              <View style={{ height: 20 }} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
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
    color: "#111827",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#EF4444",
    borderRadius: 15,
    padding: 16,
    backgroundColor: "#FEF2F2",
    marginBottom: 5,
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    marginLeft: 10,
    fontWeight: "700",
    fontSize: 16,
    color: "#EF4444",
  },
});