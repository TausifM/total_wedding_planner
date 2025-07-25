import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

//const { width } = Dimensions.get("window");

export default function CartSummaryScreen() {
  const { budget, commission, usableBudget, included } = useLocalSearchParams();

  const parsedIncluded = included ? JSON.parse(included as string) : [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>🧾 Wedding Budget Summary</Text>

        <View style={styles.lineGroup}>
          <Text style={styles.lineItem}>💰 Total Budget: ₹{budget}</Text>
          <Text style={styles.lineItem}>📄 Commission: ₹{commission}</Text>
          <Text style={styles.lineItem}>🪙 Usable Budget: ₹{usableBudget}</Text>
        </View>

        <Text style={styles.sectionTitle}>✅ Included Services</Text>
        {parsedIncluded.length > 0 ? (
          parsedIncluded.map((item: any, idx: number) => (
            <View key={idx} style={styles.serviceCard}>
              <Text style={styles.serviceName}>{item.category.toUpperCase()}</Text>
              <Text style={styles.sellerName}>{item.seller.name}</Text>
              <Text style={styles.price}>₹{item.seller.price}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noServiceText}>No services included in your current budget.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: "#f9f9f9",
    paddingVertical: 50,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  lineGroup: {
    marginBottom: 20,
    gap: 8,
  },
  lineItem: {
    fontSize: 16,
    color: "#444",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#1a1a1a",
  },
  serviceCard: {
    backgroundColor: "#f0f4ff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#555",
    marginBottom: 4,
  },
  sellerName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#2c3e50",
  },
  price: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: "500",
    color: "#2c7efc",
  },
  noServiceText: {
    fontSize: 15,
    color: "#999",
    fontStyle: "italic",
  },
});
