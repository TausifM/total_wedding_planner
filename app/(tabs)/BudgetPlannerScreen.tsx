import BackHeader from "@/components/BackHeader";
import SummaryCard from "@/components/SummaryCard";
import ThemedButton from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BigImageCard from "../../components/BigImageCard";
import { essentialCategories } from "../../data/essentialCategories";
import { sellers } from "../../data/sellers";
import { Seller } from "../../types/seller_types";
import { planWedding } from "../../utils/planWedding";

export default function BudgetPlannerScreen() {
  const [budgetInput, setBudgetInput] = useState("");
  const [result, setResult] = useState<any | null>(null);
  const [eventDate, setEventDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const inputRef = useRef<TextInput>(null);
  // Show formatted date
  const formattedDate = eventDate.toISOString().split("T")[0]; // YYYY-MM-DD
  const handlePlan = () => {
    const budget = parseInt(budgetInput);
    if (!budget || isNaN(budget)) return;

    const data = planWedding(budget, sellers, essentialCategories);
    setResult({ budget, ...data });
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus(); // This opens the mobile typing keyboard
    }, 300); // Delay helps avoid layout conflicts

    return () => clearTimeout(timer);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BackHeader title="Budget Planner" style={{ marginBottom: 2 }} />
      <Image
        source={require("../../assets/images/wedding-bg.jpg")}
        style={{ width: "100%", height: 200, borderRadius: 10 }}
      />
      <ThemedText style={styles.title}>Plan Your Wedding Budget</ThemedText>
      {/* <Text style={styles.title}>Plan My Wedding</Text> */}
      <Text style={styles.subtitle}>
        Enter your budget to see how you can allocate it across essential
        categories.
      </Text>
      <Text style={styles.subtitle}>
        This will help you understand how to best utilize your budget.
      </Text>
      <Text style={styles.subtitle}>
        Note: This is a basic planner and does not include all possible
        expenses.
      </Text>
      <Text style={styles.subtitle}>
        For a more detailed plan, please use the full planner.
      </Text>
      <Text style={styles.subtitle}>
        Enter your budget below to get started.
      </Text>

      <TextInput
        ref={inputRef}
        placeholder="Enter your budget (₹)"
        keyboardType="numeric"
        value={budgetInput}
        onChangeText={setBudgetInput}
        onKeyPress={(e) => {
          if (e.nativeEvent.key === "Enter") {
            handlePlan();
          }
        }}
        style={styles.input}
        keyboardAppearance="dark"
        returnKeyType="done"
      />
      <ThemedButton
        label="Plan Wedding"
        onPress={handlePlan}
        iconName="arrow-forward"
        marginRight={10}
      />
      {/* <Text style={styles.planButton} onPress={handlePlan}>
        Show My Plan
      </Text> */}

      {result && (
        <View style={styles.resultBlock}>
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontWeight: "600", marginBottom: 6 }}>
              Select Wedding Date
            </Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.datePickerButton}
            >
              <Text>{formattedDate}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={eventDate}
                mode="date"
                display="default"
                onChange={(e, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) setEventDate(selectedDate);
                }}
              />
            )}
          </View>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/CartSummaryScreen",
                params: {
                  budget: result.budget,
                  commission: result.commission,
                  usableBudget: result.usableBudget,
                  included: JSON.stringify(result.included),
                },
              })
            }
            style={styles.cartButton}
          >
            <Text style={styles.cartButtonText}>Proceed to Payment</Text>
          </TouchableOpacity>

          {essentialCategories.map((category) => (
            <View key={category} style={{ marginTop: 20 }}>
              <Text style={styles.categoryTitle}>{category.toUpperCase()}</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {(() => {
                  const maxAllowedPrice =
                    (result.usableBudget / essentialCategories.length) * 1.5;

                  const availableSellers = result.sellersByCategory[
                    category
                  ].filter((s: Seller) => {
                    const isUnavailable =
                      s.unavailableDates?.includes(formattedDate);
                    return !isUnavailable && s.price <= maxAllowedPrice;
                  });

                  if (availableSellers?.length === 0) {
                    return (
                      <View style={styles.unavailableCard}>
                        <Text style={styles.unavailableTitle}>
                          Not Included
                        </Text>
                        <Text style={styles.unavailableText}>
                          No sellers available for{" "}
                          <Text style={{ fontWeight: "bold" }}>{category}</Text>{" "}
                          within your current budget.
                        </Text>
                        <Text style={styles.unavailableSuggestion}>
                          Please increase your budget or consider prioritizing
                          this category.
                        </Text>
                      </View>
                    );
                  }

                  return availableSellers.slice(0, 5).map((s: Seller) => (
                    <View key={s.id} style={{ width: 250, marginRight: 15 }}>
                      <BigImageCard
                        image={
                          s.image
                            ? s.image
                            : require("../../assets/images/unnamed.jpg")
                        }
                        name={s.name}
                        rating={s.rating ? String(s.rating) : "4.0"}
                        deliveryTime={s.deliveryTime || "1 day"}
                        deliveryType={s.deliveryType || category}
                        unavailableDates={s.unavailableDates || []}
                      />
                    </View>
                  ));
                })()}
              </ScrollView>
            </View>
          ))}
          <SummaryCard
            sellersByCategory={result.sellersByCategory}
            essentialCategories={essentialCategories}
            formattedDate={formattedDate}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#FEF4EA",
  },
  subtitle: {
    fontSize: 16,
    color: "#8A003B",
    marginBottom: 10,
    fontFamily: "Montserrat-Regular",
  },
  cartButton: {
    backgroundColor: "#007aff",
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  cartButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },

  unavailableCard: {
    width: 250,
    padding: 16,
    backgroundColor: "#fff3f3",
    borderRadius: 12,
    borderColor: "#ffcccc",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  unavailableTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#b00020",
    marginBottom: 6,
  },
  unavailableText: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
  },
  unavailableSuggestion: {
    fontSize: 13,
    color: "#b00020",
    marginTop: 8,
    textAlign: "center",
    fontStyle: "italic",
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#8A003B",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 18,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    color: "#333",
    fontFamily: "Montserrat-Regular",
  },
  planButton: {
    backgroundColor: "#8A003B",
    color: "#fff",
    padding: 12,
    textAlign: "center",
    borderRadius: 8,
    fontWeight: "bold",
    marginBottom: 16,
  },
  resultBlock: {
    marginTop: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#67002B",
  },
});
