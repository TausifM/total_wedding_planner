import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type BigImageCardProps = {
  image: any;
  name: string;
  rating: string;
  deliveryTime: string;
  deliveryType: string;
  unavailableDates?: string[];
};

const BigImageCard: React.FC<BigImageCardProps> = ({
  image,
  name,
  rating,
  deliveryTime,
  deliveryType,
  unavailableDates = [],
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.cardImage} />

        {/* Category Tag */}
        <LinearGradient
          colors={["#A10042", "#63002C"]}
          style={styles.deliveryTag}
        >
          <Text style={styles.deliveryText}>{deliveryType}</Text>
        </LinearGradient>

        {/* Bookmark */}
        <TouchableOpacity style={styles.bookmarkIcon}>
          <LinearGradient
            colors={["#A10042", "#49001D"]}
            style={{ borderRadius: 50, padding: 6 }}
          >
            <Ionicons name="bookmark-outline" size={22} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.cardContent}>
        <Text style={styles.restaurantName}>{name}</Text>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{rating}</Text>
          <Text style={styles.deliveryTimeText}>{deliveryTime}</Text>
        </View>

        {/* Unavailable Dates */}
        {unavailableDates.length > 0 && (
          <View style={styles.unavailableContainer}>
            <Text style={styles.unavailableLabel}>Unavailable:</Text>
            <Text style={styles.unavailableDates}>
              {unavailableDates.join(", ")}
            </Text>
          </View>
        )}

        {/* Bottom Icons */}
        <View style={styles.bottomRow}>
          <View style={styles.iconButtons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="person-outline" size={20} color="#999" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="push-outline" size={20} color="#999" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BigImageCard;
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 24,
    width: "100%",
  },
  imageContainer: {
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  deliveryTag: {
    position: "absolute",
    top: 12,
    left: 12,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  deliveryText: {
    color: "#fff",
    fontFamily: "Poppins-Bold",
    fontSize: 12,
  },
  bookmarkIcon: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
  },
  cardContent: {
    padding: 16,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2c2c2c",
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  ratingText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    marginRight: 12,
  },
  deliveryTimeText: {
    fontSize: 14,
    color: "#888",
    fontWeight: "500",
  },
  unavailableContainer: {
    backgroundColor: "#FFF5F5",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  unavailableLabel: {
    fontWeight: "600",
    fontSize: 13,
    color: "#B00020",
    marginBottom: 2,
  },
  unavailableDates: {
    fontSize: 13,
    color: "#B00020",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginRight: 16,
  },
});
