import { Image } from "expo-image";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const ServiceDetailsSmallImageCard = () => {
  return (
    <View style={styles.offerSection}>
      <Text style={styles.sectionTitle}>What We Offer</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 12 }}
      >
        {[
          { image: require("../assets/images/unnamed.jpg"), label: "Catering" },
          { image: require("../assets/images/unnamed.jpg"), label: "Decor" },
          {
            image: require("../assets/images/unnamed.jpg"),
            label: "Live Music",
          },
          { image: require("../assets/images/unnamed.jpg"), label: "Lighting" },
          {
            image: require("../assets/images/unnamed.jpg"),
            label: "Photography",
          },
        ].map((item, index) => (
          <View key={index} style={styles.offerCard}>
            <Image source={item.image} style={styles.offerImage} />
            <Text style={styles.offerText}>{item.label}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ServiceDetailsSmallImageCard;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: "#2A1524",
    marginBottom: 8,
  },
  offerSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  offerCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    width: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  offerImage: {
    width: 48,
    height: 48,
    marginBottom: 8,
    resizeMode: "contain",
  },
  offerText: {
    fontSize: 13,
    textAlign: "center",
    color: "#2A1524",
    fontWeight: "500",
  },
});
