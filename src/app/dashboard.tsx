import { Ionicons } from "@expo/vector-icons";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function Dashboard() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logo}>
          <Ionicons name="radio-button-on" size={24} color="#fff" />
        </View>

        <TouchableOpacity>
          <Ionicons name="menu" size={28} color="#222" />
        </TouchableOpacity>
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.title}>Welcome back, shara</Text>
        <Text style={styles.subtitle}>
          You are logged in as <Text style={styles.bold}>Administrator</Text>
        </Text>
      </View>

      {/* Cards */}
      <View style={styles.card}>
        <View>
          <Text style={styles.cardTitle}>Total Students</Text>
          <Text style={styles.cardNumber}>2</Text>
        </View>

        <View style={styles.iconBox}>
          <Ionicons name="people-outline" size={24} color="#000" />
        </View>
      </View>

      <View style={styles.card}>
        <View>
          <Text style={styles.cardTitle}>Age Groups</Text>
          <Text style={styles.cardNumber}>5</Text>
        </View>

        <View style={[styles.iconBox, { backgroundColor: "#DDF8E8" }]}>
          <Ionicons name="radio-button-on-outline" size={24} color="green" />
        </View>
      </View>

      <View style={styles.card}>
        <View>
          <Text style={styles.cardTitle}>Practice Sessions</Text>
          <Text style={styles.cardNumber}>2</Text>
        </View>

        <View style={[styles.iconBox, { backgroundColor: "#F3E8FF" }]}>
          <Ionicons name="calendar-outline" size={24} color="#000" />
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    padding: 20,
  },

  header: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    width: 50,
    height: 50,
    backgroundColor: "#2563EB",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  welcomeSection: {
    marginTop: 30,
    marginBottom: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#001B4D",
  },

  subtitle: {
    marginTop: 8,
    fontSize: 18,
    color: "#666",
  },

  bold: {
    fontWeight: "700",
    color: "#000",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 15,
  },

  cardNumber: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#001B4D",
  },

  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
  },
});
