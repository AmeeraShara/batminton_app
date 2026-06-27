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
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateMobile = (phone: string) => /^07\d{8}$/.test(phone);

  const handleRegister = async () => {
    try {
      if (!name || !mobile || !email || !password || !confirmPassword) {
        Alert.alert("Error", "Please fill all required fields");
        return;
      }

      if (!validateMobile(mobile)) {
        Alert.alert(
          "Invalid Mobile",
          "Mobile must start with 07 and be 10 digits",
        );
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert("Error", "Passwords do not match");
        return;
      }

      const response = await axios.post(
        "http://10.217.168.182:5000/api/auth/register",
        {
          name,
          role: "administrator",
          mobile,
          email,
          password,
        },
      );

      Alert.alert("Success", response.data.message);

      setName("");
      setMobile("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      router.replace("/login");
    } catch (error: any) {
      Alert.alert(
        "Registration Failed",
        error?.response?.data?.message || "Something went wrong",
      );
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.card}>
        <ThemedText style={styles.title}>Create Account</ThemedText>

        <ThemedText style={styles.subtitle}>
          Join the academy management team
        </ThemedText>

        {/* NAME */}
        <ThemedText style={styles.label}>Full Name</ThemedText>
        <TextInput
          placeholder="John Doe"
          placeholderTextColor="#94A3B8"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        {/* MOBILE */}
        <ThemedText style={styles.label}>Mobile</ThemedText>
        <TextInput
          placeholder="0771234567"
          placeholderTextColor="#94A3B8"
          keyboardType="phone-pad"
          maxLength={10}
          style={styles.input}
          value={mobile}
          onChangeText={setMobile}
        />

        {/* EMAIL */}
        <ThemedText style={styles.label}>Email</ThemedText>
        <TextInput
          placeholder="email@example.com"
          placeholderTextColor="#94A3B8"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        {/* PASSWORD */}
        <ThemedText style={styles.label}>Password</ThemedText>
        <TextInput
          placeholder="••••••••"
          placeholderTextColor="#94A3B8"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        {/* CONFIRM PASSWORD */}
        <ThemedText style={styles.label}>Confirm Password</ThemedText>
        <TextInput
          placeholder="••••••••"
          placeholderTextColor="#94A3B8"
          secureTextEntry
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {/* BUTTON */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <ThemedText style={styles.buttonText}>Register</ThemedText>
        </TouchableOpacity>

        {/* FOOTER */}
        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>
            Already have an account?
          </ThemedText>

          <TouchableOpacity onPress={() => router.push("/login")}>
            <ThemedText style={styles.registerText}> Sign in</ThemedText>
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
    maxWidth: 450,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingHorizontal: 30,
    paddingVertical: 40,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },

  title: {
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    color: "#0F172A",
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#64748B",
    marginBottom: 15,
  },

  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 2,
    marginTop: 4,
  },

  input: {
    height: 30,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    backgroundColor: "#FFFFFF",
    marginBottom: 6,
    color: "#0F172A",
  },

  button: {
    height: 45,
    backgroundColor: "#2563EB",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },

  footerText: {
    fontSize: 14,
    color: "#64748B",
  },

  registerText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2563EB",
  },
});
