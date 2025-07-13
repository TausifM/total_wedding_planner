import ThemedButton from "@/components/ThemedButton";
import ThemedInput from "@/components/ThemedInput";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Card, Text } from "react-native-paper";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <LinearGradient
      colors={["#8A003B", "#67002B", "#49001D", "#46011D"]}
      style={styles.gradient}
    >
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Card style={styles.card}>
          <Text style={styles.heading}>Welcome Back</Text>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={(values) => {
              console.log("Logging in:", values);
              router.replace("/home");
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <>
                <ThemedInput
                
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  error={errors.email}
                  touched={touched.email}
                />

                <ThemedInput
                  placeholder="Enter your password"
                  secureTextEntry={!showPassword}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  error={errors.password}
                  touched={touched.password}
                  rightIcon={{
                    name: showPassword ? "eye-off" : "eye",
                    onPress: () => setShowPassword(!showPassword),
                  }}
                />

                <ThemedButton onPress={handleSubmit as any} label="Log In" />

                <Text style={styles.link}>
                  Don’t have an account?{" "}
                  <Text
                    style={styles.linkHighlight}
                    onPress={() => router.push("/signup")}
                  >
                    Sign up
                  </Text>
                </Text>
              </>
            )}
          </Formik>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  card: {
    padding: 24,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    elevation: 5,
  },
  heading: {
    fontFamily: "Montserrat-Bold",
    fontSize: 28,
    marginBottom: 20,
    textAlign: "center",
    color: "#7A3E3E",
  },
  input: {
    marginBottom: 14,
    fontFamily: "Montserrat-Regular",
  },
  button: {
    marginTop: 12,
    borderRadius: 12,
    backgroundColor: "#7A3E3E",
  },
  link: {
    marginTop: 16,
    textAlign: "center",
    fontFamily: "Montserrat-Regular",
    color: "#444",
  },
  linkHighlight: {
    color: "#7A3E3E",
    fontFamily: "Poppins-Bold",
  },
  error: {
    fontSize: 12,
    color: "#EF4444",
    marginLeft: 4,
    marginBottom: 4,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    top: 20,
  },
});
