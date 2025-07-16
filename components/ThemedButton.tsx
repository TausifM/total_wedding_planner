import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors, Fonts } from "../constants/Themes"; // Adjust the import path as necessary

type ThemedButtonProps = {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  iconName?: React.ComponentProps<typeof Ionicons>["name"]; // Use Ionicons supported icon names
  marginRight?: number; // Optional prop for right margin
};

const ThemedButton: React.FC<ThemedButtonProps> = ({ label, onPress, iconName ="arrow-forward", marginRight = 0 }) => {
  return (
    <LinearGradient
      colors={[Colors.primary, Colors.secondary, Colors.dark, Colors.darkest]}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0}}
      style={styles.wrapper}
    >
      <TouchableOpacity onPress={onPress} style={styles.fullButton}>
        <View style={styles.buttonContent}>
          <Text style={[styles.buttonLabel, { marginRight }]}>
            {label}</Text>
          <View style={styles.iconContainer}>
            <Ionicons
              name={iconName}
              size={24}
              color={Colors.textDark}
            />
          </View>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default ThemedButton;

const styles = StyleSheet.create({
  wrapper: {
     display: "flex",
    justifyContent: 'space-between',
    alignItems: "center",
    padding: 2,
    borderRadius: 50,
    overflow: "hidden",
    marginTop: 12,
  },
  fullButton: {
     width: "100%",
  height: 55,
  justifyContent: "center",
  borderRadius: 14,
  overflow: "hidden",
  paddingHorizontal: 5,
  paddingVertical: 5,
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
  buttonLabel: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.textLight,
    marginLeft: 12,
  },
  iconContainer: {
    backgroundColor: Colors.accent,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});
