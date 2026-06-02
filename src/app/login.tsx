import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login:", username, password);

    // Navigate after successful login
    // router.replace("/home");
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.card}>
        <ThemedText style={styles.title}>Welcome back</ThemedText>

        <ThemedText style={styles.subtitle}>
          Sign in to manage your academy
        </ThemedText>

        <ThemedText style={styles.label}>Username</ThemedText>
        <TextInput
          placeholder="admin"
          placeholderTextColor="#94A3B8"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <ThemedText style={styles.label}>Password</ThemedText>
        <TextInput
          placeholder="••••••••"
          placeholderTextColor="#94A3B8"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <ThemedText style={styles.buttonText}>Sign In</ThemedText>
        </TouchableOpacity>

        <View style={styles.footer}>
          <ThemedText style={styles.footerText}>
            Don't have an account?
          </ThemedText>

          <TouchableOpacity onPress={() => router.push("/register")}>
            <ThemedText style={styles.registerText}> Register here</ThemedText>
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
    textAlign: "center",
    color: "#64748B",
    marginBottom: 35,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 8,
    marginTop: 8,
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
    fontSize: 14,
    color: "#64748B",
  },

  registerText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2563EB",
  },
});
