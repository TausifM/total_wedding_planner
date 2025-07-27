import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const CATEGORIES = [
  "Photography", "Venue", "Wedding Planning", "Bridal", "Videography",
  "Catering", "Hair & Makeup", "Dress & Attire", "Flowers",
  "Decoration & Lighting", "Favors & Gifts", "Entertainment",
  "Photo Booth", "Jewelry", "Honeymoon", "Wedding Accessories",
  "Wedding Cake", "Dance & Choreography", "Health & Beauty", "Wedding Shoes",
];

export default function ChooseCategoriesScreen() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const isSelected = (category: string) =>
    selectedCategories.includes(category);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose Categories</Text>
      <Text style={styles.subText}>
        Pick 5 or more categories of vendors you are currently looking
      </Text>

      <ScrollView
        contentContainerStyle={styles.categoriesContainer}
        showsVerticalScrollIndicator={false}
      >
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryPill,
              isSelected(category) && styles.categoryPillSelected,
            ]}
            onPress={() => toggleCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                isSelected(category) && styles.categoryTextSelected,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.infoText}>
        Don’t worry, you can always update this information later.
      </Text>

      <TouchableOpacity
        style={[
          styles.doneButton,
          selectedCategories.length < 5 && styles.disabledButton,
        ]}
        disabled={selectedCategories.length < 5}
        onPress={() => alert("Categories saved!")}
      >
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  categoryPill: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#FF8A8A",
    margin: 5,
  },
  categoryPillSelected: {
    backgroundColor: "#FF8A8A",
  },
  categoryText: {
    color: "#FF8A8A",
    fontSize: 13,
  },
  categoryTextSelected: {
    color: "#fff",
    fontWeight: "500",
  },
  infoText: {
    marginTop: 20,
    color: "#888",
    fontSize: 12,
    textAlign: "center",
  },
  doneButton: {
    backgroundColor: "#FF8A8A",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  doneButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
  disabledButton: {
    opacity: 0.4,
  },
});
