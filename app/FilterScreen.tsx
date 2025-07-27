import BackHeader from "@/components/BackHeader";
import ThemedButton from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useLocation } from "@/context/LocationContext";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";

const SORT_OPTIONS = [
  "Popularity",
  "Star Rating (highest first)",
  "Star Rating (lowest first)",
  "Best Reviewed First",
  "Most Reviewed First",
];

const CATEGORIES = [
  "Photography",
  "Venue",
  "Bridal",
  "Catering",
  "Flowers",
  "Entertainment",
];

const FilterScreen = () => {
  const [selectedSort, setSelectedSort] = useState<string | null>(
    "Star Rating (highest first)"
  );
  const { location } = useLocation();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>("$");
  const [selectedStars, setSelectedStars] = useState<number | null>(null);
  const navigation = useNavigation();
  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <BackHeader />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 40,
          flexGrow: 1,
          paddingVertical: 80,
        }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            Filter
          </ThemedText>
          <TouchableOpacity>
            <ThemedText style={styles.reset}>Reset</ThemedText>
          </TouchableOpacity>
        </View>

        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Sort Options
        </ThemedText>
        {SORT_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option}
            style={styles.radioRow}
            onPress={() => setSelectedSort(option)}
          >
            <ThemedText style={styles.radioLabel}>{option}</ThemedText>
            {selectedSort === option && (
              <Ionicons name="checkmark-circle" size={20} color="#FF8A8A" />
            )}
          </TouchableOpacity>
        ))}

        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Categories
        </ThemedText>
        <View style={styles.flexWrapRow}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.pill,
                selectedCategories.includes(cat) && styles.pillSelected,
              ]}
              onPress={() => toggleCategory(cat)}
            >
              <ThemedText
                style={[
                  styles.pillText,
                  selectedCategories.includes(cat) && styles.pillTextSelected,
                ]}
              >
                {cat}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        <ThemedText type="subtitle" style={styles.sectionTitle}>
          More Options
        </ThemedText>
        <View style={styles.rowSpaceBetween}>
          <ThemedText>Location</ThemedText>
          <ThemedText type="buttonLabel">
            {location ? location.city : "Not set"}
          </ThemedText>
          <TouchableOpacity
            style={[styles.pill, { marginTop: -4 }]}
            onPress={() => navigation.navigate("location_screen" as never)}
          >
            <ThemedText style={styles.pillText}>Change</ThemedText>
          </TouchableOpacity>
        </View>

        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Budget
        </ThemedText>
        <View style={styles.flexWrapRow}>
          {["$", "$$", "$$$"].map((symbol) => (
            <TouchableOpacity
              key={symbol}
              style={[
                styles.budgetBox,
                selectedBudget === symbol && styles.budgetBoxSelected,
              ]}
              onPress={() => setSelectedBudget(symbol)}
            >
              <ThemedText
                style={[
                  styles.budgetText,
                  selectedBudget === symbol && styles.budgetTextSelected,
                ]}
              >
                {symbol}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Star Rating
        </ThemedText>
        <View style={styles.flexWrapRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              style={[
                styles.starBox,
                selectedStars === star && styles.starBoxSelected,
              ]}
              onPress={() => setSelectedStars(star)}
            >
              <ThemedText
                style={[
                  styles.starText,
                  selectedStars === star && styles.starTextSelected,
                ]}
              >
                {star}{" "}
                {star ? (
                  <Ionicons name="star" size={12} color="#FF8A8A" />
                ) : (
                  "No Rating"
                )}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        <ThemedButton
          label="Apply Filters"
          style={styles.applyButton}
          // textStyle={styles.applyButtonText}
          onPress={() => {
            // Apply filter logic
            console.log("Applied filters");
          }}
        />
      </ScrollView>
    </ThemedView>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
  },
  reset: {
    color: "#FF8A8A",
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: 14,
    marginBottom: 10,
    fontWeight: "500",
  },
  radioRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  radioLabel: {
    fontSize: 14,
  },
  flexWrapRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  rowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomColor: "#dad9d9ff",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  pill: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  pillSelected: {
    borderColor: "#FF8A8A",
  },
  pillText: {
    fontSize: 13,
    color: "#555",
  },
  pillTextSelected: {
    color: "#FF8A8A",
  },
  budgetBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    width: 60,
    alignItems: "center",
    marginRight: 10,
  },
  budgetBoxSelected: {
    borderColor: "#FF8A8A",
  },
  budgetText: {
    fontSize: 14,
    color: "#333",
  },
  budgetTextSelected: {
    color: "#FF8A8A",
    fontWeight: "600",
  },
  starBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    width: 50,
    alignItems: "center",
    marginRight: 10,
    marginTop: 6,
  },
  starBoxSelected: {
    borderColor: "#FF8A8A",
  },
  starText: {
    fontSize: 13,
    color: "#333",
  },
  starTextSelected: {
    color: "#FF8A8A",
    fontWeight: "600",
  },
  applyButton: {
    marginTop: 30,
    backgroundColor: "#FF8A8A",
    // borderRadius: 10,
    // paddingVertical: 14,
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
