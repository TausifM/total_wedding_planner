import { Ionicons } from "@expo/vector-icons";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import HamburgerHeader from "./HamburgerHeader";

type Props = {
  title?: string;
  show?: boolean;
  showProfile?: boolean;
  onProfilePress?: () => void;
  menuVisible: boolean;
  onMenuPress: () => void;
  onMenuClose: () => void;
};

const AppHeader: React.FC<Props> = ({
  title = "Wedding Planner",
  show = true,
  showProfile = true,
  onProfilePress,
  onMenuPress,
}) => {
  if (!show) return null;

  return (
    <>
      <View style={styles.navBar}>
        <HamburgerHeader onPress={onMenuPress} />
        <Text style={styles.navTitle} numberOfLines={1}>
          {title}
        </Text>
        {showProfile ? (
          <TouchableOpacity onPress={onProfilePress}>
            <Ionicons name="person-circle-outline" size={28} color="#333" />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 28 }} /> // keep layout balance
        )}
      </View>
    </>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "ios" ? 60 : 30,
    paddingBottom: 10,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  navTitle: {
    fontSize: 18,
    fontFamily: "Playfair-Bold",
    color: "#130057",
    flex: 1,
    textAlign: "center",
    marginHorizontal: 12,
  },
});
