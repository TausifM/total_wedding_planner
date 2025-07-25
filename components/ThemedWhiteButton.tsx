import { Ionicons } from "@expo/vector-icons";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors, Fonts } from "../constants/Themes"; // Adjust the path as needed

type ThemedWhiteButtonProps = {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  iconName?: React.ComponentProps<typeof Ionicons>["name"];
  marginRight?: number;
};

const ThemedWhiteButton: React.FC<ThemedWhiteButtonProps> = ({
  label,
  onPress,
  iconName = "arrow-forward",
  marginRight = 0,
}) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={onPress} style={styles.fullButton}>
        <View style={styles.buttonContent}>
          <Text style={[styles.buttonLabel, { marginRight }]}>{label}</Text>
          <View style={styles.iconContainer}>
            <Ionicons name={iconName} size={24} color={Colors.textDark} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ThemedWhiteButton;
const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
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
    backgroundColor: "#fff", // White background
    borderRadius: 14,
    paddingHorizontal: 5,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
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
    color: Colors.textDark, // Dark text
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
