import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

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
      console.log("Error loading user:", error);
    }
  };

  const quickActions = [
    {
      title: "Manage Students",
      icon: "people-outline",
    },
    {
      title: "Age Groups",
      icon: "radio-button-on-outline",
    },
    {
      title: "Practice Sessions",
      icon: "calendar-outline",
    },
    {
      title: "Settings",
      icon: "settings-outline",
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}

      <View style={styles.header}>
        <View style={styles.logo}>
          <Ionicons name="radio-button-on" size={24} color="#fff" />
        </View>

        <TouchableOpacity>
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

      {/* Total Students */}

      <View style={styles.card}>
        <View>
          <Text style={styles.cardTitle}>Total Students</Text>

          <Text style={styles.cardNumber}>2</Text>
        </View>

        <View style={styles.iconBox}>
          <Ionicons name="people-outline" size={24} color="#2563EB" />
        </View>
      </View>

      {/* Age Groups */}

      <View style={styles.card}>
        <View>
          <Text style={styles.cardTitle}>Age Groups</Text>

          <Text style={styles.cardNumber}>5</Text>
        </View>

        <View style={[styles.iconBox, { backgroundColor: "#E7FFF0" }]}>
          <Ionicons name="radio-button-on-outline" size={24} color="green" />
        </View>
      </View>

      {/* Practice Sessions */}

      <View style={styles.card}>
        <View>
          <Text style={styles.cardTitle}>Practice Sessions</Text>

          <Text style={styles.cardNumber}>2</Text>
        </View>

        <View style={[styles.iconBox, { backgroundColor: "#F4EBFF" }]}>
          <Ionicons name="calendar-outline" size={24} color="#6D28D9" />
        </View>
      </View>

      {/* Team Members */}

      <View style={styles.card}>
        <View>
          <Text style={styles.cardTitle}>Team Members</Text>

          <Text style={styles.cardNumber}>4</Text>
        </View>

        <View style={[styles.iconBox, { backgroundColor: "#FFF3EA" }]}>
          <Ionicons name="people-outline" size={24} color="#111" />
        </View>
      </View>

      {/* Quick Actions */}

      <Text style={styles.quickTitle}>Quick Actions</Text>

      {quickActions.map((item, index) => (
        <TouchableOpacity key={index} style={styles.actionCard}>
          <View style={styles.actionLeft}>
            <View style={styles.smallIcon}>
              <Ionicons name={item.icon as any} size={22} color="#2563EB" />
            </View>

            <Text style={styles.actionText}>{item.title}</Text>
          </View>

          <Ionicons name="arrow-forward-outline" size={22} color="#B7B7B7" />
        </TouchableOpacity>
      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
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

    elevation: 5,
  },

  welcomeSection: {
    marginBottom: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#001B4D",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 16,
    color: "#666",
  },

  bold: {
    fontWeight: "700",
    color: "#000",
  },

  card: {
    backgroundColor: "#fff",

    borderRadius: 20,
    padding: 28,

    marginBottom: 20,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",

    elevation: 3,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },

  cardTitle: {
    fontSize: 16,
    color: "#68738D",
    marginBottom: 20,
  },

  cardNumber: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#001B4D",
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
    marginTop: 15,
    marginBottom: 20,
    color: "#000",
  },

  actionCard: {
    backgroundColor: "#fff",

    padding: 25,

    borderRadius: 18,

    marginBottom: 18,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    elevation: 2,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },

  actionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  smallIcon: {
    width: 42,
    height: 42,

    borderRadius: 12,

    backgroundColor: "#EEF2FF",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 15,
  },

  actionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },
});
