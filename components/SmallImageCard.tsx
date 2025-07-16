import { Ionicons } from "@expo/vector-icons";
import {
    Image,
    ImageSourcePropType,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type SmallImageCardProps = {
  image: ImageSourcePropType;
  title: string;
  subtitle?: string;
  onPress?: () => void;
};

const SmallImageCard: React.FC<SmallImageCardProps> = ({
  image,
  title,
  subtitle,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image source={image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text style={styles.subtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        )}
      </View>
      <Ionicons name="chevron-forward" size={16} color="#A0A0A0" />
    </TouchableOpacity>
  );
};

export default SmallImageCard;
const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: 180,
    height: 150,
    borderRadius: 12,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Poppins-Bold",
    color: "#1F1F1F", // Deep gray, modern text color
  },
  subtitle: {
    fontSize: 13,
    color: "#888", // Subtle muted text
    marginTop: 2,
  },
});
