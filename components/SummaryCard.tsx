import { StyleSheet, Text, View } from "react-native";
import { Seller } from "../types/seller_types";

type Props = {
  sellersByCategory: { [key: string]: Seller[] };
  essentialCategories: string[];
  formattedDate: string;
};

export default function SummaryCard({ sellersByCategory, essentialCategories, formattedDate
}: Props) {
  const included: { category: string; seller: Seller }[] = [];
  const excluded: string[] = [];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>📋 Wedding Summary</Text>


      <Text style={styles.sectionHeader}>✅ Included Services</Text>
      {included.map(({ category, seller }) => (
        <Text key={category} style={styles.includedItem}>
          • {category}: <Text style={{ fontWeight: "600" }}>{seller.name}</Text>{" "}
          (₹{seller.price})
        </Text>
      ))}

      <Text style={styles.sectionHeader}>❌ Not Included in Budget</Text>
      {excluded.length ? (
        excluded.map((category) => (
          <Text key={category} style={styles.excludedItem}>
            • {category}
          </Text>
        ))
      ) : (
        <Text style={styles.excludedItem}>
          All essential services are covered 🎉
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginTop: 30,
    marginBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: "#e2e2e2",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 14,
    color: "#333",
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 6,
    color: "#444",
  },
  includedItem: {
    fontSize: 14,
    color: "#2e7d32",
    marginBottom: 4,
  },
  excludedItem: {
    fontSize: 14,
    color: "#d32f2f",
    marginBottom: 4,
  },
});
