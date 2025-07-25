import BackHeader from "@/components/BackHeader";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import ServiceDetailsSmallImageCard from "@/components/ServiceDetailsSmallImageCard";
import ThemedButton from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
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
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [eventDate, setEventDate] = useState<Date | null>(null);
  const route = useRouter();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#FEF4EA", dark: "#353636" }}
      headerImage={
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
      }
    >
      <ThemedView style={styles.container}>
        <>
        <ThemedText type="subtitle">Dream Palace</ThemedText>
          {/* Info Block */}
          <View style={styles.ratingContainer}>
            <View style={styles.rowBetween}>
              {/* Rating Button */}
              <TouchableOpacity style={styles.purpleButton}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.purpleButtonText}>{rating}</Text>
              </TouchableOpacity>

              {/* Time Button */}
              <TouchableOpacity style={styles.whiteButton}>
                <Text style={styles.whiteButtonText}>{time}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.row}
          >
            <Text style={styles.time}>
              {eventDate ? eventDate.toDateString() : time}
            </Text>
          </TouchableOpacity> */}
          {showDatePicker && (
            <DateTimePicker
              value={eventDate ?? new Date()}
              mode="date"
              display="inline" // Better for styling on iOS
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setEventDate(selectedDate);
              }}
              themeVariant="light" // Use light theme for better visibility
              style={{ backgroundColor: "purple" }} // Ensure background is white
            />
          )}
          {/* Description */}
          <View style={styles.section}>
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
          <ServiceDetailsSmallImageCard />
          <ServiceDetailsSmallImageCard />

          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            <ThemedButton
              label="Add to cart"
              onPress={() => route.push("/BudgetPlannerScreen")}
              iconName="cart"
            />
          </View>
        </>
      </ThemedView>
    </ParallaxScrollView>
  );
};

export default ServiceDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FEF4EA",
    paddingHorizontal: 10
  },
  imageWrapper: {
    position: "relative",
    top: 10,
    backgroundColor: '#ee5011ff',
  },
  heroImage: {
    width: "100%",
    height: 300,
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
  ratingContainer: {
    marginVertical: 5,
    alignItems: "center",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%", // Controls the outer width
    gap: 10, // Or marginRight if not using RN 0.71+
  },
  purpleButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "#C07D7D",
    borderRadius: 10,
  },
  purpleButtonText: {
    color: "#fff",
    fontFamily: "Poppins-Bold",
    fontSize: 14,
    marginLeft: 6,
  },
  whiteButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#C07D7D",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  whiteButtonText: {
    color: "#C07D7D",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  infoContainer: {
    backgroundColor: "#FEF4EA",
    // marginTop: -20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  title: {
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    color: "#2A1524",
    marginBottom: 8,
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
