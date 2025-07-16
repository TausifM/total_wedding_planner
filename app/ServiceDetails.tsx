import BackHeader from "@/components/BackHeader";
import CalendarModal from "@/components/CalendarModal";
import ServiceDetailsSmallImageCard from "@/components/ServiceDetailsSmallImageCard";
import ThemedButton from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import ThemedWhiteButton from "@/components/ThemedWhiteButton";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width: screenWidth } = Dimensions.get("window");

const images = [
  require("../assets/images/unnamed.jpg"),
  require("../assets/images/unnamed.jpg"),
  require("../assets/images/unnamed.jpg"),
];

const ServiceDetails = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const params = useLocalSearchParams();
  const {
    image,
    title = "Dream Palace Venue",
    rating = "4.9",
    price = "Starting from $5,000",
    time = "Available in Oct",
  } = params;
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const route = useRouter();
  const markedDates = {
    "2025-10-10": { marked: true, dotColor: "green" },
    "2025-10-12": { marked: true, dotColor: "red", disabled: true },
    "2025-10-15": { selected: true, selectedColor: "#4CAF50" },
    // More can be added
  };
  return (
    <View style={styles.container}>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        {/* Hero Carousel */}
        <View style={styles.imageWrapper}>
          <Carousel
            loop
            width={screenWidth}
            height={260}
            autoPlay
            data={images}
            scrollAnimationDuration={1000}
            renderItem={({ item }: { item: number }) => (
              <Image source={item} style={styles.heroImage} />
            )}
          />
          <BackHeader />
          <TouchableOpacity style={styles.bookmarkIcon}>
            <Ionicons name="heart-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <Animated.View
          style={{
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 300],
                  outputRange: [0, -50], // Moves upward as you scroll
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
        >
          {/* Info Block */}
          <TouchableOpacity
            onPress={() => setCalendarVisible(true)}
            style={styles.row}
          >
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{rating}</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.time}>{selectedDate || time}</Text>
          </TouchableOpacity>

          {/* Description */}
          <View style={styles.section}>
            <ThemedText type="subtitle">Dream Palace</ThemedText>
            <Text style={styles.description}>
              Experience a fairy-tale venue tailored for your dream wedding. Our
              team ensures perfection with every detail from décor to lighting.
              Rated one of the top venues in your city.
            </Text>
          </View>

          {/* Tags */}
          <View style={styles.tagContainer}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Venue</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Luxury</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Indoor</Text>
            </View>
          </View>
          <ServiceDetailsSmallImageCard />

          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            <ThemedWhiteButton
              label="Contact Venue"
              onPress={() => console.log("Contact Venue Pressed")}
              iconName="chatbubble-ellipses-outline"
            />
            <ThemedButton
              label="Book Now"
              onPress={() => route.push("/BudgetPlannerScreen")}
              iconName="cart"
            />
          </View>
        </Animated.View>
            <CalendarModal
        isVisible={isCalendarVisible}
        onClose={() => setCalendarVisible(false)}
        onDateSelect={(date) => setSelectedDate(date)}
        markedDates={markedDates}
      />
      </Animated.ScrollView>
    </View>
  );
};

export default ServiceDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF4EA",
  },
  imageWrapper: {
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: 260,
    resizeMode: "cover",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  bookmarkIcon: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: 20,
    zIndex: 10,
  },
  infoContainer: {
    backgroundColor: "#FEF4EA",
    padding: 20,
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    color: "#2A1524",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    color: "#423840",
    marginLeft: 4,
  },
  dot: {
    marginHorizontal: 6,
    fontSize: 14,
    color: "#423840",
  },
  time: {
    fontSize: 14,
    color: "#423840",
  },
  price: {
    backgroundColor: "#FCD8B6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
    textAlign: "center",
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
    fontWeight: "800",
    color: "#2A1524",
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#2A1524",
    fontWeight: "600",
    marginBottom: 6,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#423840",
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    marginTop: 12,
  },
  tag: {
    backgroundColor: "#f1f1f1",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  tagText: {
    fontSize: 13,
    color: "#555",
  },
  buttonsContainer: {
    margin: 10,
    gap: 12,
  },
});
