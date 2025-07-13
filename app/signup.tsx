import ThemedButton from "@/components/ThemedButton";
import ThemedInput from "@/components/ThemedInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TextInput as RNTextInput,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Text } from "react-native-paper";
//import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(2).required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobile: Yup.string()
    .matches(/^\d{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  password: Yup.string().min(6).required("Password is required"),
});

export default function Signup() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  //const insets = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={["#8A003B", "#67002B", "#49001D", "#46011D"]}
      style={styles.gradient}
    >
      {/* <TouchableOpacity
        onPress={() => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace("/(tabs)"); // or your home screen fallback
          }
        }}
        style={[styles.backButton, { top: insets.top }]}
      >
        <Ionicons name="chevron-back" size={18} color="#4B2B30" />
        <Text style={styles.backButtonText}>Sign Up</Text>
      </TouchableOpacity> */}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll}>
          {/* Custom Header */}

          {/* Card */}
          <View style={styles.card}>
            <Text style={styles.heading}>Create Your Account</Text>

            <Formik
              initialValues={{ name: "", email: "", mobile: "", password: "" }}
              validationSchema={SignupSchema}
              onSubmit={(values) => {
                console.log(values);
                router.push("/login");
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
                    placeholder="Full Name"
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                    error={errors.name}
                    touched={touched.name}
                  />
                  <ThemedInput
                    keyboardType="email-address"
                    placeholder="Email Address"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    error={errors.email}
                    touched={touched.email}
                  />
                  <ThemedInput
                    keyboardType="phone-pad"
                    placeholder="Mobile Number"
                    onChangeText={handleChange("mobile")}
                    onBlur={handleBlur("mobile")}
                    value={values.mobile}
                    error={errors.mobile}
                    touched={touched.mobile}
                  />
                  <View style={styles.passwordContainer}>
                    <RNTextInput
                      placeholder="Password"
                      style={[styles.input, { flex: 1, marginBottom: 0 }]}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      secureTextEntry={!showPassword}
                      placeholderTextColor="#999"
                    />
                    <MaterialCommunityIcons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={24}
                      color="#777"
                      onPress={() => setShowPassword((prev) => !prev)}
                      style={styles.eyeIcon}
                    />
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.error}>{errors.password}</Text>
                  )}
                  <ThemedButton
                    label="Sign Up"
                    onPress={() => handleSubmit()}
                  />

                  {/* Link to Login */}

                  <Text style={styles.link}>
                    Already have an account?{" "}
                    <Text
                      style={styles.linkBold}
                      onPress={() => router.push("/login")}
                    >
                      Login
                    </Text>
                  </Text>
                </>
              )}
            </Formik>
          </View>
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
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    left: 20,
    top: 20,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    padding: 10,
    borderRadius: 16,
  },
  backButtonText: {
    fontSize: 14,
    marginLeft: 6,
    color: "#4B2B30",
    fontFamily: "Poppins-Regular",
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },
  navHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.85)",
    padding: 10,
    borderRadius: 16,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  backBtn: {
    marginRight: 6,
  },
  navTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2E2E2E",
    fontFamily: "Poppins-Regular",
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 40,
    padding: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 15,
  },
  heading: {
    fontFamily: "Montserrat-Bold",
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#5C0B2E",
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#9c2657ff",
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 16,
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#333",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    marginBottom: 16,
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 2,
    borderRadius: 50,
    overflow: "hidden",
    marginTop: 12,
  },
  button: {
    backgroundColor: "transparent",
    borderRadius: 14,
    elevation: 0,
  },

  link: {
    marginTop: 18,
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    fontFamily: "Poppins-Regular",
  },
  linkBold: {
    color: "#7A3E3E",
    fontFamily: "Poppins-Bold",
    fontWeight: "600",
  },
  error: {
    fontSize: 12,
    color: "#EF4444",
    marginBottom: 8,
    marginLeft: 4,
    fontFamily: "Poppins-Regular",
  },
});
