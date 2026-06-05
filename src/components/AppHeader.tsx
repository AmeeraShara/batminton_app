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
    },
    {
      icon: "people-outline",
      title: "Students",
      route: "/students",
    },
    {
      icon: "checkbox-outline",
      title: "Attendance",
      route: "/attendance",
    },
    {
      icon: "card-outline",
      title: "Payments",
      route: "/payments",
    },
    {
      icon: "radio-button-on-outline",
      title: "Age Groups",
      route: "/agegroups",
    },
    {
      icon: "calendar-outline",
      title: "Sessions",
      route: "/sessions",
    },
    {
      icon: "stats-chart-outline",
      title: "Reports",
      route: "/reports",
    },
    {
      icon: "settings-outline",
      title: "Settings",
      route: "/settings",
    },
  ];

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

            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.drawerItem}
                onPress={() => navigateTo(item.route)}
              >
                <Ionicons name={item.icon as any} size={24} color="#64748B" />

                <Text style={styles.drawerText}>{item.title}</Text>
              </TouchableOpacity>
            ))}

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
    alignItems: "center",
    paddingVertical: 15,
  },

  drawerText: {
    marginLeft: 18,
    fontSize: 18,
    color: "#111827",
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
