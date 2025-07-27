import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useState } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const SORT_OPTIONS = ["Best Match", "Highest Rated", "Most Reviewed"];

export default function SortFilterHeader() {
  const navigation = useNavigation();
  const [selectedSort, setSelectedSort] = useState("Best Match");
  const [modalVisible, setModalVisible] = useState(false);

  const handleSortSelect = (option: string) => {
    setSelectedSort(option);
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.container}>
        {/* Sort Dropdown */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.text}>{selectedSort}</Text>
          <Ionicons name="chevron-down" size={16} color="#888" style={{ marginLeft: 4 }} />
        </TouchableOpacity>

        {/* Filter Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("FilterScreen" as never)}
        >
          <Ionicons name="filter" size={16} color="#888" style={{ marginRight: 4 }} />
          <Text style={styles.text}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Sort Modal */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <TouchableOpacity
          style={styles.modalBackdrop}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            {SORT_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => handleSortSelect(option)}
                style={styles.modalItem}
              >
                <Text
                  style={[
                    styles.modalItemText,
                    option === selectedSort && styles.modalSelectedText,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#cccacaff",
    padding: 8,
    borderRadius: 12,
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 4,
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    color: "#444",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 8,
    width: 200,
    elevation: 4,
  },
  modalItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  modalItemText: {
    fontSize: 16,
    color: "#444",
  },
  modalSelectedText: {
    color: "#FF8A8A",
    fontWeight: "bold",
  },
});
