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
} from "react-native";

export default function AppHeader() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const data = await AsyncStorage.getItem("user");

      if (data) {
        setUser(JSON.parse(data));
      }
    } catch (error) {
      console.log(error);
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

  const menuItems = [
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
            <View style={styles.drawerHeader}>
              <View>
                <Text style={styles.drawerName}>
                  {user?.full_name || "User"}
                </Text>

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

            {menuItems.map((item, index) => renderDrawerItem(item, index))}

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
    paddingVertical: 15,
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
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 15,
    padding: 16,
  },

  logoutText: {
    marginLeft: 10,
    fontWeight: "600",
    color: "#EF4444",
  },
});