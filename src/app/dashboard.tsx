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
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

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

  const toggleMenu = (menuTitle: string) => {
    if (expandedMenu === menuTitle) {
      setExpandedMenu(null);
    } else {
      setExpandedMenu(menuTitle);
    }
  };

  const quickActions = [
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

        {/* Payment Cards Section */}
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

            <ScrollView showsVerticalScrollIndicator={false}>
              {menuItems.map((item, index) => renderDrawerItem(item, index))}
            </ScrollView>

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
    marginTop: 10,
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

  // Payment Card Styles
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
  },
});