import AppHeader from "@/components/AppHeader";
import SellerImageUploader from "@/components/ImageUploader";
import SideMenu from "@/components/SideMenu";
import ThemedButton from "@/components/ThemedButton";
import { GlobalStyles } from "@/constants/styles";
import { Colors, Fonts, Spacing } from "@/constants/Themes";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import ThemedInput from "../../components/ThemedInput";

const categories = [
  { label: "Photography", value: "photography" },
  { label: "Catering", value: "catering" },
  { label: "Decoration", value: "decor" },
  { label: "Makeup Artist", value: "makeup" },
  { label: "Venue Booking", value: "venue" },
  { label: "Music & DJ", value: "music" },
  { label: "Transportation", value: "transport" },
  { label: "Event Planning", value: "planning" },
];

const SellerScreen = () => {
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);

  const [touchedFields, setTouchedFields] = useState<{
    [key: string]: boolean;
  }>({});

  const validateField = (field: string, value: string) => {
    if (!value.trim()) return `${field} is required.`;
    return "";
  };

  const handleSubmit = () => {
    const errors = {
      serviceName: validateField("Service Name", serviceName),
      description: validateField("Description", description),
      price: validateField("Price", price),
      category: category ? "" : "Category is required.",
    };

    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (hasErrors) {
      setTouchedFields({
        serviceName: true,
        description: true,
        price: true,
        category: true,
      });
      Alert.alert("Please fill all required fields.");
      return;
    }

    Alert.alert("Success", "Service added successfully!");
    setServiceName("");
    setDescription("");
    setPrice("");
    setCategory("");
    setTouchedFields({});
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <AppHeader
          title="Add Service"
          onMenuPress={() => setMenuVisible(true)}
          showProfile={false}
          show={true}
          menuVisible={menuVisible}
          onMenuClose={() => setMenuVisible(false)}
        />

        <ThemedInput
          label="Service Name"
          placeholder="Enter service name"
          value={serviceName}
          onChangeText={setServiceName}
          touched={touchedFields.serviceName}
          error={validateField("Service Name", serviceName)}
        />

        <Text style={GlobalStyles.label}>Category</Text>
        <RNPickerSelect
          onValueChange={setCategory}
          items={categories}
          placeholder={{ label: "Select a category", value: null }}
          value={category}
          style={{
            inputIOS: pickerSelectStyles.inputIOS,
            inputAndroid: pickerSelectStyles.inputAndroid,
            iconContainer: pickerSelectStyles.iconContainer,
          }}
          useNativeAndroidPickerStyle={false}
          Icon={() => (
            <Ionicons
              name="chevron-down"
              size={20}
              color="#555"
              style={{ marginRight: 10 }}
            />
          )}
          onOpen={() =>
            setTouchedFields((prev) => ({ ...prev, category: true }))
          }
        />
        {touchedFields.category && !category && (
          <Text style={styles.errorText}>Category is required.</Text>
        )}

        <ThemedInput
          label="Description"
          placeholder="Describe your service"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          touched={touchedFields.description}
          error={validateField("Description", description)}
          style={{
            height: 100,
            textAlignVertical: "top",
            padding: 10,
            //borderColor: Colors.border, // optional override
          }}
        />

        <ThemedInput
          label="Price"
          placeholder="Enter price in $"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          touched={touchedFields.price}
          error={validateField("Price", price)}
          rightIcon={{
            name: "close-circle",
            onPress: () => setPrice(""),
          }}
        />

        <SellerImageUploader />
        <ThemedButton
          label="Add Service"
          onPress={handleSubmit}
          iconName="arrow-forward"
        />
      </ScrollView>
      <SideMenu visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </KeyboardAvoidingView>
  );
};

export default SellerScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#FEF4EA",
    flexGrow: 1,
    paddingBottom: 120,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    color: "#130057",
  },
  dropdownLabel: {
    fontWeight: "500",
    color: "#444",
    marginBottom: 6,
    marginTop: 6,
  },
  errorText: {
    color: "#cc0000",
    fontSize: 13,
    marginBottom: 10,
    marginLeft: 4,
  },
  imageUpload: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  imageText: {
    marginLeft: 10,
    color: "#555",
  },
  button: {
    backgroundColor: "#130057",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md + 2,
    paddingVertical: Spacing.md,
    borderRadius: 14,
    color: "#333",
    backgroundColor: Colors.inputBackground,
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md + 2,
    paddingVertical: Spacing.md,
    borderRadius: 14,
    color: "#333",
    backgroundColor: Colors.inputBackground,
    marginBottom: 10,
  },
  iconContainer: {
    top: 18,
    right: 14,
  },
  placeholder: {
    color: "#999",
  },
});
