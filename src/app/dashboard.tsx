import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");

      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const quickActions = [
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

        {/* Welcome */}

        <View style={styles.welcomeSection}>
          <Text style={styles.title}>
            Welcome back, {user?.full_name || "User"}
          </Text>

          <Text style={styles.subtitle}>
            You are logged in as{" "}
            <Text style={styles.bold}>{user?.role || "Administrator"}</Text>
          </Text>
        </View>

        {/* Cards */}

        <View style={styles.card}>
          <View>
            <Text style={styles.cardTitle}>Total Students</Text>

            <Text style={styles.cardNumber}>2</Text>
          </View>

          <View style={styles.iconBox}>
            <Ionicons name="people-outline" size={24} color="#2563EB" />
          </View>
        </View>

        <View style={styles.card}>
          <View>
            <Text style={styles.cardTitle}>Age Groups</Text>

            <Text style={styles.cardNumber}>5</Text>
          </View>

          <View style={[styles.iconBox, { backgroundColor: "#E7FFF0" }]}>
            <Ionicons name="radio-button-on-outline" size={24} color="green" />
          </View>
        </View>

        <View style={styles.card}>
          <View>
            <Text style={styles.cardTitle}>Practice Sessions</Text>

            <Text style={styles.cardNumber}>2</Text>
          </View>

          <View style={[styles.iconBox, { backgroundColor: "#F4EBFF" }]}>
            <Ionicons name="calendar-outline" size={24} color="#6D28D9" />
          </View>
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
                <Text style={styles.drawerName}>{user?.full_name}</Text>

                <Text style={styles.drawerRole}>{user?.role}</Text>
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
                onPress={() => {
                  setDrawerVisible(false);
                  router.push(item.route as any);
                }}
              >
                <Ionicons name={item.icon as any} size={24} color="#64748B" />

                <Text style={styles.drawerText}>{item.title}</Text>
              </TouchableOpacity>
            ))}

            <View style={styles.line} />

            <TouchableOpacity style={styles.logoutBtn}>
              <Ionicons name="log-out-outline" size={24} />

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
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
  },

  subtitle: {
    color: "#666",
    marginTop: 5,
  },

  bold: {
    fontWeight: "700",
  },

  card: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cardTitle: {
    color: "#68738D",
  },

  cardNumber: {
    fontSize: 40,
    fontWeight: "bold",
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
  },

  drawerName: {
    fontSize: 28,
    fontWeight: "700",
  },

  drawerRole: {
    color: "#64748B",
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
  },
});
