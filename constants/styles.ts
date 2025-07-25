import { StyleSheet } from "react-native";
import { Colors, Fonts, Spacing } from "./Themes";

export const GlobalStyles = StyleSheet.create({
  input: {
    backgroundColor: Colors.inputBackground,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: "#333",
  },
    label: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    marginBottom: 2,
    color: Colors.primary,
  },
  heading: {
    fontFamily: Fonts.heading,
    fontSize: 24,
    textAlign: "center",
    marginBottom: Spacing.md,
    color: Colors.primary,
  },
  errorText: {
    fontSize: 12,
    color: Colors.error,
    marginBottom: 4,
    marginLeft: 4,
    fontFamily: Fonts.regular,
  },
  buttonLabel: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.textLight,
  },
});
