import axios from "axios";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    try {
      if (
        !fullName.trim() ||
        !mobile.trim() ||
        !password.trim() ||
        !confirmPassword.trim()
      ) {
        Alert.alert("Error", "Please fill all required fields");
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert("Error", "Passwords do not match");
        return;
      }

      const response = await axios.post(
        "http://192.168.100.169:5000/api/auth/register",
        {
          full_name: fullName,
          mobile: mobile,
          email: email,
          password: password,
        },
      );

      Alert.alert("Success", response.data.message);

      setFullName("");
      setMobile("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      router.replace("/login");
    } catch (error) {
      console.log("Register Error:", error);

      Alert.alert(
        "Registration Failed",
        error?.response?.data?.message || "Something went wrong",
      );
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.card}>
        <ThemedText style={styles.title}>Create an account</ThemedText>

        <ThemedText style={styles.subtitle}>
          Join the academy management team
        </ThemedText>

        <ThemedText style={styles.label}>Full Name</ThemedText>

        <TextInput
          placeholder="John Doe"
          placeholderTextColor="#94A3B8"
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
        />

        <ThemedText style={styles.label}>Mobile Number</ThemedText>

        <TextInput
          placeholder="0771234567"
          placeholderTextColor="#94A3B8"
          keyboardType="phone-pad"
          style={styles.input}
          value={mobile}
          onChangeText={setMobile}
        />

        <ThemedText style={styles.label}>
          Email Address
          <ThemedText style={styles.optional}> (Optional)</ThemedText>
        </ThemedText>

        <TextInput
          placeholder="email@example.com"
          placeholderTextColor="#94A3B8"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <ThemedText style={styles.label}>Password</ThemedText>

        <TextInput
          placeholder="••••••••"
          placeholderTextColor="#94A3B8"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <ThemedText style={styles.label}>Confirm Password</ThemedText>

        <TextInput
          placeholder="••••••••"
          placeholderTextColor="#94A3B8"
          secureTextEntry
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <ThemedText style={styles.buttonText}>Register</ThemedText>
        </TouchableOpacity>

        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>
            Already have an account?
          </ThemedText>

          <TouchableOpacity onPress={() => router.push("/login")}>
            <ThemedText style={styles.linkText}> Sign in</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  card: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingHorizontal: 28,
    paddingVertical: 40,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    textAlign: "center",
    color: "#0F172A",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 35,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 8,
    marginTop: 8,
  },

  optional: {
    color: "#94A3B8",
    fontSize: 15,
  },

  input: {
    height: 58,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
    color: "#0F172A",
  },

  button: {
    height: 58,
    backgroundColor: "#2563EB",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
    paddingTop: 25,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },

  footerText: {
    color: "#64748B",
    fontSize: 14,
  },

  linkText: {
    color: "#2563EB",
    fontSize: 14,
    fontWeight: "700",
  },
});
