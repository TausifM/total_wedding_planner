import { BackHeaderCommon } from "@/components/BackHeaderCommon";
import ThemedButton from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useLocation } from "@/context/LocationContext";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// List of some sample cities in India
const indianCities = [
  "New Delhi",
  "Mumbai",
  "Pune",
  "Nagpur",
  // "Chennai",
  // "Bangalore",
  // "Hyderabad",
  // "Kolkata",
  // "Ahmedabad",
  // "Jaipur",
  // "Lucknow",
];

const LocationScreen = () => {
  const [notDecided, setNotDecided] = useState(false);
  const [selectedCity, setSelectedCity] = useState("New Delhi");
  const { setLocation } = useLocation();
  const [region, setRegion] = useState<Region>({
    latitude: 28.6139, // Default: New Delhi
    longitude: 77.209,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 28.6139,
    longitude: 77.209,
  });

  const handleMapPress = (event: any) => {
    setSelectedLocation(event.nativeEvent.coordinate);
  };

  // Function to get coordinates using OpenStreetMap
  const geocodeCity = async (city: string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          city + ", India"
        )}`,
        {
          headers: {
            "User-Agent":
              "total_wedding_planner-app/1.0 (innovativeitdcorporation@gmail.com)",
            Accept: "application/json",
          },
        }
      );

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();

        if (data.length > 0) {
          const { lat, lon } = data[0];
          const latitude = parseFloat(lat);
          const longitude = parseFloat(lon);

          setSelectedLocation({ latitude, longitude });
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        } else {
          alert("City not found.");
        }
      } else {
        throw new Error("Invalid content type: Expected JSON.");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Geocoding failed:", error.message);
      } else {
        console.error("Geocoding failed:", error);
      }
      alert("Geocoding failed. Check your internet or try again.");
    }
  };

  // Re-geocode when city is changed
  useEffect(() => {
    geocodeCity(selectedCity);
    setLocation({
      city: selectedCity,
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
    });
  }, [selectedCity, selectedLocation, setLocation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <View style={styles.headerRow}>
          <BackHeaderCommon />
          <ThemedText type="subtitle">Location</ThemedText>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          style={{ marginTop: 14 }}
        >
          <ThemedText type="buttonLabel" style={styles.subTitle}>
            Please tell us where you live and where your wedding is
          </ThemedText>

          <ThemedText type="defaultSemiBold" style={styles.sectionLabel}>
            We’re living in
          </ThemedText>

          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedCity}
              onValueChange={(itemValue) => setSelectedCity(itemValue)}
            >
              {indianCities.map((city) => (
                <Picker.Item label={city} value={city} key={city} />
              ))}
            </Picker>
          </View>

          <ThemedText type="defaultSemiBold" style={styles.sectionLabel}>
            Where we’re getting married
          </ThemedText>

          <MapView
            style={styles.map}
            region={region}
            onRegionChangeComplete={(reg) => setRegion(reg)}
            onPress={handleMapPress}
          >
            <Marker coordinate={selectedLocation} />
          </MapView>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setNotDecided(!notDecided)}
          >
            <Ionicons
              name={notDecided ? "radio-button-on" : "radio-button-off"}
              size={20}
              color="#999"
              style={{ marginRight: 8 }}
            />
            <ThemedText type="defaultSemiBold">
              We haven’t decided yet
            </ThemedText>
          </TouchableOpacity>

          <ThemedText style={styles.infoText}>
            Don’t worry, you can always update this information later.
          </ThemedText>

          <ThemedButton
            label="Next"
            // style={styles.button}
            onPress={() => alert("Next pressed")}
          />
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF8F5",
  },
  container: { flex: 1, backgroundColor: "#FFF8F5" },
  scroll: { padding: 20 },
  subTitle: { fontSize: 16, color: "#555", marginBottom: 10 },
  sectionLabel: { fontWeight: "600", marginTop: 8, marginBottom: 6 },
  inputText: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 60,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
  },
  placeholder: {
    width: 40,
  },
  map: {
    width: width - 40,
    height: 300,
    marginTop: 10,
    borderRadius: 10,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#aaa",
    marginVertical: 4,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FF8686",
    paddingVertical: 14,
    borderRadius: 6,
  },
});
